/**
 * Firebase 同步功能模組
 * 處理使用者認證和資料同步
 */

/**
 * Firebase 同步管理器
 */
class FirebaseSync {
    constructor() {
        this.app = null;
        this.auth = null;
        this.db = null;
        this.currentUser = null;
        this.isInitialized = false;
        this.syncEnabled = false;
    }

    /**
     * 初始化 Firebase
     * @returns {Promise<boolean>} 初始化是否成功
     */
    async initialize() {
        try {
            if (typeof window.firebaseConfig === 'undefined') {
                console.warn('Firebase config not found. Please configure firebase-config.js');
                return false;
            }

            // 初始化 Firebase App
            this.app = firebase.initializeApp(window.firebaseConfig);
            this.auth = firebase.auth();
            this.db = firebase.firestore();

            // 監聽認證狀態變化
            this.auth.onAuthStateChanged((user) => {
                this.handleAuthStateChange(user);
            });

            this.isInitialized = true;
            console.log('Firebase initialized successfully');
            return true;
        } catch (error) {
            console.error('Firebase initialization failed:', error);
            return false;
        }
    }

    /**
     * 處理認證狀態變化
     * @param {firebase.User|null} user - Firebase 使用者物件
     */
    async handleAuthStateChange(user) {
        this.currentUser = user;
        
        if (user) {
            console.log('User signed in:', user.email);
            this.syncEnabled = true;
            
            // 使用者登入後，先載入雲端資料，若無則顯示本地資料
            const cloudTodos = await this.loadTodosFromCloud();
            
            // 如果雲端沒有資料，顯示本地資料並同步到雲端
            if (!cloudTodos || cloudTodos.length === 0) {
                if (typeof window.loadTodos === 'function') {
                    window.loadTodos(); // 載入本地資料
                }
                if (typeof window.renderTodos === 'function') {
                    window.renderTodos(); // 顯示資料
                }
                if (typeof window.updateStats === 'function') {
                    window.updateStats();
                }
            }
            
            // 更新 UI 狀態
            this.updateSyncUI(true, user.email);
        } else {
            console.log('User signed out');
            this.syncEnabled = false;
            this.currentUser = null; // 明確清除用戶狀態
            
            // 停止即時同步
            this.stopRealtimeSync();
            
            // 清空todos並更新UI
            if (typeof window.todos !== 'undefined') {
                window.todos = [];
            }
            
            this.updateSyncUI(false, null);
        }
    }

    /**
     * 使用 Email 和密碼註冊新使用者
     * @param {string} email - 使用者 email
     * @param {string} password - 密碼
     * @returns {Promise<boolean>} 註冊是否成功
     */
    async signUp(email, password) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            console.log('User registered successfully:', userCredential.user.email);
            return true;
        } catch (error) {
            console.error('Sign up failed:', error);
            throw error;
        }
    }

    /**
     * 使用 Email 和密碼登入
     * @param {string} email - 使用者 email  
     * @param {string} password - 密碼
     * @returns {Promise<boolean>} 登入是否成功
     */
    async signIn(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            console.log('User signed in successfully:', userCredential.user.email);
            return true;
        } catch (error) {
            console.error('Sign in failed:', error);
            throw error;
        }
    }

    /**
     * 登出使用者
     * @returns {Promise<void>}
     */
    async signOut() {
        try {
            await this.auth.signOut();
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Sign out failed:', error);
            throw error;
        }
    }

    /**
     * 儲存待辦事項到 Firestore
     * @param {Array} todos - 待辦事項陣列
     * @returns {Promise<boolean>} 儲存是否成功
     */
    async saveTodosToCloud(todos) {
        if (!this.syncEnabled || !this.currentUser) {
            console.log('Sync disabled or user not logged in');
            return false;
        }

        try {
            // 設置更新標記，暫停即時監聽
            this.isUpdatingCloud = true;
            console.log('開始同步到雲端，暫停即時監聽');

            const userDoc = this.db.collection('users').doc(this.currentUser.uid);
            const todosCollection = userDoc.collection('todos');

            // 使用批次寫入來更新所有待辦事項
            const batch = this.db.batch();

            // 先清除現有的待辦事項（簡化版本）
            const existingTodos = await todosCollection.get();
            existingTodos.forEach((doc) => {
                batch.delete(doc.ref);
            });

            // 新增所有目前的待辦事項
            todos.forEach((todo) => {
                const todoRef = todosCollection.doc(todo.id.toString());
                batch.set(todoRef, {
                    ...todo,
                    createdAt: todo.createdAt || new Date().toLocaleTimeString('zh-TW', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    }),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            });

            // 更新用戶的最後同步時間
            batch.set(userDoc, {
                lastSync: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            await batch.commit();
            console.log('Todos saved to cloud successfully');
            
            // 延遲後重新啟用即時監聽
            setTimeout(() => {
                this.isUpdatingCloud = false;
                console.log('重新啟用即時監聽');
            }, 5000); // 增加到5秒，減少API調用頻率
            
            return true;
        } catch (error) {
            console.error('Failed to save todos to cloud:', error);
            // 錯誤時也要重新啟用監聽
            this.isUpdatingCloud = false;
            return false;
        }
    }

    /**
     * 從 Firestore 載入待辦事項
     * @returns {Promise<Array|null>} 待辦事項陣列或 null
     */
    async loadTodosFromCloud() {
        if (!this.syncEnabled || !this.currentUser) {
            console.log('Sync disabled or user not logged in');
            return null;
        }

        try {
            const todosCollection = this.db
                .collection('users')
                .doc(this.currentUser.uid)
                .collection('todos');

            const snapshot = await todosCollection.orderBy('updatedAt', 'desc').get();
            
            const cloudTodos = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                // 轉換 Firestore 時間戳為字串
                cloudTodos.push({
                    ...data,
                    id: parseFloat(doc.id) // 確保 ID 為數字
                });
            });

            console.log('Loaded todos from cloud:', cloudTodos.length);
            
            // 更新本地資料
            if (typeof window.mergeTodosFromCloud === 'function') {
                window.mergeTodosFromCloud(cloudTodos);
            }

            return cloudTodos;
        } catch (error) {
            console.error('Failed to load todos from cloud:', error);
            return null;
        }
    }

    /**
     * 設定即時同步監聽器 (已停用)
     */
    setupRealtimeSync() {
        // 已停用即時同步功能，避免無限循環問題
        console.log('即時同步功能已停用');
        return;
    }

    /**
     * 停止即時同步監聽器
     */
    stopRealtimeSync() {
        if (this.todosListener) {
            this.todosListener();
            this.todosListener = null;
        }
        
        // 清理定時器
        if (this.realtimeUpdateTimer) {
            clearTimeout(this.realtimeUpdateTimer);
            this.realtimeUpdateTimer = null;
        }
        
        this.isUpdatingCloud = false;
        this.isFirstLoad = true;
    }

    /**
     * 更新同步狀態 UI
     * @param {boolean} isLoggedIn - 是否已登入
     * @param {string|null} email - 使用者 email
     */
    updateSyncUI(isLoggedIn, email) {
        const syncStatus = document.getElementById('syncStatus');
        const syncContainer = document.getElementById('syncContainer');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (!syncStatus || !syncContainer || !logoutBtn) return;

        if (isLoggedIn) {
            syncStatus.textContent = `已同步: ${email}`;
            syncStatus.className = 'sync-status logged-in';
            syncContainer.style.display = 'none';
            logoutBtn.style.display = 'block';
            
            // 啟用即時同步
            this.setupRealtimeSync();
        } else {
            syncStatus.textContent = '未同步';
            syncStatus.className = 'sync-status logged-out';
            syncContainer.style.display = 'block';
            logoutBtn.style.display = 'none';
            
            // 停止即時同步
            this.stopRealtimeSync();
            
            // 觸發UI更新到登出狀態
            if (typeof window.renderTodos === 'function') {
                try {
                    window.renderTodos();
                } catch (error) {
                    console.error('登出後UI更新失敗:', error);
                }
            }
            if (typeof window.updateStats === 'function') {
                try {
                    window.updateStats();
                } catch (error) {
                    console.error('登出後統計更新失敗:', error);
                }
            }
        }
    }

    /**
     * 檢查是否已初始化且可用
     * @returns {boolean}
     */
    isReady() {
        return this.isInitialized;
    }

    /**
     * 檢查是否已啟用同步
     * @returns {boolean}
     */
    isSyncEnabled() {
        return this.syncEnabled;
    }
}

// 建立全域 Firebase 同步實例
window.firebaseSync = new FirebaseSync();
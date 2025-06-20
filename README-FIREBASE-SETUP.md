# Firebase 設定指南

## 🔐 安全提醒

Firebase 配置檔案包含敏感資訊，已被 `.gitignore` 排除，不會提交到 Git 倉庫中。

## 📋 設定步驟

### 1. 建立配置檔案

```bash
# 複製範本檔案
cp firebase-config.example.js firebase-config.js
```

### 2. 取得 Firebase 配置

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇你的專案 `todo-list-sync`
3. 點擊左側齒輪圖標 ⚙️ → **專案設定**
4. 向下滾動到「你的應用程式」區域
5. 點擊你的 Web 應用程式
6. 複製配置物件

### 3. 填入真實配置

編輯 `firebase-config.js`，將範例值替換為你的實際配置：

```javascript
const firebaseConfig = {
    apiKey: "你的-api-key",
    authDomain: "你的專案.firebaseapp.com",
    projectId: "你的專案-id",
    storageBucket: "你的專案.appspot.com",
    messagingSenderId: "你的訊息ID",
    appId: "你的應用程式ID",
    measurementId: "你的分析ID"
};
```

### 4. 啟用 Firebase 服務

#### Authentication
1. Firebase Console → Authentication → 開始使用
2. Sign-in method → Email/Password → 啟用
3. 儲存設定

#### Firestore Database
1. Firebase Console → Firestore Database → 建立資料庫
2. 選擇「測試模式」
3. 選擇地區：asia-east1 (台灣)
4. 完成建立

## 🚀 測試連接

完成設定後：
1. 重新整理網頁應用程式
2. 輸入 email 測試登入/註冊功能
3. 確認同步功能正常運作

## 📁 檔案說明

- `firebase-config.example.js` - 配置範本（已提交到 Git）
- `firebase-config.js` - 實際配置（**已排除**，不會提交）
- `firebase-config.local.js` - 本地備份（**已排除**，不會提交）

## ⚠️ 安全注意事項

- **絕對不要**將真實的 Firebase 配置提交到公開倉庫
- API 金鑰具有存取權限，需要妥善保護
- 如果意外洩漏，請立即到 Firebase Console 重新生成金鑰
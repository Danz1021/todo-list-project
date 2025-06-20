# 專案部署指南

快速設定 GitHub Pages + Firebase Authentication 的完整流程。

## 1. GitHub Pages 設定

### 建立倉庫
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

### 啟用 Pages
1. GitHub 倉庫 → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. 儲存

網址：`https://USERNAME.github.io/REPO-NAME`

## 2. Firebase 專案設定

### 建立專案
1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 新增專案 → 輸入專案名稱
3. 停用 Google Analytics（可選）
4. 建立專案

### 新增 Web 應用程式
1. 專案總覽 → 新增應用程式 → Web
2. 輸入應用程式暱稱
3. 複製 Firebase 配置物件

## 3. Firebase Authentication

### 啟用 Email/Password
1. Authentication → 開始使用
2. Sign-in method → Email/Password
3. 啟用第一個選項
4. 儲存

### 設定授權網域
1. Authentication → Settings
2. 授權網域 → 新增網域
3. 加入：`USERNAME.github.io`
4. 加入：`localhost`（開發用）

## 4. Firestore Database

### 建立資料庫
1. Firestore Database → 建立資料庫
2. 選擇「測試模式」
3. 地區：asia-east1 (台灣)
4. 完成

### 設定安全規則
1. Firestore → 規則
2. 貼上以下規則：
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
3. 發布

## 5. 程式碼整合

### Firebase 配置檔案
建立 `firebase-config.public.js`：
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

window.firebaseConfig = firebaseConfig;
console.log('✅ firebase-config.public.js 已載入');
```

### HTML 載入 Firebase
```html
<!-- Firebase CDN -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

<!-- Firebase 配置 -->
<script>
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        document.write('<script src="firebase-config.js"><\/script>');
    } else {
        document.write('<script src="firebase-config.public.js"><\/script>');
    }
</script>
```

### .gitignore 設定
```
# Firebase 配置檔案（本地開發用）
firebase-config.js
firebase-config.local.js
```

## 6. 測試流程

1. 本地測試：`python3 -m http.server 8000`
2. 開啟：`http://localhost:8000`
3. 測試 Firebase 功能
4. 推送到 GitHub
5. 檢查 GitHub Pages

## 常見問題

- **CORS 錯誤**：確認授權網域包含正確域名
- **配置未載入**：檢查 firebase-config.public.js 是否存在
- **Permission denied**：確認 Firestore 規則允許已認證用戶
- **配額超限**：減少 API 調用頻率

## 安全注意事項

- 本地開發配置檔案不要提交到 Git
- 公開配置檔案可以安全提交
- 定期檢查 Firebase 使用量
- 生產環境建議更嚴格的安全規則
/**
 * Firebase 配置檔案範本
 * 
 * 使用方法：
 * 1. 複製此檔案為 firebase-config.js
 * 2. 將下方的範例值替換為你的實際 Firebase 配置
 * 3. firebase-config.js 已被 .gitignore 排除，不會被提交到 Git
 */

// TODO: 請將下方的範例值替換為你的實際 Firebase 配置
const firebaseConfig = {
    apiKey: "your-api-key-here",                    // 從 Firebase Console 取得
    authDomain: "your-project.firebaseapp.com",    // 你的專案網域
    projectId: "your-project-id",                  // 你的專案 ID
    storageBucket: "your-project.appspot.com",     // 儲存空間
    messagingSenderId: "123456789",                // 訊息傳送 ID
    appId: "1:123456789:web:abcdef123456",         // 應用程式 ID
    measurementId: "G-XXXXXXXXXX"                  // Google Analytics ID (可選)
};

// 匯出配置供主程式使用
window.firebaseConfig = firebaseConfig;
/**
 * Firebase 公開配置檔案 (用於 GitHub Pages)
 * 包含可以公開的 Firebase 配置
 */

// Firebase 專案配置 (公開版本)
const firebaseConfig = {
    apiKey: "AIzaSyCqFI4K-owPVjcyX7LY5S-mOszn1-fdEgw",
    authDomain: "todo-list-sync.firebaseapp.com",
    projectId: "todo-list-sync",
    storageBucket: "todo-list-sync.firebasestorage.app",
    messagingSenderId: "975721436274",
    appId: "1:975721436274:web:69f6685fb2dada423e5eeb",
    measurementId: "G-69HS0840EB"
};

// 匯出配置供主程式使用
window.firebaseConfig = firebaseConfig;

// 確認載入成功
console.log('✅ firebase-config.public.js 已載入');
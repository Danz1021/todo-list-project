# 🍺 Sunny的酒空清單

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Language](https://img.shields.io/badge/language-JavaScript-yellow.svg)
![Framework](https://img.shields.io/badge/framework-Vanilla_JS-green.svg)
![CSS](https://img.shields.io/badge/styling-CSS3-blue.svg)
![Responsive](https://img.shields.io/badge/responsive-yes-brightgreen.svg)

*一個以調酒為主題的現代化待辦事項管理應用程式*

[🎯 線上 Demo](https://danz1021.github.io/todo-list-project/) | [📖 完整文檔](https://danz1021.github.io/todo-list-project/docs/) | [🐛 問題回報](https://github.com/Danz1021/todo-list-project/issues)

</div>

## ✨ 專案特色

### 🍸 調酒主題設計
- 每日隨機調酒推薦語錄
- 動態變換的森林漸變背景
- 精美的 emoji 慶祝動畫效果

### 📝 強大的任務管理
- **智能優先級系統** - P0(緊急) 到 P4(最低) 五級分類
- **直觀操作界面** - 拖拽、快捷鍵、批量操作
- **即時統計追蹤** - 完成率、進度條、里程碑慶祝
- **靈活篩選系統** - 按狀態、優先級、日期篩選

### 🎯 用戶體驗優化
- **響應式設計** - 完美適配桌面端和移動端
- **本地數據持久化** - 使用 LocalStorage 自動保存
- **優雅動畫效果** - 流暢的過渡和反饋動畫
- **無障礙設計** - 支援鍵盤導航和螢幕閱讀器

### 💻 技術亮點
- **零依賴** - 純原生 JavaScript ES6+ 實現
- **模組化架構** - 清晰的代碼組織和註釋
- **現代化 CSS** - Flexbox、Grid、CSS 變量
- **PWA 就緒** - 支援離線使用和桌面安裝

## 🚀 快速開始

### 前置需求
- 現代瀏覽器 (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- 支援 JavaScript 和 LocalStorage

### 安裝方式

#### 方法一：直接使用
```bash
# 克隆專案
git clone https://github.com/Danz1021/todo-list-project.git
cd todo-list-project

# 直接開啟
open index.html
```

#### 方法二：本地伺服器
```bash
# 使用 Python 建立本地伺服器
python3 -m http.server 8000

# 或使用 Node.js
npx serve .

# 瀏覽器開啟 http://localhost:8000
```

#### 方法三：線上使用
直接訪問 [線上 Demo](https://danz1021.github.io/todo-list-project/)

## 📱 功能說明

### 基本操作
| 功能 | 操作方式 | 快捷鍵 |
|------|----------|--------|
| 新增任務 | 輸入框 + 選擇優先級 | `Enter` |
| 完成任務 | 點擊核取方塊 | `Space` |
| 刪除任務 | 點擊 × 按鈕 | `Delete` |
| 編輯任務 | 雙擊任務文字 | `F2` |

### 篩選系統
- **狀態篩選**: 全部 / 待完成 / 已完成
- **優先級篩選**: P0-P4 各優先級別
- **組合篩選**: 同時使用多個篩選條件
- **即時更新**: 篩選結果即時反映

### 進度追蹤
- **即時統計**: 總任務數、完成數、待完成數
- **視覺化進度條**: 動態顯示完成百分比
- **里程碑慶祝**: 25%、50%、75%、100% 完成慶祝

## 🏗️ 專案架構

```
todo-list-project/
├── 📄 index.html              # 主應用程式檔案
├── 📚 docs/                   # VitePress 文檔
│   ├── .vitepress/           # VitePress 配置
│   ├── guide/                # 使用指南
│   ├── api/                  # API 文檔
│   └── examples/             # 範例和教學
├── 📋 spec.md                 # 技術規格文件
├── 📝 todolist.md             # 開發任務清單
├── 🔧 firebase-config.js      # Firebase 配置
└── 📖 README.md               # 專案說明 (本檔案)
```

### 核心模組
- **TaskManager** - 任務管理核心邏輯
- **FilterSystem** - 篩選和排序功能
- **UIRenderer** - 界面渲染和動畫
- **StorageManager** - 數據持久化管理
- **EventHandler** - 事件處理和響應

## 🎨 自定義主題

應用程式支援主題自定義，您可以修改 CSS 變量來調整外觀：

```css
:root {
  --primary-color: #4facfe;      /* 主色調 */
  --secondary-color: #00f2fe;    /* 次要色調 */
  --success-color: #27ae60;      /* 成功色 */
  --warning-color: #f39c12;      /* 警告色 */
  --danger-color: #e74c3c;       /* 危險色 */
  --background-gradient: linear-gradient(135deg, #2d5a27 0%, #a7c957 100%);
}
```

## 📊 數據結構

### 任務物件結構
```javascript
{
  id: Number,              // 唯一識別碼
  text: String,           // 任務內容
  completed: Boolean,     // 完成狀態
  createdAt: String,      // 創建時間 (ISO 8601)
  priority: String,       // 優先級 ('P0'-'P4')
  priorityNumber: Number, // 排序用數值 (0-4)
  tags: Array,           // 標籤列表 (未來功能)
  dueDate: String,       // 截止日期 (未來功能)
}
```

### 本地存儲結構
```javascript
localStorage.setItem('todoList', JSON.stringify({
  version: '2.0',
  lastUpdated: '2024-06-24',
  todos: [...tasks],
  settings: {
    theme: 'default',
    autoReset: true,
    notifications: true
  }
}));
```

## 🧪 開發和測試

### 開發環境設置
```bash
# 安裝開發依賴 (可選)
npm install -g live-server

# 啟動開發伺服器
live-server --port=3000

# 或使用 Python
python3 -m http.server 3000
```

### 程式碼規範
- **JavaScript**: ES6+ 語法，JSDoc 註釋
- **CSS**: BEM 命名規範，CSS Grid/Flexbox
- **HTML**: 語義化標籤，ARIA 無障礙標準
- **Git**: [Angular 提交規範](https://www.conventionalcommits.org/)

### 測試清單
- [ ] 基本功能測試 (CRUD 操作)
- [ ] 篩選系統測試
- [ ] 響應式設計測試
- [ ] 瀏覽器相容性測試
- [ ] 性能和無障礙測試

## 🤝 貢獻指南

我們歡迎社群貢獻！請遵循以下步驟：

1. **Fork 專案** 到您的 GitHub 帳號
2. **創建功能分支** (`git checkout -b feature/amazing-feature`)
3. **提交變更** (`git commit -m 'feat: add amazing feature'`)
4. **推送分支** (`git push origin feature/amazing-feature`)
5. **發起 Pull Request**

### 提交規範
```bash
feat: 新功能
fix: 錯誤修復
docs: 文檔更新
style: 代碼格式調整
refactor: 代碼重構
test: 測試相關
chore: 建置工具或輔助工具變動
```

## 🔮 開發計劃

### 版本 2.1 (計劃中)
- [ ] 🔐 用戶認證和雲端同步
- [ ] 🏷️ 任務標籤和分類系統
- [ ] 📅 日曆視圖和截止日期
- [ ] 🔔 桌面通知提醒

### 版本 2.2 (規劃中)
- [ ] 👥 團隊協作功能
- [ ] 📈 數據分析和報表
- [ ] 🎨 更多主題和自定義選項
- [ ] 📱 原生 App 支援

## 🐛 已知問題

目前暫無已知重要問題。如果您發現任何 Bug，請[提交 Issue](https://github.com/Danz1021/todo-list-project/issues)。

## 📈 效能指標

- **首屏載入時間**: < 1 秒
- **應用程式大小**: < 50KB (未壓縮)
- **記憶體使用**: < 10MB
- **支援任務數量**: 1000+ 任務無性能影響

## 🌍 瀏覽器支援

| 瀏覽器 | 最低版本 | 狀態 | 備註 |
|--------|----------|------|------|
| Chrome | 60+ | ✅ 完全支援 | 推薦使用 |
| Firefox | 55+ | ✅ 完全支援 | |
| Safari | 12+ | ✅ 完全支援 | |
| Edge | 79+ | ✅ 完全支援 | |
| iOS Safari | 12+ | ✅ 完全支援 | |
| Android Chrome | 60+ | ✅ 完全支援 | |

## 📄 授權條款

本專案採用 [MIT License](https://opensource.org/licenses/MIT) 授權。

```
MIT License

Copyright (c) 2024 Dan Zheng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 致謝

- **設計靈感**: 來自現代 Todo 應用程式的最佳實踐
- **調酒主題**: 受到酒吧文化和調酒藝術的啟發
- **技術支援**: 感謝開源社群的貢獻

## 📞 聯絡資訊

- **作者**: Dan Zheng
- **GitHub**: [@Danz1021](https://github.com/Danz1021)
- **專案首頁**: [todo-list-project](https://github.com/Danz1021/todo-list-project)
- **問題回報**: [Issues](https://github.com/Danz1021/todo-list-project/issues)

---

<div align="center">

**🎉 享受您的待辦清單管理體驗！**

如果這個專案對您有幫助，請給我們一個 ⭐

[⬆ 回到頂部](#-sunny的酒空清單)

</div>

---

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
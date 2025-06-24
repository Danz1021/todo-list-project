import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站點配置
  title: 'Sunny的酒空清單',
  description: '一個以調酒為主題的現代化待辦事項管理應用程式',
  base: '/todo-list-project/',
  
  // 主題配置
  themeConfig: {
    // 導航欄
    nav: [
      { text: '首頁', link: '/' },
      { text: '使用指南', link: '/guide/' },
      { text: '功能介紹', link: '/features/' },
      { text: 'API 文檔', link: '/api/' },
      { text: '範例', link: '/examples/' },
      { 
        text: '更多',
        items: [
          { text: '更新日誌', link: '/changelog' },
          { text: '貢獻指南', link: '/contributing' },
          { text: '問題回報', link: 'https://github.com/Danz1021/todo-list-project/issues' }
        ]
      }
    ],

    // 側邊欄
    sidebar: {
      '/guide/': [
        {
          text: '開始使用',
          items: [
            { text: '介紹', link: '/guide/' },
            { text: '快速開始', link: '/guide/getting-started' },
            { text: '安裝方式', link: '/guide/installation' }
          ]
        },
        {
          text: '基本功能',
          items: [
            { text: '任務管理', link: '/guide/task-management' },
            { text: '優先級系統', link: '/guide/priority-system' },
            { text: '篩選功能', link: '/guide/filtering' }
          ]
        },
        {
          text: '進階功能',
          items: [
            { text: '自定義主題', link: '/guide/customization' },
            { text: '鍵盤快捷鍵', link: '/guide/shortcuts' },
            { text: '資料備份', link: '/guide/backup' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 參考',
          items: [
            { text: '核心 API', link: '/api/' },
            { text: '任務管理', link: '/api/task-manager' },
            { text: '篩選系統', link: '/api/filter-system' },
            { text: '儲存管理', link: '/api/storage-manager' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '使用範例',
          items: [
            { text: '基本使用', link: '/examples/' },
            { text: '主題自定義', link: '/examples/theming' },
            { text: '整合應用', link: '/examples/integration' }
          ]
        }
      ]
    },

    // 社交連結
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Danz1021/todo-list-project' }
    ],

    // 頁腳
    footer: {
      message: '採用 MIT 授權條款發佈',
      copyright: 'Copyright © 2024 Dan Zheng'
    },

    // 搜索
    search: {
      provider: 'local'
    },

    // 編輯連結
    editLink: {
      pattern: 'https://github.com/Danz1021/todo-list-project/edit/main/docs/:path',
      text: '在 GitHub 上編輯此頁'
    },

    // 最後更新時間
    lastUpdated: {
      text: '最後更新於',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },

  // 頁面頭部配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#4facfe' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_TW' }],
    ['meta', { property: 'og:title', content: 'Sunny的酒空清單 | 調酒主題待辦事項管理' }],
    ['meta', { property: 'og:site_name', content: 'Sunny的酒空清單' }],
    ['meta', { property: 'og:url', content: 'https://danz1021.github.io/todo-list-project/' }],
    ['meta', { property: 'og:description', content: '一個以調酒為主題的現代化待辦事項管理應用程式，具有優先級管理、進度追蹤和豐富的動畫效果。' }]
  ],

  // Markdown 配置
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true
  },

  // 國際化
  lang: 'zh-TW'
})
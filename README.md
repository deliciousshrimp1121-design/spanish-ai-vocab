# 🇪🇸 AI 西班牙文單字學習站

功能：
- AI 每次產生 10～20 個全新西班牙文單字
- 送出既有單字給 AI，並在伺服器端再次去重
- 西文 → 台灣繁體中文
- 西文例句
- 瀏覽器西文發音
- 單字卡
- 測驗模式
- 學習進度
- localStorage 自動保存已學單字與單字庫
- 可手動新增／修改／刪除

## 啟動
1. 安裝 Node.js。
2. 在本資料夾執行 `npm install`
3. 設定環境變數 `GEMINI_API_KEY`
4. 執行 `npm start`
5. 用瀏覽器開啟 `http://localhost:3000`

macOS / Linux：
`export GEMINI_API_KEY="你的 API Key"`

Windows PowerShell：
`$env:GEMINI_API_KEY="你的 API Key"`

API Key 只放在伺服器環境變數，不要寫進 index.html。

## 重要
目前這個版本會在你按「AI 產生今日 10～20 字」時生成。若要「即使你沒開網站，每天也自動生成」，需要部署到有排程工作的雲端主機，再讓排程呼叫生成 API；同時需要把單字庫從瀏覽器 localStorage 改成雲端資料庫，才能做到真正永久累積。

Google Gemini API 目前有部分模型提供免費層，但額度、模型與政策可能變動，不能保證永久免費。

# OpenCode 完整使用教學與實務指南

> 更新日期：2026-08-26  


---

# 1. OpenCode 是什麼？

OpenCode 是一套 **開源 AI Coding Agent（AI 程式開發代理）**。

它與一般 ChatGPT 最大的差異是：

一般 ChatGPT 通常是：

```text
你貼程式碼
↓
AI 回答
↓
你自己修改檔案
```

OpenCode 則可以：

```text
讀取整個專案
↓
分析檔案
↓
搜尋程式碼
↓
修改檔案
↓
建立新檔
↓
執行 Terminal 指令
↓
安裝套件
↓
執行測試
↓
查看錯誤
↓
繼續修正
```

也就是：

```text
ChatGPT
比較像程式設計顧問

OpenCode
比較像直接坐在你 VS Code 旁邊工作的 AI 工程師
```

OpenCode 官方目前提供 Terminal TUI、桌面應用程式與 IDE 整合等使用方式。

---

# 2. OpenCode 可以做什麼？

常見用途包括：

- 解釋既有程式碼
- 尋找 Bug
- 修改程式
- 建立新功能
- 重構程式碼
- 建立元件
- 建立 API
- 安裝 npm 套件
- 執行測試
- 分析 Git 專案
- 撰寫技術文件
- 建立測試
- 搜尋整個 Codebase
- 透過 MCP 連接外部工具
- 呼叫不同 AI 模型
- 建立專用 Agent

例如 Vue 專案可以直接要求：

```text
幫我分析這個 Vue 專案的架構。
```

或者：

```text
幫我新增商品管理頁面。

需求：
1. 使用 Vue 3 Options API
2. 使用 fetch 呼叫 /api/products
3. 可以新增商品
4. 可以修改商品
5. 可以刪除商品
6. 不要修改其他頁面
```

OpenCode 不只會回答你「怎麼做」，還可以直接修改專案。

---

# 3. OpenCode 基本架構

可以把 OpenCode 想像成：

```text
你的專案
   │
   ▼
OpenCode
   │
   ├── Read
   ├── Edit
   ├── Bash
   ├── Grep
   ├── Glob
   ├── LSP
   ├── Web
   ├── MCP
   │
   ▼
AI Model
```

AI Model 可以來自不同供應商，例如：

```text
OpenAI
Anthropic
Google
OpenRouter
OpenCode Zen
Ollama
LM Studio
其他 OpenAI Compatible API
```

OpenCode 官方目前透過 AI SDK 與 Models.dev 支援 **75+ LLM providers**，也支援本機模型。

因此：

```text
OpenCode ≠ AI 模型
```

比較正確的觀念是：

```text
OpenCode = AI 開發環境 / Coding Agent

GPT
Claude
Gemini
Qwen
...

= OpenCode 背後使用的 AI 模型
```

---

# 4. Windows 安裝 OpenCode

OpenCode 官方目前在 Windows 上特別推薦 **WSL**，因為功能相容性與效能較完整；但也能直接透過 NPM、Chocolatey 或 Scoop 安裝。

如果平常就在 Windows + VS Code + Node.js 環境開發，我會建議先使用最簡單的：

```bash
npm install -g opencode-ai
```

---

# 5. 確認 Node.js

先開啟：

```text
PowerShell
```

或：

```text
VS Code Terminal
```

輸入：

```bash
node -v
```

再輸入：

```bash
npm -v
```

如果都有版本號，就可以使用 NPM 安裝 OpenCode。

例如：

```text
v24.x.x
11.x.x
```

---

# 6. 安裝 OpenCode

執行：

```bash
npm install -g opencode-ai
```

官方目前也提供：

```bash
choco install opencode
```

或：

```bash
scoop install opencode
```

以及 Docker、Mise 等方式。

安裝完成可以測試：

```bash
opencode
```

如果成功，就會進入 OpenCode 的 TUI。

---

# 7. OpenCode TUI 是什麼？

TUI 是：

```text
Terminal User Interface
```

也就是：

```text
終端機使用者介面
```

它不是傳統：

```text
C:\>
```

那種單純命令列。

OpenCode 在 Terminal 裡會建立完整的互動介面。

基本啟動：

```bash
opencode
```

也可以直接指定專案：

```bash
opencode C:\projects\my-vue-project
```

官方支援：

```bash
opencode [project]
```

指定 OpenCode 的工作目錄。

---

# 8. 最推薦的啟動方式

如果專案為：

```text
D:\vue\shopping-cart
```

不要在：

```text
C:\
```

直接執行 OpenCode。

應該：

```bash
cd D:\vue\shopping-cart
```

然後：

```bash
opencode
```

因此 OpenCode 的 Workspace 就會是：

```text
shopping-cart
```

這非常重要。

否則 AI 可能會看錯資料夾，開始研究一些你根本沒打算讓它研究的東西。AI 很努力，但工作目錄選錯時，努力方向也會跟著歪掉。

---

# 9. 第一次啟動：連接 AI

進入 OpenCode 後輸入：

```text
/connect
```

這個指令用來設定 AI Provider。

畫面會列出不同供應商，例如：

```text
OpenAI
OpenCode Zen
OpenRouter
Google
...
```

---

# 10. 使用 OpenAI / GPT

如果選：

```text
OpenAI
```

目前 OpenCode 官方支援兩種主要方式：

```text
ChatGPT Plus/Pro

Manually enter API Key
```

官方文件表示，使用 ChatGPT Plus / Pro 選項時，OpenCode 會開啟瀏覽器進行 OpenAI 身分驗證；完成後可透過 `/models` 查看可使用的 OpenAI 模型。

流程：

```text
/connect
```

選：

```text
OpenAI
```

再選：

```text
ChatGPT Plus/Pro
```

瀏覽器登入後回到 OpenCode。

---

# 11. ChatGPT Plus 與 API Key 不要搞混

這裡是很多人最容易混亂的地方。

## 方法 A：ChatGPT Plus / Pro OAuth

```text
OpenCode
↓
/connect
↓
OpenAI
↓
ChatGPT Plus/Pro
↓
瀏覽器登入
```

這是 OpenCode 官方目前提供的整合方式。

## 方法 B：OpenAI API Key

選：

```text
Manually enter API Key
```

然後輸入：

```text
sk-xxxxxxxx
```

這是 OpenAI Platform API。

要注意：

> ChatGPT 訂閱與 OpenAI API 是兩套不同的計費系統。

OpenAI 官方目前仍明確說明，ChatGPT 與 API Platform 的帳務是分開管理，API 使用量也會另外依 Token 計費。

所以不能單純理解成：

```text
我有 ChatGPT Plus
=
我的 OpenAI API 免費
```

這是不對的。

---

# 12. 查看可使用模型

在 OpenCode 輸入：

```text
/models
```

即可開啟模型選單。

CLI 也可以：

```bash
opencode models
```

查看特定 Provider：

```bash
opencode models openai
```

更新模型清單：

```bash
opencode models --refresh
```

如果希望看到更詳細的成本、Metadata 等資訊：

```bash
opencode models --verbose
```

官方 CLI 支援上述模型查詢方式。

---

# 13. 如何切換 GPT 模型？

最簡單：

```text
/models
```

然後直接選擇。

如果之後想換模型，不必重新安裝 OpenCode，也不需要重新建立專案。

直接：

```text
/models
```

重新選即可。

因此：

```text
OpenCode
   │
   ├─ GPT
   ├─ Claude
   ├─ Gemini
   └─ 其他模型
```

模型只是 OpenCode 使用的「大腦」，OpenCode 本身則負責檔案、工具、Agent、Terminal 等工作。

---

# 14. 建議第一次進專案執行 `/init`

進入專案後輸入：

```text
/init
```

OpenCode 會分析專案並建立：

```text
AGENTS.md
```

官方也建議將專案的 `AGENTS.md` 提交到 Git，因為它能讓 OpenCode 理解專案結構與程式撰寫習慣。

例如：

```text
shopping-cart
│
├─ src
├─ public
├─ package.json
├─ vite.config.js
└─ AGENTS.md
```

---

# 15. AGENTS.md 是什麼？

可以把它理解為：

```text
這個專案給 AI 看的開發規範
```

例如：

```markdown
# Project Guidelines

## Framework

Vue 3 + Vite

## Coding Style

Use Options API.

Do not use TypeScript.

## CSS

Use Bootstrap 5.

## API

All APIs start with:

/api

## Rules

Do not modify files unrelated to the requested task.

Do not install packages unless necessary.
```

之後 OpenCode 在這個專案工作，就更容易遵守這些規則。

---

# 16. AGENTS.md 非常值得寫

如果完全沒有規則：

```text
幫我新增商品管理
```

AI 可能：

```text
改成 TypeScript
安裝 Tailwind
換掉 Router
新增 12 個套件
順便重構半個專案
```

你只是叫它買醬油，它順便把廚房翻修了。

所以專案規範非常重要。

例如 Vue 教學專案可以規定：

```markdown
# Development Rules

- Vue 3
- Vite
- JavaScript only
- Use Options API
- Use Bootstrap 5
- Use fetch instead of axios
- Do not use TypeScript
- Do not modify unrelated files
- Explain important modifications with comments
```

---

# 17. OpenCode 最重要的兩種 Agent：Plan / Build

OpenCode 內建主要 Agent：

```text
Build
Plan
```

也有：

```text
General
Explore
Scout
```

等 Subagent。

---

# 18. Plan 模式

Plan 適合：

```text
分析
規劃
設計
Code Review
研究問題
```

而不是直接大改程式。

例如：

```text
分析目前購物車架構。

先不要修改程式。

告訴我：
1. 商品資料從哪裡來
2. 購物車狀態存在哪裡
3. Router 如何設定
4. 哪些地方適合重構
```

這時非常適合 Plan。

OpenCode 官方也將 Plan 定位為分析與規劃用途，以權限限制避免不必要的修改。

---

# 19. Build 模式

Build 就是：

```text
真的做
```

例如：

```text
依照剛才的計畫開始修改。
```

OpenCode 就可以：

```text
建立檔案
修改檔案
執行 npm
執行測試
修正錯誤
```

Build 是 OpenCode 預設主要 Coding Agent。

---

# 20. Plan / Build 如何切換？

按：

```text
Tab
```

即可在主要 Agent 間切換。

推薦工作流程：

```text
需求
 ↓
Plan
 ↓
分析
 ↓
確認方向
 ↓
Build
 ↓
實作
 ↓
測試
```

大型功能非常建議這樣做。

---

# 21. 小修改不用每次 Plan

例如：

```text
把首頁標題「商城」改成「平價屋3C」。
```

這種事情直接 Build 就好了。

不需要：

```text
Plan
↓
架構研究
↓
需求分析
↓
技術評估
↓
可行性研究
↓
修改六個中文字
```

AI 也是可以不用每次都開專案會議的。

---

# 22. 使用 `@` 指定檔案

這是 OpenCode 非常實用的功能。

輸入：

```text
@
```

可以模糊搜尋目前專案中的檔案。

例如：

```text
解釋 @src/router/index.js
```

或：

```text
比較 @src/views/ProductView.vue
和
@src/components/ProductCard.vue
```

OpenCode 會把參照檔案內容加入目前上下文。

---

# 23. 為什麼最好使用 `@`？

不要只說：

```text
幫我修改商品。
```

比較好的寫法：

```text
修改 @src/views/ProductManageView.vue

需求：
1. 加入商品名稱搜尋
2. 不修改 API
3. 保留目前 Bootstrap UI
```

這樣 AI 的工作範圍清楚很多。

---

# 24. 直接執行 Terminal 指令

OpenCode TUI 中，以：

```text
!
```

開頭可以直接執行 Shell command。

例如：

```text
!npm run dev
```

```text
!git status
```

```text
!npm list
```

輸出結果會被加入目前對話上下文，因此你接著可以直接說：

```text
分析剛才的錯誤。
```

---

# 25. OpenCode 常用 Slash Commands

最常用的是：

| 指令 | 功能 |
|---|---|
| `/connect` | 連接 AI Provider |
| `/models` | 切換模型 |
| `/init` | 建立或更新 AGENTS.md |
| `/help` | 顯示說明 |
| `/new` | 新工作階段 |
| `/sessions` | 查看歷史 Session |
| `/compact` | 壓縮目前 Context |
| `/undo` | 復原上一輪修改 |
| `/redo` | 重新套用 Undo |
| `/details` | 顯示工具執行細節 |
| `/editor` | 使用外部 Editor |
| `/export` | 匯出目前工作階段 |
| `/share` | 分享工作階段 |
| `/unshare` | 停止分享 |
| `/themes` | 切換主題 |
| `/thinking` | 顯示或隱藏支援模型的推理區塊 |
| `/exit` | 離開 OpenCode |

這些指令均可在目前官方 TUI 文件找到。

---

# 26. `/undo` 非常重要

例如你輸入：

```text
重構商品頁面。
```

結果 AI 改太多。

可以：

```text
/undo
```

OpenCode 不只會撤銷對話，也會還原相關檔案修改。

官方文件指出此功能內部利用 Git 管理檔案變更，因此專案需要是 Git Repository。

這也是為什麼我強烈建議：

```bash
git init
```

再開始大量使用 AI Coding Agent。

---

# 27. OpenCode + Git 是最佳搭配

建議流程：

```bash
git init
git add .
git commit -m "initial project"
```

然後再：

```bash
opencode
```

每完成重要階段：

```bash
git add .
git commit -m "add product management"
```

這樣如果 AI 突然靈感爆棚、改了你不想改的東西，Git 就是最後一道保險。

---

# 28. OpenCode 權限系統

OpenCode 可以控制 AI 能不能：

```text
讀檔
改檔
執行 Bash
搜尋
使用 Web
呼叫 Agent
存取專案外目錄
```

目前穩定版文件中的 `permission` 支援：

```text
allow
ask
deny
```

三種狀態。

意思是：

```text
allow
直接執行

ask
先問你

deny
禁止
```

---

# 29. 建議初學者安全設定

在專案根目錄建立：

```text
opencode.json
```

例如：

```json
{
  "$schema": "https://opencode.ai/config.json",

  "permission": {
    "read": "allow",
    "edit": "ask",
    "bash": "ask",
    "webfetch": "allow"
  }
}
```

意思：

```text
讀檔
→ 可以

修改檔案
→ 要問

Terminal
→ 要問

讀網頁
→ 可以
```

這很適合剛開始學 OpenCode。

---

# 30. allow / ask / deny 如何選？

## allow

```json
"bash": "allow"
```

AI 可以直接：

```bash
npm install
npm run build
git status
```

不再問你。

效率高，但權力也大。

---

## ask

```json
"bash": "ask"
```

每次敏感操作先詢問。

建議初學者使用。

---

## deny

```json
"bash": "deny"
```

完全禁止 AI 執行 Terminal。

適合：

```text
Code Review
程式閱讀
純分析
```

---

# 31. OpenCode 預設權限其實不算保守

目前官方文件指出，如果沒有特別設定，大多數權限預設為：

```text
allow
```

而：

```text
external_directory
doom_loop
```

預設為：

```text
ask
```

`.env` 等敏感檔案也有預設讀取限制。

所以正式專案建議不要完全依賴預設值。

---

# 32. 更安全的 Git 設定範例

例如：

```json
{
  "$schema": "https://opencode.ai/config.json",

  "permission": {
    "bash": {
      "*": "ask",

      "git status*": "allow",

      "git diff*": "allow",

      "npm run*": "allow",

      "git push*": "deny"
    }
  }
}
```

意思：

```text
git status
→ 可以

git diff
→ 可以

npm run
→ 可以

git push
→ 不准
```

這種設定很實用。

因為 AI：

```text
看看 Git status
```

沒什麼問題。

但是：

```text
順手 push 到 production
```

就可能從「AI 助教」瞬間升級成「事故製造機」。

---

# 33. `--auto` 模式

新版 OpenCode CLI 也支援：

```bash
opencode --auto
```

這會自動批准原本需要 `ask` 的權限請求，但明確設定為：

```text
deny
```

的規則仍然有效。

也可以：

```bash
opencode run --auto "Refactor this module"
```

不過正式專案建議先把 permission 設定清楚，再考慮 Auto。

---

# 34. OpenCode 設定檔

核心設定檔：

```text
opencode.json
```

主要可以設定：

```text
model
provider
permission
agent
instructions
mcp
plugin
compaction
watcher
```

等等。

---

# 35. 全域設定與專案設定

OpenCode 可以有：

## 全域設定

```text
~/.config/opencode/opencode.json
```

適合：

```text
預設模型
Provider
個人權限
```

## 專案設定

```text
你的專案/opencode.json
```

適合：

```text
專案模型
專案規則
Agent
MCP
權限
```

官方文件指出專案根目錄的 `opencode.json` 具有很高的設定優先權。

---

# 36. 設定預設模型

例如：

```json
{
  "$schema": "https://opencode.ai/config.json",

  "model": "provider/model"
}
```

OpenCode 的完整模型 ID 格式為：

```text
provider_id/model_id
```

具體名稱建議先執行：

```bash
opencode models
```

查詢，而不是自己猜模型 ID。

---

# 37. 不要把 API Key 寫死

不推薦：

```json
{
  "apiKey": "sk-xxxxxxxxxxxxxxxx"
}
```

尤其這個檔案如果進 Git：

```text
恭喜，你的 API Key 準備出去環遊世界了。
```

OpenCode 支援環境變數：

```json
{
  "apiKey": "{env:OPENAI_API_KEY}"
}
```

也支援從檔案讀取：

```json
{
  "apiKey": "{file:~/.secrets/openai-key}"
}
```

官方設定文件支援 `{env:...}` 與 `{file:...}` 的變數替換方式。

---

# 38. Instructions

除了：

```text
AGENTS.md
```

也可以在：

```text
opencode.json
```

設定：

```json
{
  "$schema": "https://opencode.ai/config.json",

  "instructions": [
    "CONTRIBUTING.md",
    "docs/guidelines.md",
    ".cursor/rules/*.md"
  ]
}
```

OpenCode 會把這些檔案作為模型工作的規則來源。

因此大型專案可以做：

```text
AGENTS.md

docs/
├─ frontend-rules.md
├─ backend-rules.md
├─ api-rules.md
└─ database-rules.md
```

---

# 39. 自訂 Agent

OpenCode 可以建立自己的 AI Agent。

執行：

```bash
opencode agent create
```

官方會透過互動流程協助設定：

```text
Agent 描述
模式
Prompt
模型
可用工具
權限
儲存位置
```



---

# 40. 自訂 Code Reviewer

例如建立：

```text
.opencode/agents/reviewer.md
```

內容：

```markdown
---
description: Review code without modifying files
mode: subagent
permission:
  edit: deny
  bash: ask
---

You are a senior code reviewer.

Check:

- bugs
- security
- performance
- maintainability
- duplicated code

Do not modify files.
```

之後可以呼叫：

```text
@reviewer 幫我檢查商品管理功能。
```

OpenCode 支援將 Agent Markdown 放在：

```text
~/.config/opencode/agents/
```

或：

```text
.opencode/agents/
```

中。

---

# 41. OpenCode Subagent

目前主要內建 Subagent 包括：

```text
General
Explore
Scout
```

其中：

```text
General
→ 複雜多步驟工作

Explore
→ 快速唯讀探索 Codebase

Scout
→ 外部文件、套件與 upstream 程式碼研究
```



例如：

```text
@explore 找出整個專案有哪些地方呼叫 /api/products
```

這種工作非常適合 Explore。

---

# 42. OpenCode 與 VS Code

OpenCode 官方提供 VS Code、Cursor、Windsurf、VSCodium 等 IDE 整合。

在 VS Code Integrated Terminal 執行：

```bash
opencode
```

OpenCode 擴充功能可自動安裝；也可以從 Extension Marketplace 手動搜尋 OpenCode 安裝。

---

# 43. VS Code 快速鍵

Windows / Linux：

```text
Ctrl + Esc
```

快速開啟或聚焦 OpenCode。

新工作階段：

```text
Ctrl + Shift + Esc
```

檔案參照：

```text
Alt + Ctrl + K
```

官方 IDE 整合也能將目前選取內容或分頁提供給 OpenCode。

---

# 44. 使用 VS Code 當外部 Editor

PowerShell 可以：

```powershell
$env:EDITOR = "code --wait"
```

之後：

```text
/editor
```

或：

```text
/export
```

就會使用 VS Code。

官方 Windows PowerShell 文件提供相同設定方式。

---

# 45. OpenCode CLI 模式

OpenCode 不一定要開 TUI。

例如：

```bash
opencode run "Explain how this project works"
```

直接執行 Prompt。

適合：

```text
Shell Script
CI
自動化
快速查詢
```

---

# 46. 指定模型執行

例如：

```bash
opencode run \
  --model provider/model \
  "Review this project"
```

簡寫：

```bash
opencode run -m provider/model "Review this project"
```

模型名稱仍建議先：

```bash
opencode models
```

確認。

---

# 47. 繼續上一個 Session

可以：

```bash
opencode -c
```

其中：

```text
-c
=
--continue
```

代表繼續上一個 Session。

---

# 48. 查看 Session

```bash
opencode session list
```

例如：

```bash
opencode session list -n 10
```

顯示最近 10 個 Session。

---

# 49. 查看 AI 使用量

OpenCode 可以：

```bash
opencode stats
```

查看 Token / 成本統計。

例如：

```bash
opencode stats --days 7
```

查看最近七天。

也可以顯示模型使用狀況：

```bash
opencode stats --models 10
```

官方 CLI 提供 Session Token 與 Cost Statistics。

這對控制 AI 成本非常實用。

---

# 50. Session 匯出

```bash
opencode export
```

CLI 可匯出 Session JSON，而 TUI 的：

```text
/export
```

則可以將目前對話匯出並用 Editor 開啟。

---

# 51. Context 太長怎麼辦？

輸入：

```text
/compact
```

別名：

```text
/summarize
```

會壓縮目前 Session Context。

OpenCode 也支援自動 Compaction：

```json
{
  "$schema": "https://opencode.ai/config.json",

  "compaction": {
    "auto": true
  }
}
```

官方目前預設 `auto` 為 `true`。

---

# 52. MCP 是什麼？

MCP：

```text
Model Context Protocol
```

可以讓 OpenCode 接外部工具。

例如：

```text
資料庫
GitHub
Sentry
文件搜尋
Browser
企業內部系統
API
```

OpenCode 同時支援 Local 與 Remote MCP Server。

---

# 53. MCP 基本設定

例如：

```json
{
  "$schema": "https://opencode.ai/config.json",

  "mcp": {
    "my-mcp": {
      "type": "local",
      "command": [
        "npx",
        "-y",
        "my-mcp-command"
      ],
      "enabled": true
    }
  }
}
```

之後 AI 就可能使用這組 MCP 工具。

---

# 54. MCP 不要裝滿整台車

MCP 很強，但不是：

```text
越多越好
```

官方也特別提醒，MCP 工具會占用模型 Context；若一次啟用大量 MCP Server，Token 與上下文消耗可能快速增加。

所以比較好的做法是：

```text
需要什麼
才開什麼
```

---

# 55. 寫 Prompt 的正確方法

不好：

```text
幫我改網站
```

比較好：

```text
分析目前 Vue 專案。

我要增加會員管理頁面。

需求：

1. 路由為 /admin/members
2. 使用 Vue Options API
3. 使用 Bootstrap 5
4. 呼叫 GET /api/members
5. 可以依姓名搜尋
6. 不修改其他頁面
7. 先制定修改計畫，不要直接動程式
```

這樣 OpenCode 成功率通常高很多。

---

# 56. 推薦 Prompt 結構

可以固定使用：

```text
【任務】

【目前狀況】

【需求】

【限制】

【相關檔案】

【完成條件】
```

例如：

```text
【任務】

建立商品分類頁。

【需求】

1. URL：
/products/category/:category

2. 顯示該分類商品。

3. 無商品時顯示提示。

【限制】

Vue 3
Options API
JavaScript
Bootstrap 5
不要使用 TypeScript

【相關檔案】

@src/router/index.js
@src/views/ProductsView.vue

【完成條件】

npm run build 可以成功。
```

---

# 57. 建議 AI 每次修改完自我檢查

可以在 Prompt 最後加入：

```text
修改完成後：

1. 檢查語法錯誤
2. 執行 npm run build
3. 如果失敗先修正
4. 列出修改過的檔案
5. 說明每個修改原因
```

這比：

```text
完成了嗎？
```

可靠得多。

---

# 58. 建議大型功能使用的完整工作流

```text
① Git Commit

↓

② opencode

↓

③ Plan

↓

④ 說明需求

↓

⑤ AI 分析 Codebase

↓

⑥ 修改計畫

↓

⑦ 人工確認

↓

⑧ Tab → Build

↓

⑨ 執行修改

↓

⑩ npm run build

↓

⑪ git diff

↓

⑫ 測試功能

↓

⑬ Git Commit
```

這套流程非常適合正式開發。

---

# 59. Vue 專案例子

假設：

```text
my-shop/
│
├─ src/
│  ├─ components/
│  ├─ views/
│  ├─ router/
│  ├─ stores/
│  └─ App.vue
│
├─ package.json
├─ vite.config.js
└─ AGENTS.md
```

先：

```bash
cd my-shop
```

再：

```bash
opencode
```

然後：

```text
/init
```

---

# 60. 第一個 Prompt

Plan：

```text
分析這個 Vue 專案。

告訴我：

1. Router 架構
2. Pinia Store
3. 商品資料來源
4. API 呼叫位置
5. 購物車運作方式

先不要修改程式。
```

---

# 61. 第二個 Prompt

```text
我要增加商品後台。

路由：

/admin/products

功能：

GET
POST
PUT
DELETE

請先提出修改計畫。
```

---

# 62. 第三步

計畫沒問題後：

```text
Tab
```

切回 Build。

輸入：

```text
依照剛才的計畫開始實作。

完成後執行 npm run build。

如果有錯誤請自行修正。
```

這才是比較理想的 AI Coding Workflow。

---

# 63. OpenCode 適合哪些任務？

非常適合：

```text
新功能開發
Bug Fix
Refactor
Code Review
讀大型專案
API 串接
測試
文件
重複性修改
```

---

# 64. 哪些事情不要完全交給 AI？

例如：

```text
正式資料庫 Migration
刪除正式資料
Production 部署
Git force push
修改 Server Firewall
更換 Authentication
金流
正式環境 Secret
```

這些應該保留人工確認。

AI 可以幫忙，但不代表要把伺服器 root 密碼交出去，然後跟它說「自由發揮」。

---

# 65. OpenCode、Copilot、ChatGPT 的概念差異

| 工具 | 比較像 |
|---|---|
| ChatGPT | AI 技術顧問 |
| GitHub Copilot | AI 程式碼助手 |
| OpenCode | AI Coding Agent |
| Codex 類型工具 | AI Coding Agent |

OpenCode 的特色在於：

```text
模型選擇彈性大
+
Terminal 原生
+
開源
+
Agent
+
工具權限
+
MCP
+
可讀寫整個 Codebase
```

---

# 66. 初學者推薦設定

可以先從：

```json
{
  "$schema": "https://opencode.ai/config.json",

  "permission": {
    "read": "allow",
    "edit": "ask",
    "bash": "ask",
    "webfetch": "allow",
    "external_directory": "ask"
  },

  "watcher": {
    "ignore": [
      "node_modules/**",
      "dist/**",
      ".git/**"
    ]
  }
}
```

開始。

等熟悉之後再慢慢把：

```text
edit
bash
```

改成更細粒度的 Allow。

---

# 67. 建議 Vue 專案 AGENTS.md

```markdown
# Project Rules

## Technology

- Vue 3
- Vite
- JavaScript
- Bootstrap 5
- Pinia
- Vue Router

## Vue Style

Use Options API.

Do not use Composition API unless explicitly requested.

Do not use TypeScript.

## HTTP

Use fetch.

Do not install Axios unless explicitly requested.

## Package Management

Use npm.

Do not install packages unless necessary.

## Code Changes

Do not modify unrelated files.

Preserve the existing project architecture.

## Validation

After code changes:

1. Run npm run build.
2. Fix compile errors.
3. Report modified files.
4. Explain important changes.
```

這份其實就已經能大幅提高 OpenCode 在教學 Vue 專案上的穩定度。

---

# 68. OpenCode 最重要的觀念

不要把 OpenCode 當成：

```text
更厲害的聊天機器人
```

應該把它當：

```text
AI Pair Programmer
+
AI Junior Engineer
+
Terminal Agent
```

你負責：

```text
需求
架構
決策
驗收
```

OpenCode 負責：

```text
分析
搜尋
撰寫
修改
執行
測試
```

這樣效率最高。

---

# 69. OpenCode 新手必記指令

最重要的其實只有：

```bash
opencode
```

進入 OpenCode。

然後：

```text
/connect
```

連模型。

```text
/models
```

選模型。

```text
/init
```

初始化專案。

```text
@
```

指定檔案。

```text
!
```

執行 Terminal。

```text
Tab
```

Plan / Build 切換。

```text
/undo
```

復原 AI 修改。

```text
/sessions
```

查看 Session。

```text
/compact
```

壓縮 Context。

```text
/help
```

真的忘記時就問 OpenCode 自己。

---

# 70. 最推薦的 OpenCode 使用流程

最後把整套流程濃縮成：

```text
安裝

npm install -g opencode-ai

↓

進專案

cd my-project

↓

啟動

opencode

↓

設定 AI

/connect

↓

選模型

/models

↓

初始化

/init

↓

Plan

分析需求

↓

Build

執行修改

↓

測試

npm run build

↓

檢查

git diff

↓

提交

git commit
```

---

# 71. 結論

OpenCode 真正強大的地方不是單純「幫你產生程式碼」。

而是它可以：

```text
理解專案
+
搜尋專案
+
修改專案
+
執行指令
+
測試結果
+
繼續修正
```

因此開發方式會從：

```text
問 AI
→ Copy
→ Paste
→ 執行
→ 貼錯誤
→ 再問 AI
```

逐漸變成：

```text
描述需求
↓
AI 分析 Codebase
↓
Plan
↓
Build
↓
測試
↓
修正
↓
你負責驗收
```

如果搭配：

```text
OpenCode
+
VS Code
+
Git
+
AGENTS.md
+
Plan / Build
+
合理 Permission
```

就會形成一套相當完整的 AI 輔助軟體開發工作流。

其中最值得養成的習慣是：

> **先讓 AI 理解專案，再叫它修改；先 Plan，再 Build；重要修改前一定 Git Commit。**

這三件事情做到，OpenCode 就會比較像得力工程師，而不是拿著電鑽在 Codebase 裡自由探索的實習生。
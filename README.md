# SHITBTI / 拉屎人格测试

一个轻量、可维护、可直接部署到 GitHub Pages 的中文 H5 趣味测试项目。

## 项目特性

- 纯静态：无后端、无构建工具、无依赖安装
- 可直接在浏览器打开 `index.html` 运行
- 题库与结果文案已拆分为独立文件，便于后续在 GitHub 网页端直接改
- 默认移动端优先，按钮尺寸和版式适合手机浏览
- 已支持：复制结果文案 + 文案 A/B 版本 + 本地生成分享图（PNG 下载）

## 目录结构

```text
.
├── index.html
├── 404.html
├── README.md
├── .gitignore
├── assets
│   ├── css
│   │   └── styles.css
│   ├── img
│   │   ├── favicon.svg
│   │   └── og-placeholder.svg
│   └── js
│       ├── app.js
│       ├── questions.js
│       ├── results.js
│       └── utils.js
└── docs
    ├── PRD.md
    ├── PROJECT_STRUCTURE.md
    └── prototype-v1.html
```

## 本地查看与验收

### 方式 1：直接打开（最简单）

1. 双击 `index.html`。
2. 浏览器会直接加载页面并可完整答题。

### 方式 2：本地静态服务（推荐验收）

```bash
python3 -m http.server 8080
```

访问：`http://localhost:8080`

### 验收清单

1. 首页点击「开始测试」可进入答题流程。
2. 答完题后展示结果页。
3. 点击「复制结果文案」可复制文案。
4. 在结果页切换「版本 A / 版本 B」文案，预览内容会变化。
5. 点击「生成分享图」会下载 `shitbti-类型码.png`。

## 如何修改题库和结果

### 修改题目

- 文件：`assets/js/questions.js`
- 每道题是一个对象：
  - `title`：题目
  - `options`：选项数组
  - `score`：该选项对人格维度加分

### 修改结果文案

- 文件：`assets/js/results.js`
- 以人格代码作为 key（如 `SHIT`、`sHit`）
- 可直接修改：
  - `name`
  - `summary`
  - `description`
  - `friend`
  - `risks`
  - `tags`

### 修改文案 A/B 模板

- 文件：`assets/js/utils.js`
- 函数：`buildShareText(code, resultData, variant)`
- 你可以直接调整 A/B 两套模板风格，不影响测试计分逻辑。

### 修改分享图样式

- 文件：`assets/js/utils.js`
- 函数：`generateShareImage(resultPayload)`
- 分享图是浏览器本地 Canvas 绘制，可改颜色、排版、文字内容。

## GitHub Pages 发布（只需一次设置）

1. 把本仓库推送到你的 GitHub 仓库（`main` 分支）。
2. 打开 GitHub 仓库页面 → `Settings` → `Pages`。
3. 在 `Build and deployment` 中选择：
   - `Source`: **Deploy from a branch**
   - `Branch`: **main**
   - `Folder`: **/ (root)**
4. 点击 `Save`。
5. 等待几十秒到几分钟，GitHub 会给出公开访问地址。

## 维护建议

- 项目定位是娱乐测试，避免医学化表述。
- 页面保留提示：**本测试仅供娱乐，不构成任何医疗建议。**
- 当前不收集用户隐私数据，不接后端，不接登录。

## 后续可扩展点（建议）

1. 分享图增加主题皮肤（节日版）
2. 结果页视觉插画
3. 多题库版本（例如加班版、旅行版）
4. 文案 A/B 的点击率统计（未来可做匿名埋点）

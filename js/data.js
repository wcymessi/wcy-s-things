/* ============================================================
   项目数据 —— 新增项目时只需在此数组中添加一个对象
   字段：name 项目名 | desc 简介 | stack 技术栈数组
        date 完成时间 | category 类别 | image 封面图路径
   注意：数组靠前的项目显示在页面更上方（最新在前）
   ============================================================ */

const PROJECTS = [
  {
    name: "TaskFlow 任务管理应用",
    desc: "一款面向个人的轻量任务管理工具，支持任务分组、优先级标记与拖拽排序，数据本地持久化，界面遵循简洁高效的设计原则。",
    stack: ["Vue 3", "TypeScript", "LocalStorage"],
    date: "2026.05",
    category: "Web 应用",
    image: "assets/images/project-1.png"
  },
  {
    name: "校园二手交易平台",
    desc: "面向高校学生的二手物品交易网站，包含商品发布、搜索筛选、站内私信与订单管理模块，采用响应式设计适配移动端使用场景。",
    stack: ["HTML/CSS", "JavaScript", "Node.js", "MySQL"],
    date: "2025.12",
    category: "全栈项目",
    image: "assets/images/project-2.png"
  },
  {
    name: "数据可视化大屏",
    desc: "为课程实验开发的实时数据可视化看板，通过 WebSocket 接收数据并动态渲染折线、柱状与地图图表，支持主题切换与自适应布局。",
    stack: ["ECharts", "JavaScript", "WebSocket"],
    date: "2025.09",
    category: "数据可视化",
    image: "assets/images/project-3.png"
  },
  {
    name: "Markdown 个人博客系统",
    desc: "从零实现的静态博客生成器，支持 Markdown 写作、代码高亮、标签归档与 RSS 输出，构建产物纯静态、部署零成本。",
    stack: ["Node.js", "Markdown", "EJS"],
    date: "2025.06",
    category: "工具 / 博客",
    image: "assets/images/project-4.png"
  }
];

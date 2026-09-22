/* ============================================================
   小王 · 个人作品集脚本
   1. 深浅色主题：读取 localStorage 并立即应用，切换后写入记忆
   2. PROJECTS 项目数据：新增项目只需在此数组中添加一个对象
   3. 渲染项目列表 / 导航滚动高亮 / 移动端折叠导航
   ============================================================ */

/* ---------- 深浅色主题 ---------- */
const THEME_KEY = "portfolio-theme";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

/* 读取上次选择；无记录或存储不可用时使用浅色 */
function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === THEME_DARK ? THEME_DARK : THEME_LIGHT;
  } catch (err) {
    return THEME_LIGHT;
  }
}

const savedTheme = readSavedTheme();

/* 本脚本在 body 末尾同步执行，此处设置主题可在首次绘制前生效，避免刷新闪烁 */
document.documentElement.setAttribute("data-theme", savedTheme);

/* ---------- 主题切换按钮 ---------- */
function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const syncToggle = theme => {
    const isDark = theme === THEME_DARK;
    const label = isDark ? "切换为浅色主题" : "切换为深色主题";
    toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  };

  syncToggle(savedTheme);

  toggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === THEME_DARK
      ? THEME_LIGHT
      : THEME_DARK;

    document.documentElement.setAttribute("data-theme", next);

    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (err) {
      /* 隐私模式等存储不可用时，主题仅在本次会话内生效 */
    }

    syncToggle(next);
  });
}

/* ---------- 项目数据 ----------
   字段：name 项目名 | desc 简介 | stack 技术栈数组
        date 完成时间 | category 类别 | image 封面图路径
   数组越靠前显示越靠上（最新在前）；
   新增项目：复制一个对象，修改内容并补充图片到 assets/images 即可 */
const PROJECTS = [
  {
    name: "课语通",
    desc: "基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    stack: ["Python", "FastAPI", "RAG", "向量检索", "LLM API", "Streamlit"],
    date: "2026.07",
    category: "AI 应用",
    image: "assets/images/project-4.png"
  },
  {
    name: "城市脉搏",
    desc: "城市实时交通与天气数据可视化大屏，集中展示交通、天气和城市运行信息。项目通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏展示。",
    stack: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    date: "2026.03",
    category: "数据可视化",
    image: "assets/images/project-3.png"
  },
  {
    name: "拾光集市",
    desc: "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    stack: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    date: "2025.09",
    category: "Web 应用",
    image: "assets/images/project-2.png"
  },
  {
    name: "轻记账",
    desc: "面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。支持语音快捷记账、月度收支统计和预算提醒，使用微信云开发完成数据存储与后端能力。",
    stack: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    date: "2025.04",
    category: "移动应用",
    image: "assets/images/project-1.png"
  }
];

/* ---------- 渲染项目列表 ---------- */
function renderProjects() {
  const list = document.getElementById("projectList");
  if (!list) return;

  list.innerHTML = PROJECTS.map((p, i) => {
    const no = String(i + 1).padStart(2, "0");
    const stack = p.stack.map(s => `<li>${s}</li>`).join("");
    return `
      <article class="project">
        <figure class="project-figure">
          <img src="${p.image}" alt="${p.name} 预览图" loading="lazy" />
          <figcaption>${p.date}</figcaption>
        </figure>
        <div class="project-body">
          <span class="project-no" aria-hidden="true">${no}</span>
          <div class="project-meta">
            <span class="project-cat">${p.category}</span>
            <span>${p.date}</span>
          </div>
          <h3 class="project-name">${p.name}</h3>
          <p class="project-desc">${p.desc}</p>
          <ul class="project-stack">${stack}</ul>
        </div>
      </article>
    `;
  }).join("");
}

/* ---------- 导航滚动高亮（scroll spy） ---------- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  if (!links.length || !("IntersectionObserver" in window)) return;

  const map = new Map();
  links.forEach(link => {
    const section = document.getElementById(link.dataset.target);
    if (section) map.set(section, link);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = map.get(entry.target);
        links.forEach(l => l.classList.toggle("is-active", l === link));
      }
    });
  }, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  });

  map.forEach((_, section) => observer.observe(section));
}

/* ---------- 移动端折叠导航 ---------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // 点击导航项后自动收起
  nav.addEventListener("click", e => {
    if (e.target.closest(".nav-link")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- 初始化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initScrollSpy();
  initMobileNav();
  initThemeToggle();
});

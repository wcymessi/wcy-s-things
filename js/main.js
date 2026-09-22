/* ============================================================
   页面逻辑：渲染项目列表 / 导航滚动高亮 / 入场动效
   ============================================================ */

/* ---------- 渲染项目列表 ---------- */
function renderProjects() {
  const list = document.getElementById("projectList");
  if (!list || typeof PROJECTS === "undefined") return;

  list.innerHTML = PROJECTS.map((p, i) => {
    const no = String(i + 1).padStart(2, "0");
    const stack = p.stack.map(s => `<li>${s}</li>`).join("");
    return `
      <article class="project reveal">
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
  if (!links.length) return;

  const map = new Map();
  links.forEach(link => {
    const section = document.getElementById(link.dataset.target);
    if (section) map.set(section, link);
  });

  const setActive = link => {
    links.forEach(l => l.classList.toggle("is-active", l === link));
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(map.get(entry.target));
    });
  }, {
    rootMargin: "-35% 0px -55% 0px", // 视口中部区域触发
    threshold: 0
  });

  map.forEach((_, section) => observer.observe(section));

  // 点击导航立即高亮（避免锚点跳转过程中高亮滞后）
  links.forEach(link => {
    link.addEventListener("click", () => setActive(link));
  });
}

/* ---------- 入场动效 ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  items.forEach(el => observer.observe(el));
}

/* ---------- 初始化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initScrollSpy();
  initReveal();
});

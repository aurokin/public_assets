const fillVertical = document.getElementById('progressFill');
const article      = document.getElementById('article');

function update() {
  const rect = article.getBoundingClientRect();
  const total = article.offsetHeight - window.innerHeight;
  const scrolled = -rect.top;
  let pct = total > 0 ? (scrolled / total) * 100 : 0;
  pct = Math.max(0, Math.min(100, pct));
  fillVertical.style.height = pct + '%';
}

let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => { update(); ticking = false; });
    ticking = true;
  }
}
document.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', update);
update();

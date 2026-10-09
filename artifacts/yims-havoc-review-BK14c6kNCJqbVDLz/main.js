'use strict';
(() => {
  const details = document.querySelector('#source-details');
  const controls = document.querySelectorAll('.enhanced');
  controls.forEach(control => { control.hidden = false; });
  details.open = false;
  const openSource = hash => {
    if (hash.startsWith('#source-') && hash !== '#source-details') details.open = true;
  };
  openSource(location.hash);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#source-"]');
    if (link) openSource(link.getAttribute('href'));
  });
  window.addEventListener('hashchange', () => openSource(location.hash));
  const buttons = document.querySelectorAll('[data-sequence]');
  const actual = document.querySelector('#sequence-actual');
  const suggested = document.querySelector('#sequence-suggested');
  suggested.hidden = true;
  buttons.forEach(button => button.addEventListener('click', () => {
    const showActual = button.dataset.sequence === 'actual';
    actual.hidden = !showActual;
    suggested.hidden = showActual;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
  const status = document.querySelector('#action-status');
  const copy = async (text, success) => {
    try { await navigator.clipboard.writeText(text); status.textContent = success; }
    catch { status.textContent = 'Copy is unavailable here. Select the text or use your browser to copy the address.'; }
  };
  document.querySelector('#copy-plan').addEventListener('click', () => {
    const text = Array.from(document.querySelectorAll('.plan-copy > p:not(.status)')).map(p => p.textContent).join('\n\n');
    copy(text, 'Practice plan copied.');
  });
  document.querySelector('#share').addEventListener('click', () => copy(location.href.split('#')[0], 'Guide link copied.'));
  document.querySelector('#print').addEventListener('click', () => window.print());
  let wasOpen;
  window.addEventListener('beforeprint', () => { wasOpen = details.open; details.open = true; });
  window.addEventListener('afterprint', () => { if (wasOpen !== undefined) details.open = wasOpen; });
})();

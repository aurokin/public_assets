'use strict';
// Progressive enhancement only. The recorded evidence remains in the HTML.
document.documentElement.classList.add('js');
const answers = {
  heart: {kicker: 'The recorded input', text: '<strong>Heart Strike happened here.</strong> It reached the boss, but ten-Debt Marrowrend belongs above ordinary filler outside Gift when no higher priority intervenes.'},
  marrow: {kicker: 'Recommended, not a recorded cast', text: '<strong>Cash the ten Debt with Marrowrend.</strong> Two runes were available. High bones did not remove the offensive cash-out.'},
  death: {kicker: 'Keep the spender for a reason', text: '<strong>Recovery or RP pressure can come first.</strong> Full HP and 49.7 RP do not establish that urgency here. The four later Death Strikes are legitimate spending context, not four errors.'}
};
const choiceButtons = [...document.querySelectorAll('[data-choice]')];
choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const answer = answers[button.dataset.choice];
    choiceButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    document.getElementById('answer-kicker').textContent = answer.kicker;
    document.getElementById('answer-text').innerHTML = answer.text;
  });
});
const chartButtons = [...document.querySelectorAll('[data-view]')];
chartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const bossOnly = button.dataset.view === 'boss';
    document.querySelector('.comparison').classList.toggle('boss-only', bossOnly);
    chartButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    document.querySelectorAll('.bar-value').forEach(value => {
      value.textContent = bossOnly ? value.dataset.boss : value.dataset.total;
    });
    document.getElementById('chart-takeaway').textContent = bossOnly
      ? 'Both dealt 9.31M to Melidrussa. The boss gap nearly disappears.'
      : 'Nearly equal boss damage. Different whelp exposure.';
  });
});
// Open the native source disclosure before a citation fragment is scrolled to.
function revealSource(hash) {
  if (/^#s\d+$/.test(hash)) {
    document.getElementById('sources').open = true;
  }
}
document.addEventListener('click', event => {
  const anchor = event.target.closest('a[href^="#s"]');
  if (anchor) revealSource(anchor.getAttribute('href'));
});
window.addEventListener('hashchange', () => revealSource(location.hash));
revealSource(location.hash);
// Print the complete field guide, even if native disclosures were closed.
let printState = [];
window.addEventListener('beforeprint', () => {
  printState = [...document.querySelectorAll('details')].map(element => [element, element.open]);
  printState.forEach(([element]) => { element.open = true; });
});
window.addEventListener('afterprint', () => {
  printState.forEach(([element, wasOpen]) => { element.open = wasOpen; });
});

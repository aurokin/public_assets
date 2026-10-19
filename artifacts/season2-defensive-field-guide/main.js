/* Progressive enhancement only. All guide prose lives in the HTML. */
(() => {
  'use strict';
  const form = document.querySelector('#guide-filters');
  const select = document.querySelector('#dungeon-select');
  const search = document.querySelector('#mechanic-search');
  const status = document.querySelector('#results-status');
  const empty = document.querySelector('#no-results');
  const reset = document.querySelector('#clear-filters');
  const toggle = document.querySelector('#toggle-notes');
  const sections = [...document.querySelectorAll('.dungeon')];
  const cards = [...document.querySelectorAll('.decision')];
  const notes = [...document.querySelectorAll('.full-notes')];
  const jumpLinks = [...document.querySelectorAll('.jump-nav a')];
  if (!form || !select || !search || !status || !empty || !reset || !toggle) return;

  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const text = new Map(cards.map(card => [card, normalize(card.textContent)]));
  function updateToggle() {
    const allOpen = notes.every(note => note.open);
    toggle.textContent = allOpen ? 'Collapse comparisons' : 'Expand comparisons';
    toggle.setAttribute('aria-pressed', String(allOpen));
  }
  function filter() {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let count = 0;
    let dungeonCount = 0;
    for (const section of sections) {
      let sectionCount = 0;
      for (const card of section.querySelectorAll('.decision')) {
        const matchesDungeon = select.value === 'all' || card.dataset.dungeon === select.value;
        const matchesSearch = terms.every(term => text.get(card).includes(term));
        card.hidden = !(matchesDungeon && matchesSearch);
        if (!card.hidden) sectionCount++;
      }
      section.hidden = sectionCount === 0;
      count += sectionCount;
      if (sectionCount) dungeonCount++;
    }
    const selected = select.selectedOptions[0].textContent;
    status.textContent = `Showing ${count} of ${cards.length} decisions ${select.value === 'all' ? `in ${dungeonCount} ${dungeonCount === 1 ? 'dungeon' : 'dungeons'}` : `in ${selected}`}${search.value.trim() ? ` matching "${search.value.trim()}"` : ''}.`;
    empty.hidden = count !== 0;
    for (const link of jumpLinks) {
      if (link.hash.slice(1) === select.value) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }

  // A pasted dungeon, card or source fragment must never land in hidden content.
  function revealHash(hash, focusTarget = false) {
    let id;
    try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch { return; }
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const section = target.closest('.dungeon');
    if (section) {
      select.value = section.dataset.dungeon;
      search.value = '';
      filter();
    }
    if (target.matches('details')) target.open = true;
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
      if (parent.matches('details')) parent.open = true;
    }
    const card = target.closest('.decision');
    const focusHeading = card ? card.querySelector('h3') : section?.querySelector('h2');
    const focusNode = focusHeading || (target.matches('details') ? target.querySelector('summary') : target);
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
      if (focusTarget && focusNode) {
        if (!focusNode.matches('summary, a, button, input, select')) focusNode.setAttribute('tabindex', '-1');
        focusNode.focus({ preventScroll: true });
      }
    });
  }

  form.addEventListener('submit', event => event.preventDefault());
  select.addEventListener('change', filter);
  search.addEventListener('input', filter);
  reset.addEventListener('click', () => {
    select.value = 'all';
    search.value = '';
    filter();
    search.focus();
  });
  toggle.addEventListener('click', () => {
    const open = !notes.every(note => note.open);
    notes.forEach(note => { note.open = open; });
    updateToggle();
  });
  notes.forEach(note => note.addEventListener('toggle', updateToggle));
  // Handle repeated clicks on the current fragment too, without consuming native links.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      revealHash(link.hash, true);
    }
  });
  window.addEventListener('hashchange', () => revealHash(location.hash, true));

  // CSS also expands native disclosures for true no-JS print. Save screen state.
  let printState;
  window.addEventListener('beforeprint', () => {
    printState = [...document.querySelectorAll('details')].map(note => [note, note.open]);
    printState.forEach(([note]) => { note.open = true; });
  });
  window.addEventListener('afterprint', () => {
    if (!printState) return;
    printState.forEach(([note, open]) => { note.open = open; });
    printState = undefined;
    updateToggle();
  });

  filter();
  updateToggle();
  document.documentElement.dataset.enhanced = 'true';
  form.hidden = false;
  revealHash(location.hash);
})();

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

/* Local, keyboard- and touch-accessible entity cards. No remote widget. */
(() => {
  'use strict';
  const buttons = [...document.querySelectorAll('.entity-chip[popovertarget]')];
  if (!buttons.length) return;
  const nativePopover = typeof HTMLElement.prototype.showPopover === 'function';
  let active = null;
  let restoringFocus = false;
  let closeTimer;
  let frame;

  function cancelClose() { clearTimeout(closeTimer); }
  function position() {
    if (!active) return;
    const { button, panel } = active;
    if (!button.isConnected || button.closest('[hidden]')) { close(); return; }
    const rect = button.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) { close(); return; }
    const box = panel.getBoundingClientRect();
    const gap = 9;
    const left = Math.max(gap, Math.min(rect.left, innerWidth - box.width - gap));
    const below = rect.bottom + gap;
    const above = rect.top - box.height - gap;
    const preferred = below + box.height <= innerHeight - gap || above < gap ? below : above;
    const top = Math.max(gap, Math.min(preferred, innerHeight - box.height - gap));
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }
  function close(restoreFocus = false) {
    cancelClose();
    if (!active) return;
    const { button, panel } = active;
    active = null;
    button.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-fallback-open');
    // hidePopover itself can synchronously restore invoker focus. Guard the
    // native hide as well as our explicit focus, or focusin reopens the card.
    restoringFocus = true;
    try {
      if (nativePopover && panel.matches(':popover-open')) panel.hidePopover();
      if (restoreFocus && button.isConnected && !button.closest('[hidden]')) button.focus({ preventScroll: true });
    } finally {
      restoringFocus = false;
    }
  }
  function open(button, pinned = false) {
    cancelClose();
    const panel = document.getElementById(button.getAttribute('popovertarget'));
    if (!panel) return;
    if (active && active.button !== button) close();
    active = { button, panel, pinned: pinned || Boolean(active?.pinned) };
    button.setAttribute('aria-expanded', 'true');
    if (nativePopover) {
      if (!panel.matches(':popover-open')) panel.showPopover({ source: button });
    } else {
      panel.classList.add('is-fallback-open');
    }
    position();
  }
  function maybeClose() {
    cancelClose();
    closeTimer = setTimeout(() => {
      if (!active || active.pinned || active.panel.contains(document.activeElement) || active.button.contains(document.activeElement)) return;
      close();
    }, 180);
  }

  document.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse') return;
    const button = event.target.closest('.entity-chip');
    if (button) {
      if (!active?.pinned || active.button === button) open(button);
    } else if (active?.panel.contains(event.target)) cancelClose();
  });
  document.addEventListener('pointerout', event => {
    if (!active || event.pointerType !== 'mouse') return;
    const next = event.relatedTarget;
    if (active.button.contains(next) || active.panel.contains(next)) return;
    if (active.button.contains(event.target) || active.panel.contains(event.target)) maybeClose();
  });
  document.addEventListener('focusin', event => {
    if (restoringFocus) return;
    const button = event.target.closest('.entity-chip');
    if (button) open(button);
    else if (active?.panel.contains(event.target)) cancelClose();
    else close();
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('.entity-chip');
    if (button) {
      // A click pins an already-hovered card; its Wowhead link is inside.
      event.preventDefault();
      if (active?.button === button && active.pinned) close();
      else {
        open(button, true);
        if (event.detail === 0) active?.panel.querySelector('a')?.focus({ preventScroll: true });
      }
      return;
    }
    if (event.target.closest('.entity-close')) {
      event.preventDefault();
      close(true);
    } else if (active && !active.panel.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active) {
      event.preventDefault();
      close(true);
    }
  });
  for (const panel of document.querySelectorAll('.entity-popover')) {
    panel.addEventListener('toggle', event => {
      if (event.newState === 'closed' && active?.panel === panel) {
        active.button.setAttribute('aria-expanded', 'false');
        active = null;
      }
    });
  }
  window.addEventListener('resize', position);
  document.addEventListener('scroll', event => {
    if (!active || active.panel.contains(event.target)) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(position);
  }, true);
  document.querySelector('#guide-filters')?.addEventListener('input', () => close());
  document.querySelector('#guide-filters')?.addEventListener('change', () => close());
  window.addEventListener('beforeprint', () => close());
  document.documentElement.dataset.entityCards = 'true';
})();

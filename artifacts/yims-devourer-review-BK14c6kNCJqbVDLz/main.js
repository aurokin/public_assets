'use strict';
(() => {
  const recorded = document.getElementById('recorded');
  const suggested = document.getElementById('suggested');
  const recordedButton = document.getElementById('recorded-button');
  const suggestedButton = document.getElementById('suggested-button');
  const status = document.getElementById('tool-status');
  const sources = document.getElementById('sources');
  const setSequence = (showSuggested) => {
    recorded.hidden = showSuggested;
    suggested.hidden = !showSuggested;
    recordedButton.setAttribute('aria-pressed', String(!showSuggested));
    suggestedButton.setAttribute('aria-pressed', String(showSuggested));
  };
  recordedButton.addEventListener('click', () => setSequence(false));
  suggestedButton.addEventListener('click', () => setSequence(true));
  setSequence(false);
  document.querySelector('.sequence-controls').hidden = false;
  document.querySelector('.plan-tools').hidden = false;
  sources.open = false;
  const revealSource = () => {
    if (location.hash.startsWith('#source-')) sources.open = true;
  };
  document.querySelectorAll('sup a').forEach(link => link.addEventListener('click', () => { sources.open = true; }));
  window.addEventListener('hashchange', revealSource);
  revealSource();
  const copy = async (text, success) => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      status.textContent = success;
    } catch (_) {
      status.textContent = 'Clipboard unavailable. Select the plan text, or copy the address from your browser.';
    }
  };
  document.getElementById('copy-plan').addEventListener('click', () => {
    const plainText = (node) => {
      const clone = node.cloneNode(true);
      clone.querySelectorAll('sup').forEach(source => source.remove());
      return clone.textContent.trim();
    };
    const cues = [...document.querySelectorAll('#plan-copy .plan-list li')]
      .map((node, index) => `${index + 1}. ${plainText(node)}`);
    const closing = document.querySelector('#plan-copy > p');
    const text = ['Yims / Devourer', ...cues, plainText(closing)].join('\n\n');
    copy(text, 'Plan copied.');
  });
  document.getElementById('share-guide').addEventListener('click', () => {
    const url = new URL(location.href);
    url.hash = 'plan';
    copy(url.href, 'Guide link copied.');
  });
  document.getElementById('print-guide').addEventListener('click', () => window.print());
  let printState = [];
  window.addEventListener('beforeprint', () => {
    printState = [...document.querySelectorAll('details')].map(node => [node, node.open]);
    printState.forEach(([node]) => { node.open = true; });
  });
  window.addEventListener('afterprint', () => {
    printState.forEach(([node, open]) => { node.open = open; });
  });
})();

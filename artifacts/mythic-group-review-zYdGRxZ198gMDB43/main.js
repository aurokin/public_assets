(() => {
  "use strict";
  const tabs = [...document.querySelectorAll("[data-player]")];
  const reviews = [...document.querySelectorAll("[data-review]")];
  const nav = document.querySelector(".player-tabs");
  const status = document.getElementById("share-status");
  const known = new Set(tabs.map(tab => tab.dataset.player));
  let active = tabs[0].dataset.player;

  function playerFromHash() {
    const fragment = location.hash.slice(1).toLowerCase();
    if (fragment === "reviews") return active;
    const player = fragment.split("-source-")[0];
    return known.has(player) ? player : tabs[0].dataset.player;
  }

  function selectPlayer(player, { writeHistory = false, focus = false } = {}) {
    if (!known.has(player)) return;
    active = player;
    for (const tab of tabs) {
      const selected = tab.dataset.player === player;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    }
    for (const review of reviews) review.hidden = review.dataset.review !== player;
    if (writeHistory && location.hash !== `#${player}`) history.pushState(null, "", `#${player}`);
    document.title = `${tabs.find(tab => tab.dataset.player === player).querySelector(".tab-name").textContent} | Mythic+ group review`;
    status.textContent = "";
  }

  function followLocation() {
    selectPlayer(playerFromHash());
    const fragment = location.hash.slice(1);
    if (fragment.includes("-source-")) {
      const target = document.getElementById(fragment);
      if (target && !target.closest("[data-review]").hidden) {
        target.closest("details").open = true;
        target.scrollIntoView({ block: "nearest" });
      }
    }
  }

  nav.setAttribute("role", "tablist");
  nav.setAttribute("aria-label", "Player reviews");
  for (const tab of tabs) {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", tab.dataset.player);
    tab.addEventListener("click", event => {
      event.preventDefault();
      selectPlayer(tab.dataset.player, { writeHistory: true });
    });
    tab.addEventListener("keydown", event => {
      const index = tabs.indexOf(tab);
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectPlayer(tabs[next].dataset.player, { writeHistory: true, focus: true });
    });
  }
  for (const review of reviews) {
    review.setAttribute("role", "tabpanel");
    review.setAttribute("aria-labelledby", `tab-${review.dataset.review}`);
    review.tabIndex = 0;
  }
  for (const link of document.querySelectorAll(".source-ref")) {
    link.addEventListener("click", () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target) target.closest("details").open = true;
    });
  }
  document.getElementById("copy-link").addEventListener("click", async () => {
    const url = new URL(location.href);
    url.hash = active;
    url.search = "";
    try {
      await navigator.clipboard.writeText(url.href);
      status.textContent = "Player link copied.";
    } catch {
      status.textContent = `Copy this address: ${url.href}`;
    }
  });
  let printState = null;
  window.addEventListener("beforeprint", () => {
    if (printState) return;
    printState = [...document.querySelectorAll("[data-review]:not([hidden]) .sources")]
      .map(details => ({ details, open: details.open }));
    for (const item of printState) item.details.open = true;
  });
  window.addEventListener("afterprint", () => {
    if (!printState) return;
    for (const item of printState) item.details.open = item.open;
    printState = null;
  });
  document.getElementById("print-review").addEventListener("click", () => window.print());
  window.addEventListener("hashchange", followLocation);
  window.addEventListener("popstate", followLocation);
  document.querySelector(".review-tools").hidden = false;
  followLocation();
})();

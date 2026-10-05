(() => {
  "use strict";
  const sources = document.querySelector(".sources");
  const status = document.getElementById("share-status");
  sources.open = false;
  function followSource() {
    const id = location.hash.slice(1);
    if (!/^source-\d+$/.test(id)) return;
    const target = document.getElementById(id);
    if (!target) return;
    sources.open = true;
    target.scrollIntoView({ block: "nearest" });
  }
  for (const link of document.querySelectorAll(".source-ref")) {
    link.addEventListener("click", () => { sources.open = true; });
  }
  window.addEventListener("hashchange", followSource);
  followSource();
  document.getElementById("copy-link").addEventListener("click", async () => {
    const url = new URL(location.href);
    url.hash = "";
    url.search = "";
    try {
      await navigator.clipboard.writeText(url.href);
      status.textContent = "Review link copied.";
    } catch {
      status.textContent = `Copy this address: ${url.href}`;
    }
  });
  let printState = null;
  window.addEventListener("beforeprint", () => {
    if (printState !== null) return;
    printState = sources.open;
    sources.open = true;
  });
  window.addEventListener("afterprint", () => {
    if (printState === null) return;
    sources.open = printState;
    printState = null;
  });
  document.getElementById("print-review").addEventListener("click", () => window.print());
  document.querySelector(".review-tools").hidden = false;
})();

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.2.6/+esm";

const statusEl = document.getElementById("status");
const contentEl = document.getElementById("content");

marked.setOptions({
  gfm: true,
  breaks: true,
});

async function loadMarkdown() {
  try {
    const response = await fetch("./crown_of_the_cosmos_cast_timing_agent_convo.md");

    if (!response.ok) {
      throw new Error(`Failed to load markdown (${response.status})`);
    }

    const markdown = await response.text();
    const html = marked.parse(markdown);

    contentEl.innerHTML = DOMPurify.sanitize(html);
    contentEl.hidden = false;
    statusEl.remove();
  } catch (error) {
    statusEl.textContent =
      "The markdown transcript could not be loaded. Use the raw markdown link above instead.";
    console.error(error);
  }
}

loadMarkdown();

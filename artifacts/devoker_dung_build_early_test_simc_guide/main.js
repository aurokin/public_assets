const scenarios = {
  one: {
    tabId: "tab-1",
    title: "1 Target: Scalecommander Single Target",
    branch: "APL branch: st_sc",
    note: "This build stays in the Scalecommander single-target list because Mass Disintegrate is talented.",
    caption: "The APL front-loads Deep Breath upkeep, burst setup, then funnels into Disintegrate and Azure Sweep.",
    priorities: [
      "Refresh Deep Breath when Strafing Run is about to fall: use Deep Breath if Strafing Run has roughly 2 GCDs or less remaining.",
      "Send Dragonrage when the target will live long enough for the burst window.",
      "Use Hover aggressively for movement and Slipstream comfort before the cast-heavy section starts.",
      "Fire Tip the Scales during Dragonrage, then cast Eternity Surge at rank 1.",
      "Cast Fire Breath at rank 1.",
      "If Mass Disintegrate stacks are up, Disintegrate the target with the shortest Bombardments debuff.",
      "Otherwise cast normal Disintegrate with chain logic, then Azure Sweep.",
      "Use Living Flame on Burnout or while moving, then Azure Strike only as the true bottom filler."
    ],
    deltas: [
      "At 1 target the Azure Strike clause is mostly dead; your cleave fillers do not matter yet.",
      "Because Mass Disintegrate is active, helper calls to the Eternity Surge list collapse to empower rank 1.",
      "Ancient Flame and Scarlet Adaptation only matter as light maintenance outside Dragonrage; they do not redefine the core branch."
    ],
    steps: [
      {
        title: "Strafing Run upkeep",
        body: "Deep Breath if the buff is about to expire.",
        tag: "upkeep",
        x: 28,
        y: 96
      },
      {
        title: "Burst gate",
        body: "Dragonrage if the target survives the window.",
        tag: "burst",
        x: 266,
        y: 44
      },
      {
        title: "Empower package",
        body: "Tip the Scales -> Eternity Surge 1 -> Fire Breath 1",
        tag: "empower",
        x: 528,
        y: 96
      },
      {
        title: "Mass Disintegrate spend",
        body: "Disintegrate the shortest Bombardments target.",
        tag: "spend",
        x: 266,
        y: 248
      },
      {
        title: "Follow-through",
        body: "Azure Sweep, then Living Flame on Burnout or movement.",
        tag: "filler",
        x: 528,
        y: 248
      }
    ],
    connectors: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4]
    ]
  },
  two: {
    tabId: "tab-2",
    title: "2 Targets: Scalecommander Cleave",
    branch: "APL branch: st_sc",
    note: "Two targets still uses the same st_sc branch, but the cleave clauses become live.",
    caption: "The branch is unchanged; the value difference is that Azure Sweep and Azure Strike now convert into real cleave.",
    priorities: [
      "Keep the same front half as 1 target: Strafing Run upkeep, Dragonrage, Hover, Tip the Scales, Eternity Surge 1, Fire Breath 1.",
      "Spend Mass Disintegrate stacks through Disintegrate into the shortest Bombardments target.",
      "Keep standard Disintegrate rolling whenever movement allows.",
      "Azure Sweep becomes materially stronger because its cleave now lands on a second target.",
      "The explicit Azure Strike clause becomes live because active_enemies is now greater than 1.",
      "Use Living Flame during Burnout or movement gaps, then Azure Strike when the branch falls through."
    ],
    deltas: [
      "The branch name does not change at 2 targets; it is still st_sc, not aoe_sc.",
      "Pyre is still not the main plan here unless another clause outside this branch enables it.",
      "The only practical difference from 1 target is that your cleave-capable fillers carry weight instead of just existing."
    ],
    steps: [
      {
        title: "Same opener",
        body: "Deep Breath upkeep -> Dragonrage -> Tip the Scales package",
        tag: "burst",
        x: 32,
        y: 96
      },
      {
        title: "Bombardments spend",
        body: "Disintegrate into the shortest Bombardments target.",
        tag: "spend",
        x: 296,
        y: 44
      },
      {
        title: "Cleave conversion",
        body: "Azure Sweep gains real second-target value.",
        tag: "cleave",
        x: 564,
        y: 96
      },
      {
        title: "Filler fallback",
        body: "Azure Strike is now a real 2-target bottom filler.",
        tag: "filler",
        x: 296,
        y: 248
      }
    ],
    connectors: [
      [0, 1],
      [1, 2],
      [2, 3]
    ]
  },
  three: {
    tabId: "tab-3",
    title: "3 Targets: Scalecommander AoE",
    branch: "APL branch: aoe_sc",
    note: "At 3 targets the APL finally flips to the dedicated AoE Scalecommander list.",
    caption: "The branch pivots away from single-target maintenance and starts preserving Mass Disintegrate value before Pyre.",
    priorities: [
      "Hover for movement if needed, then Deep Breath if Imminent Destruction and Strafing Run logic are live.",
      "Use Tip the Scales during Dragonrage, then send Dragonrage for a real AoE window.",
      "Cast Eternity Surge at rank 1, then Fire Breath at rank 1.",
      "Use Deep Breath again when Imminent Destruction wants it inside the branch.",
      "Cast Pyre only when Dragonrage is not near and Mass Disintegrate stacks are not up.",
      "Disintegrate into the shortest Bombardments debuff as the major AoE spender when Mass Disintegrate is active.",
      "Use Azure Sweep, then Living Flame if the Leaping Flames or Burnout conditions line up, then Azure Strike at the floor."
    ],
    deltas: [
      "This is the first target count where the branch itself changes: st_sc becomes aoe_sc.",
      "Pyre is still conditional, not automatic. The APL protects Mass Disintegrate windows before it commits essence to Pyre.",
      "Volatility remains talented, so the AoE Disintegrate clause can interrupt itself early when enemy count gets very high."
    ],
    steps: [
      {
        title: "AoE prep",
        body: "Hover if needed. Deep Breath if Imminent Destruction and Strafing Run want it.",
        tag: "upkeep",
        x: 20,
        y: 92
      },
      {
        title: "Burst shell",
        body: "Tip the Scales -> Dragonrage",
        tag: "burst",
        x: 250,
        y: 40
      },
      {
        title: "Empowers",
        body: "Eternity Surge 1 -> Fire Breath 1",
        tag: "empower",
        x: 470,
        y: 92
      },
      {
        title: "Pyre gate",
        body: "Pyre only if Mass Disintegrate stacks are down and timing is safe.",
        tag: "decision",
        x: 250,
        y: 248
      },
      {
        title: "AoE spend",
        body: "Disintegrate into Bombardments, then Azure Sweep.",
        tag: "spend",
        x: 470,
        y: 248
      },
      {
        title: "Floor filler",
        body: "Living Flame proc windows, then Azure Strike.",
        tag: "filler",
        x: 690,
        y: 92
      }
    ],
    connectors: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5]
    ]
  }
};

const tabButtons = Array.from(document.querySelectorAll(".tab"));
const titleEl = document.getElementById("scenario-title");
const branchEl = document.getElementById("scenario-branch");
const noteEl = document.getElementById("scenario-note");
const captionEl = document.getElementById("diagram-caption");
const prioritiesEl = document.getElementById("priority-list");
const deltasEl = document.getElementById("scenario-deltas");
const diagramFrameEl = document.getElementById("diagram-frame");

const palette = {
  upkeep: { fill: "#35515a", stroke: "#7f9ca5" },
  burst: { fill: "#6f3317", stroke: "#d59c7b" },
  empower: { fill: "#775e1f", stroke: "#d8b775" },
  spend: { fill: "#2f5b53", stroke: "#83b6a8" },
  filler: { fill: "#4a3b2c", stroke: "#cdb597" },
  cleave: { fill: "#465b66", stroke: "#9fb3be" },
  decision: { fill: "#61461f", stroke: "#d4aa6e" }
};

function renderScenario(key) {
  const scenario = scenarios[key];
  if (!scenario) return;

  tabButtons.forEach((button) => {
    const isActive = button.dataset.scenario === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  titleEl.textContent = scenario.title;
  branchEl.textContent = scenario.branch;
  noteEl.textContent = scenario.note;
  captionEl.textContent = scenario.caption;

  prioritiesEl.innerHTML = scenario.priorities
    .map((item) => `<li>${item}</li>`)
    .join("");

  deltasEl.innerHTML = scenario.deltas
    .map((item) => `<li>${item}</li>`)
    .join("");

  renderDiagram(scenario);
}

function renderDiagram(scenario) {
  const width = 960;
  const height = 380;
  const boxWidth = 200;
  const boxHeight = 92;

  const wrapSvgText = (value, maxChars = 28) => {
    const words = value.split(" ");
    const lines = [];
    let current = "";

    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (next.length > maxChars && current) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    });

    if (current) lines.push(current);
    return lines;
  };

  const boxes = scenario.steps
    .map((step) => {
      const colors = palette[step.tag] || palette.filler;
      const titleY = step.y + 32;
      const bodyLines = wrapSvgText(step.body, 28);
      const bodyY = step.y + 54;
      const bodyMarkup = bodyLines
        .map(
          (line, lineIndex) => `
            <tspan x="${step.x + 18}" dy="${lineIndex === 0 ? 0 : 16}">${line}</tspan>
          `
        )
        .join("");
      return `
        <g>
          <rect
            x="${step.x}"
            y="${step.y}"
            width="${boxWidth}"
            height="${boxHeight}"
            rx="10"
            fill="${colors.fill}"
            stroke="${colors.stroke}"
            stroke-width="2"
          />
          <text
            x="${step.x + 18}"
            y="${titleY}"
            fill="#fff7eb"
            font-family="Public Sans, sans-serif"
            font-size="18"
            font-weight="700"
          >${step.title}</text>
          <text
            x="${step.x + 18}"
            y="${bodyY}"
            fill="#e9dbca"
            font-family="Public Sans, sans-serif"
            font-size="14"
          >${bodyMarkup}</text>
        </g>
      `;
    })
    .join("");

  const arrows = scenario.connectors
    .map(([fromIndex, toIndex]) => {
      const from = scenario.steps[fromIndex];
      const to = scenario.steps[toIndex];
      const startX = from.x + boxWidth;
      const startY = from.y + boxHeight / 2;
      const endX = to.x;
      const endY = to.y + boxHeight / 2;
      const curve = Math.max(80, Math.abs(endX - startX) / 2);
      return `
        <path
          d="M ${startX} ${startY} C ${startX + curve} ${startY}, ${endX - curve} ${endY}, ${endX} ${endY}"
          fill="none"
          stroke="rgba(245, 233, 215, 0.8)"
          stroke-width="2.5"
          marker-end="url(#arrowhead)"
        />
      `;
    })
    .join("");

  diagramFrameEl.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${scenario.title} priority diagram">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="rgba(245, 233, 215, 0.8)"></path>
        </marker>
      </defs>
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="10" fill="transparent" stroke="rgba(255,255,255,0.07)"></rect>
      ${arrows}
      ${boxes}
    </svg>
  `;
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => renderScenario(button.dataset.scenario));
});

renderScenario("one");

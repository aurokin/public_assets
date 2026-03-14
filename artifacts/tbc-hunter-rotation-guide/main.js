const breakpoints = [
  {
    id: "short-french",
    name: "Short French 5:4:1:1",
    minExclusive: 2.34,
    maxInclusive: Infinity,
    band: "eWS above 2.34",
    band29: "< 1.24",
    band30: "< 1.30",
    band31: "< 1.35",
    summary: "This is the slow end of the map. Base SV lives here before larger haste effects show up."
  },
  {
    id: "french",
    name: "French 5:5:1:1",
    minExclusive: 1.95,
    maxInclusive: 2.34,
    band: "eWS 1.95 - 2.34",
    band29: "1.24 - 1.49",
    band30: "1.30 - 1.55",
    band31: "1.36 - 1.61",
    summary: "This is the standard BM baseline zone and the usual answer for medium-slow ranged haste."
  },
  {
    id: "long-french",
    name: "Long French 5:6:1:1",
    minExclusive: 1.63,
    maxInclusive: 1.95,
    band: "eWS 1.63 - 1.95",
    band29: "1.49 - 1.78",
    band30: "1.55 - 1.84",
    band31: "1.61 - 1.91",
    summary: "Hawk, DST, Bloodlust SV, and Rapid Fire SV often land here."
  },
  {
    id: "one-one",
    name: "1:1",
    minExclusive: 1.32,
    maxInclusive: 1.63,
    band: "eWS 1.32 - 1.63",
    band29: "1.78 - 2.19",
    band30: "1.84 - 2.26",
    band31: "1.91 - 2.34",
    summary: "This is the clean GCD-swing alignment zone. Bloodlust-only BM and Rapid Fire-only BM commonly hit it."
  },
  {
    id: "skipping",
    name: "Skipping 5:9:1:1",
    minExclusive: 1.1,
    maxInclusive: 1.32,
    band: "eWS 1.10 - 1.32",
    band29: "2.19 - 2.64",
    band30: "2.26 - 2.73",
    band31: "2.35 - 2.82",
    summary: "This is the classic Rapid Fire plus Hawk or Rapid Fire plus Bloodlust BM window."
  },
  {
    id: "two-three",
    name: "2:3",
    minExclusive: 0.9,
    maxInclusive: 1.1,
    band: "eWS 0.90 - 1.10",
    band29: "2.64 - 3.23",
    band30: "2.73 - 3.33",
    band31: "2.82 - 3.45",
    summary: "Very high haste. Rapid Fire plus Bloodlust plus Hawk moves BM here."
  },
  {
    id: "one-two",
    name: "1:2",
    minExclusive: 0.7,
    maxInclusive: 0.9,
    band: "eWS 0.70 - 0.90",
    band29: "3.23 - 4.15",
    band30: "3.33 - 4.28",
    band31: "3.45 - 4.43",
    summary: "This is the heavy-stack band. Fully stacked SV without Hawk often lands here."
  },
  {
    id: "two-five",
    name: "2:5",
    minExclusive: -Infinity,
    maxInclusive: 0.7,
    band: "eWS below 0.70",
    band29: "> 4.15",
    band30: "> 4.28",
    band31: "> 4.43",
    summary: "Maximum phase-1 BM stack. You are deep in the compressed end of the chart."
  }
];

const speedInput = document.getElementById("weapon-speed");
const hasteInput = document.getElementById("haste-multiplier");
const rotationName = document.getElementById("rotation-name");
const rotationBand = document.getElementById("rotation-band");
const rotationSummary = document.getElementById("rotation-summary");
const ewsValue = document.getElementById("ews-value");
const speed29Band = document.getElementById("speed-29-band");
const speed30Band = document.getElementById("speed-30-band");
const speed31Band = document.getElementById("speed-31-band");
const breakpointRows = Array.from(document.querySelectorAll("[data-rotation-id]"));

function formatNumber(value) {
  return Number(value).toFixed(2);
}

function findRotation(ews) {
  return breakpoints.find(
    (entry) => ews <= entry.maxInclusive && ews > entry.minExclusive
  );
}

function updateCalculator() {
  const speed = Number(speedInput.value);
  const haste = Number(hasteInput.value);

  if (!Number.isFinite(speed) || !Number.isFinite(haste) || speed <= 0 || haste <= 0) {
    rotationName.textContent = "Enter valid numbers";
    rotationBand.textContent = "";
    rotationSummary.textContent = "Weapon speed and total ranged haste both need to be positive values.";
    ewsValue.textContent = "—";
    speed29Band.textContent = "—";
    speed30Band.textContent = "—";
    speed31Band.textContent = "—";
    breakpointRows.forEach((row) => row.classList.remove("is-match"));
    return;
  }

  const ews = speed / haste;
  const match = findRotation(ews);

  rotationName.textContent = match.name;
  rotationBand.textContent = match.band;
  rotationSummary.textContent = match.summary;
  ewsValue.textContent = formatNumber(ews);
  speed29Band.textContent = match.band29;
  speed30Band.textContent = match.band30;
  speed31Band.textContent = match.band31;
  breakpointRows.forEach((row) => {
    row.classList.toggle("is-match", row.dataset.rotationId === match.id);
  });
}

speedInput.addEventListener("input", updateCalculator);
hasteInput.addEventListener("input", updateCalculator);

document.querySelectorAll(".preset").forEach((button) => {
  button.addEventListener("click", () => {
    hasteInput.value = button.dataset.haste;
    updateCalculator();
  });
});

updateCalculator();

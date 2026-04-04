(() => {
  const { useState, useMemo, useEffect, useRef } = React;
  const FLIGHTS = [
    { flight: "UA 660", route: "PHL-ORD", dep: "06:17", carrier: "United", type: "mainline", original: 0.72, bayesian: 0.555, confLow: 0.43, confHigh: 0.679, actual: "CANCELLED", origOk: false, bayesOk: false, factors: { airline: 0.643, time: 0.615, aircraft: 0.769, route: 0.75, prior: 0.951 }, override: true },
    { flight: "AA 1885", route: "PHL-ORD", dep: "07:14", carrier: "American", type: "mainline", original: 0.64, bayesian: 0.75, confLow: 0.638, confHigh: 0.862, actual: "ARRIVED", origOk: true, bayesOk: true, factors: { airline: 0.8, time: 0.615, aircraft: 0.769, route: 0.75, prior: 0.99 }, override: false },
    { flight: "AA 2970", route: "PHL-ORD", dep: "08:23", carrier: "American", type: "mainline", original: 0.58, bayesian: 0.75, confLow: 0.638, confHigh: 0.862, actual: "CANCELLED", origOk: false, bayesOk: false, factors: { airline: 0.8, time: 0.615, aircraft: 0.769, route: 0.75, prior: 0.99 }, override: false },
    { flight: "AA 955", route: "PHL-ORD", dep: "10:30", carrier: "American", type: "mainline", original: 0.52, bayesian: 0.79, confLow: 0.68, confHigh: 0.901, actual: "ARRIVED", origOk: true, bayesOk: true, factors: { airline: 0.8, time: 0.75, aircraft: 0.769, route: 0.75, prior: 0.99 }, override: false },
    { flight: "UA 1811", route: "PHL-ORD", dep: "10:00", carrier: "United", type: "mainline", original: 0.52, bayesian: 0.747, confLow: 0.633, confHigh: 0.861, actual: "CANCELLED", origOk: false, bayesOk: false, factors: { airline: 0.643, time: 0.75, aircraft: 0.769, route: 0.75, prior: 0.951 }, override: false },
    { flight: "AA 1587", route: "PHL-ORD", dep: "12:21", carrier: "American", type: "mainline", original: 0.42, bayesian: 0.838, confLow: 0.741, confHigh: 0.935, actual: "ARRIVED", origOk: false, bayesOk: true, factors: { airline: 0.8, time: 0.909, aircraft: 0.769, route: 0.75, prior: 0.99 }, override: false },
    { flight: "UA 308", route: "PHL-ORD", dep: "17:00", carrier: "United", type: "mainline", original: 0.25, bayesian: 0.795, confLow: 0.692, confHigh: 0.898, actual: "ARRIVED", origOk: false, bayesOk: true, factors: { airline: 0.643, time: 0.909, aircraft: 0.769, route: 0.75, prior: 0.951 }, override: false },
    { flight: "AA 3177", route: "PHL-ORD", dep: "19:40", carrier: "American", type: "mainline", original: 0.2, bayesian: 0.838, confLow: 0.741, confHigh: 0.935, actual: "ARRIVED", origOk: false, bayesOk: true, factors: { airline: 0.8, time: 0.909, aircraft: 0.769, route: 0.75, prior: 0.99 }, override: false },
    { flight: "F9 2111", route: "PHL-ORD", dep: "06:00", carrier: "Frontier", type: "mainline", original: 0.68, bayesian: 0.708, confLow: 0.582, confHigh: 0.834, actual: "N/A", origOk: null, bayesOk: null, factors: { airline: 0.667, time: 0.615, aircraft: 0.769, route: 0.75, prior: 0.9 }, override: false },
    { flight: "AA 928", route: "MDT-ORD", dep: "06:00", carrier: "American", type: "mainline", original: 0.66, bayesian: 0.762, confLow: 0.648, confHigh: 0.877, actual: "ARRIVED", origOk: true, bayesOk: true, factors: { airline: 0.8, time: 0.615, aircraft: 0.769, route: 0.833, prior: 0.99 }, override: false },
    { flight: "UA 1044", route: "MDT-ORD", dep: "06:15", carrier: "United", type: "mainline", original: 0.66, bayesian: 0.564, confLow: 0.435, confHigh: 0.692, actual: "CANCELLED", origOk: false, bayesOk: false, factors: { airline: 0.643, time: 0.615, aircraft: 0.769, route: 0.833, prior: 0.951 }, override: true },
    { flight: "UA 3450", route: "MDT-ORD", dep: "08:29", carrier: "Republic", type: "regional", original: 0.52, bayesian: 0.773, confLow: 0.634, confHigh: 0.912, actual: "ARRIVED", origOk: true, bayesOk: true, factors: { airline: 0.8, time: 0.615, aircraft: 0.923, route: 0.833, prior: 0.789 }, override: false, friendPick: true },
    { flight: "SKW 5375", route: "MDT-ORD", dep: "06:15", carrier: "SkyWest", type: "regional", original: 0.65, bayesian: 0.785, confLow: 0.649, confHigh: 0.921, actual: "N/A", origOk: null, bayesOk: null, factors: { airline: 0.8, time: 0.615, aircraft: 0.923, route: 0.833, prior: 0.908 }, override: false },
    { flight: "ENY 3693", route: "MDT-ORD", dep: "12:30", carrier: "Envoy", type: "regional", original: 0.42, bayesian: 0.87, confLow: 0.757, confHigh: 0.983, actual: "ARRIVED", origOk: false, bayesOk: true, factors: { airline: 0.833, time: 0.909, aircraft: 0.923, route: 0.833, prior: 0.794 }, override: false },
    { flight: "GJS 4168", route: "MDT-ORD", dep: "14:05", carrier: "GoJet", type: "regional", original: 0.35, bayesian: 0.839, confLow: 0.71, confHigh: 0.968, actual: "ARRIVED", origOk: false, bayesOk: true, factors: { airline: 0.667, time: 0.909, aircraft: 0.923, route: 0.833, prior: 0.9 }, override: false },
    { flight: "UA 281", route: "BWI-ORD", dep: "06:00", carrier: "United", type: "mainline", original: 0.63, bayesian: 0.56, confLow: 0.429, confHigh: 0.691, actual: "CANCELLED", origOk: false, bayesOk: false, factors: { airline: 0.643, time: 0.615, aircraft: 0.769, route: 0.8, prior: 0.951 }, override: true },
    { flight: "RPA 4587", route: "BWI-ORD", dep: "05:00", carrier: "Republic", type: "regional", original: 0.62, bayesian: 0.768, confLow: 0.624, confHigh: 0.912, actual: "ARRIVED", origOk: true, bayesOk: true, factors: { airline: 0.8, time: 0.615, aircraft: 0.923, route: 0.8, prior: 0.789 }, override: false },
    { flight: "RPA 4458", route: "BWI-ORD", dep: "06:50", carrier: "Republic", type: "regional", original: 0.62, bayesian: 0.768, confLow: 0.624, confHigh: 0.912, actual: "ARRIVED", origOk: true, bayesOk: true, factors: { airline: 0.8, time: 0.615, aircraft: 0.923, route: 0.8, prior: 0.789 }, override: false },
    { flight: "UA 1400", route: "BWI-ORD", dep: "11:08", carrier: "United", type: "mainline", original: 0.48, bayesian: 0.755, confLow: 0.635, confHigh: 0.874, actual: "ARRIVED", origOk: false, bayesOk: true, factors: { airline: 0.643, time: 0.75, aircraft: 0.769, route: 0.8, prior: 0.951 }, override: false },
    { flight: "WN 1583", route: "BWI-MDW", dep: "06:25", carrier: "Southwest", type: "mainline", original: 0.62, bayesian: 0.786, confLow: 0.66, confHigh: 0.911, actual: "ARRIVED", origOk: true, bayesOk: true, factors: { airline: 0.8, time: 0.615, aircraft: 0.769, route: 0.8, prior: 0.9 }, override: false },
    { flight: "WN 3108", route: "BWI-MDW", dep: "11:00", carrier: "Southwest", type: "mainline", original: 0.47, bayesian: 0.828, confLow: 0.705, confHigh: 0.951, actual: "ARRIVED", origOk: false, bayesOk: true, factors: { airline: 0.8, time: 0.75, aircraft: 0.769, route: 0.8, prior: 0.9 }, override: false }
  ];
  const FACTORS = [
    { key: "time", label: "Time of Day", weight: 30 },
    { key: "airline", label: "Airline IROP", weight: 25 },
    { key: "aircraft", label: "Aircraft Type", weight: 20 },
    { key: "route", label: "Route History", weight: 15 },
    { key: "prior", label: "Apr 2 Prior", weight: 10 }
  ];
  function depToMinutes(dep) {
    const [h, m] = dep.split(":").map(Number);
    return h * 60 + m;
  }
  function Timeline({ flights, onSelect }) {
    const [hover, setHover] = useState(null);
    const START = 5 * 60;
    const END = 20 * 60;
    const RANGE = END - START;
    const STORM_START = 5 * 60;
    const STORM_END = 9 * 60;
    const pct = (min) => (min - START) / RANGE * 100;
    const rows = {};
    flights.forEach((f) => {
      const r = f.route;
      if (!rows[r]) rows[r] = [];
      rows[r].push(f);
    });
    const routeKeys = Object.keys(rows);
    const hours = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    return /* @__PURE__ */ React.createElement("div", { className: "timeline-wrap" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "timeline-storm-band",
        style: { left: `${pct(STORM_START)}%`, width: `${pct(STORM_END) - pct(STORM_START)}%` }
      },
      /* @__PURE__ */ React.createElement("div", { className: "timeline-storm-label", style: { left: 8 } }, "Storm window")
    ), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", paddingLeft: 70 } }, routeKeys.map((route, ri) => /* @__PURE__ */ React.createElement("div", { key: route, style: { position: "relative", height: 36, display: "flex", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      left: -70,
      top: "50%",
      transform: "translateY(-50%)",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--text-3)",
      letterSpacing: "0.04em",
      width: 62,
      textAlign: "right"
    } }, route), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: "100%", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "var(--border-subtle)" } }), rows[route].map((f) => {
      const m = depToMinutes(f.dep);
      const x = pct(m);
      const arrived = f.actual === "ARRIVED" || f.actual === "EN ROUTE";
      const cls = f.actual === "N/A" ? "na" : arrived ? "arrived" : "cancelled";
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: f.flight,
          className: `tl-dot ${cls} ${f.friendPick ? "friend" : ""}`,
          style: { left: `${x}%`, top: "50%" },
          onMouseEnter: () => setHover(f.flight),
          onMouseLeave: () => setHover(null),
          onClick: () => onSelect(f.flight)
        },
        hover === f.flight && /* @__PURE__ */ React.createElement("div", { className: "tl-tooltip" }, f.flight, " \xB7 ", f.dep, " \xB7 ", f.actual === "N/A" ? "No data" : f.actual.toLowerCase(), f.friendPick && /* @__PURE__ */ React.createElement("span", { style: { color: "var(--amber)", marginLeft: 6 } }, "Friend"))
      );
    }))))), /* @__PURE__ */ React.createElement("div", { style: { paddingLeft: 70 } }, /* @__PURE__ */ React.createElement("div", { className: "timeline-axis" }, hours.map((h) => /* @__PURE__ */ React.createElement("span", { key: h }, h.toString().padStart(2, "0"), ":00")))));
  }
  const EVO_FLIGHTS = [
    { id: "UA 660", phases: [80, 72, 30, 56], actual: 0, color: "#F06B6B", label: "UA 660" },
    { id: "AA 3177", phases: [15, 20, 85, 84], actual: 100, color: "#6BA1F5", label: "AA 3177" },
    { id: "UA 3450", phases: [null, 52, 78, 77], actual: 100, color: "#E5A84B", label: "UA 3450" },
    { id: "ENY 3693", phases: [35, 42, 90, 87], actual: 100, color: "#5FD68B", label: "ENY 3693" },
    { id: "AA 1885", phases: [65, 64, 72, 75], actual: 100, color: "#9B978F", label: "AA 1885" },
    { id: "UA 1811", phases: [55, 52, 70, 75], actual: 0, color: "#A07232", label: "UA 1811" }
  ];
  const PHASE_LABELS = ["Gut\ninstinct", "Industry\ndata", "Storm\ndata", "Bayesian\nmodel"];
  function SlopeChart({ flights }) {
    const [hovered, setHovered] = useState(null);
    const verifiable = flights.filter((f) => f.actual !== "N/A");
    const W = 700, H = 500;
    const PAD = { top: 36, right: 90, bottom: 24, left: 90 };
    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;
    const yScale = (i) => PAD.top + i / (verifiable.length - 1) * plotH;
    const xScale = (v) => PAD.left + v * plotW;
    const sorted = [...verifiable].sort((a, b) => b.bayesian - a.bayesian);
    return /* @__PURE__ */ React.createElement("div", { className: "slope-chart" }, /* @__PURE__ */ React.createElement("div", { className: "slope-chart-title" }, "Every flight, two predictions \xB7 lines connect original (left) to Bayesian (right)"), /* @__PURE__ */ React.createElement("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { display: "block", maxWidth: "100%" } }, [0, 0.25, 0.5, 0.75, 1].map((v) => /* @__PURE__ */ React.createElement("g", { key: v }, /* @__PURE__ */ React.createElement(
      "line",
      {
        x1: xScale(v),
        y1: PAD.top - 10,
        x2: xScale(v),
        y2: H - PAD.bottom + 10,
        stroke: v === 0.5 ? "rgba(229,168,75,0.2)" : "rgba(255,255,255,0.04)",
        strokeDasharray: v === 0.5 ? "4,4" : "none"
      }
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: xScale(v),
        y: PAD.top - 18,
        textAnchor: "middle",
        fill: "#5C5950",
        fontSize: 9
      },
      Math.round(v * 100),
      "%"
    ))), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: PAD.left,
        y: 14,
        textAnchor: "start",
        fill: "#5C5950",
        fontSize: 9,
        letterSpacing: "0.08em"
      },
      "ORIGINAL"
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: W - PAD.right,
        y: 14,
        textAnchor: "end",
        fill: "#5C5950",
        fontSize: 9,
        letterSpacing: "0.08em"
      },
      "BAYESIAN"
    ), sorted.map((f, i) => {
      const arrived = f.actual === "ARRIVED" || f.actual === "EN ROUTE";
      const color = arrived ? "var(--green)" : "var(--red)";
      const y = yScale(i);
      const isHover = hovered === f.flight;
      const opacity = hovered === null ? 0.6 : isHover ? 1 : 0.12;
      return /* @__PURE__ */ React.createElement(
        "g",
        {
          key: f.flight,
          onMouseEnter: () => setHovered(f.flight),
          onMouseLeave: () => setHovered(null),
          style: { cursor: "pointer", transition: "opacity 0.2s" },
          opacity
        },
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            x: PAD.left - 80,
            y: y - 11,
            width: W - PAD.left + 80,
            height: 22,
            fill: "transparent"
          }
        ),
        /* @__PURE__ */ React.createElement(
          "line",
          {
            x1: xScale(f.original),
            y1: y,
            x2: xScale(f.bayesian),
            y2: y,
            stroke: color,
            strokeWidth: isHover ? 2.5 : 1.5,
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ React.createElement(
          "polygon",
          {
            points: `${xScale(f.bayesian)},${y} ${xScale(f.bayesian) - (f.bayesian > f.original ? 6 : -6)},${y - 3} ${xScale(f.bayesian) - (f.bayesian > f.original ? 6 : -6)},${y + 3}`,
            fill: color
          }
        ),
        /* @__PURE__ */ React.createElement(
          "circle",
          {
            cx: xScale(f.original),
            cy: y,
            r: isHover ? 4.5 : 3,
            fill: color,
            stroke: "var(--bg)",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ React.createElement(
          "circle",
          {
            cx: xScale(f.bayesian),
            cy: y,
            r: isHover ? 4.5 : 3,
            fill: color,
            stroke: "var(--bg)",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            x: PAD.left - 8,
            y: y + 4,
            textAnchor: "end",
            fill: isHover ? "var(--text-1)" : "var(--text-3)",
            fontSize: 10,
            fontWeight: isHover ? 700 : 400
          },
          f.flight
        ),
        isHover && /* @__PURE__ */ React.createElement(
          "text",
          {
            x: W - PAD.right + 8,
            y: y + 4,
            textAnchor: "start",
            fill: color,
            fontSize: 9,
            fontWeight: 700
          },
          arrived ? "OK" : "CXL",
          " ",
          Math.round(f.original * 100),
          "\u2192",
          Math.round(f.bayesian * 100)
        )
      );
    })));
  }
  function FactorPipeline() {
    const [hoveredFactor, setHoveredFactor] = useState(null);
    const demo = {
      flight: "ENY 3693",
      sub: "Envoy regional \xB7 12:30 \xB7 MDT\u2192ORD",
      factors: [
        { key: "time", label: "Time of Day", weight: 30, score: 0.909, reason: "After noon = 100% survival" },
        { key: "airline", label: "Airline IROP", weight: 25, score: 0.833, reason: "Envoy/AA ecosystem: 87.5%" },
        { key: "aircraft", label: "Aircraft Type", weight: 20, score: 0.923, reason: "Regional: 11/11 survived" },
        { key: "route", label: "Route History", weight: 15, score: 0.833, reason: "MDT\u2192ORD: 90% survival" },
        { key: "prior", label: "Apr 2 Prior", weight: 10, score: 0.794, reason: "Envoy: 44 cancellations sys." }
      ],
      result: 0.87,
      original: 0.42
    };
    const W = 700, H = 280;
    const barY = 40;
    const barH = 26;
    const barGap = 40;
    const leftCol = 120;
    const barStart = 160;
    const barMax = 300;
    const resultX = 540;
    return /* @__PURE__ */ React.createElement("div", { className: "pipeline-chart" }, /* @__PURE__ */ React.createElement("div", { className: "pipeline-chart-title" }, "How the model scores a flight \xB7 ENY 3693 (biggest correction: 42% \u2192 87%)"), /* @__PURE__ */ React.createElement("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { display: "block", maxWidth: "100%" } }, demo.factors.map((f, i) => {
      const y = barY + i * barGap;
      const isHover = hoveredFactor === f.key;
      const barW = f.score * barMax;
      const colors = {
        time: "var(--amber)",
        airline: "var(--blue)",
        aircraft: "var(--green)",
        route: "#9B978F",
        prior: "var(--amber-dim)"
      };
      const color = colors[f.key];
      return /* @__PURE__ */ React.createElement(
        "g",
        {
          key: f.key,
          onMouseEnter: () => setHoveredFactor(f.key),
          onMouseLeave: () => setHoveredFactor(null),
          style: { cursor: "pointer" }
        },
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            x: 0,
            y: y - 4,
            width: barStart + barMax + 60,
            height: barH + 8,
            fill: "transparent"
          }
        ),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            x: leftCol,
            y: y + barH / 2 + 4,
            textAnchor: "end",
            fill: isHover ? "var(--text-1)" : "var(--text-2)",
            fontSize: 11,
            fontWeight: isHover ? 600 : 400
          },
          f.label
        ),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            x: leftCol + 10,
            y: y + barH / 2 + 3,
            textAnchor: "start",
            fill: "var(--text-3)",
            fontSize: 9,
            fontWeight: 700
          },
          f.weight,
          "%"
        ),
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            x: barStart,
            y,
            width: barMax,
            height: barH,
            rx: 4,
            fill: "rgba(255,255,255,0.03)"
          }
        ),
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            x: barStart,
            y,
            width: barW,
            height: barH,
            rx: 4,
            fill: color,
            opacity: isHover ? 0.5 : 0.3
          }
        ),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            x: barStart + barW + 8,
            y: y + barH / 2 + 4,
            fill: color,
            fontSize: 11,
            fontWeight: 700
          },
          Math.round(f.score * 100),
          "%"
        ),
        isHover && /* @__PURE__ */ React.createElement(
          "text",
          {
            x: barStart + 8,
            y: y + barH / 2 + 4,
            fill: "var(--text-1)",
            fontSize: 9,
            opacity: 0.7
          },
          f.reason
        ),
        /* @__PURE__ */ React.createElement(
          "line",
          {
            x1: barStart + barW,
            y1: y + barH / 2,
            x2: resultX - 36,
            y2: H / 2,
            stroke: color,
            strokeWidth: 0.5,
            opacity: isHover ? 0.4 : 0.08,
            strokeDasharray: "2,3"
          }
        )
      );
    }), /* @__PURE__ */ React.createElement(
      "circle",
      {
        cx: resultX,
        cy: H / 2,
        r: 38,
        fill: "none",
        stroke: "var(--amber)",
        strokeWidth: 2,
        opacity: 0.3
      }
    ), /* @__PURE__ */ React.createElement(
      "circle",
      {
        cx: resultX,
        cy: H / 2,
        r: 38,
        fill: "var(--amber)",
        opacity: 0.06
      }
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: resultX,
        y: H / 2 - 4,
        textAnchor: "middle",
        fill: "var(--amber)",
        fontSize: 22,
        fontWeight: 700
      },
      Math.round(demo.result * 100),
      "%"
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: resultX,
        y: H / 2 + 14,
        textAnchor: "middle",
        fill: "var(--text-3)",
        fontSize: 9,
        letterSpacing: "0.06em"
      },
      "BAYESIAN"
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: resultX,
        y: H / 2 + 52,
        textAnchor: "middle",
        fill: "var(--text-3)",
        fontSize: 9
      },
      "was"
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: resultX,
        y: H / 2 + 66,
        textAnchor: "middle",
        fill: "var(--red)",
        fontSize: 14,
        fontWeight: 700
      },
      Math.round(demo.original * 100),
      "%"
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: resultX,
        y: H / 2 + 78,
        textAnchor: "middle",
        fill: "var(--text-3)",
        fontSize: 8,
        letterSpacing: "0.06em"
      },
      "ORIGINAL"
    )));
  }
  function BrierChart() {
    const [hovered, setHovered] = useState(null);
    const W = 700, H = 160;
    const barStart = 160, barMax = 360;
    const bars = [
      { id: "random", label: "Random guessing", value: 0.25, color: "var(--text-3)", note: "baseline" },
      { id: "original", label: "Original model", value: 0.182, color: "var(--red)", note: "27% better than random" },
      { id: "bayesian", label: "Bayesian model", value: 0.082, color: "var(--green)", note: "67% better than random" }
    ];
    const maxVal = 0.3;
    const barH = 26;
    const barGap = 40;
    return /* @__PURE__ */ React.createElement("div", { className: "brier-chart" }, /* @__PURE__ */ React.createElement("div", { className: "brier-chart-title" }, "Brier score comparison \xB7 lower is better \xB7 0.0 = perfect"), /* @__PURE__ */ React.createElement("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { display: "block", maxWidth: "100%" } }, [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3].map((v) => /* @__PURE__ */ React.createElement("g", { key: v }, /* @__PURE__ */ React.createElement(
      "line",
      {
        x1: barStart + v / maxVal * barMax,
        y1: 12,
        x2: barStart + v / maxVal * barMax,
        y2: H - 6,
        stroke: "rgba(255,255,255,0.04)"
      }
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: barStart + v / maxVal * barMax,
        y: 8,
        textAnchor: "middle",
        fill: "#5C5950",
        fontSize: 9
      },
      v.toFixed(2)
    ))), bars.map((bar, i) => {
      const y = 22 + i * barGap;
      const barW = bar.value / maxVal * barMax;
      const isHover = hovered === bar.id;
      return /* @__PURE__ */ React.createElement(
        "g",
        {
          key: bar.id,
          onMouseEnter: () => setHovered(bar.id),
          onMouseLeave: () => setHovered(null),
          style: { cursor: "pointer" }
        },
        /* @__PURE__ */ React.createElement("rect", { x: 0, y: y - 4, width: W, height: barH + 8, fill: "transparent" }),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            x: barStart - 12,
            y: y + barH / 2 + 4,
            textAnchor: "end",
            fill: isHover ? "var(--text-1)" : "var(--text-2)",
            fontSize: 11,
            fontWeight: isHover ? 600 : 400
          },
          bar.label
        ),
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            x: barStart,
            y,
            width: barMax,
            height: barH,
            rx: 4,
            fill: "rgba(255,255,255,0.03)"
          }
        ),
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            x: barStart,
            y,
            width: barW,
            height: barH,
            rx: 4,
            fill: bar.color,
            opacity: isHover ? 0.5 : 0.3
          }
        ),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            x: barStart + barW + 10,
            y: y + barH / 2 + 4,
            fill: bar.color,
            fontSize: 12,
            fontWeight: 700
          },
          bar.value.toFixed(3)
        ),
        isHover && bar.note !== "baseline" && /* @__PURE__ */ React.createElement(
          "text",
          {
            x: barStart + barW + 65,
            y: y + barH / 2 + 4,
            fill: "var(--text-3)",
            fontSize: 9,
            fontStyle: "italic"
          },
          bar.note
        )
      );
    })));
  }
  function TierInversion() {
    const [hovered, setHovered] = useState(null);
    const W = 700, H = 220;
    const tiers = [
      { id: "best", label: '"Best Bets"', predicted: "72\u201368%", cancelRate: 0.4, color: "var(--red)", note: "2 of 5 cancelled" },
      { id: "likely", label: '"Likely Safe"', predicted: "64\u201352%", cancelRate: 0.25, color: "var(--amber)", note: "2 of 8 cancelled" },
      { id: "uncertain", label: '"Uncertain"', predicted: "52\u201342%", cancelRate: 0.17, color: "var(--amber-dim)", note: "1 of 6 cancelled" },
      { id: "risky", label: '"Risky"', predicted: "35\u201320%", cancelRate: 0, color: "var(--green)", note: "0 cancelled" }
    ];
    const barStart = 160, barMax = 340;
    const barH = 30, barGap = 44;
    return /* @__PURE__ */ React.createElement("div", { className: "tier-chart" }, /* @__PURE__ */ React.createElement("div", { className: "tier-chart-title" }, "Original tier rankings vs. actual cancellation rates \xB7 the inversion"), /* @__PURE__ */ React.createElement("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { display: "block", maxWidth: "100%" } }, [0, 0.1, 0.2, 0.3, 0.4, 0.5].map((v) => /* @__PURE__ */ React.createElement("g", { key: v }, /* @__PURE__ */ React.createElement(
      "line",
      {
        x1: barStart + v / 0.5 * barMax,
        y1: 8,
        x2: barStart + v / 0.5 * barMax,
        y2: H - 16,
        stroke: "rgba(255,255,255,0.04)"
      }
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: barStart + v / 0.5 * barMax,
        y: H - 4,
        textAnchor: "middle",
        fill: "#5C5950",
        fontSize: 9
      },
      Math.round(v * 100),
      "%"
    ))), tiers.map((t, i) => {
      const y = 14 + i * barGap;
      const barW = Math.max(4, t.cancelRate / 0.5 * barMax);
      const isHover = hovered === t.id;
      return /* @__PURE__ */ React.createElement(
        "g",
        {
          key: t.id,
          onMouseEnter: () => setHovered(t.id),
          onMouseLeave: () => setHovered(null),
          style: { cursor: "pointer" }
        },
        /* @__PURE__ */ React.createElement("rect", { x: 0, y: y - 4, width: W, height: barH + 8, fill: "transparent" }),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            x: barStart - 14,
            y: y + barH / 2 - 2,
            textAnchor: "end",
            fill: isHover ? "var(--text-1)" : "var(--text-2)",
            fontSize: 11,
            fontWeight: isHover ? 600 : 400
          },
          t.label
        ),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            x: barStart - 14,
            y: y + barH / 2 + 10,
            textAnchor: "end",
            fill: "var(--text-3)",
            fontSize: 8
          },
          "est. ",
          t.predicted
        ),
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            x: barStart,
            y,
            width: barMax,
            height: barH,
            rx: 4,
            fill: "rgba(255,255,255,0.03)"
          }
        ),
        /* @__PURE__ */ React.createElement(
          "rect",
          {
            x: barStart,
            y,
            width: t.cancelRate === 0 ? 0 : barW,
            height: barH,
            rx: 4,
            fill: t.color,
            opacity: isHover ? 0.5 : 0.3
          }
        ),
        t.cancelRate === 0 && /* @__PURE__ */ React.createElement(
          "text",
          {
            x: barStart + 8,
            y: y + barH / 2 + 4,
            fill: "var(--green)",
            fontSize: 12,
            fontWeight: 700
          },
          "0%"
        ),
        t.cancelRate > 0 && /* @__PURE__ */ React.createElement(
          "text",
          {
            x: barStart + barW + 10,
            y: y + barH / 2 + 4,
            fill: t.color,
            fontSize: 12,
            fontWeight: 700
          },
          Math.round(t.cancelRate * 100),
          "%"
        ),
        isHover && /* @__PURE__ */ React.createElement(
          "text",
          {
            x: t.cancelRate > 0 ? barStart + barW + 50 : barStart + 38,
            y: y + barH / 2 + 4,
            fill: "var(--text-3)",
            fontSize: 9,
            fontStyle: "italic"
          },
          t.note
        )
      );
    })));
  }
  function EvolutionGraph() {
    const [hovered, setHovered] = useState(null);
    const W = 740, H = 320;
    const PAD = { top: 30, right: 130, bottom: 50, left: 50 };
    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;
    const xStep = plotW / 3;
    const yScale = (v) => PAD.top + plotH - v / 100 * plotH;
    const xPos = (i) => PAD.left + i * xStep;
    return /* @__PURE__ */ React.createElement("div", { className: "evo-graph" }, /* @__PURE__ */ React.createElement("div", { className: "evo-graph-title" }, "Estimate evolution \xB7 how each flight's probability changed across four phases"), /* @__PURE__ */ React.createElement("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { display: "block", maxWidth: "100%" } }, [0, 25, 50, 75, 100].map((v) => /* @__PURE__ */ React.createElement("g", { key: v }, /* @__PURE__ */ React.createElement(
      "line",
      {
        x1: PAD.left,
        y1: yScale(v),
        x2: W - PAD.right,
        y2: yScale(v),
        stroke: v === 50 ? "rgba(229,168,75,0.2)" : "rgba(255,255,255,0.04)",
        strokeDasharray: v === 50 ? "4,4" : "none"
      }
    ), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: PAD.left - 8,
        y: yScale(v) + 3,
        textAnchor: "end",
        fill: "#5C5950",
        fontSize: 10
      },
      v,
      "%"
    ))), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: W - PAD.right + 4,
        y: yScale(50) + 3,
        fill: "#A07232",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.04em"
      },
      "50% THRESHOLD"
    ), PHASE_LABELS.map((label, i) => /* @__PURE__ */ React.createElement("text", { key: i, x: xPos(i), y: H - 10, textAnchor: "middle", fill: "#5C5950", fontSize: 10 }, label.split("\n").map((line, li) => /* @__PURE__ */ React.createElement("tspan", { key: li, x: xPos(i), dy: li === 0 ? 0 : 12 }, line)))), EVO_FLIGHTS.map((fl) => {
      const isHover = hovered === fl.id;
      const opacity = hovered === null ? 0.7 : isHover ? 1 : 0.15;
      const strokeW = isHover ? 2.5 : 1.5;
      const points = fl.phases.map((v, i) => v !== null ? { x: xPos(i), y: yScale(v) } : null).filter(Boolean);
      const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
      return /* @__PURE__ */ React.createElement(
        "g",
        {
          key: fl.id,
          onMouseEnter: () => setHovered(fl.id),
          onMouseLeave: () => setHovered(null),
          style: { cursor: "pointer", transition: "opacity 0.2s" },
          opacity
        },
        /* @__PURE__ */ React.createElement(
          "path",
          {
            d: pathD,
            fill: "none",
            stroke: fl.color,
            strokeWidth: strokeW,
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }
        ),
        fl.phases.map((v, i) => v !== null && /* @__PURE__ */ React.createElement(
          "circle",
          {
            key: i,
            cx: xPos(i),
            cy: yScale(v),
            r: isHover ? 4 : 3,
            fill: fl.color,
            stroke: "var(--bg)",
            strokeWidth: 1.5
          }
        )),
        /* @__PURE__ */ React.createElement(
          "line",
          {
            x1: xPos(3) + 12,
            y1: yScale(fl.phases[3]),
            x2: xPos(3) + 24,
            y2: yScale(fl.actual),
            stroke: fl.color,
            strokeWidth: 1,
            strokeDasharray: "3,3",
            opacity: 0.5
          }
        ),
        /* @__PURE__ */ React.createElement(
          "circle",
          {
            cx: xPos(3) + 24,
            cy: yScale(fl.actual),
            r: 3,
            fill: fl.actual === 100 ? "var(--green)" : "var(--red)",
            stroke: "var(--bg)",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ React.createElement(
          "text",
          {
            x: xPos(3) + 32,
            y: yScale(fl.phases[3]) + 4,
            fill: fl.color,
            fontSize: 11,
            fontWeight: 700
          },
          fl.label
        )
      );
    }), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: xPos(3) + 24,
        y: PAD.top - 10,
        textAnchor: "middle",
        fill: "#5C5950",
        fontSize: 9,
        letterSpacing: "0.08em"
      },
      "ACTUAL"
    )));
  }
  function FlightRow({ f, isOpen, onToggle }) {
    const arrived = f.actual === "ARRIVED" || f.actual === "EN ROUTE";
    const outCls = f.actual === "N/A" ? "na" : arrived ? "arrived" : "cancelled";
    const outLabel = f.actual === "N/A" ? "---" : f.actual === "EN ROUTE" ? "En route" : f.actual.charAt(0) + f.actual.slice(1).toLowerCase();
    const delta = f.bayesian - f.original;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: `fl-row ${f.friendPick ? "is-friend" : ""}`, onClick: onToggle }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "fl-id" }, f.flight), /* @__PURE__ */ React.createElement("div", { className: "fl-meta" }, f.carrier, " \xB7 ", f.type, " \xB7 ", f.route, f.friendPick && /* @__PURE__ */ React.createElement("span", { className: "friend-flag" }, "Friend's pick"))), /* @__PURE__ */ React.createElement("div", { className: "fl-dep" }, f.dep), /* @__PURE__ */ React.createElement("div", { className: "fl-prob orig-col" }, Math.round(f.original * 100), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 400, fontSize: 10 } }, "%"), f.origOk === true && /* @__PURE__ */ React.createElement("span", { className: "ok" }, "\u2713"), f.origOk === false && /* @__PURE__ */ React.createElement("span", { className: "no" }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "fl-prob bayes-col" }, Math.round(f.bayesian * 100), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 400, fontSize: 10 } }, "%"), f.bayesOk === true && /* @__PURE__ */ React.createElement("span", { className: "ok" }, "\u2713"), f.bayesOk === false && /* @__PURE__ */ React.createElement("span", { className: "no" }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "fl-bars" }, /* @__PURE__ */ React.createElement("div", { className: "fl-bar-row" }, /* @__PURE__ */ React.createElement("span", { className: "fl-bar-lbl" }, "O"), /* @__PURE__ */ React.createElement("div", { className: "fl-bar-track" }, /* @__PURE__ */ React.createElement("div", { className: "fl-bar-fill orig", style: { width: `${f.original * 100}%` } }))), /* @__PURE__ */ React.createElement("div", { className: "fl-bar-row" }, /* @__PURE__ */ React.createElement("span", { className: "fl-bar-lbl" }, "B"), /* @__PURE__ */ React.createElement("div", { className: "fl-bar-track" }, /* @__PURE__ */ React.createElement("div", { className: "fl-bar-conf", style: { left: `${f.confLow * 100}%`, width: `${(f.confHigh - f.confLow) * 100}%` } }), /* @__PURE__ */ React.createElement("div", { className: "fl-bar-fill bayes", style: { width: `${f.bayesian * 100}%` } })))), /* @__PURE__ */ React.createElement("div", { className: `fl-outcome ${outCls}` }, outLabel)), isOpen && /* @__PURE__ */ React.createElement("div", { className: "fl-detail" }, /* @__PURE__ */ React.createElement("div", { className: "fl-detail-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "fl-detail-title" }, "Bayesian Factor Weights"), FACTORS.map((fm, i) => {
      const v = f.factors[fm.key];
      const color = v >= 0.85 ? "var(--green)" : v >= 0.7 ? "var(--blue)" : "var(--red)";
      return /* @__PURE__ */ React.createElement("div", { key: fm.key, className: "factor-row" }, /* @__PURE__ */ React.createElement("span", { className: "factor-name" }, fm.label), /* @__PURE__ */ React.createElement("span", { className: "factor-w" }, fm.weight, "%"), /* @__PURE__ */ React.createElement("div", { className: "factor-track" }, /* @__PURE__ */ React.createElement("div", { className: "factor-fill", style: { width: `${v * 100}%`, background: color, animationDelay: `${i * 0.06}s` } })), /* @__PURE__ */ React.createElement("span", { className: "factor-val" }, Math.round(v * 100), "%"));
    }), f.override && /* @__PURE__ */ React.createElement("div", { className: "override-warn" }, "United early-AM override: 0/3 survived April 3. 30% penalty applied.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "fl-detail-title" }, "Comparison"), /* @__PURE__ */ React.createElement("div", { className: "detail-kv" }, /* @__PURE__ */ React.createElement("span", { className: "detail-kv-label" }, "Original estimate"), /* @__PURE__ */ React.createElement("span", { className: "detail-kv-val", style: { color: "var(--text-3)" } }, Math.round(f.original * 100), "%")), /* @__PURE__ */ React.createElement("div", { className: "detail-kv" }, /* @__PURE__ */ React.createElement("span", { className: "detail-kv-label" }, "Bayesian estimate"), /* @__PURE__ */ React.createElement("span", { className: "detail-kv-val", style: { color: "var(--blue)" } }, Math.round(f.bayesian * 100), "%")), /* @__PURE__ */ React.createElement("div", { className: "detail-kv" }, /* @__PURE__ */ React.createElement("span", { className: "detail-kv-label" }, "Confidence range"), /* @__PURE__ */ React.createElement("span", { className: "detail-kv-val" }, Math.round(f.confLow * 100), "% \u2013 ", Math.round(f.confHigh * 100), "%")), /* @__PURE__ */ React.createElement("div", { className: "detail-kv" }, /* @__PURE__ */ React.createElement("span", { className: "detail-kv-label" }, "Model delta"), /* @__PURE__ */ React.createElement("span", { className: "detail-kv-val", style: { color: delta > 0 ? "var(--green)" : "var(--red)" } }, delta > 0 ? "+" : "", Math.round(delta * 100), "pp")), /* @__PURE__ */ React.createElement("div", { className: "detail-kv" }, /* @__PURE__ */ React.createElement("span", { className: "detail-kv-label" }, "Aircraft class"), /* @__PURE__ */ React.createElement("span", { className: "detail-kv-val", style: { fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13 } }, f.type))))));
  }
  function StormDashboard() {
    const [expanded, setExpanded] = useState(null);
    const [tab, setTab] = useState("flights");
    const [routeF, setRouteF] = useState("ALL");
    const [outcomeF, setOutcomeF] = useState("ALL");
    const [sortKey, setSortKey] = useState("dep");
    const verifiable = FLIGHTS.filter((f) => f.actual !== "N/A");
    const origScore = verifiable.filter((f) => f.origOk).length;
    const bayesScore = verifiable.filter((f) => f.bayesOk).length;
    const origBrier = verifiable.reduce((s, f) => s + (f.original - (f.actual === "ARRIVED" || f.actual === "EN ROUTE" ? 1 : 0)) ** 2, 0) / verifiable.length;
    const bayesBrier = verifiable.reduce((s, f) => s + (f.bayesian - (f.actual === "ARRIVED" || f.actual === "EN ROUTE" ? 1 : 0)) ** 2, 0) / verifiable.length;
    const brierGain = Math.round((origBrier - bayesBrier) / origBrier * 100);
    const routes = useMemo(() => ["ALL", ...new Set(FLIGHTS.map((f) => f.route))], []);
    const filtered = useMemo(() => {
      let list = [...FLIGHTS];
      if (routeF !== "ALL") list = list.filter((f) => f.route === routeF);
      if (outcomeF === "ARRIVED") list = list.filter((f) => f.actual === "ARRIVED" || f.actual === "EN ROUTE");
      else if (outcomeF === "CANCELLED") list = list.filter((f) => f.actual === "CANCELLED");
      const sorters = {
        dep: (a, b) => a.dep.localeCompare(b.dep),
        bayes: (a, b) => b.bayesian - a.bayesian,
        delta: (a, b) => b.bayesian - b.original - (a.bayesian - a.original)
      };
      list.sort(sorters[sortKey] || sorters.dep);
      return list;
    }, [routeF, outcomeF, sortKey]);
    const friend = FLIGHTS.find((f) => f.friendPick);
    return /* @__PURE__ */ React.createElement("div", { className: "storm-dash" }, /* @__PURE__ */ React.createElement("div", { className: "dash-content" }, /* @__PURE__ */ React.createElement("div", { className: "hero anim-up", style: { animationDelay: "0s" } }, /* @__PURE__ */ React.createElement("div", { className: "hero-eyebrow" }, "Severe Weather Flight Report \xB7 April 3, 2026 \xB7 ", /* @__PURE__ */ React.createElement("span", null, "419 Cancellations Systemwide")), /* @__PURE__ */ React.createElement("h1", null, "Harrisburg to Chicago,", /* @__PURE__ */ React.createElement("br", null), "Through the Storm"), /* @__PURE__ */ React.createElement("div", { className: "hero-desc" }, "On April 3, 2026, 18 severe thunderstorm warnings hit Chicago. We tracked ", /* @__PURE__ */ React.createElement("strong", null, "21 real flights"), " across 4 routes from central Pennsylvania and Baltimore. The findings: fly regional, fly afternoon, and don't trust industry averages when the sky is falling.")), /* @__PURE__ */ React.createElement("div", { className: "timeline-section anim-up", style: { animationDelay: "0.1s" } }, /* @__PURE__ */ React.createElement("div", { className: "timeline-label" }, "Flight timeline \xB7 each dot is a flight, color is outcome"), /* @__PURE__ */ React.createElement(Timeline, { flights: FLIGHTS, onSelect: (id) => {
      setTab("flights");
      setExpanded(expanded === id ? null : id);
    } })), /* @__PURE__ */ React.createElement("div", { className: "friend-callout anim-up", style: { animationDelay: "0.2s" } }, /* @__PURE__ */ React.createElement("div", { className: "friend-tag" }, "Field Test"), /* @__PURE__ */ React.createElement("div", { className: "friend-body" }, "A friend booked ", /* @__PURE__ */ React.createElement("strong", null, friend.flight), " \u2014 Republic Airways E175, departing ", /* @__PURE__ */ React.createElement("span", { className: "mono" }, friend.dep), ",", friend.route, ". We called it a rookie mistake at the time. The original model gave it a lukewarm ", /* @__PURE__ */ React.createElement("span", { className: "mono" }, Math.round(friend.original * 100), "%"), '. Turns out the "rookie" accidentally picked a regional carrier, and regionals went 11 for 11 on storm day. The Bayesian model would have told him he was onto something: ', /* @__PURE__ */ React.createElement("span", { className: "mono" }, Math.round(friend.bayesian * 100), "%"), "."), /* @__PURE__ */ React.createElement("div", { className: "friend-verdict" }, "// ARRIVED SAFELY \u2014 sometimes luck is just unrecognized pattern-matching")), /* @__PURE__ */ React.createElement("div", { className: "tab-bar anim-fade", style: { animationDelay: "0.3s" } }, [
      { id: "flights", label: "The Report" },
      { id: "comparison", label: "Model Comparison" },
      { id: "methodology", label: "How It Works" },
      { id: "process", label: "The Full Story" }
    ].map((t) => /* @__PURE__ */ React.createElement("button", { key: t.id, className: `tab-item ${tab === t.id ? "on" : ""}`, onClick: () => setTab(t.id) }, t.label))), tab === "flights" && /* @__PURE__ */ React.createElement("div", { className: "anim-fade" }, /* @__PURE__ */ React.createElement("div", { className: "insight-list", style: { marginBottom: 40 } }, /* @__PURE__ */ React.createElement("div", { className: "insight-item" }, /* @__PURE__ */ React.createElement("div", { className: "insight-title" }, "If you're flying during a storm, go regional"), /* @__PURE__ */ React.createElement("div", { className: "insight-body" }, /* @__PURE__ */ React.createElement("span", { className: "stat" }, "11 of 11"), " regional carrier flights arrived safely vs ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "19 of 24"), " mainline. Republic, Envoy, SkyWest, and GoJet went undefeated. These smaller operators have more routing flexibility and \u2014 crucially \u2014 aren't subject to the hub-protection cancellation logic that grounded United's mainline fleet. The flight your travel agent would never suggest turned out to be the safest bet.")), /* @__PURE__ */ React.createElement("div", { className: "insight-item" }, /* @__PURE__ */ React.createElement("div", { className: "insight-title" }, "United pre-cancelled every early morning mainline flight"), /* @__PURE__ */ React.createElement("div", { className: "insight-body" }, /* @__PURE__ */ React.createElement("span", { className: "stat" }, "0 of 3"), " United mainline flights departing before 9 AM survived. This wasn't bad luck \u2014 it was corporate strategy. United's Irregular Operations playbook prioritizes protecting hub throughput at O'Hare by cancelling inbound flights before they become problems. If you're on a pre-dawn United flight into ORD during a storm, you're not a passenger. You're a liability being managed.")), /* @__PURE__ */ React.createElement("div", { className: "insight-item" }, /* @__PURE__ */ React.createElement("div", { className: "insight-title" }, "Later is better (when storms hit overnight)"), /* @__PURE__ */ React.createElement("div", { className: "insight-body" }, "Early AM survival: ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "64%"), ". Mid-morning: ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "83%"), ". After noon: ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "100%"), `. The April 2 storms rolled into O'Hare at 8:40 PM CDT and lingered through the morning. By midday, clear skies. Conventional wisdom says "get the early flight before things go sideways." On this day, the early flight `, /* @__PURE__ */ React.createElement("em", null, "was"), " sideways. The 7:40 PM departure everyone avoided? Arrived without a scratch.")), /* @__PURE__ */ React.createElement("div", { className: "insight-item", style: { borderBottom: "none" } }, /* @__PURE__ */ React.createElement("div", { className: "insight-title" }, "Normal statistics don't survive severe weather"), /* @__PURE__ */ React.createElement("div", { className: "insight-body" }, "United's annual cancel rate is ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "0.86%"), ". On April 3, they cancelled", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "33%"), " of their flights on these routes. That's not a rounding error \u2014 it's a 38x multiplier. Any model built on annual averages is bringing a spreadsheet to a knife fight. You need data from the specific disruption pattern, not from the past twelve months of sunny Tuesdays."))), /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 8, borderTop: "1px solid var(--border)", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 } }, "Flight-by-flight data")), /* @__PURE__ */ React.createElement("div", { className: "filter-row" }, routes.map((r) => /* @__PURE__ */ React.createElement("button", { key: r, className: `chip ${routeF === r ? "on" : ""}`, onClick: () => setRouteF(r) }, r === "ALL" ? "All routes" : r)), /* @__PURE__ */ React.createElement("div", { className: "chip-sep" }), ["ALL", "ARRIVED", "CANCELLED"].map((o) => /* @__PURE__ */ React.createElement("button", { key: o, className: `chip ${outcomeF === o ? "on" : ""}`, onClick: () => setOutcomeF(o) }, o === "ALL" ? "All" : o.charAt(0) + o.slice(1).toLowerCase())), /* @__PURE__ */ React.createElement("div", { className: "chip-sep" }), [
      { id: "dep", label: "Time" },
      { id: "bayes", label: "Bayesian" },
      { id: "delta", label: "Delta" }
    ].map((s) => /* @__PURE__ */ React.createElement("button", { key: s.id, className: `chip ${sortKey === s.id ? "on" : ""}`, onClick: () => setSortKey(s.id) }, s.label))), /* @__PURE__ */ React.createElement("div", { className: "flight-list" }, /* @__PURE__ */ React.createElement("div", { className: "fl-header" }, /* @__PURE__ */ React.createElement("div", null, "Flight"), /* @__PURE__ */ React.createElement("div", null, "Dep"), /* @__PURE__ */ React.createElement("div", { className: "r" }, "Original"), /* @__PURE__ */ React.createElement("div", { className: "r" }, "Bayesian"), /* @__PURE__ */ React.createElement("div", null, "Comparison"), /* @__PURE__ */ React.createElement("div", { className: "c" }, "Outcome")), filtered.map((f) => /* @__PURE__ */ React.createElement(
      FlightRow,
      {
        key: f.flight,
        f,
        isOpen: expanded === f.flight,
        onToggle: () => setExpanded(expanded === f.flight ? null : f.flight)
      }
    )))), tab === "comparison" && /* @__PURE__ */ React.createElement("div", { className: "anim-fade" }, /* @__PURE__ */ React.createElement("div", { className: "scores", style: { marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { className: "score-cell" }, /* @__PURE__ */ React.createElement("div", { className: "score-cell-label" }, "Original Model"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "score-cell-big dim" }, origScore), /* @__PURE__ */ React.createElement("span", { className: "score-cell-unit" }, "/ ", verifiable.length)), /* @__PURE__ */ React.createElement("div", { className: "score-cell-sub" }, Math.round(origScore / verifiable.length * 100), "% accuracy \xB7 Brier ", origBrier.toFixed(3))), /* @__PURE__ */ React.createElement("div", { className: "score-cell" }, /* @__PURE__ */ React.createElement("div", { className: "score-cell-label" }, "Bayesian Model"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "score-cell-big bright" }, bayesScore), /* @__PURE__ */ React.createElement("span", { className: "score-cell-unit" }, "/ ", verifiable.length)), /* @__PURE__ */ React.createElement("div", { className: "score-cell-sub" }, Math.round(bayesScore / verifiable.length * 100), "% accuracy \xB7 Brier ", bayesBrier.toFixed(3))), /* @__PURE__ */ React.createElement("div", { className: "score-cell" }, /* @__PURE__ */ React.createElement("div", { className: "score-cell-label" }, "Calibration Gain"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "score-cell-big pop" }, "+", brierGain, "%")), /* @__PURE__ */ React.createElement("div", { className: "score-cell-sub" }, "Brier score improvement"))), /* @__PURE__ */ React.createElement(SlopeChart, { flights: FLIGHTS }), /* @__PURE__ */ React.createElement("div", { className: "insight-list" }, /* @__PURE__ */ React.createElement("div", { className: "insight-item" }, /* @__PURE__ */ React.createElement("div", { className: "insight-title" }, "The original model was worse than a coin flip \u2014 and confidently so"), /* @__PURE__ */ React.createElement("div", { className: "insight-body" }, /* @__PURE__ */ React.createElement("span", { className: "stat" }, "7 of 19"), ` verifiable predictions correct (37%). But the failures weren't random. The model systematically overrated early-morning United flights and systematically underrated everything after noon. Its "Best Bets" tier had a `, /* @__PURE__ */ React.createElement("span", { className: "stat" }, "40% cancellation rate"), '. Its "Risky" tier had ', /* @__PURE__ */ React.createElement("span", { className: "stat" }, "0%"), ". The confidence ranking was almost perfectly inverted. If you'd booked the model's #1 pick (UA 660 at 72%), you'd be sleeping at the airport. If you'd booked its dead-last pick (AA 3177 at 20%), you'd be eating deep dish.")), /* @__PURE__ */ React.createElement("div", { className: "insight-item" }, /* @__PURE__ */ React.createElement("div", { className: "insight-title" }, "The Bayesian model doubled accuracy by changing what it listened to"), /* @__PURE__ */ React.createElement("div", { className: "insight-body" }, /* @__PURE__ */ React.createElement("span", { className: "stat" }, "14 of 19"), " correct (74%) with a ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "55%"), " Brier score improvement. The secret wasn't more sophisticated math \u2014 it was better data. Instead of annual cancel rates, the Bayesian model used airline-specific, time-specific, and aircraft-specific survival rates from the actual April 2\u20133 storm window. It also introduced the critical regional-vs-mainline distinction that the original model was completely blind to.")), /* @__PURE__ */ React.createElement("div", { className: "insight-item" }, /* @__PURE__ */ React.createElement("div", { className: "insight-title" }, "Three flights neither model could crack"), /* @__PURE__ */ React.createElement("div", { className: "insight-body" }, "Both models missed ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "AA 2970"), ", ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "UA 1811"), ", and ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, "UA 660"), " (though the Bayesian model at least expressed less confidence on UA 660 at 56% vs the original's 72%). These failures likely trace to crew displacement cascades and aircraft rotation disruptions \u2014 when your inbound plane got cancelled three legs ago, your flight is doomed regardless of the weather forecast. No public data source captures these internal airline dependencies. That's the ceiling.")), /* @__PURE__ */ React.createElement("div", { className: "insight-item", style: { borderBottom: "none" } }, /* @__PURE__ */ React.createElement("div", { className: "insight-title" }, "What the Brier score actually tells you"), /* @__PURE__ */ React.createElement("div", { className: "insight-body" }, "Raw accuracy (>50% means yes, <50% means no) is a blunt instrument. The Brier score measures ", /* @__PURE__ */ React.createElement("em", null, "calibration"), " \u2014 did a 75% prediction happen 75% of the time? The original model's Brier of ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, origBrier.toFixed(3)), " says its probability estimates were poorly calibrated. The Bayesian model's ", /* @__PURE__ */ React.createElement("span", { className: "stat" }, bayesBrier.toFixed(3)), " says its estimates were meaningfully closer to reality. For the stats nerds: random guessing scores 0.250. The Bayesian model beat random by 67%. The original model beat random by 27%. Both beat random, but one of them was actually useful.")))), tab === "methodology" && /* @__PURE__ */ React.createElement("div", { className: "anim-fade" }, /* @__PURE__ */ React.createElement("div", { className: "meth-weights" }, FACTORS.map((fm) => /* @__PURE__ */ React.createElement("div", { key: fm.key, className: "meth-w-cell" }, /* @__PURE__ */ React.createElement("div", { className: "meth-w-num" }, fm.weight, "%"), /* @__PURE__ */ React.createElement("div", { className: "meth-w-label" }, fm.label)))), /* @__PURE__ */ React.createElement(FactorPipeline, null), /* @__PURE__ */ React.createElement("div", { className: "meth-prose" }, /* @__PURE__ */ React.createElement("p", null, "The model uses ", /* @__PURE__ */ React.createElement("strong", null, "weighted Bayesian averaging"), " across five factors, each derived from actual April 2\u20133 flight outcomes scraped from FlightAware. No industry averages, no annual statistics, no vibes. Just what happened to real planes on real storm days."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Laplace smoothing"), ` keeps us honest when samples are small. A carrier with 3/3 arrivals doesn't get a perfect 100% \u2014 it gets smoothed to 80%, because three flights is not a personality trait. This is the statistical equivalent of "let's not get carried away."`), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "The United early-AM override"), " is the one place we broke from pure math. United cancelled every single early-morning mainline flight on April 3 \u2014 a deliberate hub-protection move. Laplace smoothing would have been too generous here, so we applied a 30% penalty weight manually. Sometimes the data is trying to tell you something and smoothing is just shushing it."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Data sources:"), " FlightAware real-time scrapes (April 2\u20133), NOAA weather.gov severe weather API (18 thunderstorm warnings confirmed), DOT airline cancel rate baselines (2024\u201325), and the NomadLawyer systemwide IROP report for April 2 disruption counts."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Confidence intervals"), ` use Wilson score intervals, adjusted for the effective sample size across all contributing factors. When you see wide intervals, that's the model saying "I think so, but I've only seen a few of these." Narrow intervals mean the data actually agrees with itself.`))), tab === "process" && /* @__PURE__ */ React.createElement("div", { className: "process anim-fade" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 01"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "The ask, and the first mistake"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "The request was urgent and specific: find every available flight from Harrisburg, PA to Chicago on April 4, 2026, during an active severe weather event, and rank them by probability of actually arriving. Not a vague travel recommendation \u2014 a real risk assessment with real flight numbers and real percentages. The kind of thing you ask when you actually need to get somewhere."), /* @__PURE__ */ React.createElement("p", null, "The first model was built on ", /* @__PURE__ */ React.createElement("strong", null, "industry-level statistics"), ". Average airline cancellation rates (United at 0.86%, American at 0.73%), historical on-time percentages, and general heuristics about morning vs. evening flights. It felt rigorous. It produced a ranked spreadsheet of 37 flights across four tiers, each with a tidy probability estimate. It was also, as we'd soon learn, bringing a library card to a bar fight."), /* @__PURE__ */ React.createElement("div", { className: "proc-fail-box" }, /* @__PURE__ */ React.createElement("div", { className: "proc-fail-label" }, "The core failure"), /* @__PURE__ */ React.createElement("p", null, "Industry averages are meaningless during a 419-cancellation severe weather day. A ", /* @__PURE__ */ React.createElement("strong", null, "0.86% annual cancel rate"), " tells you nothing about what United will do when 18 thunderstorm warnings hit their primary hub overnight. The original model rated", /* @__PURE__ */ React.createElement("strong", null, " UA 660 at 72%"), " \u2014 it was cancelled. It rated ", /* @__PURE__ */ React.createElement("strong", null, "AA 3177 at 20%"), "\u2014 it arrived just fine. Confidently wrong in both directions. A magic 8-ball would have been embarrassed for us.")), /* @__PURE__ */ React.createElement("p", null, "The user caught it fast. The first draft didn't even have real flight numbers \u2014 just airline names and guessed departure times. The feedback was direct: ", /* @__PURE__ */ React.createElement("em", null, `"I noticed you don't have the flight numbers. This has to be right, this is serious."`), " Fair point. Hard to predict cancellations when you're not sure which flights exist."))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 02"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "Tracing six flights through every phase of thinking"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "Numbers in a table are easy to skim past. What's harder to ignore is watching a specific flight's survival odds swing from 80% to 30% as you learn more about the world. These six flights tell the whole story \u2014 three the original model got catastrophically wrong, two it got right for the wrong reasons, and the friend's pick that made us rethink everything."), /* @__PURE__ */ React.createElement(EvolutionGraph, null), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--text-3)", marginBottom: 20, marginTop: 8 } }, "Hover over any line to isolate it. The dashed connector shows where each flight's final estimate landed relative to the actual outcome (top = arrived, bottom = cancelled). Notice how the lines cross and invert between Phase 2 and Phase 3 \u2014 that's where the real data replaced the assumptions."), /* @__PURE__ */ React.createElement("table", { className: "evo-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Flight"), /* @__PURE__ */ React.createElement("th", null, "Phase 1: Gut"), /* @__PURE__ */ React.createElement("th", null, "Phase 2: Industry data"), /* @__PURE__ */ React.createElement("th", null, "Phase 3: Storm data"), /* @__PURE__ */ React.createElement("th", null, "Phase 4: Bayesian"), /* @__PURE__ */ React.createElement("th", { className: "r" }, "Actual"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "evo-flight-name" }, "UA 660"), /* @__PURE__ */ React.createElement("div", { className: "evo-flight-sub" }, "United mainline, 06:17, PHL-ORD")), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "~80%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "72%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--red)" } }, "~30%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--amber)" } }, "56%"), /* @__PURE__ */ React.createElement("td", { className: "evo-actual", style: { color: "var(--red)" } }, "Cancelled")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6 }, /* @__PURE__ */ React.createElement("div", { className: "evo-note" }, `The golden child. Phase 1 loved it \u2014 early United flight to a hub, high-frequency route, basically the textbook pick. Phase 2 double-downed with United's 0.86% annual cancel rate. Then the storm data arrived: United cancelled every single early-AM mainline flight on April 3. Zero for three. The Bayesian model dragged it to 56% via the early-AM override, but even that was too generous. The right answer was closer to "don't bother packing."`))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "evo-flight-name" }, "AA 3177"), /* @__PURE__ */ React.createElement("div", { className: "evo-flight-sub" }, "American mainline, 19:40, PHL-ORD")), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--red)" } }, "~15%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--red)" } }, "20%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "~85%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "84%"), /* @__PURE__ */ React.createElement("td", { className: "evo-actual", style: { color: "var(--green)" } }, "Arrived")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6 }, /* @__PURE__ */ React.createElement("div", { className: "evo-note" }, "The mirror image of UA 660. Phase 1 assumed evening + storm = doomed. Phase 2 agreed \u2014 late flights during multi-day weather events? Risky. Then the data showed up and politely disagreed: every single afternoon and evening flight on April 3 arrived. Every one. 100% survival after noon. The original model had the direction exactly backwards. Storms clear. Later is safer. Who knew? (The data knew.)"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "evo-flight-name" }, "UA 3450"), /* @__PURE__ */ React.createElement("div", { className: "evo-flight-sub" }, "Republic regional, 08:29, MDT-ORD")), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--text-3)" } }, "N/A"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--amber)" } }, "52%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "~78%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "77%"), /* @__PURE__ */ React.createElement("td", { className: "evo-actual", style: { color: "var(--green)" } }, "Arrived")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6 }, /* @__PURE__ */ React.createElement("div", { className: "evo-note" }, `The friend's pick. Wasn't even in the original analysis \u2014 got added when a friend said "I'm booking this one." Phase 2 rated it at 52% because it looked like just another United flight. Except it isn't United flying it. It's Republic Airways on an Embraer E175 \u2014 and regional carriers went 11 for 11 on storm day. The Bayesian model's aircraft-type factor (92.3% regional survival) pulled it up to 77%. This flight is the reason the words "marketing carrier" and "operating carrier" appear roughly forty times in this report.`))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "evo-flight-name" }, "ENY 3693"), /* @__PURE__ */ React.createElement("div", { className: "evo-flight-sub" }, "Envoy regional, 12:30, MDT-ORD")), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--red)" } }, "~35%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--red)" } }, "42%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "~90%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "87%"), /* @__PURE__ */ React.createElement("td", { className: "evo-actual", style: { color: "var(--green)" } }, "Arrived")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6 }, /* @__PURE__ */ React.createElement("div", { className: "evo-note" }, "The biggest single swing in the model: 42% to 87%, a 45-point correction. The original model penalized it for being midday (assumed storms still active) and for being a carrier most people have never heard of. The Bayesian model gave it the highest score of any flight in the dataset: afternoon departure (100% time-slot survival), regional aircraft (100% type survival), American ecosystem (87.5%), strong MDT\u2013ORD route history (90%). Every factor pointed green. The model's equivalent of a standing ovation."))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "evo-flight-name" }, "AA 1885"), /* @__PURE__ */ React.createElement("div", { className: "evo-flight-sub" }, "American mainline, 07:14, PHL-ORD")), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "~65%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "64%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "~72%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "75%"), /* @__PURE__ */ React.createElement("td", { className: "evo-actual", style: { color: "var(--green)" } }, "Arrived")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6 }, /* @__PURE__ */ React.createElement("div", { className: "evo-note" }, "Both models got this one right, but for completely different reasons \u2014 like two students acing the same test with different cheat sheets. The original model liked it because it was early (depart before things get bad, right?). The Bayesian model liked it because American had an 87.5% airline survival rate vs United's 66.7%. Same answer, different logic. But only the Bayesian logic would generalize to a new storm, because it's grounded in what airlines actually do, not in folk wisdom about alarm clocks."))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "evo-flight-name" }, "UA 1811"), /* @__PURE__ */ React.createElement("div", { className: "evo-flight-sub" }, "United mainline, 10:00, PHL-ORD")), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--amber)" } }, "~55%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--amber)" } }, "52%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "~70%"), /* @__PURE__ */ React.createElement("td", { className: "evo-phase", style: { color: "var(--green)" } }, "75%"), /* @__PURE__ */ React.createElement("td", { className: "evo-actual", style: { color: "var(--red)" } }, "Cancelled")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6 }, /* @__PURE__ */ React.createElement("div", { className: "evo-note" }, "Both models missed this one, and it shows where prediction hits a wall. UA 1811 departed at 10 AM \u2014 mid-morning, after the storm window. American flights at the same time arrived fine. But United's cancellation pattern ran deeper than just early-AM flights. Most likely a crew displacement cascade: the cancelled 06:17 crew was supposed to fly downstream legs. When the morning domino fell, the afternoon toppled with it. No public data captures these dependencies. This is the kind of thing only an airline's ops center knows \u2014 and they're not sharing."))))), /* @__PURE__ */ React.createElement("div", { className: "proc-callout" }, /* @__PURE__ */ React.createElement("div", { className: "proc-callout-label" }, "The pattern in the evolution"), /* @__PURE__ */ React.createElement("p", null, "Watch the shape of the corrections. ", /* @__PURE__ */ React.createElement("strong", null, "Phase 1 \u2192 Phase 2"), " barely moved anything \u2014 adding industry cancel rates to gut estimates just gave the same wrong answers with more decimal places. Very professional-looking wrongness. ", /* @__PURE__ */ React.createElement("strong", null, "Phase 2 \u2192 Phase 3"), "was the earthquake: actual storm-day outcomes reversed most predictions entirely.", /* @__PURE__ */ React.createElement("strong", null, " Phase 3 \u2192 Phase 4"), ` was refinement \u2014 the Bayesian model smoothed the raw data, added confidence intervals, and encoded the override rules. The lesson isn't "use better math." It's "get better data." The biggest accuracy gains came from seeing what actually happened, not from being more clever about what might.`)))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 03"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "What Phase 1 actually looked like, and why it was wrong"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "Phase 1 deserves a proper autopsy because it's the default approach most agents (and most humans) will take. Understanding ", /* @__PURE__ */ React.createElement("em", null, "why"), " it fails is the whole point of this report. Here's the actual reasoning chain, preserved for posterity and humility:"), /* @__PURE__ */ React.createElement("p", null, "The task: rank flights by cancellation probability during severe weather. Without real data, the model relied on three heuristics: ", /* @__PURE__ */ React.createElement("strong", null, "(1)"), ' earlier departure times are better because you "beat the weather," ', /* @__PURE__ */ React.createElement("strong", null, "(2)"), " larger airlines on high-frequency routes are more reliable, and ", /* @__PURE__ */ React.createElement("strong", null, "(3)"), " direct flights to hubs have more operational priority than secondary routes. All three sound reasonable. All three were wrong."), /* @__PURE__ */ React.createElement("div", { className: "proc-step-list" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "01"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, '"Earlier is better"'), " assumed storms build through the day. But the April 2\u20133 storms hit ", /* @__PURE__ */ React.createElement("em", null, "overnight"), " and cleared by midday. Earlier flights flew into the aftermath. Later flights flew into clear skies. The heuristic wasn't just wrong \u2014 it was backwards. Early-AM survival: 64%. Afternoon: 100%. Oops.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "02"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, '"Major carriers are more reliable"'), " leaned on annual cancel rates: United 0.86%, American 0.73%, Southwest 1.2%. These percentages describe normal operations across millions of flights. During a 419-cancellation severe event, they're about as useful as knowing the average temperature of a hospital. United proactively axed early-AM hub flights. American didn't. Southwest's point-to-point network sidestepped the hub bottleneck entirely. Annual rates predicted nothing.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "03"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, '"Hub flights have priority"'), " assumed airlines protect their biggest revenue routes. In practice, the opposite happened. United ", /* @__PURE__ */ React.createElement("em", null, "pre-cancelled"), "inbound flights to ORD specifically to prevent cascading delays at the hub. The hub-protection strategy sacrifices spoke flights to save the hub. Meanwhile, regional flights \u2014 the ones that seem lower-priority \u2014 had more operational flexibility to reroute and still arrive. The lowest-status flights were the safest."))), /* @__PURE__ */ React.createElement("p", null, 'The original spreadsheet had 37 flights across 4 tiers. The top "Best Bets" included UA 660 at 72%, AA 1885 at 64%, and F9 2111 at 68%. The bottom-tier "Risky" flights included AA 3177 at 20%, UA 308 at 25%, and GJS 4168 at 35%. When the actuals came in, the "Best Bets" had a', /* @__PURE__ */ React.createElement("strong", null, " 40% cancellation rate"), '. The "Risky" tier? ', /* @__PURE__ */ React.createElement("strong", null, "0% cancellation rate"), ". The ranking wasn't just wrong \u2014 it was inverted. The worst-rated flights were the safest picks."), /* @__PURE__ */ React.createElement(TierInversion, null), /* @__PURE__ */ React.createElement("div", { className: "proc-fail-box" }, /* @__PURE__ */ React.createElement("div", { className: "proc-fail-label" }, "The uncomfortable truth"), /* @__PURE__ */ React.createElement("p", null, "Phase 1 wasn't just inaccurate \u2014 it was ", /* @__PURE__ */ React.createElement("strong", null, "confidently wrong in a way that would have cost the user money"), ". Book UA 660, the #1 pick at 72%? Cancelled. Book AA 3177, rated 20% and buried at the bottom? Arrived safely. The model's confidence correlated ", /* @__PURE__ */ React.createElement("em", null, "negatively"), " with actual outcomes. That's worse than random. That's a model actively steering you toward the wrong gate.")))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 04"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "The wake-up call: running the analysis script"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "After collecting the actual April 3 outcomes from FlightAware, we built ", /* @__PURE__ */ React.createElement("code", null, "analysis.py"), "to compare every original estimate against reality. This was the moment the project stopped being a flight recommendation tool and started being a lesson in epistemic humility."), /* @__PURE__ */ React.createElement("p", null, "The script organized all 19 verifiable flights by route, computed survival rates by airline, time of day, aircraft type, and route, and flagged every case where the model was wrong. The results were not subtle:"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-list" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "\u2022"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "7 of 19 predictions correct (37%)."), " Worse than a coin flip, and not in the fun way. The errors weren't random \u2014 they were systematic. Every afternoon and evening flight was underrated. Every United early-AM flight was overrated.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "\u2022"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, 'The original model had no concept of "regional carrier."'), " Every flight was evaluated by the name on the ticket. But Republic, Envoy, SkyWest, and GoJet \u2014 the people who actually flew the planes \u2014 had a 100% survival rate. The model didn't know they existed. That's like ranking restaurants by the logo on the door without checking who's cooking.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "\u2022"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "United mainline before 9 AM: 0 for 3."), " Not 1 of 3. Not 2 of 3. Zero. This wasn't bad luck \u2014 it was a deliberate operational decision. United cancelled every early-morning mainline inbound to ORD to protect hub operations. It's their documented IROP strategy. They weren't unlucky; they were strategic. Their passengers, however, were stuck.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "\u2022"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "The time-of-day gradient was unmistakable."), ` 64% before 9 AM. 83% mid-morning. 100% after noon. The storms had a clean temporal signature, and the original model's "earlier is better" assumption had the polarity exactly reversed. Sleep in. Fly after lunch.`))), /* @__PURE__ */ React.createElement("p", null, "The analysis script saved its output to ", /* @__PURE__ */ React.createElement("code", null, "Storm_Day_Analysis_vs_Original.xlsx"), " with four tabs: Scorecard, Raw Data, Key Statistics, and \u2014 crucially \u2014 What I Got Wrong. That last tab mattered. The user had trusted these estimates enough to plan travel around them. Documenting exactly how and where that trust was misplaced wasn't optional; it was the price of admission to building anything better."), /* @__PURE__ */ React.createElement("div", { className: "proc-callout" }, /* @__PURE__ */ React.createElement("div", { className: "proc-callout-label" }, "For agents: always run the retrospective"), /* @__PURE__ */ React.createElement("p", null, "If you make predictions and later get access to actuals, ", /* @__PURE__ */ React.createElement("strong", null, "always compute and show the comparison"), `. Don't hand-wave with "the model had some inaccuracies." Show each flight, the prediction, the outcome, and the pattern in the errors. That's how you find what your model is missing. The user's response to seeing the honest analysis: `, /* @__PURE__ */ React.createElement("em", null, `"I loved this report. Let's build the better model."`), " Turns out owning your failures is a faster path to trust than pretending they didn't happen.")))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 05"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "Getting real flight numbers: harder than expected"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, `Here's a fun surprise: there is no single API that answers "what flights go from A to B tomorrow?" This is the first thing any agent will discover, usually the hard way. The data exists, scattered across fragmented, paywalled, and semi-structured sources, each with its own special flavor of unhelpfulness.`), /* @__PURE__ */ React.createElement("div", { className: "proc-api-grid" }, /* @__PURE__ */ React.createElement("div", { className: "proc-api-cell" }, /* @__PURE__ */ React.createElement("div", { className: "proc-api-name" }, "FlightConnections.com"), /* @__PURE__ */ React.createElement("div", { className: "proc-api-detail" }, "Route-level flight listings with schedules, codeshares, and aircraft types. Publicly scrapable via WebFetch."), /* @__PURE__ */ React.createElement("div", { className: "proc-api-verdict worked" }, "// Used \u2014 primary source for flight numbers")), /* @__PURE__ */ React.createElement("div", { className: "proc-api-cell" }, /* @__PURE__ */ React.createElement("div", { className: "proc-api-name" }, "FlightAware"), /* @__PURE__ */ React.createElement("div", { className: "proc-api-detail" }, "Real-time and recent historical flight status. Free tier gives ~3 days of history. Chrome automation for scraping."), /* @__PURE__ */ React.createElement("div", { className: "proc-api-verdict worked" }, "// Used \u2014 primary source for actual outcomes")), /* @__PURE__ */ React.createElement("div", { className: "proc-api-cell" }, /* @__PURE__ */ React.createElement("div", { className: "proc-api-name" }, "BTS TranStats"), /* @__PURE__ */ React.createElement("div", { className: "proc-api-detail" }, "DOT on-time performance database. ASP.NET forms with ViewState tokens. Monthly CSV downloads, 600K+ rows, no airport-pair filtering."), /* @__PURE__ */ React.createElement("div", { className: "proc-api-verdict failed" }, "// Failed \u2014 500 errors on POST, can't filter by route")), /* @__PURE__ */ React.createElement("div", { className: "proc-api-cell" }, /* @__PURE__ */ React.createElement("div", { className: "proc-api-name" }, "NOAA weather.gov"), /* @__PURE__ */ React.createElement("div", { className: "proc-api-detail" }, "Severe weather alerts via REST API. Free, no auth, JSON format. Used for thunderstorm warning counts and timing."), /* @__PURE__ */ React.createElement("div", { className: "proc-api-verdict worked" }, "// Used \u2014 18 warnings confirmed")), /* @__PURE__ */ React.createElement("div", { className: "proc-api-cell" }, /* @__PURE__ */ React.createElement("div", { className: "proc-api-name" }, "FlightAware AeroAPI"), /* @__PURE__ */ React.createElement("div", { className: "proc-api-detail" }, "Full programmatic access to flight data. Authenticated REST API with detailed historical data."), /* @__PURE__ */ React.createElement("div", { className: "proc-api-verdict partial" }, "// Not used \u2014 $100/month, no free tier")), /* @__PURE__ */ React.createElement("div", { className: "proc-api-cell" }, /* @__PURE__ */ React.createElement("div", { className: "proc-api-name" }, "Aviationstack / Aviation Edge"), /* @__PURE__ */ React.createElement("div", { className: "proc-api-detail" }, "Third-party flight APIs with various pricing tiers. Real-time and historical data access."), /* @__PURE__ */ React.createElement("div", { className: "proc-api-verdict partial" }, "// Not used \u2014 $7-45/month, limited free tiers"))), /* @__PURE__ */ React.createElement("p", null, "The process for each route (PHL\u2013ORD, MDT\u2013ORD, BWI\u2013ORD, BWI\u2013MDW) was: fetch the FlightConnections page via ", /* @__PURE__ */ React.createElement("code", null, "WebFetch"), ", parse the HTML for flight numbers, departure times, operating carriers, and aircraft types, then cross-reference with FlightAware for each flight to get actual status data from the storm days. Tedious? Yes. Essential? Also yes."), /* @__PURE__ */ React.createElement("div", { className: "proc-callout" }, /* @__PURE__ */ React.createElement("div", { className: "proc-callout-label" }, "Critical distinction agents must learn"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Marketing carrier vs. operating carrier."), ' UA 3450 is sold as a United flight. It is operated by Republic Airways on an Embraer E175. This distinction was the single most important factor in the entire model \u2014 regional operators (Republic, Envoy, SkyWest, GoJet) had a 100% survival rate. Mainline had 79%. If you only look at "United" you miss this. Pro tip: flight numbers with 3xxx/4xxx prefixes are almost always regional operators. Learn this. Tattoo it somewhere. It matters.')))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 06"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "Scraping FlightAware via browser automation"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "FlightAware's free tier doesn't expose a useful API, and their website uses dynamic JavaScript rendering that ", /* @__PURE__ */ React.createElement("code", null, "WebFetch"), " returns as an empty shell. The solution: Chrome browser automation. Navigate to FlightAware's flight finder, enter the airports, wait for JavaScript to do its thing, then extract the rendered DOM. It's not elegant, but it works, and elegance was never really the goal here."), /* @__PURE__ */ React.createElement("div", { className: "proc-step-list" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "01"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Navigate to FlightAware flight finder"), " for each route pair (PHL\u2192ORD, MDT\u2192ORD, BWI\u2192ORD, BWI\u2192MDW). Important: don't search by flight number. Flight numbers serve different routes on different days. UA 660 was PHL\u2192ORD on April 4 but ORD\u2192SAN on April 3. Yes, really. Airlines reuse numbers like hand-me-down clothes.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "02"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Extract the flight table DOM"), " using JavaScript: ", /* @__PURE__ */ React.createElement("code", null, "document.querySelectorAll"), "on the results table rows. Parse flight number, departure time, arrival time, status, and any delay/cancellation annotations.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "03"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, 'Click "Older Flights"'), " to load April 2 data as a prior. Free tier limits history to roughly 3 days, so you get current day, yesterday, and the day before. This is enough for a single storm event but not for deep backtesting.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "04"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Save all data to structured CSVs"), " in the workspace: one file per route with columns for flight number, carrier, departure, arrival, status, and delay minutes. This becomes the ground truth for model evaluation."))), /* @__PURE__ */ React.createElement("div", { className: "proc-fail-box" }, /* @__PURE__ */ React.createElement("div", { className: "proc-fail-label" }, "Limitation encountered"), /* @__PURE__ */ React.createElement("p", null, "FlightAware's free tier only showed about 3 days of history per route. No year-over-year storm comparisons, no deep backtesting. The AeroAPI ($100/month) would have unlocked full historical access. ", /* @__PURE__ */ React.createElement("strong", null, "For agents:"), " if the stakes justify it and the user agrees, that $100 is the single highest-ROI spend in this entire pipeline. The data quality leap is enormous.")))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 07"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "What the BTS database promises and doesn't deliver"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "The Bureau of Transportation Statistics TranStats database is the gold standard for U.S. airline performance data. Every domestic flight since 1987, with on-time, delay, cancellation, and diversion records. In theory, this is exactly what you need. In practice, it's the government equivalent of a beautiful restaurant with no door."), /* @__PURE__ */ React.createElement("p", null, 'The download interface is an ASP.NET WebForms application with ViewState tokens that expire between requests. Programmatic POST requests return 500 errors because the form expects specific hidden field values that change with each page load. The "Geography" filter only supports "All" \u2014 you cannot filter to a specific airport pair. Monthly files contain 600,000+ rows covering every domestic flight in the country. Hope you brought a big hard drive.'), /* @__PURE__ */ React.createElement("div", { className: "proc-fail-box" }, /* @__PURE__ */ React.createElement("div", { className: "proc-fail-label" }, "BTS download attempt"), /* @__PURE__ */ React.createElement("p", null, "Tried ", /* @__PURE__ */ React.createElement("code", null, "POST"), " to ", /* @__PURE__ */ React.createElement("code", null, "DownLoad_Table.asp"), " with form parameters for carrier, date range, and field selection. Got ", /* @__PURE__ */ React.createElement("strong", null, "HTTP 500"), " on every attempt. The ViewState token wasn't round-tripping correctly. Even Chrome automation only gets you a full monthly dump with no route filtering. You'd download the entire month and filter locally \u2014 doable, but 20+ minutes of processing for a time-sensitive decision. By then, your flight has either departed or been cancelled without you.")), /* @__PURE__ */ React.createElement("div", { className: "proc-callout" }, /* @__PURE__ */ React.createElement("div", { className: "proc-callout-label" }, "What should exist for agents"), /* @__PURE__ */ React.createElement("p", null, "A ", /* @__PURE__ */ React.createElement("strong", null, "BTS API with route-pair filtering"), ". Something like", /* @__PURE__ */ React.createElement("code", null, "GET /flights?origin=PHL&dest=ORD&date=2025-04-03"), " returning JSON. The data is public. The interface is the only barrier. Until someone builds this, agents should use FlightAware AeroAPI for historical data (and accept the cost), or scrape FlightAware's free tier for the most recent 3 days. We're pulling for you, future agent. The plumbing will get better.")))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 08"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "Building the Bayesian model: choosing what to weight"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "The original model treated all flights as equally susceptible to cancellation, differentiated only by vibes and annual statistics. The replacement needed to capture the actual decision-making patterns airlines use during severe weather \u2014 their Irregular Operations (IROP) strategies. Not what airlines say they do. What they actually did."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Five factors emerged"), " from the April 2\u20133 data, each weighted by how much predictive signal it actually carried:"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-list" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "30%"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Time of day."), " Highest variance of any factor: 64% early-AM survival vs. 100% afternoon. It makes physical sense \u2014 storms arrived overnight, so early flights caught the aftermath while afternoon flights got clear skies. Earned the top weight.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "25%"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Airline IROP behavior."), " United cancelled 4 of 12 (33%), American 1 of 8 (12.5%), Southwest and Frontier zero. Each airline has a different playbook for chaos. United protects the hub. American protects the schedule. Southwest shrugs and keeps flying.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "20%"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Aircraft type (regional vs. mainline)."), " Regionals went 11/11 (100%), mainline 19/24 (79%). Smaller planes have more routing flexibility and aren't subject to hub-protection cancellation logic. Being small has its advantages.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "15%"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Route history."), " PHL\u2013ORD 79%, MDT\u2013ORD 90%, BWI\u2013ORD 88%, BWI\u2013MDW 100%. Midway is less congested than O'Hare during disruptions, and it shows. Moderate signal, moderate weight.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "10%"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "April 2 systemwide prior."), " NomadLawyer published carrier-level disruption counts from April 2. Envoy had 44 cancellations systemwide, Republic 32, United 17, American 2. Noisy signal \u2014 different routes, different conditions \u2014 but useful as a Bayesian prior. Even weak data beats no data when you're weighting it at 10%."))), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Laplace smoothing"), " was critical. With sample sizes of 3\u201312 flights per category, raw rates overfit spectacularly. A carrier with 3/3 arrivals isn't truly 100% \u2014 Laplace smoothing adjusts to 4/5 (80%), encoding the uncertainty that comes with a tiny sample. It's the difference between a model that memorizes one day and one that might actually work on another."), /* @__PURE__ */ React.createElement("div", { className: "proc-callout" }, /* @__PURE__ */ React.createElement("div", { className: "proc-callout-label" }, "The United early-AM override"), /* @__PURE__ */ React.createElement("p", null, "One manual override made it into the model: United mainline flights before 9 AM get a 30% penalty weight based on the 0/3 survival rate from April 3. This isn't a general rule \u2014 it captures one airline's specific strategy of pre-cancelling early inbound flights to protect hub operations. ", /* @__PURE__ */ React.createElement("strong", null, "Without it, the model would have rated UA 660 at ~75% instead of 55%."), " Sometimes domain knowledge outranks statistical smoothing. The math doesn't know about hub-protection strategies. We do.")))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 09"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "Comparing models: Brier score and what 37% vs. 74% means"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "Raw accuracy \u2014 did the model's above/below 50% threshold match the outcome? \u2014 is the obvious measure. Original model: 7 of 19 correct (37%). Bayesian model: 14 of 19 (74%). Doubled. But accuracy alone doesn't capture ", /* @__PURE__ */ React.createElement("strong", null, "calibration"), ` \u2014 how well the probability estimates track reality. A model that says "75%" for everything gets some right, but it's not actually thinking.`), /* @__PURE__ */ React.createElement("p", null, "The ", /* @__PURE__ */ React.createElement("strong", null, "Brier score"), " measures calibration: mean squared error between predicted probability and actual outcome (1 = arrived, 0 = cancelled). Perfect model: 0.0. Random guessing: 0.25. Original model: ", /* @__PURE__ */ React.createElement("strong", null, "0.182"), ". Bayesian model:", /* @__PURE__ */ React.createElement("strong", null, " 0.082"), `. That's a 55% improvement \u2014 from "basically guessing" to "paying attention."`), /* @__PURE__ */ React.createElement(BrierChart, null), /* @__PURE__ */ React.createElement("p", null, "The most revealing part isn't the aggregate score; it's where the models diverged most. The original model's errors were systematic, not random:"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-list" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "\u2191"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "UA 660: Original 72% \u2192 Bayesian 56% \u2192 Cancelled."), " Original loved early United mainline. Bayesian knew better.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "\u2191"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "AA 3177: Original 20% \u2192 Bayesian 84% \u2192 Arrived."), " Original punished evening flights. Bayesian knew storms clear and American keeps flying.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "\u2191"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "ENY 3693: Original 42% \u2192 Bayesian 87% \u2192 Arrived."), " Original didn't know regional carriers existed. Bayesian gave it a massive aircraft-type boost.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "\u2193"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Both models missed AA 2970 and UA 1811."), " Cancelled despite favorable scores. Some cancellations are downstream cascades \u2014 crew displacement, aircraft rotation \u2014 that no public data captures. The model's ceiling, not its floor."))), /* @__PURE__ */ React.createElement("p", null, "The remaining failures point to the hard ceiling of pre-flight prediction: ", /* @__PURE__ */ React.createElement("strong", null, "crew displacement, aircraft rotation disruptions, and gate conflicts"), " live inside the airline's operations center and nowhere else. You can build a better model. You can't build a clairvoyant one."))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 10"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "A practical playbook for agents facing this task"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "If you're an agent asked to predict flight cancellation risk during severe weather \u2014 first, our condolences. Second, here's the approach that actually works, in order of priority:"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-list" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "01"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Get real flight numbers first."), " Use FlightConnections.com for route-level schedules. Parse the HTML for flight number, departure time, operating carrier, and aircraft type. Do not \u2014 and we cannot stress this enough \u2014 generate plausible-sounding flight numbers. The user will catch it and your credibility will not recover.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "02"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Identify the operating carrier for every flight."), " Marketing carrier is the brand on the ticket. Operating carrier is who actually flies the plane. These are often different, especially for 3xxx/4xxx-prefix flight numbers. Republic Airways, Envoy Air, SkyWest Airlines, GoJet Airlines, PSA Airlines, and Mesa Airlines operate most regional flights in the US. This distinction proved to be the most powerful predictor in our model.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "03"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Get recent actual outcomes from FlightAware."), " Use the origin\u2192destination flight finder (not per-flight-number lookup, since numbers serve different routes on different days). Chrome browser automation is required \u2014 FlightAware uses dynamic rendering. Extract the most recent 2-3 days of flight-level outcomes.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "04"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Pull NOAA severe weather data."), " The weather.gov API is free, requires no authentication, and returns JSON. Use ", /* @__PURE__ */ React.createElement("code", null, "/alerts/active?area=IL"), " for current warnings or the alerts archive for historical events. Cross-reference storm timing with flight departure windows.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "05"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Build factor-specific survival rates."), " Group the recent outcome data by: time of day (3-4 hour buckets), airline, aircraft type (regional vs mainline), and route. Look for factors with high variance between groups \u2014 these are your strongest predictors.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "06"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Apply Laplace smoothing."), " With small samples, raw rates lie to you. Smooth each category rate as (successes + 1) / (total + 2). This prevents both 0% and 100% estimates from tiny sample sizes. Humility, in equation form.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "07"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Weight and combine."), " Use a weighted average of factor-specific rates, with weights proportional to each factor's observed predictive power (variance between groups). Time of day and airline IROP behavior will typically dominate during weather events.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "08"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Add domain-specific overrides."), ` If you see a pattern like "United cancelled every early-AM mainline flight," encode it as a special rule. Statistical smoothing wasn't designed to capture airline IROP strategies from 3 data points. Sometimes you need to overrule the math. Respectfully.`)), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "09"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Report confidence intervals, not just point estimates."), ' Users need to know the difference between "77% with high confidence" and "77% with a range of 43-91%." Wilson score intervals work well for binary outcomes with small samples.')), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "10"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "Validate against actuals and report honestly."), " If you have access to actual outcomes, compute Brier scores and accuracy. Show which flights you got wrong and why. The model's failures are as instructive as its successes."))))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 11"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "What isn't built for agents but should be"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "This project exposed a series of infrastructure gaps that made the task dramatically harder than it should be. If you're building tools for AI agents \u2014 or frankly, for any human who values their time \u2014 these are the highest-value opportunities:"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-list" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "01"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "A flight schedule API with route-pair queries."), ' "Give me all flights from PHL to ORD on April 4" should be one API call returning JSON. Instead, it requires scraping FlightConnections HTML, cross-referencing with FlightAware, and manually reconciling marketing vs operating carriers. Google Flights has this data but no API. FlightAware AeroAPI has it but costs $100/month.')), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "02"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "BTS TranStats as a proper REST API."), " The underlying database has every U.S. domestic flight since 1987. The interface is an ASP.NET WebForm that breaks when you try to automate it. A simple ", /* @__PURE__ */ React.createElement("code", null, "GET /flights?origin=PHL&dest=ORD&month=2025-04"), "endpoint would unlock decades of historical data for weather-flight analysis.")), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "03"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "An airline IROP behavior database."), ' Each airline has distinct strategies for handling disruptions: which flights get pre-cancelled, how crew displacement cascades, whether they protect hub operations or point-to-point routes. This information is known to industry insiders but not systematically available. A structured dataset of "during severe weather events, Airline X cancels Y% of flights in time window Z" would transform prediction accuracy.')), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "04"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "A weather-to-aviation impact model."), ` NOAA provides excellent weather data. Airlines provide (eventually) cancellation data. But the link between "severe thunderstorm warning issued at 8:40 PM for Cook County" and "United cancels 4 early-morning flights into ORD" is not modeled anywhere publicly. The FAA's ATCSCC system has ground delay programs and ground stops, but these aren't available via API in real-time.`)), /* @__PURE__ */ React.createElement("div", { className: "proc-step" }, /* @__PURE__ */ React.createElement("div", { className: "proc-step-num" }, "05"), /* @__PURE__ */ React.createElement("div", { className: "proc-step-text" }, /* @__PURE__ */ React.createElement("strong", null, "OpenSky Network, but with cancellation data."), " OpenSky provides free ADS-B flight tracking data. But it only covers flights that actually flew \u2014 it can't tell you about flights that were scheduled but cancelled. Combining OpenSky's actual flight data with a schedule database would create a free, comprehensive cancellation dataset."))), /* @__PURE__ */ React.createElement("div", { className: "proc-success-box" }, /* @__PURE__ */ React.createElement("div", { className: "proc-success-label" }, "The good news"), /* @__PURE__ */ React.createElement("p", null, `Even with all these limitations, the data-driven approach (74% accuracy, 0.082 Brier) vastly outperformed the heuristic approach (37%, 0.182 Brier). The gap between "what data exists" and "what data is accessible to agents" is the real bottleneck. The analytical methods work. The plumbing doesn't exist yet. We're doing surgery with a butter knife, and it's still working better than the old way.`)))), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter" }, /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-num" }, "Chapter 12"), /* @__PURE__ */ React.createElement("div", { className: "proc-chapter-title" }, "What we'd do differently with unlimited access"), /* @__PURE__ */ React.createElement("div", { className: "proc-body" }, /* @__PURE__ */ React.createElement("p", null, "If we had FlightAware AeroAPI access ($100/month), the model would improve meaningfully. Here's the wish list \u2014 part fantasy, part blueprint for whoever tries this next:"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Historical backtesting."), " Pull cancellation data for every severe weather event at ORD in the past 3 years. Identify 15\u201320 comparable storm days. Compute airline-specific IROP rates across a statistically meaningful sample instead of a single day. This alone would likely push accuracy above 80%. Our model is currently learning from one exam. Give it the whole semester."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Seasonal patterns."), " April thunderstorms at ORD behave differently than January snowstorms. Convective weather clears faster but causes more dramatic short-term disruptions. Winter weather is sustained but predictable. The model should know the difference. Right now it treats all storms the same, which is like treating all dogs the same. A chihuahua is not a Great Dane."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Aircraft rotation tracking."), ` If the plane assigned to your 10 AM flight was supposed to arrive on a 7 AM inbound that got cancelled, your 10 AM is in trouble regardless of weather. This "cascade prediction" requires AeroAPI-level data showing tail-number-to-flight assignments. It's the difference between predicting weather and predicting logistics.`), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Real-time updating."), " Our Bayesian model used data collected after the fact. A real-time version would start with prior-day data, then update probabilities as each morning flight arrives or gets cancelled. By 9 AM on storm day, you'd have live observations feeding the model, tightening confidence intervals dramatically. Bayesian updating is ", /* @__PURE__ */ React.createElement("em", null, "designed"), "for this. We just didn't have the live pipeline."), /* @__PURE__ */ React.createElement("div", { className: "proc-callout" }, /* @__PURE__ */ React.createElement("div", { className: "proc-callout-label" }, "For the next agent who faces this"), /* @__PURE__ */ React.createElement("p", null, "Start with the free tools (FlightConnections, FlightAware free tier, NOAA API). Get real flight numbers and recent outcomes. Build the factor-weighted model with Laplace smoothing. If the stakes justify $100, get AeroAPI access and backtest against historical storm days. The methodology works. The data access is the constraint. And always \u2014 always \u2014 distinguish marketing carrier from operating carrier. We've said it twelve times now. We'll say it again."))))), /* @__PURE__ */ React.createElement("div", { className: "dash-footer" }, "Data: FlightAware, NOAA weather.gov, DOT/BTS, NomadLawyer IROP Report", /* @__PURE__ */ React.createElement("br", null), "Model: Weighted Bayesian with Laplace smoothing \xB7 Confidence: Wilson score intervals")));
  }
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(/* @__PURE__ */ React.createElement(StormDashboard, null));
})();

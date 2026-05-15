/* ============================================================
   COOLING CARE — Interactive scatter (hand-rolled, no CDN)
   NDVI (clinic 50m buffer) vs Land Surface Temperature
   Dodoma Region, Tanzania, September 2025

   --------------------------------------------------------
   Data: 220 rural primary health care clinics in the Dodoma
   Region, Tanzania. NDVI derived from NICFI Planet imagery
   (50 m buffer around each facility); LST from Landsat 9
   thermal band. Acquisition: September 2025 (dry season).
   Authors' analysis, 2026.
   --------------------------------------------------------
   ============================================================ */

const COLORS = {
  paper: "#faf6ed",
  vellum: "#efe8d4",
  ink: "#1c2820",
  inkSoft: "#2d3a32",
  forest: "#2c4a3a",
  forestDeep: "#1f3528",
  terracotta: "#b85a3a",
  terracottaDeep: "#8b3f24",
  stone: "#877f6a",
  rule: "#c9bf9f",
  ruleSoft: "#ddd4b5",
};

/* ---------- dataset (220 rural clinics, Dodoma Region) ---------- */
const DATA = [
  {ndvi:0.281,lst:43.967}, {ndvi:0.265,lst:46.833}, {ndvi:0.261,lst:45.458}, {ndvi:0.265,lst:47.424},
  {ndvi:0.245,lst:44.85}, {ndvi:0.232,lst:41.653}, {ndvi:0.307,lst:44.302}, {ndvi:0.266,lst:45.084},
  {ndvi:0.269,lst:47.071}, {ndvi:0.261,lst:48.39}, {ndvi:0.266,lst:45.415}, {ndvi:0.272,lst:45.05},
  {ndvi:0.225,lst:44.002}, {ndvi:0.282,lst:46.13}, {ndvi:0.272,lst:45.037}, {ndvi:0.26,lst:45.247},
  {ndvi:0.265,lst:44.253}, {ndvi:0.269,lst:44.334}, {ndvi:0.311,lst:47.12}, {ndvi:0.271,lst:47.366},
  {ndvi:0.253,lst:49.49}, {ndvi:0.381,lst:45.19}, {ndvi:0.249,lst:46.04}, {ndvi:0.276,lst:40.41},
  {ndvi:0.284,lst:43.23}, {ndvi:0.282,lst:46.913}, {ndvi:0.358,lst:45.433}, {ndvi:0.387,lst:45.469},
  {ndvi:0.391,lst:45.271}, {ndvi:0.499,lst:37.194}, {ndvi:0.298,lst:45.092}, {ndvi:0.311,lst:43.542},
  {ndvi:0.503,lst:37.27}, {ndvi:0.48,lst:31.876}, {ndvi:0.394,lst:41.437}, {ndvi:0.381,lst:43.061},
  {ndvi:0.44,lst:36.411}, {ndvi:0.373,lst:41.92}, {ndvi:0.317,lst:45.697}, {ndvi:0.319,lst:42.339},
  {ndvi:0.311,lst:44.322}, {ndvi:0.335,lst:48.669}, {ndvi:0.298,lst:42.268}, {ndvi:0.325,lst:44.341},
  {ndvi:0.408,lst:34.394}, {ndvi:0.305,lst:43.417}, {ndvi:0.315,lst:43.681}, {ndvi:0.362,lst:47.611},
  {ndvi:0.284,lst:45.751}, {ndvi:0.359,lst:42.837}, {ndvi:0.313,lst:42.385}, {ndvi:0.345,lst:40.608},
  {ndvi:0.327,lst:43.143}, {ndvi:0.294,lst:45.783}, {ndvi:0.354,lst:43.545}, {ndvi:0.368,lst:40.057},
  {ndvi:0.428,lst:40.792}, {ndvi:0.439,lst:42.734}, {ndvi:0.439,lst:40.337}, {ndvi:0.377,lst:42.865},
  {ndvi:0.406,lst:41.26}, {ndvi:0.308,lst:41.92}, {ndvi:0.35,lst:40.374}, {ndvi:0.381,lst:41.815},
  {ndvi:0.231,lst:44.108}, {ndvi:0.23,lst:43.094}, {ndvi:0.296,lst:44.695}, {ndvi:0.296,lst:46.053},
  {ndvi:0.296,lst:43.166}, {ndvi:0.29,lst:43.456}, {ndvi:0.271,lst:43.83}, {ndvi:0.256,lst:45.653},
  {ndvi:0.282,lst:46.471}, {ndvi:0.237,lst:42.458}, {ndvi:0.257,lst:44.778}, {ndvi:0.383,lst:39.532},
  {ndvi:0.322,lst:46.592}, {ndvi:0.311,lst:37.525}, {ndvi:0.286,lst:41.276}, {ndvi:0.249,lst:43.637},
  {ndvi:0.238,lst:40.83}, {ndvi:0.295,lst:39.096}, {ndvi:0.32,lst:46.157}, {ndvi:0.33,lst:44.627},
  {ndvi:0.294,lst:48.432}, {ndvi:0.308,lst:46.283}, {ndvi:0.245,lst:44.91}, {ndvi:0.301,lst:44.255},
  {ndvi:0.28,lst:45.266}, {ndvi:0.292,lst:45.155}, {ndvi:0.226,lst:41.423}, {ndvi:0.337,lst:43.844},
  {ndvi:0.339,lst:44.273}, {ndvi:0.293,lst:42.332}, {ndvi:0.26,lst:39.661}, {ndvi:0.397,lst:41.057},
  {ndvi:0.355,lst:42.707}, {ndvi:0.423,lst:42.811}, {ndvi:0.334,lst:42.63}, {ndvi:0.367,lst:42.37},
  {ndvi:0.367,lst:37.513}, {ndvi:0.375,lst:44.99}, {ndvi:0.313,lst:39.66}, {ndvi:0.333,lst:38.93},
  {ndvi:0.361,lst:45.547}, {ndvi:0.363,lst:43.209}, {ndvi:0.359,lst:40.105}, {ndvi:0.382,lst:41.397},
  {ndvi:0.321,lst:41.082}, {ndvi:0.305,lst:44.824}, {ndvi:0.311,lst:45.352}, {ndvi:0.344,lst:44.027},
  {ndvi:0.276,lst:43.675}, {ndvi:0.355,lst:45.736}, {ndvi:0.325,lst:40.56}, {ndvi:0.368,lst:41.685},
  {ndvi:0.359,lst:40.603}, {ndvi:0.36,lst:41.92}, {ndvi:0.32,lst:41.052}, {ndvi:0.379,lst:38.372},
  {ndvi:0.329,lst:44.276}, {ndvi:0.3,lst:40.666}, {ndvi:0.321,lst:41.893}, {ndvi:0.344,lst:41.155},
  {ndvi:0.437,lst:40.804}, {ndvi:0.357,lst:37.03}, {ndvi:0.323,lst:38.886}, {ndvi:0.298,lst:41.206},
  {ndvi:0.326,lst:40.132}, {ndvi:0.345,lst:37.056}, {ndvi:0.347,lst:38.636}, {ndvi:0.333,lst:38.342},
  {ndvi:0.328,lst:38.619}, {ndvi:0.332,lst:38.296}, {ndvi:0.355,lst:36.452}, {ndvi:0.309,lst:39.219},
  {ndvi:0.305,lst:39.674}, {ndvi:0.424,lst:41.356}, {ndvi:0.297,lst:44.226}, {ndvi:0.284,lst:38.289},
  {ndvi:0.269,lst:45.376}, {ndvi:0.339,lst:44.242}, {ndvi:0.367,lst:45.322}, {ndvi:0.333,lst:40.882},
  {ndvi:0.31,lst:42.086}, {ndvi:0.314,lst:41.45}, {ndvi:0.305,lst:45.411}, {ndvi:0.284,lst:42.461},
  {ndvi:0.249,lst:42.098}, {ndvi:0.362,lst:37.485}, {ndvi:0.348,lst:39.846}, {ndvi:0.333,lst:40.464},
  {ndvi:0.347,lst:36.323}, {ndvi:0.372,lst:35.901}, {ndvi:0.396,lst:37.539}, {ndvi:0.346,lst:39.798},
  {ndvi:0.349,lst:38.023}, {ndvi:0.342,lst:41.507}, {ndvi:0.307,lst:37.455}, {ndvi:0.347,lst:36.95},
  {ndvi:0.31,lst:43.144}, {ndvi:0.327,lst:38.352}, {ndvi:0.395,lst:44.077}, {ndvi:0.434,lst:36.178},
  {ndvi:0.37,lst:37.988}, {ndvi:0.384,lst:37.399}, {ndvi:0.368,lst:40.325}, {ndvi:0.341,lst:41.367},
  {ndvi:0.335,lst:43.234}, {ndvi:0.45,lst:42.667}, {ndvi:0.289,lst:42.112}, {ndvi:0.441,lst:32.933},
  {ndvi:0.502,lst:35.727}, {ndvi:0.472,lst:32.157}, {ndvi:0.385,lst:33.925}, {ndvi:0.526,lst:37.429},
  {ndvi:0.494,lst:36.757}, {ndvi:0.425,lst:32.664}, {ndvi:0.338,lst:34.994}, {ndvi:0.393,lst:37.964},
  {ndvi:0.436,lst:37.274}, {ndvi:0.348,lst:45.207}, {ndvi:0.296,lst:38.71}, {ndvi:0.271,lst:45.846},
  {ndvi:0.28,lst:45.73}, {ndvi:0.312,lst:47.64}, {ndvi:0.3,lst:43.916}, {ndvi:0.28,lst:42.562},
  {ndvi:0.344,lst:41.247}, {ndvi:0.29,lst:42.12}, {ndvi:0.33,lst:43.382}, {ndvi:0.321,lst:44.242},
  {ndvi:0.295,lst:42.996}, {ndvi:0.344,lst:44.795}, {ndvi:0.288,lst:41.844}, {ndvi:0.275,lst:43.718},
  {ndvi:0.309,lst:42.089}, {ndvi:0.29,lst:41.962}, {ndvi:0.328,lst:43.803}, {ndvi:0.277,lst:43.943},
  {ndvi:0.247,lst:45.768}, {ndvi:0.267,lst:43.234}, {ndvi:0.245,lst:42.024}, {ndvi:0.213,lst:40.047},
  {ndvi:0.324,lst:43.622}, {ndvi:0.381,lst:38.062}, {ndvi:0.323,lst:46.431}, {ndvi:0.267,lst:47.845},
  {ndvi:0.353,lst:45.058}, {ndvi:0.307,lst:45.979}, {ndvi:0.403,lst:39.195}, {ndvi:0.222,lst:41.929},
  {ndvi:0.243,lst:45.655}, {ndvi:0.252,lst:42.026}, {ndvi:0.407,lst:43.178}, {ndvi:0.38,lst:41.426},
  {ndvi:0.357,lst:43.06}, {ndvi:0.349,lst:42.218}, {ndvi:0.3,lst:40.799}, {ndvi:0.398,lst:41.495}
];

/* ---------- OLS regression ---------- */
function ols(points) {
  const n = points.length;
  const mx = points.reduce((s, p) => s + p.ndvi, 0) / n;
  const my = points.reduce((s, p) => s + p.lst, 0) / n;
  let num = 0, den = 0, sst = 0;
  for (const p of points) {
    num += (p.ndvi - mx) * (p.lst - my);
    den += (p.ndvi - mx) ** 2;
    sst += (p.lst - my) ** 2;
  }
  const slope = num / den;
  const intercept = my - slope * mx;
  const r = num / Math.sqrt(den * sst);
  return { slope, intercept, r };
}
const { slope, intercept, r } = ols(DATA);

/* ---------- chart layout ---------- */
const X_MIN = 0.15, X_MAX = 0.60;
const Y_MIN = 30, Y_MAX = 50;
const X_TICKS = [0.2, 0.3, 0.4, 0.5, 0.6];
const Y_TICKS = [30, 35, 40, 45, 50];
const PAD = { top: 26, right: 30, bottom: 60, left: 70 };

const svgNS = "http://www.w3.org/2000/svg";
function el(name, attrs = {}, children = []) {
  const n = document.createElementNS(svgNS, name);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null) continue;
    n.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c === null || c === undefined) continue;
    if (c instanceof Node) n.appendChild(c);
    else n.appendChild(document.createTextNode(String(c)));
  }
  return n;
}

/* ---------- main render ---------- */
function render() {
  const host = document.getElementById("chart");
  if (!host) return;

  const rect = host.getBoundingClientRect();
  const W = Math.max(420, Math.floor(rect.width));
  const H = Math.max(320, Math.floor(rect.height));

  while (host.firstChild) host.removeChild(host.firstChild);

  const sx = ndvi => PAD.left + (ndvi - X_MIN) / (X_MAX - X_MIN) * (W - PAD.left - PAD.right);
  const sy = lst => PAD.top + (1 - (lst - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD.top - PAD.bottom);

  const svg = el("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: W,
    height: H,
    xmlns: svgNS,
    role: "img",
    "aria-label": "Scatter plot of clinic-buffer NDVI versus land surface temperature.",
  });

  // plot background
  svg.appendChild(el("rect", {
    x: PAD.left, y: PAD.top,
    width: W - PAD.left - PAD.right,
    height: H - PAD.top - PAD.bottom,
    fill: COLORS.paper, stroke: "none",
  }));

  // contextual zones
  svg.appendChild(el("rect", {
    x: sx(X_MIN), y: sy(50),
    width: sx(0.28) - sx(X_MIN),
    height: sy(44) - sy(50),
    fill: COLORS.terracotta, opacity: 0.06,
  }));
  svg.appendChild(el("rect", {
    x: sx(0.40), y: sy(38),
    width: sx(X_MAX) - sx(0.40),
    height: sy(Y_MIN) - sy(38),
    fill: COLORS.forest, opacity: 0.06,
  }));

  // gridlines
  const grid = el("g", { stroke: COLORS.ruleSoft, "stroke-width": 0.5 });
  for (const xt of X_TICKS) {
    grid.appendChild(el("line", { x1: sx(xt), x2: sx(xt), y1: PAD.top, y2: H - PAD.bottom }));
  }
  for (const yt of Y_TICKS) {
    grid.appendChild(el("line", { y1: sy(yt), y2: sy(yt), x1: PAD.left, x2: W - PAD.right }));
  }
  svg.appendChild(grid);

  // axes
  const axes = el("g", { stroke: COLORS.ink, "stroke-width": 1, fill: "none" });
  axes.appendChild(el("line", { x1: PAD.left, x2: W - PAD.right, y1: H - PAD.bottom, y2: H - PAD.bottom }));
  axes.appendChild(el("line", { x1: PAD.left, x2: PAD.left, y1: PAD.top, y2: H - PAD.bottom }));
  svg.appendChild(axes);

  // tick marks + labels
  const ticks = el("g", {
    "font-family": "'Source Serif 4', Georgia, serif",
    "font-size": "11.5",
    fill: COLORS.inkSoft,
  });
  for (const xt of X_TICKS) {
    ticks.appendChild(el("line", {
      x1: sx(xt), x2: sx(xt),
      y1: H - PAD.bottom, y2: H - PAD.bottom + 5,
      stroke: COLORS.ink, "stroke-width": 1,
    }));
    ticks.appendChild(el("text", {
      x: sx(xt), y: H - PAD.bottom + 18,
      "text-anchor": "middle",
    }, xt.toFixed(1)));
  }
  for (const yt of Y_TICKS) {
    ticks.appendChild(el("line", {
      x1: PAD.left, x2: PAD.left - 5,
      y1: sy(yt), y2: sy(yt),
      stroke: COLORS.ink, "stroke-width": 1,
    }));
    ticks.appendChild(el("text", {
      x: PAD.left - 9, y: sy(yt) + 4,
      "text-anchor": "end",
    }, yt));
  }
  svg.appendChild(ticks);

  // axis titles
  const titles = el("g", {
    "font-family": "'Source Serif 4', Georgia, serif",
    "font-size": "12.5",
    fill: COLORS.inkSoft,
  });
  titles.appendChild(el("text", {
    x: PAD.left + (W - PAD.left - PAD.right) / 2,
    y: H - 14,
    "text-anchor": "middle",
  }, "Mean NDVI within 50 m of clinic"));
  titles.appendChild(el("text", {
    x: 0, y: 0,
    "text-anchor": "middle",
    transform: `translate(20, ${PAD.top + (H - PAD.top - PAD.bottom) / 2}) rotate(-90)`,
  }, "Mean land surface temperature (°C)"));
  svg.appendChild(titles);

  // corner annotations
  const ann = el("g", {
    "font-family": "'Fraunces', Georgia, serif",
    "font-size": "10.5",
    "font-style": "italic",
  });
  ann.appendChild(el("text", {
    x: sx(0.155), y: sy(49.6),
    fill: COLORS.terracottaDeep, opacity: 0.85,
  }, "Sparse vegetation,"));
  ann.appendChild(el("text", {
    x: sx(0.155), y: sy(48.7),
    fill: COLORS.terracottaDeep, opacity: 0.85,
  }, "hot clinic compound"));
  ann.appendChild(el("text", {
    x: sx(0.595), y: sy(31.7),
    fill: COLORS.forestDeep, opacity: 0.85,
    "text-anchor": "end",
  }, "Greener clinic,"));
  ann.appendChild(el("text", {
    x: sx(0.595), y: sy(30.8),
    fill: COLORS.forestDeep, opacity: 0.85,
    "text-anchor": "end",
  }, "cooler ground"));
  svg.appendChild(ann);

  // regression line
  const trend = el("line", {
    x1: sx(X_MIN), y1: sy(Math.min(Y_MAX, Math.max(Y_MIN, intercept + slope * X_MIN))),
    x2: sx(X_MAX), y2: sy(Math.min(Y_MAX, Math.max(Y_MIN, intercept + slope * X_MAX))),
    stroke: COLORS.terracotta,
    "stroke-width": 2.2,
    "stroke-linecap": "round",
    opacity: 0.85,
  });
  svg.appendChild(trend);

  // r-value annotation, set above the regression line
  svg.appendChild(el("text", {
    x: sx(0.585), y: sy(intercept + slope * 0.585) - 14,
    "font-family": "'Fraunces', Georgia, serif",
    "font-size": "13",
    "font-style": "italic",
    fill: COLORS.terracotta,
    "text-anchor": "end",
  }, `r = ${r.toFixed(2)}`));

  // data points
  const ptsGroup = el("g", { class: "pts" });
  DATA.forEach((d, i) => {
    ptsGroup.appendChild(el("circle", {
      cx: sx(d.ndvi), cy: sy(d.lst), r: 5.5,
      fill: COLORS.forest, "fill-opacity": 0.55,
      stroke: COLORS.forestDeep, "stroke-width": 0.6,
      "data-i": i,
      "data-ndvi": d.ndvi, "data-lst": d.lst,
    }));
  });
  svg.appendChild(ptsGroup);

  host.appendChild(svg);

  // tooltip
  let tip = host.parentElement.querySelector(".chart-tip");
  if (!tip) {
    tip = document.createElement("div");
    tip.className = "chart-tip";
    host.parentElement.appendChild(tip);
  }
  tip.style.display = "none";

  let lastHover = null;
  function unhover() {
    if (lastHover) {
      lastHover.setAttribute("r", 5.5);
      lastHover.setAttribute("fill-opacity", 0.55);
      lastHover.setAttribute("fill", COLORS.forest);
      lastHover = null;
    }
    tip.style.display = "none";
  }
  function hover(c) {
    if (lastHover === c) return;
    unhover();
    c.setAttribute("r", 8);
    c.setAttribute("fill-opacity", 0.95);
    c.setAttribute("fill", COLORS.terracotta);
    lastHover = c;
    const i = c.getAttribute("data-i");
    const ndvi = c.getAttribute("data-ndvi");
    const lst = c.getAttribute("data-lst");
    const id = String(Number(i) + 1).padStart(3, "0");
    tip.innerHTML =
      `<div class="tip-id">Clinic ${id}</div>` +
      `<div class="tip-row"><span>NDVI</span><b>${parseFloat(ndvi).toFixed(3)}</b></div>` +
      `<div class="tip-row"><span>LST</span><b>${parseFloat(lst).toFixed(1)} °C</b></div>`;
    tip.style.display = "block";
    const hostRect = host.getBoundingClientRect();
    const cRect = c.getBoundingClientRect();
    const left = cRect.left + cRect.width / 2 - hostRect.left;
    const top = cRect.top - hostRect.top;
    tip.style.left = left + "px";
    tip.style.top = (top - 12) + "px";
  }
  svg.addEventListener("mousemove", (e) => {
    const t = e.target;
    if (t && t.tagName === "circle" && t.hasAttribute("data-i")) hover(t);
    else unhover();
  });
  svg.addEventListener("mouseleave", unhover);
  svg.addEventListener("touchstart", (e) => {
    const t = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if (t && t.tagName === "circle" && t.hasAttribute("data-i")) hover(t);
  });
}

render();
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(render, 120);
});

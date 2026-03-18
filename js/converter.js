(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const els = {
    value: $("convValue"),
    unit: $("convUnit"),
    distance: $("convDistance"),
    sr: $("convSr"),
    beamAngle: $("convBeamAngle"),
    reflectance: $("convReflectance"),
    preset: $("convPreset"),
    convertBtn: $("convConvertBtn"),
    resetBtn: $("convResetBtn"),

    resultLm: $("convResultLm"),
    resultCd: $("convResultCd"),
    resultLx: $("convResultLx"),
    resultNit: $("convResultNit"),
    resultStops: $("convResultStops"),
    resultExposure: $("convResultExposure"),
    resultSr: $("convResultSr"),
    resultBeamAngle: $("convResultBeamAngle"),

    cardLm: $("convCardLm"),
    cardCd: $("convCardCd"),
    cardLx: $("convCardLx"),
    cardNit: $("convCardNit"),
    cardStops: $("convCardStops"),
    cardExposure: $("convCardExposure"),
    cardSr: $("convCardSr"),
    cardBeamAngle: $("convCardBeamAngle"),

    globalModeNote: $("globalModeNote"),
  };

  const DEFAULTS = {
    value: 1000,
    unit: "lm",
    distance: 1,
    sr: 2 * Math.PI,
    beamAngle: 180,
    reflectance: 0.8,
    preset: "none",
  };

  const PRESETS = {
    none: null,
    moonlight: { value: 0.25, unit: "lx" },
    room: { value: 100, unit: "lx" },
    office: { value: 500, unit: "lx" },
    overcast: { value: 1000, unit: "lx" },
    sunlight: { value: 100000, unit: "lx" },
    hdr400: { value: 400, unit: "nit" },
    hdr1000: { value: 1000, unit: "nit" },
  };

  function getGlobalMode() {
    const checked = document.querySelector('input[name="globalMode"]:checked');
    return checked ? checked.value : "simple";
  }

  function toNumber(value, fallback = NaN) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function degToRad(deg) {
    return deg * Math.PI / 180;
  }

  function radToDeg(rad) {
    return rad * 180 / Math.PI;
  }

  function beamAngleToSr(angleDeg) {
    const a = clamp(angleDeg, 0, 360);
    if (a <= 0) return 0;
    if (a >= 360) return 4 * Math.PI;
    const theta = degToRad(a / 2);
    return 2 * Math.PI * (1 - Math.cos(theta));
  }

  function srToBeamAngle(sr) {
    const s = clamp(sr, 0, 4 * Math.PI);
    if (s <= 0) return 0;
    if (s >= 4 * Math.PI) return 360;
    const cosTheta = 1 - s / (2 * Math.PI);
    const theta = Math.acos(clamp(cosTheta, -1, 1));
    return radToDeg(theta) * 2;
  }

  function formatNumber(value) {
    if (!Number.isFinite(value)) return "-";
    const abs = Math.abs(value);

    if (abs === 0) return "0";
    if (abs >= 100000 || abs < 0.001) return value.toExponential(4);
    if (abs >= 1000) return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (abs >= 1) return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
    return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }

  function setResult(el, value) {
    if (el) el.textContent = formatNumber(value);
  }

  function setCardMuted(card, muted) {
    if (!card) return;
    card.style.opacity = muted ? "0.6" : "1";
  }

  function showFieldByRoles() {
    const mode = getGlobalMode();
    const unit = els.unit.value;

    const neededRoles = new Set(["sr"]);

    if (unit === "lm" || unit === "cd" || unit === "sr") {
      neededRoles.add("sr");
    }

    if (unit === "lx" || unit === "cd") {
      neededRoles.add("distance");
    }

    if (unit === "lx" || unit === "nit") {
      neededRoles.add("reflectance");
    }

    const isAdvanced = mode === "advanced";

    $$(".conv-param").forEach((field) => {
      const roles = (field.dataset.roles || "").split(/\s+/).filter(Boolean);
      const shouldShow = isAdvanced && roles.some((r) => neededRoles.has(r));
      field.style.display = shouldShow ? "" : "none";
    });

    if (els.globalModeNote) {
      els.globalModeNote.textContent =
        mode === "simple"
          ? "Simple mode uses recommended defaults: distance = 1 m, sr = 2π, beam angle = 180°, reflectance = 0.8."
          : "Advanced mode lets you adjust the physical parameters used by the converter.";
    }
  }

  function readInputs() {
    let value = toNumber(els.value.value, NaN);
    let unit = els.unit.value;
    let distance = toNumber(els.distance.value, DEFAULTS.distance);
    let sr = toNumber(els.sr.value, DEFAULTS.sr);
    let beamAngle = toNumber(els.beamAngle.value, DEFAULTS.beamAngle);
    let reflectance = toNumber(els.reflectance.value, DEFAULTS.reflectance);

    if (!Number.isFinite(distance) || distance <= 0) distance = DEFAULTS.distance;
    if (!Number.isFinite(sr) || sr <= 0) sr = DEFAULTS.sr;
    if (!Number.isFinite(beamAngle) || beamAngle <= 0) beamAngle = DEFAULTS.beamAngle;
    if (!Number.isFinite(reflectance) || reflectance <= 0) reflectance = DEFAULTS.reflectance;

    reflectance = clamp(reflectance, 0.000001, 1);

    const mode = getGlobalMode();

    if (mode === "simple") {
      distance = DEFAULTS.distance;
      sr = DEFAULTS.sr;
      beamAngle = DEFAULTS.beamAngle;
      reflectance = DEFAULTS.reflectance;
    }

    return { value, unit, distance, sr, beamAngle, reflectance, mode };
  }

  function convertToCanonical(input) {
    const { value, unit, distance, sr, reflectance } = input;

    if (!Number.isFinite(value) || value < 0) {
      throw new Error("Please enter a valid non-negative value.");
    }

    let lm = NaN;
    let cd = NaN;
    let lx = NaN;
    let nit = NaN;
    let stops = NaN;
    let exposure = NaN;

    switch (unit) {
      case "lm":
        lm = value;
        cd = lm / sr;
        lx = cd / (distance * distance);
        nit = (lx * reflectance) / Math.PI;
        break;

      case "cd":
        cd = value;
        lm = cd * sr;
        lx = cd / (distance * distance);
        nit = (lx * reflectance) / Math.PI;
        break;

      case "lx":
        lx = value;
        cd = lx * distance * distance;
        lm = cd * sr;
        nit = (lx * reflectance) / Math.PI;
        break;

      case "nit":
        nit = value;
        lx = (nit * Math.PI) / reflectance;
        cd = lx * distance * distance;
        lm = cd * sr;
        break;

      case "stops":
        stops = value;
        exposure = Math.pow(2, stops);
        break;

      case "exposure":
        exposure = value;
        if (exposure <= 0) {
          throw new Error("Exposure multiplier must be greater than 0.");
        }
        stops = Math.log2(exposure);
        break;

      case "sr":
        break;

      default:
        throw new Error("Unsupported unit.");
    }

    return { lm, cd, lx, nit, stops, exposure };
  }

  function buildResults(input, canonical) {
    const { value, unit, distance, sr, reflectance } = input;
    let { lm, cd, lx, nit, stops, exposure } = canonical;

    if (unit === "sr") {
      const resultSr = value;
      const resultBeamAngle = srToBeamAngle(resultSr);
      return {
        lm: NaN,
        cd: NaN,
        lx: NaN,
        nit: NaN,
        stops: NaN,
        exposure: NaN,
        sr: resultSr,
        beamAngle: resultBeamAngle,
      };
    }

    if (unit === "stops" || unit === "exposure") {
      return {
        lm: NaN,
        cd: NaN,
        lx: NaN,
        nit: NaN,
        stops,
        exposure,
        sr,
        beamAngle: srToBeamAngle(sr),
      };
    }

    if (!Number.isFinite(lm) && Number.isFinite(cd)) lm = cd * sr;
    if (!Number.isFinite(cd) && Number.isFinite(lm)) cd = lm / sr;
    if (!Number.isFinite(lx) && Number.isFinite(cd)) lx = cd / (distance * distance);
    if (!Number.isFinite(nit) && Number.isFinite(lx)) nit = (lx * reflectance) / Math.PI;

    return {
      lm,
      cd,
      lx,
      nit,
      stops: NaN,
      exposure: NaN,
      sr,
      beamAngle: srToBeamAngle(sr),
    };
  }

  function renderResults(results, inputUnit) {
    setResult(els.resultLm, results.lm);
    setResult(els.resultCd, results.cd);
    setResult(els.resultLx, results.lx);
    setResult(els.resultNit, results.nit);
    setResult(els.resultStops, results.stops);
    setResult(els.resultExposure, results.exposure);
    setResult(els.resultSr, results.sr);
    setResult(els.resultBeamAngle, results.beamAngle);

    const photometricOnly = ["lm", "cd", "lx", "nit"].includes(inputUnit);
    const exposureOnly = ["stops", "exposure"].includes(inputUnit);
    const srOnly = inputUnit === "sr";

    setCardMuted(els.cardLm, !(photometricOnly && Number.isFinite(results.lm)));
    setCardMuted(els.cardCd, !(photometricOnly && Number.isFinite(results.cd)));
    setCardMuted(els.cardLx, !(photometricOnly && Number.isFinite(results.lx)));
    setCardMuted(els.cardNit, !(photometricOnly && Number.isFinite(results.nit)));

    setCardMuted(els.cardStops, !(exposureOnly && Number.isFinite(results.stops)));
    setCardMuted(els.cardExposure, !(exposureOnly && Number.isFinite(results.exposure)));

    setCardMuted(els.cardSr, !(srOnly || photometricOnly));
    setCardMuted(els.cardBeamAngle, !(srOnly || photometricOnly));
  }

  function clearResults() {
    [
      els.resultLm,
      els.resultCd,
      els.resultLx,
      els.resultNit,
      els.resultStops,
      els.resultExposure,
      els.resultSr,
      els.resultBeamAngle,
    ].forEach((el) => setResult(el, NaN));

    [
      els.cardLm,
      els.cardCd,
      els.cardLx,
      els.cardNit,
      els.cardStops,
      els.cardExposure,
      els.cardSr,
      els.cardBeamAngle,
    ].forEach((card) => setCardMuted(card, false));
  }

  function runConversion() {
    try {
      const input = readInputs();
      const canonical = convertToCanonical(input);
      const results = buildResults(input, canonical);
      renderResults(results, input.unit);
    } catch (err) {
      clearResults();
      console.error(err);
    }
  }

  function applyPreset() {
    const preset = PRESETS[els.preset.value];
    if (!preset) return;

    els.value.value = preset.value;
    els.unit.value = preset.unit;

    showFieldByRoles();
    runConversion();
  }

  function resetConverter() {
    els.value.value = DEFAULTS.value;
    els.unit.value = DEFAULTS.unit;
    els.distance.value = DEFAULTS.distance;
    els.sr.value = DEFAULTS.sr.toFixed(4);
    els.beamAngle.value = DEFAULTS.beamAngle;
    els.reflectance.value = DEFAULTS.reflectance;
    if (els.preset) els.preset.value = DEFAULTS.preset;

    showFieldByRoles();
    runConversion();
  }

  function syncSrFromBeam() {
    const beam = toNumber(els.beamAngle.value, NaN);
    if (!Number.isFinite(beam)) return;
    const sr = beamAngleToSr(beam);
    els.sr.value = sr.toFixed(4);
  }

  function syncBeamFromSr() {
    const sr = toNumber(els.sr.value, NaN);
    if (!Number.isFinite(sr)) return;
    const beam = srToBeamAngle(sr);
    els.beamAngle.value = beam.toFixed(4);
  }

  function bindEvents() {
    if (els.convertBtn) els.convertBtn.addEventListener("click", runConversion);
    if (els.resetBtn) els.resetBtn.addEventListener("click", resetConverter);
    if (els.preset) els.preset.addEventListener("change", applyPreset);

    if (els.unit) {
      els.unit.addEventListener("change", () => {
        showFieldByRoles();
        runConversion();
      });
    }

    if (els.sr) {
      els.sr.addEventListener("input", () => {
        syncBeamFromSr();
      });
      els.sr.addEventListener("change", () => {
        syncBeamFromSr();
        runConversion();
      });
    }

    if (els.beamAngle) {
      els.beamAngle.addEventListener("input", () => {
        syncSrFromBeam();
      });
      els.beamAngle.addEventListener("change", () => {
        syncSrFromBeam();
        runConversion();
      });
    }

    [els.value, els.distance, els.reflectance].forEach((el) => {
      if (!el) return;
      el.addEventListener("change", runConversion);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") runConversion();
      });
    });

    $$('input[name="globalMode"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        showFieldByRoles();
        runConversion();
      });
    });
  }

  function init() {
    if (!els.value || !els.unit) return;

    syncSrFromBeam();
    bindEvents();
    showFieldByRoles();
    runConversion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

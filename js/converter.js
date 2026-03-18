"use strict";

window.ConverterModule = (function () {

  const $ = (id) => document.getElementById(id);

  const els = {
    value: $("convValue"),
    unit: $("convUnit"),
    distance: $("convDistance"),
    sr: $("convSr"),
    beamAngle: $("convBeamAngle"),
    reflectance: $("convReflectance"),

    resultLm: $("convResultLm"),
    resultCd: $("convResultCd"),
    resultLx: $("convResultLx"),
    resultNit: $("convResultNit"),
    resultStops: $("convResultStops"),
    resultExposure: $("convResultExposure"),
    resultSr: $("convResultSr"),
    resultBeamAngle: $("convResultBeamAngle"),
  };

  const DEFAULTS = {
    distance: 1,
    sr: 2 * Math.PI,
    reflectance: 0.8,
  };

  function toNum(v, d = 0) {
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
  }

  function degToRad(d) {
    return d * Math.PI / 180;
  }

  function radToDeg(r) {
    return r * 180 / Math.PI;
  }

  function beamToSr(angle) {
    const t = degToRad(angle / 2);
    return 2 * Math.PI * (1 - Math.cos(t));
  }

  function srToBeam(sr) {
    const c = 1 - sr / (2 * Math.PI);
    return radToDeg(Math.acos(c)) * 2;
  }

  function format(v) {
    if (!Number.isFinite(v)) return "-";
    if (Math.abs(v) > 100000) return v.toExponential(3);
    return v.toFixed(4);
  }

  function convert() {

    const value = toNum(els.value.value);
    const unit = els.unit.value;

    let d = toNum(els.distance.value, DEFAULTS.distance);
    let sr = toNum(els.sr.value, DEFAULTS.sr);
    let r = toNum(els.reflectance.value, DEFAULTS.reflectance);

    let lm, cd, lx, nit, stops, exposure;

    if (unit === "lm") {
      lm = value;
      cd = lm / sr;
      lx = cd / (d * d);
      nit = lx * r / Math.PI;
    }

    if (unit === "cd") {
      cd = value;
      lm = cd * sr;
      lx = cd / (d * d);
      nit = lx * r / Math.PI;
    }

    if (unit === "lx") {
      lx = value;
      cd = lx * d * d;
      lm = cd * sr;
      nit = lx * r / Math.PI;
    }

    if (unit === "nit") {
      nit = value;
      lx = nit * Math.PI / r;
      cd = lx * d * d;
      lm = cd * sr;
    }

    if (unit === "stops") {
      stops = value;
      exposure = Math.pow(2, stops);
    }

    if (unit === "exposure") {
      exposure = value;
      stops = Math.log2(exposure);
    }

    if (unit === "sr") {
      sr = value;
    }

    els.resultLm.textContent = format(lm);
    els.resultCd.textContent = format(cd);
    els.resultLx.textContent = format(lx);
    els.resultNit.textContent = format(nit);
    els.resultStops.textContent = format(stops);
    els.resultExposure.textContent = format(exposure);
    els.resultSr.textContent = format(sr);
    els.resultBeamAngle.textContent = format(srToBeam(sr));
  }

  function init() {

    if (!els.value) return;

    document
      .getElementById("convConvertBtn")
      .addEventListener("click", convert);

    document
      .getElementById("convResetBtn")
      .addEventListener("click", () => location.reload());
  }

  return {
    init,
    convert,
  };

})();

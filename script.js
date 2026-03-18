const inputValue = document.getElementById("inputValue");
const inputUnit = document.getElementById("inputUnit");
const distance = document.getElementById("distance");
const beamAngle = document.getElementById("beamAngle");
const reflectance = document.getElementById("reflectance");

const resultLm = document.getElementById("resultLm");
const resultCd = document.getElementById("resultCd");
const resultLx = document.getElementById("resultLx");
const resultNit = document.getElementById("resultNit");
const resultEv = document.getElementById("resultEv");

const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "-";
  if (Math.abs(value) >= 100000 || (Math.abs(value) > 0 && Math.abs(value) < 0.001)) {
    return value.toExponential(4);
  }
  return Number(value.toFixed(4)).toString();
}

/**
 * Beam angle から立体角を近似
 * cone solid angle: Ω = 2π(1 - cos(θ/2))
 */
function beamAngleToSteradian(angleDeg) {
  const safeAngle = Math.max(0.001, Math.min(angleDeg, 179.999));
  const halfRad = degToRad(safeAngle / 2);
  return 2 * Math.PI * (1 - Math.cos(halfRad));
}

/**
 * 簡易 EV ↔ lx
 * 近似式: lux ≒ 2.5 * 2^EV
 */
function evToLux(ev) {
  return 2.5 * Math.pow(2, ev);
}

function luxToEv(lux) {
  if (lux <= 0) return NaN;
  return Math.log2(lux / 2.5);
}

function setResults({ lm, cd, lx, nit, ev }) {
  resultLm.textContent = formatNumber(lm);
  resultCd.textContent = formatNumber(cd);
  resultLx.textContent = formatNumber(lx);
  resultNit.textContent = formatNumber(nit);
  resultEv.textContent = formatNumber(ev);
}

function convert() {
  const value = parseFloat(inputValue.value);
  const unit = inputUnit.value;
  const dist = parseFloat(distance.value);
  const angle = parseFloat(beamAngle.value);
  const rho = parseFloat(reflectance.value);

  if (!Number.isFinite(value)) {
    alert("Input Value を正しく入力してください。");
    return;
  }

  if (!Number.isFinite(dist) || dist <= 0) {
    alert("Distance は 0 より大きい値にしてください。");
    return;
  }

  if (!Number.isFinite(angle) || angle <= 0 || angle >= 180) {
    alert("Beam Angle は 0 より大きく 180 未満にしてください。");
    return;
  }

  if (!Number.isFinite(rho) || rho < 0 || rho > 1) {
    alert("Reflectance は 0〜1 の範囲で入力してください。");
    return;
  }

  const omega = beamAngleToSteradian(angle);

  let lm = NaN;
  let cd = NaN;
  let lx = NaN;
  let nit = NaN;
  let ev = NaN;

  switch (unit) {
    case "lm": {
      lm = value;
      cd = lm / omega;
      lx = cd / (dist * dist);
      nit = (lx * rho) / Math.PI;
      ev = luxToEv(lx);
      break;
    }

    case "cd": {
      cd = value;
      lm = cd * omega;
      lx = cd / (dist * dist);
      nit = (lx * rho) / Math.PI;
      ev = luxToEv(lx);
      break;
    }

    case "lx": {
      lx = value;
      cd = lx * dist * dist;
      lm = cd * omega;
      nit = (lx * rho) / Math.PI;
      ev = luxToEv(lx);
      break;
    }

    case "nit": {
      nit = value;
      lx = (nit * Math.PI) / rho;
      cd = lx * dist * dist;
      lm = cd * omega;
      ev = luxToEv(lx);
      break;
    }

    case "ev": {
      ev = value;
      lx = evToLux(ev);
      cd = lx * dist * dist;
      lm = cd * omega;
      nit = (lx * rho) / Math.PI;
      break;
    }

    default:
      alert("未対応の単位です。");
      return;
  }

  setResults({ lm, cd, lx, nit, ev });
}

function resetFields() {
  inputValue.value = 1000;
  inputUnit.value = "lm";
  distance.value = 1;
  beamAngle.value = 120;
  reflectance.value = 0.8;

  setResults({
    lm: NaN,
    cd: NaN,
    lx: NaN,
    nit: NaN,
    ev: NaN
  });
}

convertBtn.addEventListener("click", convert);
resetBtn.addEventListener("click", resetFields);

window.addEventListener("load", convert);

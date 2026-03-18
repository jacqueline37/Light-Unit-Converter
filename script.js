const DEFAULTS={distance:1,sr:2*Math.PI,beamAngle:180,reflectance:0.8,efficacy:683,iso:100,middleGray:0.18};

const globalModeNote=document.getElementById("globalModeNote");
const globalModeRadios=document.querySelectorAll('input[name="globalMode"]');
const tabButtons=document.querySelectorAll(".tab-btn");
const tabPanels=document.querySelectorAll(".tab-panel");

const convValue=document.getElementById("convValue");
const convUnit=document.getElementById("convUnit");
const convDistance=document.getElementById("convDistance");
const convSr=document.getElementById("convSr");
const convBeamAngle=document.getElementById("convBeamAngle");
const convReflectance=document.getElementById("convReflectance");
const convEfficacy=document.getElementById("convEfficacy");
const convParamFields=document.querySelectorAll(".conv-param");
const convConvertBtn=document.getElementById("convConvertBtn");
const convResetBtn=document.getElementById("convResetBtn");
const convResultLm=document.getElementById("convResultLm");
const convResultCd=document.getElementById("convResultCd");
const convResultLx=document.getElementById("convResultLx");
const convResultNit=document.getElementById("convResultNit");
const convResultEv=document.getElementById("convResultEv");
const convResultStops=document.getElementById("convResultStops");
const convResultExposure=document.getElementById("convResultExposure");
const convResultWm2=document.getElementById("convResultWm2");
const convResultSr=document.getElementById("convResultSr");
const convResultBeamAngle=document.getElementById("convResultBeamAngle");

const evAperture=document.getElementById("evAperture");
const evShutter=document.getElementById("evShutter");
const evIso=document.getElementById("evIso");
const evReflectance=document.getElementById("evReflectance");
const evCalcBtn=document.getElementById("evCalcBtn");
const evResetBtn=document.getElementById("evResetBtn");
const evResultEvIso=document.getElementById("evResultEvIso");
const evResultEv100=document.getElementById("evResultEv100");
const evResultLux=document.getElementById("evResultLux");
const evResultNit=document.getElementById("evResultNit");
const evResultStops=document.getElementById("evResultStops");
const evResultExposure=document.getElementById("evResultExposure");

const hdrValue=document.getElementById("hdrValue");
const hdrUnit=document.getElementById("hdrUnit");
const hdrReflectance=document.getElementById("hdrReflectance");
const hdrCalcBtn=document.getElementById("hdrCalcBtn");
const hdrResetBtn=document.getElementById("hdrResetBtn");
const hdrResultNit=document.getElementById("hdrResultNit");
const hdrResultLux=document.getElementById("hdrResultLux");
const hdrResultEv=document.getElementById("hdrResultEv");
const hdrResultStops=document.getElementById("hdrResultStops");
const hdrResultExposure=document.getElementById("hdrResultExposure");

const acesSceneLinear=document.getElementById("acesSceneLinear");
const acesStops=document.getElementById("acesStops");
const acesMiddleGray=document.getElementById("acesMiddleGray");
const acesCalcBtn=document.getElementById("acesCalcBtn");
const acesResetBtn=document.getElementById("acesResetBtn");
const acesResultInput=document.getElementById("acesResultInput");
const acesResultStops=document.getElementById("acesResultStops");
const acesResultExposure=document.getElementById("acesResultExposure");
const acesResultOutput=document.getElementById("acesResultOutput");
const acesResultRelativeGray=document.getElementById("acesResultRelativeGray");
const acesResultEv=document.getElementById("acesResultEv");

const iesLm=document.getElementById("iesLm");
const iesDistance=document.getElementById("iesDistance");
const iesSr=document.getElementById("iesSr");
const iesBeamAngle=document.getElementById("iesBeamAngle");
const iesCalcBtn=document.getElementById("iesCalcBtn");
const iesResetBtn=document.getElementById("iesResetBtn");
const iesResultLm=document.getElementById("iesResultLm");
const iesResultCd=document.getElementById("iesResultCd");
const iesResultLux=document.getElementById("iesResultLux");
const iesResultSr=document.getElementById("iesResultSr");
const iesResultBeamAngle=document.getElementById("iesResultBeamAngle");

const pbrPresetGrid=document.getElementById("pbrPresetGrid");
const pbrResultName=document.getElementById("pbrResultName");
const pbrResultLux=document.getElementById("pbrResultLux");
const pbrResultNit=document.getElementById("pbrResultNit");
const pbrResultEv=document.getElementById("pbrResultEv");
const pbrResultStops=document.getElementById("pbrResultStops");
const pbrResultExposure=document.getElementById("pbrResultExposure");

function getMode(){return document.querySelector('input[name="globalMode"]:checked').value;}
function isSimple(){return getMode()==="simple";}
function degToRad(deg){return deg*Math.PI/180;}
function radToDeg(rad){return rad*180/Math.PI;}
function clamp(v,min,max){return Math.min(Math.max(v,min),max);}
function formatNumber(v){
  if(!Number.isFinite(v)) return "-";
  const abs=Math.abs(v);
  if(abs>=100000||abs>0&&abs<0.001) return v.toExponential(4);
  return Number(v.toFixed(4)).toString();
}
function beamAngleToSteradian(angleDeg){
  const safe=clamp(angleDeg,0.0001,179.9999);
  const half=degToRad(safe/2);
  return 2*Math.PI*(1-Math.cos(half));
}
function steradianToBeamAngle(sr){
  const safe=clamp(sr,0,2*Math.PI);
  const cosHalf=1-safe/(2*Math.PI);
  const half=Math.acos(clamp(cosHalf,-1,1));
  return radToDeg(half*2);
}
function evToLux(ev){return 2.5*Math.pow(2,ev);}
function luxToEv(lux){return lux>0?Math.log2(lux/2.5):NaN;}
function stopsToExposure(stops){return Math.pow(2,stops);}
function exposureToStops(exposure){return exposure>0?Math.log2(exposure):NaN;}
function luxToWm2(lux,eff){return eff>0?lux/eff:NaN;}
function wm2ToLux(wm2,eff){return wm2*eff;}
function nitToLux(nit,rho){return rho>0?(nit*Math.PI)/rho:NaN;}
function luxToNit(lux,rho){return (lux*rho)/Math.PI;}
function ev100FromApertureShutter(aperture,shutter){return aperture>0&&shutter>0?Math.log2((aperture*aperture)/shutter):NaN;}
function evAtIsoFromEv100(ev100,iso){return Number.isFinite(ev100)&&iso>0?ev100-Math.log2(iso/100):NaN;}
function ev100FromEvAtIso(evIso,iso){return Number.isFinite(evIso)&&iso>0?evIso+Math.log2(iso/100):NaN;}

function applySimpleDefaults(){
  convDistance.value=String(DEFAULTS.distance);
  convSr.value=DEFAULTS.sr.toFixed(4);
  convBeamAngle.value=String(DEFAULTS.beamAngle);
  convReflectance.value=String(DEFAULTS.reflectance);
  convEfficacy.value=String(DEFAULTS.efficacy);
  evIso.value=String(DEFAULTS.iso);
  evReflectance.value=String(DEFAULTS.reflectance);
  hdrReflectance.value=String(DEFAULTS.reflectance);
  acesMiddleGray.value=String(DEFAULTS.middleGray);
  iesDistance.value=String(DEFAULTS.distance);
  iesSr.value=DEFAULTS.sr.toFixed(4);
  iesBeamAngle.value=String(DEFAULTS.beamAngle);
}
function updateGlobalModeUI(){
  const simple=isSimple();
  document.querySelectorAll(".adv").forEach(el=>el.classList.toggle("hidden",simple));
  globalModeNote.textContent=simple
    ? "Simple mode uses recommended defaults: distance = 1m, sr = 2π, beam angle = 180°, reflectance = 0.8, efficacy = 683 lm/W, ISO = 100."
    : "Advanced mode lets you edit physical assumptions directly, including distance, solid angle, beam angle, reflectance, efficacy, ISO, and middle gray.";
  if(simple) applySimpleDefaults();
  updateConverterFieldVisibility();
}
function activateTab(tabName){
  tabButtons.forEach(btn=>btn.classList.toggle("active",btn.dataset.tab===tabName));
  tabPanels.forEach(panel=>panel.classList.toggle("active",panel.id===`tab-${tabName}`));
}
tabButtons.forEach(btn=>btn.addEventListener("click",()=>activateTab(btn.dataset.tab)));
globalModeRadios.forEach(r=>r.addEventListener("change",()=>{updateGlobalModeUI();runAllVisibleCalculations();}));

function getConverterParams(){
  if(isSimple()){
    return {distance:DEFAULTS.distance,sr:DEFAULTS.sr,beamAngle:DEFAULTS.beamAngle,reflectance:DEFAULTS.reflectance,efficacy:DEFAULTS.efficacy};
  }
  const distance=parseFloat(convDistance.value);
  let sr=parseFloat(convSr.value);
  let beamAngle=parseFloat(convBeamAngle.value);
  const reflectance=parseFloat(convReflectance.value);
  const efficacy=parseFloat(convEfficacy.value);

  if(!Number.isFinite(distance)||distance<=0) throw new Error("Distance は 0 より大きい値にしてください。");
  if(!Number.isFinite(reflectance)||reflectance<0||reflectance>1) throw new Error("Reflectance は 0〜1 の範囲で入力してください。");
  if(!Number.isFinite(efficacy)||efficacy<=0) throw new Error("Luminous Efficacy は 0 より大きい値にしてください。");

  if(Number.isFinite(sr)&&sr>0&&sr<=2*Math.PI){
    beamAngle=steradianToBeamAngle(sr);
    convBeamAngle.value=beamAngle.toFixed(4);
  }else if(Number.isFinite(beamAngle)&&beamAngle>0&&beamAngle<=180){
    sr=beamAngle===180?2*Math.PI:beamAngleToSteradian(beamAngle);
    convSr.value=sr.toFixed(4);
  }else{
    throw new Error("Solid Angle または Beam Angle を正しく入力してください。");
  }
  return {distance,sr,beamAngle,reflectance,efficacy};
}
function getNeededRoles(unit){
  const map={
    lm:["sr","distance","reflectance","efficacy"],
    cd:["distance","sr","reflectance","efficacy"],
    lx:["distance","sr","reflectance","efficacy"],
    nit:["distance","sr","reflectance","efficacy"],
    ev:["distance","sr","reflectance","efficacy"],
    stops:["distance","sr","reflectance","efficacy"],
    exposure:["distance","sr","reflectance","efficacy"],
    wm2:["distance","sr","reflectance","efficacy"],
    sr:["sr"]
  };
  return map[unit]||[];
}
function updateConverterFieldVisibility(){
  const roles=getNeededRoles(convUnit.value);
  const simple=isSimple();
  convParamFields.forEach(field=>{
    if(simple){
      field.classList.add("hidden");
      return;
    }
    const fieldRoles=(field.dataset.roles||"").split(" ");
    const visible=fieldRoles.some(role=>roles.includes(role));
    field.classList.toggle("hidden",!visible);
  });
}
function setConverterResults(data){
  convResultLm.textContent=formatNumber(data.lm);
  convResultCd.textContent=formatNumber(data.cd);
  convResultLx.textContent=formatNumber(data.lx);
  convResultNit.textContent=formatNumber(data.nit);
  convResultEv.textContent=formatNumber(data.ev);
  convResultStops.textContent=formatNumber(data.stops);
  convResultExposure.textContent=formatNumber(data.exposure);
  convResultWm2.textContent=formatNumber(data.wm2);
  convResultSr.textContent=formatNumber(data.sr);
  convResultBeamAngle.textContent=formatNumber(data.beamAngle);
}
function convertMain(){
  try{
    const value=parseFloat(convValue.value);
    const unit=convUnit.value;
    if(!Number.isFinite(value)) throw new Error("Value を正しく入力してください。");
    const p=getConverterParams();

    let lm=NaN,cd=NaN,lx=NaN,nit=NaN,ev=NaN,stops=NaN,exposure=NaN,wm2=NaN;
    switch(unit){
      case "lm":
        lm=value;
        cd=lm/p.sr;
        lx=cd/(p.distance*p.distance);
        nit=luxToNit(lx,p.reflectance);
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        wm2=luxToWm2(lx,p.efficacy);
        break;
      case "cd":
        cd=value;
        lm=cd*p.sr;
        lx=cd/(p.distance*p.distance);
        nit=luxToNit(lx,p.reflectance);
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        wm2=luxToWm2(lx,p.efficacy);
        break;
      case "lx":
        lx=value;
        cd=lx*(p.distance*p.distance);
        lm=cd*p.sr;
        nit=luxToNit(lx,p.reflectance);
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        wm2=luxToWm2(lx,p.efficacy);
        break;
      case "nit":
        nit=value;
        lx=nitToLux(nit,p.reflectance);
        cd=lx*(p.distance*p.distance);
        lm=cd*p.sr;
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        wm2=luxToWm2(lx,p.efficacy);
        break;
      case "ev":
        ev=value;
        stops=ev;
        exposure=stopsToExposure(stops);
        lx=evToLux(ev);
        cd=lx*(p.distance*p.distance);
        lm=cd*p.sr;
        nit=luxToNit(lx,p.reflectance);
        wm2=luxToWm2(lx,p.efficacy);
        break;
      case "stops":
        stops=value;
        ev=stops;
        exposure=stopsToExposure(stops);
        lx=evToLux(ev);
        cd=lx*(p.distance*p.distance);
        lm=cd*p.sr;
        nit=luxToNit(lx,p.reflectance);
        wm2=luxToWm2(lx,p.efficacy);
        break;
      case "exposure":
        exposure=value;
        if(exposure<=0) throw new Error("Exposure は 0 より大きい値にしてください。");
        stops=exposureToStops(exposure);
        ev=stops;
        lx=evToLux(ev);
        cd=lx*(p.distance*p.distance);
        lm=cd*p.sr;
        nit=luxToNit(lx,p.reflectance);
        wm2=luxToWm2(lx,p.efficacy);
        break;
      case "wm2":
        wm2=value;
        lx=wm2ToLux(wm2,p.efficacy);
        cd=lx*(p.distance*p.distance);
        lm=cd*p.sr;
        nit=luxToNit(lx,p.reflectance);
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        break;
      case "sr":
        if(value<=0||value>2*Math.PI) throw new Error("Steradian は 0 より大きく 2π 以下にしてください。");
        if(!isSimple()){
          convSr.value=Number(value).toFixed(4);
          convBeamAngle.value=steradianToBeamAngle(value).toFixed(4);
        }
        setConverterResults({lm:NaN,cd:NaN,lx:NaN,nit:NaN,ev:NaN,stops:NaN,exposure:NaN,wm2:NaN,sr:value,beamAngle:steradianToBeamAngle(value)});
        return;
      default:
        throw new Error("未対応の単位です。");
    }
    setConverterResults({lm,cd,lx,nit,ev,stops,exposure,wm2,sr:p.sr,beamAngle:p.beamAngle});
  }catch(err){
    alert(err.message);
  }
}
function resetConverter(){
  convValue.value="1000";
  convUnit.value="lm";
  applySimpleDefaults();
  updateConverterFieldVisibility();
  convertMain();
}
convConvertBtn.addEventListener("click",convertMain);
convResetBtn.addEventListener("click",resetConverter);
convUnit.addEventListener("change",()=>{updateConverterFieldVisibility();convertMain();});
convBeamAngle.addEventListener("input",()=>{
  const angle=parseFloat(convBeamAngle.value);
  if(Number.isFinite(angle)&&angle>0&&angle<180) convSr.value=beamAngleToSteradian(angle).toFixed(4);
  if(Number.isFinite(angle)&&angle===180) convSr.value=(2*Math.PI).toFixed(4);
});
convSr.addEventListener("input",()=>{
  const sr=parseFloat(convSr.value);
  if(Number.isFinite(sr)&&sr>0&&sr<=2*Math.PI) convBeamAngle.value=steradianToBeamAngle(sr).toFixed(4);
});

function calculateEV(){
  try{
    const aperture=parseFloat(evAperture.value);
    const shutter=parseFloat(evShutter.value);
    const iso=isSimple()?DEFAULTS.iso:parseFloat(evIso.value);
    const rho=isSimple()?DEFAULTS.reflectance:parseFloat(evReflectance.value);
    if(!Number.isFinite(aperture)||aperture<=0) throw new Error("Aperture を正しく入力してください。");
    if(!Number.isFinite(shutter)||shutter<=0) throw new Error("Shutter を正しく入力してください。");
    if(!Number.isFinite(iso)||iso<=0) throw new Error("ISO を正しく入力してください。");
    if(!Number.isFinite(rho)||rho<0||rho>1) throw new Error("Reflectance は 0〜1 の範囲で入力してください。");

    const ev100=ev100FromApertureShutter(aperture,shutter);
    const evIso=evAtIsoFromEv100(ev100,iso);
    const lux=evToLux(ev100);
    const nit=luxToNit(lux,rho);
    const stops=ev100;
    const exposure=stopsToExposure(stops);

    evResultEvIso.textContent=formatNumber(evIso);
    evResultEv100.textContent=formatNumber(ev100);
    evResultLux.textContent=formatNumber(lux);
    evResultNit.textContent=formatNumber(nit);
    evResultStops.textContent=formatNumber(stops);
    evResultExposure.textContent=formatNumber(exposure);
  }catch(err){
    alert(err.message);
  }
}
function resetEV(){
  evAperture.value="8";
  evShutter.value="0.008";
  evIso.value=String(DEFAULTS.iso);
  evReflectance.value=String(DEFAULTS.reflectance);
  calculateEV();
}
evCalcBtn.addEventListener("click",calculateEV);
evResetBtn.addEventListener("click",resetEV);

function calculateHDR(){
  try{
    const value=parseFloat(hdrValue.value);
    const unit=hdrUnit.value;
    const rho=isSimple()?DEFAULTS.reflectance:parseFloat(hdrReflectance.value);
    if(!Number.isFinite(value)) throw new Error("Value を正しく入力してください。");
    if(!Number.isFinite(rho)||rho<0||rho>1) throw new Error("Reflectance は 0〜1 の範囲で入力してください。");

    let nit=NaN,lux=NaN,ev=NaN,stops=NaN,exposure=NaN;
    switch(unit){
      case "nit":
        nit=value;
        lux=nitToLux(nit,rho);
        ev=luxToEv(lux);
        stops=ev;
        exposure=stopsToExposure(stops);
        break;
      case "ev":
        ev=value;
        stops=ev;
        exposure=stopsToExposure(stops);
        lux=evToLux(ev);
        nit=luxToNit(lux,rho);
        break;
      case "stops":
        stops=value;
        ev=stops;
        exposure=stopsToExposure(stops);
        lux=evToLux(ev);
        nit=luxToNit(lux,rho);
        break;
      case "exposure":
        exposure=value;
        if(exposure<=0) throw new Error("Exposure は 0 より大きい値にしてください。");
        stops=exposureToStops(exposure);
        ev=stops;
        lux=evToLux(ev);
        nit=luxToNit(lux,rho);
        break;
      case "lx":
        lux=value;
        nit=luxToNit(lux,rho);
        ev=luxToEv(lux);
        stops=ev;
        exposure=stopsToExposure(stops);
        break;
      default:
        throw new Error("未対応の入力タイプです。");
    }

    hdrResultNit.textContent=formatNumber(nit);
    hdrResultLux.textContent=formatNumber(lux);
    hdrResultEv.textContent=formatNumber(ev);
    hdrResultStops.textContent=formatNumber(stops);
    hdrResultExposure.textContent=formatNumber(exposure);
  }catch(err){
    alert(err.message);
  }
}
function resetHDR(){
  hdrValue.value="1000";
  hdrUnit.value="nit";
  hdrReflectance.value=String(DEFAULTS.reflectance);
  calculateHDR();
}
hdrCalcBtn.addEventListener("click",calculateHDR);
hdrResetBtn.addEventListener("click",resetHDR);

function calculateACES(){
  try{
    const input=parseFloat(acesSceneLinear.value);
    const stops=parseFloat(acesStops.value);
    const middleGray=isSimple()?DEFAULTS.middleGray:parseFloat(acesMiddleGray.value);
    if(!Number.isFinite(input)||input<0) throw new Error("Scene Linear Value を正しく入力してください。");
    if(!Number.isFinite(stops)) throw new Error("Stops を正しく入力してください。");
    if(!Number.isFinite(middleGray)||middleGray<=0) throw new Error("Middle Gray を正しく入力してください。");

    const exposure=stopsToExposure(stops);
    const output=input*exposure;
    const relativeGray=output/middleGray;
    const ev=stops;

    acesResultInput.textContent=formatNumber(input);
    acesResultStops.textContent=formatNumber(stops);
    acesResultExposure.textContent=formatNumber(exposure);
    acesResultOutput.textContent=formatNumber(output);
    acesResultRelativeGray.textContent=formatNumber(relativeGray);
    acesResultEv.textContent=formatNumber(ev);
  }catch(err){
    alert(err.message);
  }
}
function resetACES(){
  acesSceneLinear.value="0.18";
  acesStops.value="0";
  acesMiddleGray.value=String(DEFAULTS.middleGray);
  calculateACES();
}
acesCalcBtn.addEventListener("click",calculateACES);
acesResetBtn.addEventListener("click",resetACES);

function calculateIES(){
  try{
    const lm=parseFloat(iesLm.value);
    const distance=isSimple()?DEFAULTS.distance:parseFloat(iesDistance.value);
    let sr=isSimple()?DEFAULTS.sr:parseFloat(iesSr.value);
    let beamAngle=isSimple()?DEFAULTS.beamAngle:parseFloat(iesBeamAngle.value);

    if(!Number.isFinite(lm)||lm<0) throw new Error("Lumen を正しく入力してください。");
    if(!Number.isFinite(distance)||distance<=0) throw new Error("Distance は 0 より大きい値にしてください。");

    if(isSimple()){
      sr=DEFAULTS.sr;
      beamAngle=DEFAULTS.beamAngle;
    }else{
      if(Number.isFinite(sr)&&sr>0&&sr<=2*Math.PI){
        beamAngle=steradianToBeamAngle(sr);
        iesBeamAngle.value=beamAngle.toFixed(4);
      }else if(Number.isFinite(beamAngle)&&beamAngle>0&&beamAngle<=180){
        sr=beamAngle===180?2*Math.PI:beamAngleToSteradian(beamAngle);
        iesSr.value=sr.toFixed(4);
      }else{
        throw new Error("Solid Angle または Beam Angle を正しく入力してください。");
      }
    }

    const cd=lm/sr;
    const lux=cd/(distance*distance);

    iesResultLm.textContent=formatNumber(lm);
    iesResultCd.textContent=formatNumber(cd);
    iesResultLux.textContent=formatNumber(lux);
    iesResultSr.textContent=formatNumber(sr);
    iesResultBeamAngle.textContent=formatNumber(beamAngle);
  }catch(err){
    alert(err.message);
  }
}
function resetIES(){
  iesLm.value="1000";
  iesDistance.value=String(DEFAULTS.distance);
  iesSr.value=DEFAULTS.sr.toFixed(4);
  iesBeamAngle.value=String(DEFAULTS.beamAngle);
  calculateIES();
}
iesCalcBtn.addEventListener("click",calculateIES);
iesResetBtn.addEventListener("click",resetIES);
iesBeamAngle.addEventListener("input",()=>{
  const angle=parseFloat(iesBeamAngle.value);
  if(Number.isFinite(angle)&&angle>0&&angle<180) iesSr.value=beamAngleToSteradian(angle).toFixed(4);
  if(Number.isFinite(angle)&&angle===180) iesSr.value=(2*Math.PI).toFixed(4);
});
iesSr.addEventListener("input",()=>{
  const sr=parseFloat(iesSr.value);
  if(Number.isFinite(sr)&&sr>0&&sr<=2*Math.PI) iesBeamAngle.value=steradianToBeamAngle(sr).toFixed(4);
});

function applyPBRPreset(name,lux,rho){
  const nit=luxToNit(lux,rho);
  const ev=luxToEv(lux);
  const stops=ev;
  const exposure=stopsToExposure(stops);
  pbrResultName.textContent=name;
  pbrResultLux.textContent=formatNumber(lux);
  pbrResultNit.textContent=formatNumber(nit);
  pbrResultEv.textContent=formatNumber(ev);
  pbrResultStops.textContent=formatNumber(stops);
  pbrResultExposure.textContent=formatNumber(exposure);
}
pbrPresetGrid.addEventListener("click",e=>{
  const btn=e.target.closest(".preset-btn");
  if(!btn) return;
  const name=btn.dataset.name||"-";
  const lux=parseFloat(btn.dataset.lux);
  const rho=parseFloat(btn.dataset.rho||DEFAULTS.reflectance);
  applyPBRPreset(name,lux,rho);
});

function runAllVisibleCalculations(){
  convertMain();
  calculateEV();
  calculateHDR();
  calculateACES();
  calculateIES();
}
function init(){
  applySimpleDefaults();
  updateGlobalModeUI();
  activateTab("converter");
  updateConverterFieldVisibility();
  resetConverter();
  resetEV();
  resetHDR();
  resetACES();
  resetIES();
  applyPBRPreset("Room",100,DEFAULTS.reflectance);
}
window.addEventListener("load",init);

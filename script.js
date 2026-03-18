const DEFAULTS={
  distance:1,
  sr:2*Math.PI,
  beamAngle:180,
  reflectance:0.8,
  efficacy:683,
  iso:100,
  middleGray:0.18
};

const RESULT_CARD_IDS={
  lm:"convCardLm",
  cd:"convCardCd",
  lx:"convCardLx",
  nit:"convCardNit",
  ev:"convCardEv",
  stops:"convCardStops",
  exposure:"convCardExposure",
  wm2:"convCardWm2",
  sr:"convCardSr",
  beamAngle:"convCardBeamAngle"
};

const PRESETS={
  moonlight:{unit:"lx",value:0.1},
  room:{unit:"lx",value:100},
  office:{unit:"lx",value:500},
  overcast:{unit:"lx",value:10000},
  sunlight:{unit:"lx",value:100000},
  hdr1000:{unit:"nit",value:1000},
  hdr400:{unit:"nit",value:400}
};

const globalModeNote=document.getElementById("globalModeNote");
const globalModeRadios=document.querySelectorAll('input[name="globalMode"]');
const tabButtons=document.querySelectorAll(".tab-btn");
const tabPanels=document.querySelectorAll(".tab-panel");
const tooltip=document.getElementById("tooltip");

const convPresetSelect=document.getElementById("convPreset");
const convValueInput=document.getElementById("convValue");
const convUnitSelect=document.getElementById("convUnit");
const convDistanceInput=document.getElementById("convDistance");
const convSrInput=document.getElementById("convSr");
const convBeamAngleInput=document.getElementById("convBeamAngle");
const convReflectanceInput=document.getElementById("convReflectance");
const convEfficacyInput=document.getElementById("convEfficacy");
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

const camApertureInput=document.getElementById("camAperture");
const camShutterPresetSelect=document.getElementById("camShutterPreset");
const camShutterInput=document.getElementById("camShutterInput");
const camIsoInput=document.getElementById("camIso");
const camReflectanceInput=document.getElementById("camReflectance");
const camCalcBtn=document.getElementById("camCalcBtn");
const camResetBtn=document.getElementById("camResetBtn");
const camResultEvIso=document.getElementById("camResultEvIso");
const camResultEv100=document.getElementById("camResultEv100");
const camResultLux=document.getElementById("camResultLux");
const camResultNit=document.getElementById("camResultNit");
const camResultStops=document.getElementById("camResultStops");
const camResultExposure=document.getElementById("camResultExposure");

const evApertureInput=document.getElementById("evAperture");
const evShutterPresetSelect=document.getElementById("evShutterPreset");
const evShutterInput=document.getElementById("evShutterInput");
const evIsoInput=document.getElementById("evIso");
const evReflectanceInput=document.getElementById("evReflectance");
const evCalcBtn=document.getElementById("evCalcBtn");
const evResetBtn=document.getElementById("evResetBtn");
const evResultEvIso=document.getElementById("evResultEvIso");
const evResultEv100=document.getElementById("evResultEv100");
const evResultLux=document.getElementById("evResultLux");
const evResultNit=document.getElementById("evResultNit");
const evResultStops=document.getElementById("evResultStops");
const evResultExposure=document.getElementById("evResultExposure");

const hdrValueInput=document.getElementById("hdrValue");
const hdrUnitSelect=document.getElementById("hdrUnit");
const hdrReflectanceInput=document.getElementById("hdrReflectance");
const hdrCalcBtn=document.getElementById("hdrCalcBtn");
const hdrResetBtn=document.getElementById("hdrResetBtn");
const hdrResultNit=document.getElementById("hdrResultNit");
const hdrResultLux=document.getElementById("hdrResultLux");
const hdrResultEv=document.getElementById("hdrResultEv");
const hdrResultStops=document.getElementById("hdrResultStops");
const hdrResultExposure=document.getElementById("hdrResultExposure");

const acesSceneLinearInput=document.getElementById("acesSceneLinear");
const acesStopsInput=document.getElementById("acesStops");
const acesMiddleGrayInput=document.getElementById("acesMiddleGray");
const acesCalcBtn=document.getElementById("acesCalcBtn");
const acesResetBtn=document.getElementById("acesResetBtn");
const acesResultInput=document.getElementById("acesResultInput");
const acesResultStops=document.getElementById("acesResultStops");
const acesResultExposure=document.getElementById("acesResultExposure");
const acesResultOutput=document.getElementById("acesResultOutput");
const acesResultRelativeGray=document.getElementById("acesResultRelativeGray");
const acesResultEv=document.getElementById("acesResultEv");

const iesLmInput=document.getElementById("iesLm");
const iesDistanceInput=document.getElementById("iesDistance");
const iesSrInput=document.getElementById("iesSr");
const iesBeamAngleInput=document.getElementById("iesBeamAngle");
const iesCalcBtn=document.getElementById("iesCalcBtn");
const iesResetBtn=document.getElementById("iesResetBtn");
const iesResultLm=document.getElementById("iesResultLm");
const iesResultCd=document.getElementById("iesResultCd");
const iesResultLux=document.getElementById("iesResultLux");
const iesResultSr=document.getElementById("iesResultSr");
const iesResultBeamAngle=document.getElementById("iesResultBeamAngle");

const lambertValueInput=document.getElementById("lambertValue");
const lambertUnitSelect=document.getElementById("lambertUnit");
const lambertReflectanceInput=document.getElementById("lambertReflectance");
const lambertCalcBtn=document.getElementById("lambertCalcBtn");
const lambertResetBtn=document.getElementById("lambertResetBtn");
const lambertResultLux=document.getElementById("lambertResultLux");
const lambertResultNit=document.getElementById("lambertResultNit");
const lambertResultApprox=document.getElementById("lambertResultApprox");

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
function clamp(value,min,max){return Math.min(Math.max(value,min),max);}
function isFinitePositive(value){return Number.isFinite(value)&&value>0;}
function formatNumber(value){
  if(!Number.isFinite(value)) return "—";
  const abs=Math.abs(value);
  if(abs>=100000||(abs>0&&abs<0.001)) return value.toExponential(4);
  return Number(value.toFixed(4)).toString();
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
function luxToWm2(lux,efficacy){return efficacy>0?lux/efficacy:NaN;}
function wm2ToLux(wm2,efficacy){return wm2*efficacy;}
function nitToLux(nit,reflectance){return reflectance>0?(nit*Math.PI)/reflectance:NaN;}
function luxToNit(lux,reflectance){return (lux*reflectance)/Math.PI;}
function ev100FromApertureShutter(aperture,shutter){return aperture>0&&shutter>0?Math.log2((aperture*aperture)/shutter):NaN;}
function evAtIsoFromEv100(ev100,iso){return Number.isFinite(ev100)&&iso>0?ev100-Math.log2(iso/100):NaN;}
function parseShutter(value){
  if(typeof value!=="string") return NaN;
  const text=value.trim().replace(/s$/i,"");
  if(text.length===0) return NaN;
  if(text.includes("/")){
    const parts=text.split("/");
    if(parts.length!==2) return NaN;
    const numerator=parseFloat(parts[0].trim());
    const denominator=parseFloat(parts[1].trim());
    if(!Number.isFinite(numerator)||!Number.isFinite(denominator)||denominator===0) return NaN;
    return numerator/denominator;
  }
  const numericValue=parseFloat(text);
  return Number.isFinite(numericValue)?numericValue:NaN;
}
function showError(message){alert(message);}
function activateTab(tabName){
  tabButtons.forEach(btn=>btn.classList.toggle("active",btn.dataset.tab===tabName));
  tabPanels.forEach(panel=>panel.classList.toggle("active",panel.id===`tab-${tabName}`));
}
function clearConverterHighlights(){
  Object.values(RESULT_CARD_IDS).forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.classList.remove("result-item-active");
  });
}
function highlightConverterResults(keys){
  clearConverterHighlights();
  keys.forEach(key=>{
    const id=RESULT_CARD_IDS[key];
    if(!id) return;
    const el=document.getElementById(id);
    if(el) el.classList.add("result-item-active");
  });
}
function showTooltip(text,x,y){
  tooltip.textContent=text;
  tooltip.style.left=`${x + 12}px`;
  tooltip.style.top=`${y + 12}px`;
  tooltip.classList.add("show");
}
function hideTooltip(){
  tooltip.classList.remove("show");
}
function applySimpleDefaults(){
  convDistanceInput.value=String(DEFAULTS.distance);
  convSrInput.value=DEFAULTS.sr.toFixed(4);
  convBeamAngleInput.value=String(DEFAULTS.beamAngle);
  convReflectanceInput.value=String(DEFAULTS.reflectance);
  convEfficacyInput.value=String(DEFAULTS.efficacy);

  camIsoInput.value=String(DEFAULTS.iso);
  camReflectanceInput.value=String(DEFAULTS.reflectance);

  evIsoInput.value=String(DEFAULTS.iso);
  evReflectanceInput.value=String(DEFAULTS.reflectance);

  hdrReflectanceInput.value=String(DEFAULTS.reflectance);
  acesMiddleGrayInput.value=String(DEFAULTS.middleGray);

  iesDistanceInput.value=String(DEFAULTS.distance);
  iesSrInput.value=DEFAULTS.sr.toFixed(4);
  iesBeamAngleInput.value=String(DEFAULTS.beamAngle);

  lambertReflectanceInput.value=String(DEFAULTS.reflectance);
}
function updateGlobalModeUI(){
  const simple=isSimple();
  document.querySelectorAll(".adv").forEach(el=>el.classList.toggle("hidden",simple));
  globalModeNote.textContent=simple
    ? "Simple mode uses recommended defaults: distance = 1 m, sr = 2π, beam angle = 180°, reflectance = 0.8, efficacy = 683 lm/W, ISO = 100."
    : "Advanced mode lets you edit physical assumptions directly, including distance, solid angle, beam angle, reflectance, efficacy, ISO, and middle gray.";
  if(simple) applySimpleDefaults();
  updateConverterFieldVisibility();
  updateShutterInputState(evShutterPresetSelect,evShutterInput);
  updateShutterInputState(camShutterPresetSelect,camShutterInput);
}
function getNeededRoles(unit){
  const roleMap={
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
  return roleMap[unit]||[];
}
function updateConverterFieldVisibility(){
  const roles=getNeededRoles(convUnitSelect.value);
  if(isSimple()){
    convParamFields.forEach(field=>field.classList.add("hidden"));
    return;
  }
  convParamFields.forEach(field=>{
    const fieldRoles=(field.dataset.roles||"").split(" ");
    const visible=fieldRoles.some(role=>roles.includes(role));
    field.classList.toggle("hidden",!visible);
  });
}
function getConverterParams(){
  if(isSimple()){
    return {
      distance:DEFAULTS.distance,
      sr:DEFAULTS.sr,
      beamAngle:DEFAULTS.beamAngle,
      reflectance:DEFAULTS.reflectance,
      efficacy:DEFAULTS.efficacy
    };
  }

  const distance=parseFloat(convDistanceInput.value);
  let sr=parseFloat(convSrInput.value);
  let beamAngle=parseFloat(convBeamAngleInput.value);
  const reflectance=parseFloat(convReflectanceInput.value);
  const efficacy=parseFloat(convEfficacyInput.value);

  if(!isFinitePositive(distance)) throw new Error("Distance must be greater than 0.");
  if(!Number.isFinite(reflectance)||reflectance<0||reflectance>1) throw new Error("Reflectance must be between 0 and 1.");
  if(!isFinitePositive(efficacy)) throw new Error("Luminous efficacy must be greater than 0.");

  if(Number.isFinite(sr)&&sr>0&&sr<=2*Math.PI){
    beamAngle=steradianToBeamAngle(sr);
    convBeamAngleInput.value=beamAngle.toFixed(4);
  }else if(Number.isFinite(beamAngle)&&beamAngle>0&&beamAngle<=180){
    sr=beamAngle===180?2*Math.PI:beamAngleToSteradian(beamAngle);
    convSrInput.value=sr.toFixed(4);
  }else{
    throw new Error("Enter a valid solid angle (sr) or beam angle (0–180°).");
  }

  return {distance,sr,beamAngle,reflectance,efficacy};
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
    const value=parseFloat(convValueInput.value);
    const unit=convUnitSelect.value;
    if(!Number.isFinite(value)) throw new Error("Enter a valid numeric input value.");

    const params=getConverterParams();
    let lm=NaN,cd=NaN,lx=NaN,nit=NaN,ev=NaN,stops=NaN,exposure=NaN,wm2=NaN;

    switch(unit){
      case "lm":
        lm=value;
        cd=lm/params.sr;
        lx=cd/(params.distance*params.distance);
        nit=luxToNit(lx,params.reflectance);
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        wm2=luxToWm2(lx,params.efficacy);
        highlightConverterResults(["lm"]);
        break;
      case "cd":
        cd=value;
        lm=cd*params.sr;
        lx=cd/(params.distance*params.distance);
        nit=luxToNit(lx,params.reflectance);
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        wm2=luxToWm2(lx,params.efficacy);
        highlightConverterResults(["cd"]);
        break;
      case "lx":
        lx=value;
        cd=lx*(params.distance*params.distance);
        lm=cd*params.sr;
        nit=luxToNit(lx,params.reflectance);
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        wm2=luxToWm2(lx,params.efficacy);
        highlightConverterResults(["lx"]);
        break;
      case "nit":
        nit=value;
        if(params.reflectance===0) throw new Error("Reflectance cannot be 0 when converting from nit.");
        lx=nitToLux(nit,params.reflectance);
        cd=lx*(params.distance*params.distance);
        lm=cd*params.sr;
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        wm2=luxToWm2(lx,params.efficacy);
        highlightConverterResults(["nit"]);
        break;
      case "ev":
        ev=value;
        stops=ev;
        exposure=stopsToExposure(stops);
        lx=evToLux(ev);
        cd=lx*(params.distance*params.distance);
        lm=cd*params.sr;
        nit=luxToNit(lx,params.reflectance);
        wm2=luxToWm2(lx,params.efficacy);
        highlightConverterResults(["ev"]);
        break;
      case "stops":
        stops=value;
        ev=stops;
        exposure=stopsToExposure(stops);
        lx=evToLux(ev);
        cd=lx*(params.distance*params.distance);
        lm=cd*params.sr;
        nit=luxToNit(lx,params.reflectance);
        wm2=luxToWm2(lx,params.efficacy);
        highlightConverterResults(["stops"]);
        break;
      case "exposure":
        exposure=value;
        if(!isFinitePositive(exposure)) throw new Error("Exposure multiplier must be greater than 0.");
        stops=exposureToStops(exposure);
        ev=stops;
        lx=evToLux(ev);
        cd=lx*(params.distance*params.distance);
        lm=cd*params.sr;
        nit=luxToNit(lx,params.reflectance);
        wm2=luxToWm2(lx,params.efficacy);
        highlightConverterResults(["exposure"]);
        break;
      case "wm2":
        wm2=value;
        lx=wm2ToLux(wm2,params.efficacy);
        cd=lx*(params.distance*params.distance);
        lm=cd*params.sr;
        nit=luxToNit(lx,params.reflectance);
        ev=luxToEv(lx);
        stops=ev;
        exposure=stopsToExposure(stops);
        highlightConverterResults(["wm2"]);
        break;
      case "sr":
        if(!(value>0&&value<=2*Math.PI)) throw new Error("Solid angle must be greater than 0 and at most 2π.");
        if(!isSimple()){
          convSrInput.value=Number(value).toFixed(4);
          convBeamAngleInput.value=steradianToBeamAngle(value).toFixed(4);
        }
        setConverterResults({lm:NaN,cd:NaN,lx:NaN,nit:NaN,ev:NaN,stops:NaN,exposure:NaN,wm2:NaN,sr:value,beamAngle:steradianToBeamAngle(value)});
        highlightConverterResults(["sr","beamAngle"]);
        return;
      default:
        throw new Error("Unsupported input unit.");
    }

    setConverterResults({lm,cd,lx,nit,ev,stops,exposure,wm2,sr:params.sr,beamAngle:params.beamAngle});
  }catch(error){
    clearConverterHighlights();
    showError(error.message);
  }
}
function resetConverter(){
  convPresetSelect.value="none";
  convValueInput.value="1000";
  convUnitSelect.value="lm";
  applySimpleDefaults();
  updateConverterFieldVisibility();
  convertMain();
}
function applyConverterPreset(name){
  const preset=PRESETS[name];
  if(!preset) return;
  convUnitSelect.value=preset.unit;
  convValueInput.value=String(preset.value);
  updateConverterFieldVisibility();
  convertMain();
}

function updateShutterInputState(presetSelect,inputField){
  const isCustom=presetSelect.value==="custom";
  inputField.disabled=!isCustom;
}
function syncShutterPairFromPreset(presetSelect,inputField,calcFn){
  if(presetSelect.value!=="custom"){
    inputField.value=presetSelect.value;
  }
  updateShutterInputState(presetSelect,inputField);
  calcFn();
}
function syncShutterPairFromInput(presetSelect,inputField){
  if(inputField.value.trim()!==presetSelect.value){
    presetSelect.value="custom";
    updateShutterInputState(presetSelect,inputField);
  }
}
function calculateCameraGeneric(apertureInput,shutterInput,isoInput,reflectanceInput,resultEvIso,resultEv100,resultLux,resultNit,resultStops,resultExposure){
  const aperture=parseFloat(apertureInput.value);
  const shutter=parseShutter(shutterInput.value);
  const isoValue=isSimple()?DEFAULTS.iso:parseFloat(isoInput.value);
  const reflectanceValue=isSimple()?DEFAULTS.reflectance:parseFloat(reflectanceInput.value);

  if(!isFinitePositive(aperture)) throw new Error("Aperture must be greater than 0.");
  if(!isFinitePositive(shutter)) throw new Error("Enter a valid shutter value, for example 1/60 or 0.0167.");
  if(!isFinitePositive(isoValue)) throw new Error("ISO must be greater than 0.");
  if(!Number.isFinite(reflectanceValue)||reflectanceValue<0||reflectanceValue>1) throw new Error("Reflectance must be between 0 and 1.");

  const ev100Value=ev100FromApertureShutter(aperture,shutter);
  const evAtIsoValue=evAtIsoFromEv100(ev100Value,isoValue);
  const luxValue=evToLux(ev100Value);
  const nitValue=luxToNit(luxValue,reflectanceValue);
  const stopsValue=ev100Value;
  const exposureValue=stopsToExposure(stopsValue);

  resultEvIso.textContent=formatNumber(evAtIsoValue);
  resultEv100.textContent=formatNumber(ev100Value);
  resultLux.textContent=formatNumber(luxValue);
  resultNit.textContent=formatNumber(nitValue);
  resultStops.textContent=formatNumber(stopsValue);
  resultExposure.textContent=formatNumber(exposureValue);
}
function calculateCamera(){
  try{
    calculateCameraGeneric(
      camApertureInput,camShutterInput,camIsoInput,camReflectanceInput,
      camResultEvIso,camResultEv100,camResultLux,camResultNit,camResultStops,camResultExposure
    );
  }catch(error){
    showError(error.message);
  }
}
function resetCamera(){
  camApertureInput.value="8";
  camShutterPresetSelect.value="1/60";
  camShutterInput.value="1/60";
  camIsoInput.value=String(DEFAULTS.iso);
  camReflectanceInput.value=String(DEFAULTS.reflectance);
  updateShutterInputState(camShutterPresetSelect,camShutterInput);
  calculateCamera();
}

function calculateEV(){
  try{
    calculateCameraGeneric(
      evApertureInput,evShutterInput,evIsoInput,evReflectanceInput,
      evResultEvIso,evResultEv100,evResultLux,evResultNit,evResultStops,evResultExposure
    );
  }catch(error){
    showError(error.message);
  }
}
function resetEV(){
  evApertureInput.value="8";
  evShutterPresetSelect.value="1/60";
  evShutterInput.value="1/60";
  evIsoInput.value=String(DEFAULTS.iso);
  evReflectanceInput.value=String(DEFAULTS.reflectance);
  updateShutterInputState(evShutterPresetSelect,evShutterInput);
  calculateEV();
}

function calculateHDR(){
  try{
    const value=parseFloat(hdrValueInput.value);
    const unit=hdrUnitSelect.value;
    const reflectanceValue=isSimple()?DEFAULTS.reflectance:parseFloat(hdrReflectanceInput.value);

    if(!Number.isFinite(value)) throw new Error("Enter a valid numeric input value.");
    if(!Number.isFinite(reflectanceValue)||reflectanceValue<0||reflectanceValue>1) throw new Error("Reflectance must be between 0 and 1.");

    let nitValue=NaN,luxValue=NaN,evValue=NaN,stopsValue=NaN,exposureValue=NaN;

    switch(unit){
      case "nit":
        nitValue=value;
        if(reflectanceValue===0) throw new Error("Reflectance cannot be 0 when converting from nit.");
        luxValue=nitToLux(nitValue,reflectanceValue);
        evValue=luxToEv(luxValue);
        stopsValue=evValue;
        exposureValue=stopsToExposure(stopsValue);
        break;
      case "ev":
        evValue=value;
        stopsValue=evValue;
        exposureValue=stopsToExposure(stopsValue);
        luxValue=evToLux(evValue);
        nitValue=luxToNit(luxValue,reflectanceValue);
        break;
      case "stops":
        stopsValue=value;
        evValue=stopsValue;
        exposureValue=stopsToExposure(stopsValue);
        luxValue=evToLux(evValue);
        nitValue=luxToNit(luxValue,reflectanceValue);
        break;
      case "exposure":
        exposureValue=value;
        if(!isFinitePositive(exposureValue)) throw new Error("Exposure multiplier must be greater than 0.");
        stopsValue=exposureToStops(exposureValue);
        evValue=stopsValue;
        luxValue=evToLux(evValue);
        nitValue=luxToNit(luxValue,reflectanceValue);
        break;
      case "lx":
        luxValue=value;
        nitValue=luxToNit(luxValue,reflectanceValue);
        evValue=luxToEv(luxValue);
        stopsValue=evValue;
        exposureValue=stopsToExposure(stopsValue);
        break;
      default:
        throw new Error("Unsupported HDR input type.");
    }

    hdrResultNit.textContent=formatNumber(nitValue);
    hdrResultLux.textContent=formatNumber(luxValue);
    hdrResultEv.textContent=formatNumber(evValue);
    hdrResultStops.textContent=formatNumber(stopsValue);
    hdrResultExposure.textContent=formatNumber(exposureValue);
  }catch(error){
    showError(error.message);
  }
}
function resetHDR(){
  hdrValueInput.value="1000";
  hdrUnitSelect.value="nit";
  hdrReflectanceInput.value=String(DEFAULTS.reflectance);
  calculateHDR();
}

function calculateACES(){
  try{
    const inputValue=parseFloat(acesSceneLinearInput.value);
    const stopsValue=parseFloat(acesStopsInput.value);
    const middleGrayValue=isSimple()?DEFAULTS.middleGray:parseFloat(acesMiddleGrayInput.value);

    if(!Number.isFinite(inputValue)||inputValue<0) throw new Error("Scene linear value must be 0 or greater.");
    if(!Number.isFinite(stopsValue)) throw new Error("Enter a valid stops value.");
    if(!isFinitePositive(middleGrayValue)) throw new Error("Middle gray must be greater than 0.");

    const exposureValue=stopsToExposure(stopsValue);
    const outputValue=inputValue*exposureValue;
    const relativeGrayValue=outputValue/middleGrayValue;
    const evValue=stopsValue;

    acesResultInput.textContent=formatNumber(inputValue);
    acesResultStops.textContent=formatNumber(stopsValue);
    acesResultExposure.textContent=formatNumber(exposureValue);
    acesResultOutput.textContent=formatNumber(outputValue);
    acesResultRelativeGray.textContent=formatNumber(relativeGrayValue);
    acesResultEv.textContent=formatNumber(evValue);
  }catch(error){
    showError(error.message);
  }
}
function resetACES(){
  acesSceneLinearInput.value="0.18";
  acesStopsInput.value="0";
  acesMiddleGrayInput.value=String(DEFAULTS.middleGray);
  calculateACES();
}

function calculateIES(){
  try{
    const lumenValue=parseFloat(iesLmInput.value);
    const distanceValue=isSimple()?DEFAULTS.distance:parseFloat(iesDistanceInput.value);
    let srValue=isSimple()?DEFAULTS.sr:parseFloat(iesSrInput.value);
    let beamAngleValue=isSimple()?DEFAULTS.beamAngle:parseFloat(iesBeamAngleInput.value);

    if(!Number.isFinite(lumenValue)||lumenValue<0) throw new Error("Luminous flux must be 0 or greater.");
    if(!isFinitePositive(distanceValue)) throw new Error("Distance must be greater than 0.");

    if(isSimple()){
      srValue=DEFAULTS.sr;
      beamAngleValue=DEFAULTS.beamAngle;
    }else{
      if(Number.isFinite(srValue)&&srValue>0&&srValue<=2*Math.PI){
        beamAngleValue=steradianToBeamAngle(srValue);
        iesBeamAngleInput.value=beamAngleValue.toFixed(4);
      }else if(Number.isFinite(beamAngleValue)&&beamAngleValue>0&&beamAngleValue<=180){
        srValue=beamAngleValue===180?2*Math.PI:beamAngleToSteradian(beamAngleValue);
        iesSrInput.value=srValue.toFixed(4);
      }else{
        throw new Error("Enter a valid solid angle (sr) or beam angle (0–180°).");
      }
    }

    const candelaValue=lumenValue/srValue;
    const luxValue=candelaValue/(distanceValue*distanceValue);

    iesResultLm.textContent=formatNumber(lumenValue);
    iesResultCd.textContent=formatNumber(candelaValue);
    iesResultLux.textContent=formatNumber(luxValue);
    iesResultSr.textContent=formatNumber(srValue);
    iesResultBeamAngle.textContent=formatNumber(beamAngleValue);
  }catch(error){
    showError(error.message);
  }
}
function resetIES(){
  iesLmInput.value="1000";
  iesDistanceInput.value=String(DEFAULTS.distance);
  iesSrInput.value=DEFAULTS.sr.toFixed(4);
  iesBeamAngleInput.value=String(DEFAULTS.beamAngle);
  calculateIES();
}

function calculateLambert(){
  try{
    const value=parseFloat(lambertValueInput.value);
    const unit=lambertUnitSelect.value;
    const reflectanceValue=parseFloat(lambertReflectanceInput.value);

    if(!Number.isFinite(value)) throw new Error("Enter a valid numeric input value.");
    if(!Number.isFinite(reflectanceValue)||reflectanceValue<0||reflectanceValue>1) throw new Error("Reflectance must be between 0 and 1.");

    let luxValue=NaN;
    let nitValue=NaN;

    if(unit==="lx"){
      luxValue=value;
      nitValue=luxToNit(luxValue,reflectanceValue);
    }else{
      if(reflectanceValue===0) throw new Error("Reflectance cannot be 0 when converting from nit.");
      nitValue=value;
      luxValue=nitToLux(nitValue,reflectanceValue);
    }

    lambertResultLux.textContent=formatNumber(luxValue);
    lambertResultNit.textContent=formatNumber(nitValue);
    lambertResultApprox.textContent=`nit = lux × ${formatNumber(reflectanceValue)} / π`;
  }catch(error){
    showError(error.message);
  }
}
function resetLambert(){
  lambertValueInput.value="100";
  lambertUnitSelect.value="lx";
  lambertReflectanceInput.value=String(DEFAULTS.reflectance);
  calculateLambert();
}

function applyPBRPreset(name,lux,reflectance){
  const nitValue=luxToNit(lux,reflectance);
  const evValue=luxToEv(lux);
  const stopsValue=evValue;
  const exposureValue=stopsToExposure(stopsValue);

  pbrResultName.textContent=name;
  pbrResultLux.textContent=formatNumber(lux);
  pbrResultNit.textContent=formatNumber(nitValue);
  pbrResultEv.textContent=formatNumber(evValue);
  pbrResultStops.textContent=formatNumber(stopsValue);
  pbrResultExposure.textContent=formatNumber(exposureValue);
}
function runAllVisibleCalculations(){
  convertMain();
  calculateCamera();
  calculateEV();
  calculateHDR();
  calculateACES();
  calculateIES();
  calculateLambert();
}
function initTooltipHandlers(){
  document.querySelectorAll(".info-btn").forEach(btn=>{
    btn.addEventListener("mouseenter",e=>showTooltip(btn.dataset.tooltip||"",e.clientX,e.clientY));
    btn.addEventListener("mousemove",e=>showTooltip(btn.dataset.tooltip||"",e.clientX,e.clientY));
    btn.addEventListener("mouseleave",hideTooltip);
    btn.addEventListener("focus",e=>showTooltip(btn.dataset.tooltip||"",e.clientX||0,e.clientY||0));
    btn.addEventListener("blur",hideTooltip);
  });
}
function initEventListeners(){
  tabButtons.forEach(button=>{
    button.addEventListener("click",()=>activateTab(button.dataset.tab));
  });

  globalModeRadios.forEach(radio=>{
    radio.addEventListener("change",()=>{
      updateGlobalModeUI();
      runAllVisibleCalculations();
    });
  });

  convPresetSelect.addEventListener("change",()=>{
    if(convPresetSelect.value==="none"){
      resetConverter();
      return;
    }
    applyConverterPreset(convPresetSelect.value);
  });

  convConvertBtn.addEventListener("click",convertMain);
  convResetBtn.addEventListener("click",resetConverter);
  convUnitSelect.addEventListener("change",()=>{
    updateConverterFieldVisibility();
    convertMain();
  });
  convBeamAngleInput.addEventListener("input",()=>{
    const angle=parseFloat(convBeamAngleInput.value);
    if(Number.isFinite(angle)&&angle>0&&angle<180) convSrInput.value=beamAngleToSteradian(angle).toFixed(4);
    if(Number.isFinite(angle)&&angle===180) convSrInput.value=(2*Math.PI).toFixed(4);
  });
  convSrInput.addEventListener("input",()=>{
    const srValue=parseFloat(convSrInput.value);
    if(Number.isFinite(srValue)&&srValue>0&&srValue<=2*Math.PI) convBeamAngleInput.value=steradianToBeamAngle(srValue).toFixed(4);
  });

  camCalcBtn.addEventListener("click",calculateCamera);
  camResetBtn.addEventListener("click",resetCamera);
  camShutterPresetSelect.addEventListener("change",()=>syncShutterPairFromPreset(camShutterPresetSelect,camShutterInput,calculateCamera));
  camShutterInput.addEventListener("input",()=>syncShutterPairFromInput(camShutterPresetSelect,camShutterInput));

  evCalcBtn.addEventListener("click",calculateEV);
  evResetBtn.addEventListener("click",resetEV);
  evShutterPresetSelect.addEventListener("change",()=>syncShutterPairFromPreset(evShutterPresetSelect,evShutterInput,calculateEV));
  evShutterInput.addEventListener("input",()=>syncShutterPairFromInput(evShutterPresetSelect,evShutterInput));

  hdrCalcBtn.addEventListener("click",calculateHDR);
  hdrResetBtn.addEventListener("click",resetHDR);

  acesCalcBtn.addEventListener("click",calculateACES);
  acesResetBtn.addEventListener("click",resetACES);

  iesCalcBtn.addEventListener("click",calculateIES);
  iesResetBtn.addEventListener("click",resetIES);
  iesBeamAngleInput.addEventListener("input",()=>{
    const angle=parseFloat(iesBeamAngleInput.value);
    if(Number.isFinite(angle)&&angle>0&&angle<180) iesSrInput.value=beamAngleToSteradian(angle).toFixed(4);
    if(Number.isFinite(angle)&&angle===180) iesSrInput.value=(2*Math.PI).toFixed(4);
  });
  iesSrInput.addEventListener("input",()=>{
    const srValue=parseFloat(iesSrInput.value);
    if(Number.isFinite(srValue)&&srValue>0&&srValue<=2*Math.PI) iesBeamAngleInput.value=steradianToBeamAngle(srValue).toFixed(4);
  });

  lambertCalcBtn.addEventListener("click",calculateLambert);
  lambertResetBtn.addEventListener("click",resetLambert);

  pbrPresetGrid.addEventListener("click",event=>{
    const button=event.target.closest(".preset-btn");
    if(!button) return;
    const name=button.dataset.name||"-";
    const lux=parseFloat(button.dataset.lux);
    const reflectance=parseFloat(button.dataset.rho||DEFAULTS.reflectance);
    applyPBRPreset(name,lux,reflectance);
  });

  initTooltipHandlers();
}
function init(){
  applySimpleDefaults();
  updateGlobalModeUI();
  activateTab("converter");
  updateConverterFieldVisibility();
  initEventListeners();
  resetConverter();
  resetCamera();
  resetEV();
  resetHDR();
  resetACES();
  resetIES();
  resetLambert();
  applyPBRPreset("Room",100,DEFAULTS.reflectance);
  updateShutterInputState(evShutterPresetSelect,evShutterInput);
  updateShutterInputState(camShutterPresetSelect,camShutterInput);
}

window.addEventListener("load",init);

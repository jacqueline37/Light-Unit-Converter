window.AppUtils={
  getMode(){
    return document.querySelector('input[name="globalMode"]:checked').value;
  },
  isSimple(){
    return this.getMode()==="simple";
  },
  degToRad(deg){return deg*Math.PI/180;},
  radToDeg(rad){return rad*180/Math.PI;},
  clamp(value,min,max){return Math.min(Math.max(value,min),max);},
  isFinitePositive(value){return Number.isFinite(value)&&value>0;},
  formatNumber(value){
    if(!Number.isFinite(value)) return "—";
    const abs=Math.abs(value);
    if(abs>=100000||(abs>0&&abs<0.001)) return value.toExponential(4);
    return Number(value.toFixed(4)).toString();
  },
  beamAngleToSteradian(angleDeg){
    const safe=this.clamp(angleDeg,0.0001,179.9999);
    const half=this.degToRad(safe/2);
    return 2*Math.PI*(1-Math.cos(half));
  },
  steradianToBeamAngle(sr){
    const safe=this.clamp(sr,0,2*Math.PI);
    const cosHalf=1-safe/(2*Math.PI);
    const half=Math.acos(this.clamp(cosHalf,-1,1));
    return this.radToDeg(half*2);
  },
  evToLux(ev){return 2.5*Math.pow(2,ev);},
  luxToEv(lux){return lux>0?Math.log2(lux/2.5):NaN;},
  stopsToExposure(stops){return Math.pow(2,stops);},
  exposureToStops(exposure){return exposure>0?Math.log2(exposure):NaN;},
  luxToWm2(lux,efficacy){return efficacy>0?lux/efficacy:NaN;},
  wm2ToLux(wm2,efficacy){return wm2*efficacy;},
  nitToLux(nit,reflectance){return reflectance>0?(nit*Math.PI)/reflectance:NaN;},
  luxToNit(lux,reflectance){return (lux*reflectance)/Math.PI;},
  ev100FromApertureShutter(aperture,shutter){
    return aperture>0&&shutter>0?Math.log2((aperture*aperture)/shutter):NaN;
  },
  evAtIsoFromEv100(ev100,iso){
    return Number.isFinite(ev100)&&iso>0?ev100-Math.log2(iso/100):NaN;
  },
  parseShutter(value){
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
  },
  showError(message){
    alert(message);
  }
};

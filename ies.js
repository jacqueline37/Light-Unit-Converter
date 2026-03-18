window.IESModule={
  calculate(){
    const d=window.AppDom;
    const u=window.AppUtils;

    try{
      const lumenValue=parseFloat(d.iesLmInput.value);
      const distanceValue=u.isSimple()?window.AppData.DEFAULTS.distance:parseFloat(d.iesDistanceInput.value);
      let srValue=u.isSimple()?window.AppData.DEFAULTS.sr:parseFloat(d.iesSrInput.value);
      let beamAngleValue=u.isSimple()?window.AppData.DEFAULTS.beamAngle:parseFloat(d.iesBeamAngleInput.value);

      if(!Number.isFinite(lumenValue)||lumenValue<0) throw new Error("Luminous flux must be 0 or greater.");
      if(!u.isFinitePositive(distanceValue)) throw new Error("Distance must be greater than 0.");

      if(u.isSimple()){
        srValue=window.AppData.DEFAULTS.sr;
        beamAngleValue=window.AppData.DEFAULTS.beamAngle;
      }else{
        if(Number.isFinite(srValue)&&srValue>0&&srValue<=2*Math.PI){
          beamAngleValue=u.steradianToBeamAngle(srValue);
          d.iesBeamAngleInput.value=beamAngleValue.toFixed(4);
        }else if(Number.isFinite(beamAngleValue)&&beamAngleValue>0&&beamAngleValue<=180){
          srValue=beamAngleValue===180?2*Math.PI:u.beamAngleToSteradian(beamAngleValue);
          d.iesSrInput.value=srValue.toFixed(4);
        }else{
          throw new Error("Enter a valid solid angle (sr) or beam angle (0–180°).");
        }
      }

      const candelaValue=lumenValue/srValue;
      const luxValue=candelaValue/(distanceValue*distanceValue);
      const f=u.formatNumber.bind(u);

      d.iesResultLm.textContent=f(lumenValue);
      d.iesResultCd.textContent=f(candelaValue);
      d.iesResultLux.textContent=f(luxValue);
      d.iesResultSr.textContent=f(srValue);
      d.iesResultBeamAngle.textContent=f(beamAngleValue);
    }catch(error){
      u.showError(error.message);
    }
  },

  reset(){
    const d=window.AppDom;
    d.iesLmInput.value="1000";
    d.iesDistanceInput.value=String(window.AppData.DEFAULTS.distance);
    d.iesSrInput.value=window.AppData.DEFAULTS.sr.toFixed(4);
    d.iesBeamAngleInput.value=String(window.AppData.DEFAULTS.beamAngle);
    this.calculate();
  }
};

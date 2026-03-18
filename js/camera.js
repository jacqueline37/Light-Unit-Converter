window.CameraModule={
  calculateGeneric(apertureInput,shutterInput,isoInput,reflectanceInput,resultEvIso,resultEv100,resultLux,resultNit,resultStops,resultExposure){
    const u=window.AppUtils;
    const aperture=parseFloat(apertureInput.value);
    const shutter=u.parseShutter(shutterInput.value);
    const isoValue=u.isSimple()?window.AppData.DEFAULTS.iso:parseFloat(isoInput.value);
    const reflectanceValue=u.isSimple()?window.AppData.DEFAULTS.reflectance:parseFloat(reflectanceInput.value);

    if(!u.isFinitePositive(aperture)) throw new Error("Aperture must be greater than 0.");
    if(!u.isFinitePositive(shutter)) throw new Error("Enter a valid shutter value, for example 1/60 or 0.0167.");
    if(!u.isFinitePositive(isoValue)) throw new Error("ISO must be greater than 0.");
    if(!Number.isFinite(reflectanceValue)||reflectanceValue<0||reflectanceValue>1) throw new Error("Reflectance must be between 0 and 1.");

    const ev100Value=u.ev100FromApertureShutter(aperture,shutter);
    const evAtIsoValue=u.evAtIsoFromEv100(ev100Value,isoValue);
    const luxValue=u.evToLux(ev100Value);
    const nitValue=u.luxToNit(luxValue,reflectanceValue);
    const stopsValue=ev100Value;
    const exposureValue=u.stopsToExposure(stopsValue);
    const f=u.formatNumber.bind(u);

    resultEvIso.textContent=f(evAtIsoValue);
    resultEv100.textContent=f(ev100Value);
    resultLux.textContent=f(luxValue);
    resultNit.textContent=f(nitValue);
    resultStops.textContent=f(stopsValue);
    resultExposure.textContent=f(exposureValue);
  },

  calculateCamera(){
    const d=window.AppDom;
    try{
      this.calculateGeneric(
        d.camApertureInput,d.camShutterInput,d.camIsoInput,d.camReflectanceInput,
        d.camResultEvIso,d.camResultEv100,d.camResultLux,d.camResultNit,d.camResultStops,d.camResultExposure
      );
    }catch(error){
      window.AppUtils.showError(error.message);
    }
  },

  resetCamera(){
    const d=window.AppDom;
    d.camApertureInput.value="8";
    d.camShutterPresetSelect.value="1/60";
    d.camShutterInput.value="1/60";
    d.camIsoInput.value=String(window.AppData.DEFAULTS.iso);
    d.camReflectanceInput.value=String(window.AppData.DEFAULTS.reflectance);
    window.AppUI.updateShutterInputState(d.camShutterPresetSelect,d.camShutterInput);
    this.calculateCamera();
  },

  calculateEV(){
    const d=window.AppDom;
    try{
      this.calculateGeneric(
        d.evApertureInput,d.evShutterInput,d.evIsoInput,d.evReflectanceInput,
        d.evResultEvIso,d.evResultEv100,d.evResultLux,d.evResultNit,d.evResultStops,d.evResultExposure
      );
    }catch(error){
      window.AppUtils.showError(error.message);
    }
  },

  resetEV(){
    const d=window.AppDom;
    d.evApertureInput.value="8";
    d.evShutterPresetSelect.value="1/60";
    d.evShutterInput.value="1/60";
    d.evIsoInput.value=String(window.AppData.DEFAULTS.iso);
    d.evReflectanceInput.value=String(window.AppData.DEFAULTS.reflectance);
    window.AppUI.updateShutterInputState(d.evShutterPresetSelect,d.evShutterInput);
    this.calculateEV();
  }
};

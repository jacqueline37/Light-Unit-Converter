window.HDRModule={
  calculate(){
    const d=window.AppDom;
    const u=window.AppUtils;

    try{
      const value=parseFloat(d.hdrValueInput.value);
      const unit=d.hdrUnitSelect.value;
      const reflectanceValue=u.isSimple()?window.AppData.DEFAULTS.reflectance:parseFloat(d.hdrReflectanceInput.value);

      if(!Number.isFinite(value)) throw new Error("Enter a valid numeric input value.");
      if(!Number.isFinite(reflectanceValue)||reflectanceValue<0||reflectanceValue>1) throw new Error("Reflectance must be between 0 and 1.");

      let nitValue=NaN,luxValue=NaN,evValue=NaN,stopsValue=NaN,exposureValue=NaN;

      switch(unit){
        case "nit":
          nitValue=value;
          if(reflectanceValue===0) throw new Error("Reflectance cannot be 0 when converting from nit.");
          luxValue=u.nitToLux(nitValue,reflectanceValue);
          evValue=u.luxToEv(luxValue);
          stopsValue=evValue;
          exposureValue=u.stopsToExposure(stopsValue);
          break;
        case "ev":
          evValue=value;
          stopsValue=evValue;
          exposureValue=u.stopsToExposure(stopsValue);
          luxValue=u.evToLux(evValue);
          nitValue=u.luxToNit(luxValue,reflectanceValue);
          break;
        case "stops":
          stopsValue=value;
          evValue=stopsValue;
          exposureValue=u.stopsToExposure(stopsValue);
          luxValue=u.evToLux(evValue);
          nitValue=u.luxToNit(luxValue,reflectanceValue);
          break;
        case "exposure":
          exposureValue=value;
          if(!u.isFinitePositive(exposureValue)) throw new Error("Exposure multiplier must be greater than 0.");
          stopsValue=u.exposureToStops(exposureValue);
          evValue=stopsValue;
          luxValue=u.evToLux(evValue);
          nitValue=u.luxToNit(luxValue,reflectanceValue);
          break;
        case "lx":
          luxValue=value;
          nitValue=u.luxToNit(luxValue,reflectanceValue);
          evValue=u.luxToEv(luxValue);
          stopsValue=evValue;
          exposureValue=u.stopsToExposure(stopsValue);
          break;
        default:
          throw new Error("Unsupported HDR input type.");
      }

      const f=u.formatNumber.bind(u);
      d.hdrResultNit.textContent=f(nitValue);
      d.hdrResultLux.textContent=f(luxValue);
      d.hdrResultEv.textContent=f(evValue);
      d.hdrResultStops.textContent=f(stopsValue);
      d.hdrResultExposure.textContent=f(exposureValue);
    }catch(error){
      u.showError(error.message);
    }
  },

  reset(){
    const d=window.AppDom;
    d.hdrValueInput.value="1000";
    d.hdrUnitSelect.value="nit";
    d.hdrReflectanceInput.value=String(window.AppData.DEFAULTS.reflectance);
    this.calculate();
  }
};

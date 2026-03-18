window.PBRModule={
  applyPreset(name,lux,reflectance){
    const d=window.AppDom;
    const u=window.AppUtils;
    const nitValue=u.luxToNit(lux,reflectance);
    const evValue=u.luxToEv(lux);
    const stopsValue=evValue;
    const exposureValue=u.stopsToExposure(stopsValue);
    const f=u.formatNumber.bind(u);

    d.pbrResultName.textContent=name;
    d.pbrResultLux.textContent=f(lux);
    d.pbrResultNit.textContent=f(nitValue);
    d.pbrResultEv.textContent=f(evValue);
    d.pbrResultStops.textContent=f(stopsValue);
    d.pbrResultExposure.textContent=f(exposureValue);
  }
};

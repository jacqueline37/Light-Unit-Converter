window.LambertModule={
  calculate(){
    const d=window.AppDom;
    const u=window.AppUtils;

    try{
      const value=parseFloat(d.lambertValueInput.value);
      const unit=d.lambertUnitSelect.value;
      const reflectanceValue=parseFloat(d.lambertReflectanceInput.value);

      if(!Number.isFinite(value)) throw new Error("Enter a valid numeric input value.");
      if(!Number.isFinite(reflectanceValue)||reflectanceValue<0||reflectanceValue>1) throw new Error("Reflectance must be between 0 and 1.");

      let luxValue=NaN;
      let nitValue=NaN;

      if(unit==="lx"){
        luxValue=value;
        nitValue=u.luxToNit(luxValue,reflectanceValue);
      }else{
        if(reflectanceValue===0) throw new Error("Reflectance cannot be 0 when converting from nit.");
        nitValue=value;
        luxValue=u.nitToLux(nitValue,reflectanceValue);
      }

      const f=u.formatNumber.bind(u);
      d.lambertResultLux.textContent=f(luxValue);
      d.lambertResultNit.textContent=f(nitValue);
      d.lambertResultApprox.textContent=`nit = lux × ${f(reflectanceValue)} / π`;
    }catch(error){
      u.showError(error.message);
    }
  },

  reset(){
    const d=window.AppDom;
    d.lambertValueInput.value="100";
    d.lambertUnitSelect.value="lx";
    d.lambertReflectanceInput.value=String(window.AppData.DEFAULTS.reflectance);
    this.calculate();
  }
};

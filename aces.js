window.ACESModule={
  calculate(){
    const d=window.AppDom;
    const u=window.AppUtils;

    try{
      const inputValue=parseFloat(d.acesSceneLinearInput.value);
      const stopsValue=parseFloat(d.acesStopsInput.value);
      const middleGrayValue=u.isSimple()?window.AppData.DEFAULTS.middleGray:parseFloat(d.acesMiddleGrayInput.value);

      if(!Number.isFinite(inputValue)||inputValue<0) throw new Error("Scene linear value must be 0 or greater.");
      if(!Number.isFinite(stopsValue)) throw new Error("Enter a valid stops value.");
      if(!u.isFinitePositive(middleGrayValue)) throw new Error("Middle gray must be greater than 0.");

      const exposureValue=u.stopsToExposure(stopsValue);
      const outputValue=inputValue*exposureValue;
      const relativeGrayValue=outputValue/middleGrayValue;
      const evValue=stopsValue;

      const f=u.formatNumber.bind(u);
      d.acesResultInput.textContent=f(inputValue);
      d.acesResultStops.textContent=f(stopsValue);
      d.acesResultExposure.textContent=f(exposureValue);
      d.acesResultOutput.textContent=f(outputValue);
      d.acesResultRelativeGray.textContent=f(relativeGrayValue);
      d.acesResultEv.textContent=f(evValue);
    }catch(error){
      u.showError(error.message);
    }
  },

  reset(){
    const d=window.AppDom;
    d.acesSceneLinearInput.value="0.18";
    d.acesStopsInput.value="0";
    d.acesMiddleGrayInput.value=String(window.AppData.DEFAULTS.middleGray);
    this.calculate();
  }
};

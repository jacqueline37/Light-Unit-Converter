window.ConverterModule={
  getNeededRoles(unit){
    const roleMap={
      lm:["sr","distance","reflectance"],
      cd:["distance","sr","reflectance"],
      lx:["distance","sr","reflectance"],
      nit:["distance","sr","reflectance"],
      stops:[],
      exposure:[],
      sr:["sr"]
    };
    return roleMap[unit]||[];
  },

  updateFieldVisibility(){
    const d=window.AppDom;
    const roles=this.getNeededRoles(d.convUnitSelect.value);
    if(window.AppUtils.isSimple()){
      d.convParamFields.forEach(field=>field.classList.add("hidden"));
      return;
    }
    d.convParamFields.forEach(field=>{
      const fieldRoles=(field.dataset.roles||"").split(" ");
      const visible=fieldRoles.some(role=>roles.includes(role));
      field.classList.toggle("hidden",!visible);
    });
  },

  getParams(){
    const {DEFAULTS}=window.AppData;
    const d=window.AppDom;
    const u=window.AppUtils;

    if(u.isSimple()){
      return {
        distance:DEFAULTS.distance,
        sr:DEFAULTS.sr,
        beamAngle:DEFAULTS.beamAngle,
        reflectance:DEFAULTS.reflectance
      };
    }

    const distance=parseFloat(d.convDistanceInput.value);
    let sr=parseFloat(d.convSrInput.value);
    let beamAngle=parseFloat(d.convBeamAngleInput.value);
    const reflectance=parseFloat(d.convReflectanceInput.value);

    if(!u.isFinitePositive(distance)) throw new Error("Distance must be greater than 0.");
    if(!Number.isFinite(reflectance)||reflectance<0||reflectance>1) throw new Error("Reflectance must be between 0 and 1.");

    if(Number.isFinite(sr)&&sr>0&&sr<=2*Math.PI){
      beamAngle=u.steradianToBeamAngle(sr);
      d.convBeamAngleInput.value=beamAngle.toFixed(4);
    }else if(Number.isFinite(beamAngle)&&beamAngle>0&&beamAngle<=180){
      sr=beamAngle===180?2*Math.PI:u.beamAngleToSteradian(beamAngle);
      d.convSrInput.value=sr.toFixed(4);
    }else{
      throw new Error("Enter a valid solid angle (sr) or beam angle (0–180°).");
    }

    return {distance,sr,beamAngle,reflectance};
  },

  setResults(data){
    const d=window.AppDom;
    const f=window.AppUtils.formatNumber.bind(window.AppUtils);

    d.convResultLm.textContent=f(data.lm);
    d.convResultCd.textContent=f(data.cd);
    d.convResultLx.textContent=f(data.lx);
    d.convResultNit.textContent=f(data.nit);
    d.convResultStops.textContent=f(data.stops);
    d.convResultExposure.textContent=f(data.exposure);
    d.convResultSr.textContent=f(data.sr);
    d.convResultBeamAngle.textContent=f(data.beamAngle);
  },

  convert(){
    const d=window.AppDom;
    const u=window.AppUtils;
    const ui=window.AppUI;

    try{
      const value=parseFloat(d.convValueInput.value);
      const unit=d.convUnitSelect.value;
      if(!Number.isFinite(value)) throw new Error("Enter a valid numeric input value.");

      const p=this.getParams();
      let lm=NaN,cd=NaN,lx=NaN,nit=NaN,stops=NaN,exposure=NaN;

      switch(unit){
        case "lm":
          lm=value;
          cd=lm/p.sr;
          lx=cd/(p.distance*p.distance);
          nit=u.luxToNit(lx,p.reflectance);
          ui.highlightConverterResults(["lm"]);
          break;

        case "cd":
          cd=value;
          lm=cd*p.sr;
          lx=cd/(p.distance*p.distance);
          nit=u.luxToNit(lx,p.reflectance);
          ui.highlightConverterResults(["cd"]);
          break;

        case "lx":
          lx=value;
          cd=lx*(p.distance*p.distance);
          lm=cd*p.sr;
          nit=u.luxToNit(lx,p.reflectance);
          ui.highlightConverterResults(["lx"]);
          break;

        case "nit":
          nit=value;
          if(p.reflectance===0) throw new Error("Reflectance cannot be 0 when converting from nit.");
          lx=u.nitToLux(nit,p.reflectance);
          cd=lx*(p.distance*p.distance);
          lm=cd*p.sr;
          ui.highlightConverterResults(["nit"]);
          break;

        case "stops":
          stops=value;
          exposure=u.stopsToExposure(stops);
          ui.highlightConverterResults(["stops"]);
          break;

        case "exposure":
          exposure=value;
          if(!u.isFinitePositive(exposure)) throw new Error("Exposure multiplier must be greater than 0.");
          stops=u.exposureToStops(exposure);
          ui.highlightConverterResults(["exposure"]);
          break;

        case "sr":
          if(!(value>0&&value<=2*Math.PI)) throw new Error("Solid angle must be greater than 0 and at most 2π.");
          if(!u.isSimple()){
            d.convSrInput.value=Number(value).toFixed(4);
            d.convBeamAngleInput.value=u.steradianToBeamAngle(value).toFixed(4);
          }
          this.setResults({
            lm:NaN,
            cd:NaN,
            lx:NaN,
            nit:NaN,
            stops:NaN,
            exposure:NaN,
            sr:value,
            beamAngle:u.steradianToBeamAngle(value)
          });
          ui.highlightConverterResults(["sr","beamAngle"]);
          return;

        default:
          throw new Error("Unsupported input unit.");
      }

      this.setResults({
        lm,
        cd,
        lx,
        nit,
        stops,
        exposure,
        sr:p.sr,
        beamAngle:p.beamAngle
      });
    }catch(error){
      window.AppUI.clearConverterHighlights();
      u.showError(error.message);
    }
  },

  reset(){
    const d=window.AppDom;
    d.convPresetSelect.value="none";
    d.convValueInput.value="1000";
    d.convUnitSelect.value="lm";
    window.AppUI.applySimpleDefaults();
    this.updateFieldVisibility();
    this.convert();
  },

  applyPreset(name){
    const preset=window.AppData.CONVERTER_PRESETS[name];
    if(!preset) return;
    const d=window.AppDom;
    d.convUnitSelect.value=preset.unit;
    d.convValueInput.value=String(preset.value);
    this.updateFieldVisibility();
    this.convert();
  }
};

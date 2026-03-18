(function(){
  const d=window.AppDom;
  const u=window.AppUtils;
  const ui=window.AppUI;

  function runAllCalculations(){
    window.ConverterModule.convert();
    window.CameraModule.calculateCamera();
    window.CameraModule.calculateEV();
    window.HDRModule.calculate();
    window.ACESModule.calculate();
    window.IESModule.calculate();
    window.LambertModule.calculate();
  }

  function initEventListeners(){
    d.tabButtons.forEach(button=>{
      button.addEventListener("click",()=>ui.activateTab(button.dataset.tab));
    });

    d.globalModeRadios.forEach(radio=>{
      radio.addEventListener("change",()=>{
        ui.updateGlobalModeUI();
        runAllCalculations();
      });
    });

    d.convPresetSelect.addEventListener("change",()=>{
      if(d.convPresetSelect.value==="none"){
        window.ConverterModule.reset();
        return;
      }
      window.ConverterModule.applyPreset(d.convPresetSelect.value);
    });

    d.convConvertBtn.addEventListener("click",()=>window.ConverterModule.convert());
    d.convResetBtn.addEventListener("click",()=>window.ConverterModule.reset());
    d.convUnitSelect.addEventListener("change",()=>{
      window.ConverterModule.updateFieldVisibility();
      window.ConverterModule.convert();
    });
    d.convBeamAngleInput.addEventListener("input",()=>{
      const angle=parseFloat(d.convBeamAngleInput.value);
      if(Number.isFinite(angle)&&angle>0&&angle<180) d.convSrInput.value=u.beamAngleToSteradian(angle).toFixed(4);
      if(Number.isFinite(angle)&&angle===180) d.convSrInput.value=(2*Math.PI).toFixed(4);
    });
    d.convSrInput.addEventListener("input",()=>{
      const srValue=parseFloat(d.convSrInput.value);
      if(Number.isFinite(srValue)&&srValue>0&&srValue<=2*Math.PI) d.convBeamAngleInput.value=u.steradianToBeamAngle(srValue).toFixed(4);
    });

    d.camCalcBtn.addEventListener("click",()=>window.CameraModule.calculateCamera());
    d.camResetBtn.addEventListener("click",()=>window.CameraModule.resetCamera());
    d.camShutterPresetSelect.addEventListener("change",()=>ui.syncShutterPairFromPreset(d.camShutterPresetSelect,d.camShutterInput,()=>window.CameraModule.calculateCamera()));
    d.camShutterInput.addEventListener("input",()=>ui.syncShutterPairFromInput(d.camShutterPresetSelect,d.camShutterInput));

    d.evCalcBtn.addEventListener("click",()=>window.CameraModule.calculateEV());
    d.evResetBtn.addEventListener("click",()=>window.CameraModule.resetEV());
    d.evShutterPresetSelect.addEventListener("change",()=>ui.syncShutterPairFromPreset(d.evShutterPresetSelect,d.evShutterInput,()=>window.CameraModule.calculateEV()));
    d.evShutterInput.addEventListener("input",()=>ui.syncShutterPairFromInput(d.evShutterPresetSelect,d.evShutterInput));

    d.hdrCalcBtn.addEventListener("click",()=>window.HDRModule.calculate());
    d.hdrResetBtn.addEventListener("click",()=>window.HDRModule.reset());

    d.acesCalcBtn.addEventListener("click",()=>window.ACESModule.calculate());
    d.acesResetBtn.addEventListener("click",()=>window.ACESModule.reset());

    d.iesCalcBtn.addEventListener("click",()=>window.IESModule.calculate());
    d.iesResetBtn.addEventListener("click",()=>window.IESModule.reset());
    d.iesBeamAngleInput.addEventListener("input",()=>{
      const angle=parseFloat(d.iesBeamAngleInput.value);
      if(Number.isFinite(angle)&&angle>0&&angle<180) d.iesSrInput.value=u.beamAngleToSteradian(angle).toFixed(4);
      if(Number.isFinite(angle)&&angle===180) d.iesSrInput.value=(2*Math.PI).toFixed(4);
    });
    d.iesSrInput.addEventListener("input",()=>{
      const srValue=parseFloat(d.iesSrInput.value);
      if(Number.isFinite(srValue)&&srValue>0&&srValue<=2*Math.PI) d.iesBeamAngleInput.value=u.steradianToBeamAngle(srValue).toFixed(4);
    });

    d.lambertCalcBtn.addEventListener("click",()=>window.LambertModule.calculate());
    d.lambertResetBtn.addEventListener("click",()=>window.LambertModule.reset());

    d.pbrPresetGrid.addEventListener("click",event=>{
      const button=event.target.closest(".preset-btn");
      if(!button) return;
      const name=button.dataset.name||"-";
      const lux=parseFloat(button.dataset.lux);
      const reflectance=parseFloat(button.dataset.rho||window.AppData.DEFAULTS.reflectance);
      window.PBRModule.applyPreset(name,lux,reflectance);
    });

    ui.initTooltipHandlers();
  }

  function init(){
    ui.populateShutterPresets(d.camShutterPresetSelect);
    ui.populateShutterPresets(d.evShutterPresetSelect);
    ui.populatePBRButtons();

    ui.applySimpleDefaults();
    ui.updateGlobalModeUI();
    ui.activateTab("converter");
    window.ConverterModule.updateFieldVisibility();

    initEventListeners();

    window.ConverterModule.reset();
    window.CameraModule.resetCamera();
    window.CameraModule.resetEV();
    window.HDRModule.reset();
    window.ACESModule.reset();
    window.IESModule.reset();
    window.LambertModule.reset();
    window.PBRModule.applyPreset("Room",100,window.AppData.DEFAULTS.reflectance);

    ui.updateShutterInputState(d.evShutterPresetSelect,d.evShutterInput);
    ui.updateShutterInputState(d.camShutterPresetSelect,d.camShutterInput);
  }

  window.addEventListener("load",init);
})();

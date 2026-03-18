window.AppUI={
  activateTab(tabName){
    const {tabButtons,tabPanels}=window.AppDom;
    tabButtons.forEach(btn=>btn.classList.toggle("active",btn.dataset.tab===tabName));
    tabPanels.forEach(panel=>panel.classList.toggle("active",panel.id===`tab-${tabName}`));
  },

  clearConverterHighlights(){
    const {RESULT_CARD_IDS}=window.AppData;
    Object.values(RESULT_CARD_IDS).forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.classList.remove("result-item-active");
    });
  },

  highlightConverterResults(keys){
    const {RESULT_CARD_IDS}=window.AppData;
    this.clearConverterHighlights();
    keys.forEach(key=>{
      const id=RESULT_CARD_IDS[key];
      if(!id) return;
      const el=document.getElementById(id);
      if(el) el.classList.add("result-item-active");
    });
  },

  showTooltip(text,x,y){
    const {tooltip}=window.AppDom;
    tooltip.textContent=text;
    tooltip.style.left=`${x + 12}px`;
    tooltip.style.top=`${y + 12}px`;
    tooltip.classList.add("show");
  },

  hideTooltip(){
    window.AppDom.tooltip.classList.remove("show");
  },

  updateShutterInputState(presetSelect,inputField){
    inputField.disabled=presetSelect.value!=="custom";
  },

  syncShutterPairFromPreset(presetSelect,inputField,calcFn){
    if(presetSelect.value!=="custom") inputField.value=presetSelect.value;
    this.updateShutterInputState(presetSelect,inputField);
    calcFn();
  },

  syncShutterPairFromInput(presetSelect,inputField){
    if(inputField.value.trim()!==presetSelect.value){
      presetSelect.value="custom";
      this.updateShutterInputState(presetSelect,inputField);
    }
  },

  populateShutterPresets(selectEl){
    const {SHUTTER_PRESETS}=window.AppData;
    selectEl.innerHTML="";
    SHUTTER_PRESETS.forEach(value=>{
      const option=document.createElement("option");
      option.value=value;
      option.textContent=value==="custom"?"Custom":value;
      if(value==="1/60") option.selected=true;
      selectEl.appendChild(option);
    });
  },

  populatePBRButtons(){
    const {PBR_PRESETS}=window.AppData;
    const {pbrPresetGrid}=window.AppDom;
    pbrPresetGrid.innerHTML="";
    PBR_PRESETS.forEach(preset=>{
      const button=document.createElement("button");
      button.className="preset-btn";
      button.type="button";
      button.dataset.name=preset.name;
      button.dataset.lux=String(preset.lux);
      button.dataset.rho=String(preset.rho);
      button.textContent=preset.name;
      pbrPresetGrid.appendChild(button);
    });
  },

  initTooltipHandlers(){
    const {TOOLTIP_TEXT}=window.AppData;
    document.querySelectorAll(".info-btn").forEach(btn=>{
      btn.addEventListener("mouseenter",e=>this.showTooltip(TOOLTIP_TEXT[btn.dataset.tooltipKey]||"",e.clientX,e.clientY));
      btn.addEventListener("mousemove",e=>this.showTooltip(TOOLTIP_TEXT[btn.dataset.tooltipKey]||"",e.clientX,e.clientY));
      btn.addEventListener("mouseleave",()=>this.hideTooltip());
      btn.addEventListener("focus",e=>this.showTooltip(TOOLTIP_TEXT[btn.dataset.tooltipKey]||"",e.clientX||0,e.clientY||0));
      btn.addEventListener("blur",()=>this.hideTooltip());
    });
  },

  applySimpleDefaults(){
    const {DEFAULTS}=window.AppData;
    const d=window.AppDom;

    d.convDistanceInput.value=String(DEFAULTS.distance);
    d.convSrInput.value=DEFAULTS.sr.toFixed(4);
    d.convBeamAngleInput.value=String(DEFAULTS.beamAngle);
    d.convReflectanceInput.value=String(DEFAULTS.reflectance);

    d.camIsoInput.value=String(DEFAULTS.iso);
    d.camReflectanceInput.value=String(DEFAULTS.reflectance);

    d.evIsoInput.value=String(DEFAULTS.iso);
    d.evReflectanceInput.value=String(DEFAULTS.reflectance);

    d.hdrReflectanceInput.value=String(DEFAULTS.reflectance);
    d.acesMiddleGrayInput.value=String(DEFAULTS.middleGray);

    d.iesDistanceInput.value=String(DEFAULTS.distance);
    d.iesSrInput.value=DEFAULTS.sr.toFixed(4);
    d.iesBeamAngleInput.value=String(DEFAULTS.beamAngle);

    d.lambertReflectanceInput.value=String(DEFAULTS.reflectance);
  },

  updateGlobalModeUI(){
    const d=window.AppDom;
    const simple=window.AppUtils.isSimple();

    document.querySelectorAll(".adv").forEach(el=>el.classList.toggle("hidden",simple));
    d.globalModeNote.textContent=simple
      ? "Simple mode uses recommended defaults: distance = 1 m, sr = 2π, beam angle = 180°, reflectance = 0.8, ISO = 100."
      : "Advanced mode lets you edit physical assumptions directly, including distance, solid angle, beam angle, reflectance, ISO, and middle gray.";

    if(simple) this.applySimpleDefaults();

    window.ConverterModule.updateFieldVisibility();
    this.updateShutterInputState(d.evShutterPresetSelect,d.evShutterInput);
    this.updateShutterInputState(d.camShutterPresetSelect,d.camShutterInput);
  }
};

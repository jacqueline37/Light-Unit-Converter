window.AppData={
  DEFAULTS:{
    distance:1,
    sr:2*Math.PI,
    beamAngle:180,
    reflectance:0.8,
    iso:100,
    middleGray:0.18
  },
  RESULT_CARD_IDS:{
    lm:"convCardLm",
    cd:"convCardCd",
    lx:"convCardLx",
    nit:"convCardNit",
    stops:"convCardStops",
    exposure:"convCardExposure",
    sr:"convCardSr",
    beamAngle:"convCardBeamAngle"
  },
  CONVERTER_PRESETS:{
    moonlight:{unit:"lx",value:0.1},
    room:{unit:"lx",value:100},
    office:{unit:"lx",value:500},
    overcast:{unit:"lx",value:10000},
    sunlight:{unit:"lx",value:100000},
    hdr1000:{unit:"nit",value:1000},
    hdr400:{unit:"nit",value:400}
  },
  SHUTTER_PRESETS:[
    "1/8000","1/4000","1/2000","1/1000","1/500","1/250","1/125","1/60",
    "1/30","1/15","1/8","1/4","1/2","1","2","4","custom"
  ],
  TOOLTIP_TEXT:{
    convUnit:"Choose the input quantity to convert from.",
    distance:"Used for cd ↔ lx and related conversions through the inverse-square law.",
    sr:"Steradian. Used for lm ↔ cd. 2π sr is a hemisphere, 4π sr is a full sphere.",
    beamAngle:"Approximate cone angle used to derive the solid angle.",
    reflectance:"Lambertian reflectance used for lx ↔ nit conversion. 0.18 is middle gray, 0.8 is a bright diffuse surface."
  },
  PBR_PRESETS:[
    {name:"Moonlight",lux:0.1,rho:0.8},
    {name:"Dark Interior",lux:10,rho:0.8},
    {name:"Room",lux:100,rho:0.8},
    {name:"Office",lux:500,rho:0.8},
    {name:"Overcast Day",lux:10000,rho:0.8},
    {name:"Sunlight",lux:100000,rho:0.8}
  ]
};

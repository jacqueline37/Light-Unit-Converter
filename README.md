# Light Utility Suite

Light Utility Suite is a static web tool for converting and estimating lighting-related units used in CG, photography, HDR, ACES, PBR, and photometric workflows.

This tool allows approximate conversion between:

- lumen (lm)
- candela (cd)
- lux (lx)
- nit (cd/m²)
- EV / EV100
- stops
- exposure multiplier
- W/m²
- solid angle (sr)

It also provides helpers for:

- camera exposure
- HDR brightness
- ACES scene linear values
- IES-style light estimation
- Lambert reflectance approximation
- PBR lighting reference presets

The tool runs entirely in the browser and does not use storage.

---

## Purpose

This tool is intended for:

- CG / DCC / Game engine lighting
- Photography exposure reference
- HDR / ACES workflows
- PBR lighting setup
- Photometric estimation
- Learning relationships between lm / cd / lx / nit / EV

It is not a physical measurement tool, but a practical estimation utility.

---

## Features

### Converter

Convert between:

- lm
- cd
- lx
- nit
- EV100
- stops
- exposure
- W/m²
- sr

Conversion uses geometric assumptions when needed.

Requires:

- distance
- solid angle
- reflectance
- efficacy

Preset values are provided.

---

### Camera

Estimate exposure from camera settings.

Inputs:

- Aperture (f-number)
- Shutter (preset or custom)
- ISO
- Reflectance

Outputs:

- EV at ISO
- EV100
- lux
- nit
- stops
- exposure multiplier

Shutter supports:

- 1/60
- 1/125
- 0.0167
- 0.008

Preset shutter values are available.

---

### EV

EV calculator.

Uses:

EV100 = log2(N² / t)

EVISO = EV100 − log2(ISO / 100)

Approximate lux relation:

lx ≈ 2.5 × 2^EV

This is a practical approximation.

---

### HDR

Convert between:

- nit
- EV
- stops
- exposure
- lux

Useful for:

- HDR displays
- tone mapping
- brightness comparison

---

### ACES

Exposure helper for scene-linear workflows.

Inputs:

- scene linear value
- stops
- middle gray

Outputs:

- exposure multiplier
- output scene linear
- relative to middle gray
- EV equivalent

Default middle gray:

0.18

---

### IES

Simple photometric estimation.

Inputs:

- lumen
- distance
- solid angle
- beam angle

Outputs:

- candela
- lux
- sr
- beam angle

Uses:

cd = lm / sr  
lx = cd / d²

Assumes center direction.

---

### Lambert

Diffuse reflection helper.

Uses:

nit = lx × reflectance / π

Assumes ideal Lambert surface.

Not valid for:

- specular surfaces
- metal
- emissive displays
- complex BRDF

Use as approximation only.

---

### PBR Reference

Lighting presets:

- Moonlight
- Dark Interior
- Room
- Office
- Overcast
- Sunlight
- HDR display

Useful for scene setup.

---

## Simple / Advanced mode

Simple mode uses defaults:

- distance = 1 m
- sr = 2π
- beam angle = 180°
- reflectance = 0.8
- efficacy = 683 lm/W
- ISO = 100
- middle gray = 0.18

Advanced mode allows editing all parameters.

---

## Folder Structure

# Light Utility Suite

Light Utility Suite is a static web tool for converting and estimating lighting-related units used in CG, photography, HDR, ACES, PBR, and photometric workflows.

This tool allows approximate conversion between:

- lumen (lm)
- candela (cd)
- lux (lx)
- nit (cd/m²)
- EV / EV100
- stops
- exposure multiplier
- W/m²
- solid angle (sr)

It also provides helpers for:

- camera exposure
- HDR brightness
- ACES scene linear values
- IES-style light estimation
- Lambert reflectance approximation
- PBR lighting reference presets

The tool runs entirely in the browser and does not use storage.

---

## Purpose

This tool is intended for:

- CG / DCC / Game engine lighting
- Photography exposure reference
- HDR / ACES workflows
- PBR lighting setup
- Photometric estimation
- Learning relationships between lm / cd / lx / nit / EV

It is not a physical measurement tool, but a practical estimation utility.

---

## Features

### Converter

Convert between:

- lm
- cd
- lx
- nit
- EV100
- stops
- exposure
- W/m²
- sr

Conversion uses geometric assumptions when needed.

Requires:

- distance
- solid angle
- reflectance
- efficacy

Preset values are provided.

---

### Camera

Estimate exposure from camera settings.

Inputs:

- Aperture (f-number)
- Shutter (preset or custom)
- ISO
- Reflectance

Outputs:

- EV at ISO
- EV100
- lux
- nit
- stops
- exposure multiplier

Shutter supports:

- 1/60
- 1/125
- 0.0167
- 0.008

Preset shutter values are available.

---

### EV

EV calculator.

Uses:

EV100 = log2(N² / t)

EVISO = EV100 − log2(ISO / 100)

Approximate lux relation:

lx ≈ 2.5 × 2^EV

This is a practical approximation.

---

### HDR

Convert between:

- nit
- EV
- stops
- exposure
- lux

Useful for:

- HDR displays
- tone mapping
- brightness comparison

---

### ACES

Exposure helper for scene-linear workflows.

Inputs:

- scene linear value
- stops
- middle gray

Outputs:

- exposure multiplier
- output scene linear
- relative to middle gray
- EV equivalent

Default middle gray:

0.18

---

### IES

Simple photometric estimation.

Inputs:

- lumen
- distance
- solid angle
- beam angle

Outputs:

- candela
- lux
- sr
- beam angle

Uses:

cd = lm / sr  
lx = cd / d²

Assumes center direction.

---

### Lambert

Diffuse reflection helper.

Uses:

nit = lx × reflectance / π

Assumes ideal Lambert surface.

Not valid for:

- specular surfaces
- metal
- emissive displays
- complex BRDF

Use as approximation only.

---

### PBR Reference

Lighting presets:

- Moonlight
- Dark Interior
- Room
- Office
- Overcast
- Sunlight
- HDR display

Useful for scene setup.

---

## Simple / Advanced mode

Simple mode uses defaults:

- distance = 1 m
- sr = 2π
- beam angle = 180°
- reflectance = 0.8
- efficacy = 683 lm/W
- ISO = 100
- middle gray = 0.18

Advanced mode allows editing all parameters.

---

## Notes

Some conversions require geometric or photometric assumptions.

lm → cd requires solid angle (sr)  
cd → lx requires distance (m)  
lx → nit assumes Lambert diffuse reflection  
lx → W/m² requires luminous efficacy  
EV → lx uses a practical approximation

This tool is intended for practical lighting estimation in CG, photography, and rendering workflows.

Results may vary depending on assumptions and input parameters.  
Values should be used as reference only, not as precise physical measurements.

Do not rely on the results for scientific measurement, calibration, or safety-critical use.
This tool does not store any user data and runs entirely in the browser.

---

## License

MIT License


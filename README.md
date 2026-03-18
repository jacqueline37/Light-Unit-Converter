# Light Utility Suite

Light Utility Suite is a static web tool for converting and estimating lighting-related values used in CG, photography, HDR, ACES, PBR, and photometric workflows.

The tool focuses on conversions that can be performed consistently using simple geometric and photometric assumptions.

It runs entirely in the browser and does not store any user data.

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

## Supported quantities

The tool works with the following values:

- lumen (lm)
- candela (cd)
- lux (lx)
- luminance (cd/m², nit)
- EV / EV100
- stops
- exposure multiplier
- solid angle (sr)
- beam angle (deg)

Conversions are only performed when physically consistent assumptions are available.

---

## Features

### Converter

Convert between:

- lm
- cd
- lx
- nit
- stops
- exposure multiplier
- solid angle (sr)
- beam angle (deg)

Conversions may require:

- distance
- solid angle
- reflectance

Preset values are provided.

The converter uses geometric and photometric assumptions when needed.

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
- illuminance (lx)
- luminance (nit)
- stops
- exposure multiplier

Shutter supports presets and custom values.

Uses standard photographic exposure equations.

---

### EV

EV calculator.

Uses:

EV100 = log2(N² / t)

EVISO = EV100 − log2(ISO / 100)

Approximate illuminance relation:

lx ≈ 2.5 × 2^EV

This relation is based on photographic exposure calibration and is intended as a practical approximation.

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

Values are approximate and depend on assumptions.

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

Intended for ACES / scene-linear rendering workflows.

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

Assumes center direction and uniform beam.

---

### Lambert

Diffuse reflection helper.

Uses:

nit = lx × reflectance / π

Assumes ideal Lambertian surface.

Not valid for:

- specular materials
- metal
- emissive displays
- complex BRDF

Use as approximation only.

---

### PBR Reference

Lighting presets for scene setup.

Examples:

- Moonlight
- Dark interior
- Room
- Office
- Overcast
- Sunlight
- HDR display

Useful for rough lighting reference in CG scenes.

---

## Simple / Advanced mode

Simple mode uses recommended defaults:

- distance = 1 m
- sr = 2π
- beam angle = 180°
- reflectance = 0.8
- ISO = 100
- middle gray = 0.18

Advanced mode allows editing all parameters.

---

## Assumptions

All conversions assume idealized physical models.

Examples:

- lm ↔ cd uses solid angle
- cd ↔ lx assumes point source and normal incidence
- lx ↔ nit assumes Lambertian reflection
- beam angle ↔ sr assumes uniform circular cone
- EV relations use photographic exposure calibration

Results depend on these assumptions.

---

## Notes

Some conversions require geometric or photometric assumptions.

lm → cd requires solid angle  
cd → lx requires distance  
lx → nit assumes diffuse reflection  
EV → lx uses photographic calibration  

Values should be used as reference only.

This tool is intended for practical lighting estimation in:

- CG
- rendering
- photography
- HDR workflows

It is not intended for scientific measurement, calibration, or safety-critical use.

---

## Privacy

This tool runs entirely in the browser.

No data is stored.

No network requests are made.

---

## License

MIT License

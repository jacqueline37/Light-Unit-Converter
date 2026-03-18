# Light Utility Suite

Light Utility Suite is a small static web tool for converting and estimating lighting-related values used in CG, photography, HDR, ACES, and PBR workflows.

I made this mainly as a personal reference while working with lighting in rendering and photography, but it may also be useful for others.

The tool runs entirely in the browser and does not store any data.

Try online:
[https://xxxxx.github.io/Light-Unit-Converter/](https://jacqueline37.github.io/Light-Unit-Converter/)

---

## Purpose

This tool is intended for:

- CG / DCC / game engine lighting
- photography exposure reference
- HDR / ACES workflows
- PBR scene setup
- learning relationships between lm / cd / lx / nit / EV

It is not a scientific measurement tool, but a practical helper for everyday lighting work.

---

## Supported values

The tool works with:

- lumen (lm)
- candela (cd)
- lux (lx)
- luminance (cd/m², nit)
- EV / EV100
- stops
- exposure multiplier
- solid angle (sr)
- beam angle (deg)

Conversions are only performed when a reasonable physical assumption exists.

---

## Features

### Converter

Convert between:

- lm
- cd
- lx
- nit
- stops
- exposure
- solid angle
- beam angle

Some conversions require:

- distance
- solid angle
- reflectance

The goal is not to support everything, but to keep conversions consistent.

---

### Camera

Estimate exposure from camera settings.

Inputs:

- aperture
- shutter
- ISO
- reflectance

Outputs:

- EV
- EV100
- lux
- nit
- stops
- exposure multiplier

Uses standard photographic formulas.

---

### EV

EV calculator based on

EV100 = log2(N² / t)

Lux values are derived using a common photographic approximation.

---

### HDR

Convert between:

- nit
- EV
- stops
- exposure
- lux

Useful for comparing brightness in HDR / rendering workflows.

---

### ACES

Helper for scene-linear exposure calculations.

Supports:

- stops
- middle gray
- exposure multiplier

Default middle gray = 0.18

---

### IES

Simple photometric estimation.

Uses:

cd = lm / sr  
lx = cd / d²

Assumes idealized beam shape.

---

### Lambert

Diffuse reflection helper.

Uses:

nit = lx × reflectance / π

Assumes ideal Lambert surface.

This is only an approximation.

---

### PBR Reference

Preset lighting levels for scene setup.

Examples:

- Moonlight
- Interior
- Office
- Overcast
- Sunlight
- HDR display

Useful as rough reference values.

---

## Simple / Advanced mode

Simple mode uses defaults:

- distance = 1 m
- sr = 2π
- beam = 180°
- reflectance = 0.8
- ISO = 100
- middle gray = 0.18

Advanced mode allows editing parameters.

---

## Assumptions

All conversions use simplified physical models.

Examples:

- lm ↔ cd uses solid angle
- cd ↔ lx assumes point source
- lx ↔ nit assumes Lambert reflection
- beam angle ↔ sr assumes circular cone
- EV uses photographic calibration

Results depend on these assumptions.

---

## Feedback

This is a small personal tool.
If you notice incorrect results or bugs,
please open an issue on GitHub.

---

## Notes

This tool was made as a personal utility.

Values should be treated as estimates, not exact measurements.

Do not use for scientific calibration or safety-critical work.

---

## License

MIT

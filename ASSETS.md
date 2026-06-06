# Dropping in real renders

The site has photo-quality slots for the 6 katanas and 4 JDM cars. Until you have real images, polished SVG fallbacks display. Drop a file in the right location and it takes over automatically — no code edits required *except* one config field per asset.

## Katanas → `/public/katanas/`

Recommended: **600 × 1400 PNG, transparent background**, vertical orientation, blade tip at top.

| Asset | Variant | Filename to drop in |
|---|---|---|
| 1 | Education (silver/white, formula engravings) | `/public/katanas/edu.png` |
| 2 | Projects (cyan, circuit engravings) | `/public/katanas/proj.png` |
| 3 | Experience (gold, battle-worn) | `/public/katanas/exp.png` |
| 4 | Skills (purple, mechanical) | `/public/katanas/skill.png` |
| 5 | Hobbies (pink) | `/public/katanas/hob.png` |
| 6 | Contact (deep crimson) | `/public/katanas/ct.png` |

Then in [`components/katana/katanaConfig.ts`](components/katana/katanaConfig.ts), add a single line per variant — e.g. for Education:

```ts
{
  id: "edu",
  imageSrc: "/katanas/edu.png",   // ← add this
  label: "Education",
  // ...
}
```

That's it. The Katana component renders the `<img>` at the same fixed height as the SVG, so the pedestals and plaques stay aligned.

## JDM cars → `/public/cars/`

Recommended: **1600 × 900 PNG**, transparent background, 3/4 front-left hero angle, studio lighting.

| Project | Car (matches your references) | Filename |
|---|---|---|
| Motion Web Design | Mazda RX-7 FD3S — Veilside, orange + black | `/public/cars/rx7.png` |
| Evolutionary Consensus | Nissan Skyline R34 GT-R — silver + blue stripes | `/public/cars/r34.png` |
| Food Delivery Platform | Toyota Supra MK4 — red | `/public/cars/supra.png` |
| n8n Content Automation | Honda NSX NA1 — gunmetal grey | `/public/cars/nsx.png` |

In [`components/projects/projectsConfig.ts`](components/projects/projectsConfig.ts), add one line per project — e.g. for the R34:

```ts
{
  id: "consensus",
  carImageSrc: "/cars/r34.png",   // ← add this
  carModel: "Nissan Skyline GT-R · R34",
  // ...
}
```

JDMCar uses the image at the same aspect as the SVG, so the project garage tiles + case-study heroes stay aligned.

## Generation prompt templates (if you're producing the renders in ChatGPT / Midjourney / Sora)

**Katana (use for all 6, vary the variant details):**
> "Studio product photograph of a single vertical Japanese katana floating in a polished glass display case on a chrome pedestal, against a black gallery background, single overhead spotlight, cinematic museum lighting, ultra-detailed steel blade with visible hamon temper line, [VARIANT: white-silver / cyan / gold / purple / pink / crimson] colored energy aura along the blade's edge, [WRAP: black ito wrap with silver menuki / black with cyan / gold-trimmed black / purple / pink / dark red], shallow depth of field, 4K, premium product photography. Vertical 600×1400."

**Car (use for all 4, vary the model):**
> "Studio hero photograph of a [MAKE/MODEL] in [COLOR], 3/4 front-left angle, parked on a glossy dark reflective floor with subtle floor reflection, dark studio background, dramatic overhead rim lighting from above-rear, cinematic premium automotive photography, ultra-detailed paint finish, [MODS: stock / Veilside body kit / blue racing stripes / hi-mount wing], deep-dish multi-spoke wheels, motion-blur-free, 16:9, 1600×900."

## After dropping assets

Run:

```bash
git add public/
git commit -m "chore: add hero renders for katanas + cars"
git push
```

Vercel auto-deploys. ~60 seconds later the photos are live.

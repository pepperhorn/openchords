# openchords

An open catalogue of chord voicings for keyboard, fretted and bowed instruments, in the `chordl.voicing/1` format. Everything here is released under [CC0](LICENSE).

## Use it

Pin a release. Don't read `main`.

- npm: `@pepperhorn/openchords`
- GitHub releases: tags look like `vYYYY.MM.N`
- jsDelivr: `https://cdn.jsdelivr.net/gh/pepperhorn/openchords@<tag>/chords/...`

A release carries `manifest.json`, `catalogue.json` (every revision, including retired) and `by-instrument/<instrument>.json` (the latest live revision of each voicing).

Saved references use `id@rev`. To find out whether a voicing was retired, look up the highest revision of its `id`.

## Tiers and status

- `tier`: `curated` voicings were reviewed by maintainers; everything else is `community`. Third-party voicings always enter as `community`.
- `status`: `live`, `retired` or `superseded`. Nothing is deleted: a change is a new revision, so an existing `id@rev` never changes.

## Spelling

Data holds strict theory spelling, so `C:dim7` is C Eb Gb Bbb. How to show those names is up to each app.

## No personal data

This repo holds prefixed opaque IDs only, never emails or display names.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

# Contributing

Everything you contribute is released under CC0. Every commit needs a DCO sign-off, so use `git commit -s`.

## Ways in

1. **Direct pull request.** Add a voicing with the CLI:

   ```bash
   npx @pepperhorn/chordl-voicing new --chord C:maj7 --instrument guitar --frets x32000 --author gh:<your-handle>
   ```

2. **Partner intake.** Apps send reviewed voicings as one pull request per voicing.
3. **Promotion from an app.** A bot opens the pull request after intake review.
4. **Bulk datasets.** Batched pull requests with `source: import:<dataset>@<version>`. The licence must be on `licences.json`.

## Rules

- Everything enters as `community`. Only maintainers promote to `curated`.
- History is append-only. Never edit or delete an existing `id@rev`; a change is a new revision.
- Status and tier changes are new revisions too. Hashes cover notes and realization only, so those revisions keep the same hashes.
- No personal data. `authorId` is a prefixed opaque ID such as `gh:alice`.

Before you push:

```bash
npm run format -- --check
npm run validate
```

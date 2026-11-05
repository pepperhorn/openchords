import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { Note } from "tonal";
import { chordFilePath, parsePitch, labelNotes, soundingMidi, withHashes } from "@pepperhorn/chordl-voicing";

// ADR 0001 ruling 4 keeps the perfect 11th even though the format omits it.
// Inspect latest revisions only: the published, misspelled rev 1 is immutable.
const roots = ["C", "C#", "Db", "D", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "Bb", "B"];
const qualities = ["maj13", "maj13#5", "m13", "m13b5", "m13#5"];
const correctedRoots = new Set(["C#", "Gb", "G#"]);

for (const root of roots) {
  for (const quality of qualities) {
    const chordId = `${root}:${quality}`;
    test(`${chordId}: the retained keyboard 11 is spelt from the root`, () => {
      const file = JSON.parse(readFileSync(new URL(`../${chordFilePath(chordId)}`, import.meta.url), "utf8"));
      const latest = new Map();
      for (const v of file.voicings) {
        if (!latest.has(v.id) || latest.get(v.id).rev < v.rev) latest.set(v.id, v);
      }
      const keyboards = [...latest.values()].filter(v => v.status === "live" && v.realization.kind === "keyboard");
      assert.ok(keyboards.length > 0, "a keyboard voicing must remain");
      const eleventh = Note.transpose(root, "11P");
      for (const v of keyboards) {
        const notes = v.notes.filter(n => parsePitch(n.pitch).pc === Note.chroma(eleventh));
        assert.equal(notes.length, 1, "ruling 4: keep the perfect 11th");
        assert.equal(Note.pitchClass(notes[0].pitch), eleventh);
        assert.equal(notes[0].degree, "XI");
        const hands = [...v.realization.hands.left, ...v.realization.hands.right];
        assert.ok(hands.includes(notes[0].pitch), "notes and realization use the same spelling and octave");
        assert.deepEqual(v.notes, labelNotes(chordId, v.notes.map(n => n.pitch)).map(({ pitch, degree }) => ({ pitch, degree })));
        assert.deepEqual(v.hashes, withHashes(v).hashes);

        if (correctedRoots.has(root)) {
          const original = file.voicings.find(old => old.id === v.id && old.rev === 1);
          const revision = file.voicings.find(old => old.id === v.id && old.rev === 2);
          assert.ok(original && revision, "the correction appends rev 2 without replacing rev 1");
          assert.equal(revision.previous, 1);
          assert.deepEqual(soundingMidi(revision.realization), soundingMidi(original.realization));
          for (const hand of ["left", "right"]) {
            assert.deepEqual(revision.realization.hands[hand].map(p => parsePitch(p).midi), original.realization.hands[hand].map(p => parsePitch(p).midi));
          }
          assert.deepEqual(revision.hashes, original.hashes, "spelling alone changes neither shape nor pitch hash");
          assert.equal(revision.notes.length, original.notes.length);
          assert.equal(revision.status, original.status);
          assert.equal(revision.tier, original.tier);
        }
      }
    });
  }
}

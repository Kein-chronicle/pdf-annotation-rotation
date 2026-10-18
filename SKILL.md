---
name: annotation-rotation
description: Rotate boxes, lines, ink and source masks in display coordinates without mutating input. Use when implementing PDF or canvas annotation rotation.
---

# annotation-rotation

Rotate boxes, lines, ink and source masks in display coordinates without mutating input.

## Workflow

1. Confirm the input contract and exclusions below before transforming user data.
2. Import the named exports from `scripts/geometry.mjs`. Node.js 22+; no npm dependencies. Browser use requires a modern ES module runtime.
3. Run `node --test tests/run.mjs` from this skill folder. The tests contain concrete inputs, expected outputs and rejection cases.
4. Integrate the pure function into the caller. Surface thrown errors as an invalid input result; do not replace failure with empty success.
5. Preserve the original data and inspect a representative output before adding writes or exports.

## Contract and limits

Coordinates are top-left display units, y down. Swap page width/height after each quarter turn. This is geometry only, not PDF serialization or secure redaction.

## Verification

Run `node --test tests/run.mjs` after copying this folder into an agent's skill directory. Keep `scripts/` and `tests/` together; there are no references to a private source repository. The assertions in `tests/run.mjs` are executable usage examples.

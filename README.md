# pdf-annotation-rotation

**Rotate PDF/canvas annotations (boxes, lines, ink, source masks) a quarter turn in display coordinates, without mutating the input.**

[![test](https://github.com/Kein-chronicle/pdf-annotation-rotation/actions/workflows/test.yml/badge.svg)](https://github.com/Kein-chronicle/pdf-annotation-rotation/actions/workflows/test.yml) ![license](https://img.shields.io/badge/license-MIT-blue.svg) ![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

## Why

After you rotate a page, every annotation has to move with it. The bookkeeping (swap width and height each turn, rotate the box's bottom-left corner, bump `rot`) is easy to get subtly wrong. This is just that geometry, as pure functions that return copies.

## Install

**As a Claude Code skill** (Claude uses it when the task matches the skill description):

```sh
git clone https://github.com/Kein-chronicle/pdf-annotation-rotation.git ~/.claude/skills/annotation-rotation
```

For a single project, clone into `<project>/.claude/skills/annotation-rotation` instead, then start a new Claude Code session.

**As a library** (Node.js 22+, no dependencies):

```sh
npm install github:Kein-chronicle/pdf-annotation-rotation
```

or copy the one file you need: `scripts/geometry.mjs` is self-contained.

**Requires:** Node.js 22+.

## Quick start

Run the quickstart:

```console
$ node examples/quickstart.mjs
before  {"type":"text","x":10,"y":20,"w":50,"h":12,"rot":0}
after   {"type":"text","x":68,"y":10,"w":12,"h":50,"rot":90}
input untouched: true
round trip equals original: true
ink     [[100,0],[0,200]]
reject  unsupported annotation type
```

The output above is real: it is produced by the files in `examples/`.

## API

```js
import { rotateCW, rotateCCW } from 'pdf-annotation-rotation';

const turned = rotateCW({ type: 'text', x: 10, y: 20, w: 50, h: 12, rot: 0 }, 200, 100); // page is 200x100 before the turn
// { type:'text', x:68, y:10, w:12, h:50, rot:90 }   the page is now 100x200
```

Supported types: `text`, `image`, `highlight`, `cover`, `rect`, `ellipse` (boxes), `line`, `ink`. A `sourceMask` is rotated with it. Unsupported types, non-finite
coordinates and negative sizes throw; there is no page-bounds check, and `sourceMask` nesting deeper than 8 is rejected. Coordinates are top-left display units with y pointing down.

## Limits

- Geometry only: no PDF serialization, and it is not secure redaction.

## Related projects

These solve neighbouring problems; use them when they fit better.

- **pdf-lib, pdf.js**: read, render and write PDFs; this only does the coordinate math

## More from the same collection

Small, tested tools that grew out of running AI agents and game/app pipelines for months:

- [**pdf-page-range-parser**](https://github.com/Kein-chronicle/pdf-page-range-parser): Parse "1-3, 5, 8-" page selections into exact ranges without silently sorting or deduplicating, and reject anything ambiguous.
- [**pdf-text-position-table-extract**](https://github.com/Kein-chronicle/pdf-text-position-table-extract): Rebuild a rectangular table from positioned text fragments (x, baseline, size, text), keeping empty cells in place.
- [**csv-injection-safe-export**](https://github.com/Kein-chronicle/csv-injection-safe-export): Encode CSV that is safe to open in Excel and Sheets: quoting plus neutralization of formula prefixes (=, +, -, @, tab, CR, LF).

## Development

```sh
node --test tests/run.mjs
```

The tests include inputs that are supposed to be rejected, so a green run also shows the checks can fail. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

If this saved you a debugging session, a star helps other people find it. Bug reports and failing test cases are even better.

<sub>Keywords: pdf, annotations, geometry, javascript, esm, canvas, rotation, zero-dependencies</sub>

import { rotateCW, rotateCCW } from '../scripts/geometry.mjs';

// A 200x100 page, y grows downward. After one clockwise turn the page is 100x200.
const note = { type: 'text', x: 10, y: 20, w: 50, h: 12, rot: 0 };
const turned = rotateCW(note, 200, 100);
console.log('before ', JSON.stringify(note));
console.log('after  ', JSON.stringify(turned));
console.log('input untouched:', note.x === 10 && note.w === 50);

const back = rotateCCW(turned, 100, 200);
console.log('round trip equals original:', JSON.stringify(back) === JSON.stringify(note));

console.log('ink    ', JSON.stringify(rotateCW({ type: 'ink', pts: [[0, 0], [200, 100]] }, 200, 100).pts));
try { rotateCW({ type: 'sticker' }, 200, 100); } catch (e) { console.log('reject ', e.message); }

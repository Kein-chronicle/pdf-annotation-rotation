import test from 'node:test';
import assert from 'node:assert/strict';

import {rotateCW,rotateCCW} from '../scripts/geometry.mjs';
test('box dimensions, input immutability and four-turn identity',()=>{
 const a={type:'rect',x:10,y:20,w:30,h:40};
 assert.deepEqual(rotateCW(a,200,100),{type:'rect',x:40,y:10,w:40,h:30});
 let b=a,w=200,h=100; for(let i=0;i<4;i++){b=rotateCW(b,w,h);[w,h]=[h,w];} assert.deepEqual(b,a);
 assert.deepEqual(rotateCCW(rotateCW(a,200,100),100,200),a);
});
test('lines, ink and masks rotate; invalid geometry fails',()=>{
 assert.equal(rotateCW({type:'line',x1:1,y1:2,x2:3,y2:4},10,20).x1,18);
 assert.deepEqual(rotateCW({type:'ink',pts:[[1,2]]},10,20).pts,[[18,1]]);
 assert.equal(rotateCW({type:'rect',x:0,y:0,w:1,h:1,sourceMask:{type:'rect',x:1,y:2,w:3,h:4}},10,20).sourceMask.x,14);
 assert.throws(()=>rotateCW({type:'ink',pts:[]},10,20));
 assert.throws(()=>rotateCW({type:'rect',x:NaN,y:0,w:1,h:1},10,20));
});

test('deeply nested sourceMask is refused instead of overflowing the stack',()=>{
 let m={type:'rect',x:0,y:0,w:1,h:1}; for(let i=0;i<50;i++) m={type:'rect',x:0,y:0,w:1,h:1,sourceMask:m};
 assert.throws(()=>rotateCW(m,10,10),/nested too deeply/);
 let ok={type:'rect',x:0,y:0,w:1,h:1,sourceMask:{type:'rect',x:0,y:0,w:1,h:1}};
 assert.equal(typeof rotateCW(ok,10,10).sourceMask.x,'number');
});

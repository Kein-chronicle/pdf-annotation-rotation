const boxes = new Set(['text','image','highlight','cover','rect','ellipse']);
function finite(...ns) { if (!ns.every(Number.isFinite)) throw new TypeError('finite coordinates required'); }
export const MAX_MASK_DEPTH = 8;
export function rotateCW(annotation, width, height, depth = 0) {
  if (depth > MAX_MASK_DEPTH) throw new RangeError('sourceMask nested too deeply');
  finite(width,height); if(width<=0 || height<=0) throw new RangeError('positive dimensions required');
  const a=structuredClone(annotation), point=(x,y)=>{finite(x,y);return [height-y,x];};
  if(boxes.has(a.type)) {
    finite(a.x,a.y,a.w,a.h); if(a.w<0||a.h<0)throw new RangeError('negative box size');
    [a.x,a.y]=point(a.x,a.y+a.h); [a.w,a.h]=[a.h,a.w];
    if(a.rot!==undefined){finite(a.rot);a.rot=((a.rot+90)%360+360)%360;}
  } else if(a.type==='line') {
    [a.x1,a.y1]=point(a.x1,a.y1); [a.x2,a.y2]=point(a.x2,a.y2);
  } else if(a.type==='ink') {
    if(!Array.isArray(a.pts)||!a.pts.length)throw new TypeError('ink needs points');
    a.pts=a.pts.map(p=>{if(!Array.isArray(p)||p.length!==2)throw new TypeError('invalid point');return point(...p);});
  } else throw new TypeError('unsupported annotation type');
  if(a.sourceMask)a.sourceMask=rotateCW(a.sourceMask,width,height,depth+1);
  return a;
}
export function rotateCCW(a,w,h) {for(let i=0;i<3;i++){a=rotateCW(a,w,h);[w,h]=[h,w];}return a;}

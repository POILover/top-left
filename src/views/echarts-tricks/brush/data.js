function random(min, max) {
  return min + Math.random() * (max - min);
}
const scatterNum = 600;
export const [minX,minY,width] = [0, 0, 100]

export const data1 = new Array(scatterNum).fill(null).map(() => {
  return [random(minX+0.1*width, minX+0.7*width), random(minY+0.1*width, minY+0.7*width)];
});
export const data2 = new Array(scatterNum).fill(null).map(() => {
  return [random(minX+0.3*width, minX+0.9*width), random(minY+0.3*width, minY+0.9*width)];
});

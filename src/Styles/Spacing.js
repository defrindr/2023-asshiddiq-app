// dynamic size for all devices
import {scaleWidth} from '@utils/Size';

export const xs2 = scaleWidth(1.5);
export const xs = xs2 * 2;
export const s = xs2 * 2.5;
export const sm = xs2 * 3;
export const m = xs2 * 3.5;
export const ml = xs2 * 4;
export const l = xs2 * 4.5;
export const xl = xs2 * 5;
export const max = xs2 * 100;

const size = {
  xs2,
  xs,
  s,
  sm,
  m,
  ml,
  l,
  xl,
  max,
};

export default size;

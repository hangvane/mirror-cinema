import { fromByteArray } from 'base64-js';

const encoder = new TextEncoder();
export function strToColor(str: string): {
  str: string;
  rgb: number[];
} {
  const encoded = fromByteArray(encoder.encode(str));

  const rgb = [0, 0, 0];
  Array.from(encoded).forEach((char, idx) => {
    rgb[idx % 3] += char.charCodeAt(0) * 10;
  });
  [0, 1, 2].forEach((i) => {
    rgb[i] %= 256;
  });
  const colorStr = rgb.map((v) => v.toString(16)).join('');
  return {
    str: `#${colorStr}`,
    rgb,
  };
}

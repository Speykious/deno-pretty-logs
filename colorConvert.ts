/** RGB 8-bits per channel.
 * Each in range `0 -> 255` or `0x00 -> 0xff` */
export interface Rgb {
  r: number
  g: number
  b: number
}

/** HSV 8-bits per channel.
 * Each in range `0 -> 255` or `0x00 -> 0xff` */
export interface Hsv {
  h: number
  s: number
  v: number
}

/** Converts HSV to RGB color. */
export const HSVtoRGB = (color: Hsv): Rgb => {
	const h = (color.h & 0xff) / 255.0
	const s = (color.s & 0xff) / 255.0
	const v = (color.v & 0xff) / 255.0

	let r = 0, g = 0, b = 0
	
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0: r = v, g = t, b = p; break
		case 1: r = q, g = v, b = p; break
		case 2: r = p, g = v, b = t; break
		case 3: r = p, g = q, b = v; break
		case 4: r = t, g = p, b = v; break
		case 5: r = v, g = p, b = q; break
	}

	return {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255)
	};
}

/** Converts RGB to HSV color. */
export const RGBtoHSV = (color: Rgb): Hsv => {
	const r = (color.r & 0xff) / 255.0
	const g = (color.g & 0xff) / 255.0
	const b = (color.b & 0xff) / 255.0

	let max = Math.max(color.r, color.g, color.b)
	let min = Math.min(color.r, color.g, color.b)
	let d = max - min

	let h = 0
	let s = (max === 0 ? 0 : d / max)
	let v = max / 255

	switch (max) {
			case min: h = 0; break;
			case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
			case g: h = (b - r) + d * 2; h /= 6 * d; break;
			case b: h = (r - g) + d * 4; h /= 6 * d; break;
	}

	return {
			h: Math.round(h * 255),
			s: Math.round(s * 255),
			v: Math.round(v * 255)
	};
}

/** Converts a hex number to an 8 bit array (little endian). */
export const hexToArray8bit = (n: number) => {
	n = Math.round(n)
	const arr8 = []

	for (let sh = 0; sh < Math.log2(n); sh += 8)
		arr8.push(n >> sh & 0xff)

	return arr8
}

/** Converts an 8 bit array (little endian) to a hex number. */
export const array8bitToHex = (arr8: number[]) => {
	let n = 0

	for (let i = 0; i < arr8.length; i++)
		n += (arr8[i] & 0xff) << (8 * i)

	return n
}

/** Converts a hex color to an 8 bit rgb array (big endian). */
export const hexToRgbArray = (color: number) =>
	hexToArray8bit(color & 0xffffff).reverse()

/** Converts an 8 bit rgb array (big endian) to a hex color. */
export const rgbArrayToHex = (...color: [number, number, number]) =>
	array8bitToHex(color.reverse())

/** Converts a hex color to an rgb object. */
export const hexToRgbObject = (color: number): Rgb => {
	const arr8 = hexToRgbArray(color)
	return {
		r: arr8[0],
		g: arr8[1],
		b: arr8[2]
	}
}

/** Converts an rgb object to a hex color. */
export const rgbObjectToHex = (color: Rgb) =>
	rgbArrayToHex(color.r, color.g, color.b)
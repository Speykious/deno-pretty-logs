import { rgb24 } from "./colors.ts"
import { rgbObjectToHex, HSVtoRGB } from "./colorConvert.ts"

export const rainbow = (s: string) => {
	let rs = ""

	let h = 0
	for (let i = 0; i < s.length; i++) {
		const c_c = rgb24(rgbObjectToHex(HSVtoRGB({ h: h, s: 150, v: 230 })))

		rs += c_c.open + s[i]
		h += Math.floor(256 / s.length)
	}
	rs += rgb24(0xffffff).close

	return rs
}
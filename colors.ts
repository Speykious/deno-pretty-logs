import { Rgb, hexToRgbArray, Hsv, rgbObjectToHex, HSVtoRGB } from './colorConvert.ts'

/** Represents a color code for the terminal. */
export class Code {
	/** The opening color code. */
	public open: string
	/** The closing color code. */
	public close: string
	/** A regexp that finds closing color codes. */
	public regexp: RegExp

	/** Colors the string with its color code.
	 * (alias for the `colorize` method) */
	public c: (str: string) => string

	constructor(open: number[], close: number) {
		this.open = `\x1b[${open.join(";")}m`
		this.close = `\x1b[${close}m`
		this.regexp = new RegExp(`\\x1b\\[${close}m`, "g")

		this.c = this.colorize
	}
	
	/** Colors the string with its color code. */
	colorize(str: string) {
		return `${this.open}${str.replace(this.regexp, this.open)}${this.close}`
	}
}

/** Generates color codes for the terminal. */
export const code = (open: number[], close: number) => new Code(open, close)

const escape = /([\(\[\\\{\*\+\^\$\|\,\;\?\.\}\]\)])/gi

export const comb = (...codes: Code[]): Code => {
	const c = Object.assign({}, reset)
	c.open = codes.map(co => co.open).join('')
	const closes = codes.map(co => co.close).reverse()

	c.close = closes.join('')
	c.regexp = new RegExp(closes.map(
		close => close.replace(escape, "\\$1")
	).join('|'), "g")
	return c
}


export const reset         = code([0],  0)
export const bold          = code([1],  22)
export const dim           = code([2],  22)
export const italic        = code([3],  23)
export const underline     = code([4],  24)
export const inverse       = code([7],  27)
export const hidden        = code([8],  28)
export const strikethrough = code([9],  29)
export const black         = code([30], 39)
export const red           = code([31], 39)
export const green         = code([32], 39)
export const yellow        = code([33], 39)
export const blue          = code([34], 39)
export const magenta       = code([35], 39)
export const cyan          = code([36], 39)
export const white         = code([37], 39)
export const gray          = code([90], 39)
export const bgBlack       = code([40], 49)
export const bgRed         = code([41], 49)
export const bgGreen       = code([42], 49)
export const bgYellow      = code([43], 49)
export const bgBlue        = code([44], 49)
export const bgMagenta     = code([45], 49)
export const bgCyan        = code([46], 49)
export const bgWhite       = code([47], 49)



/** Set text color using 24bit rgb. */
export const rgb24 = (color: number | Rgb | Hsv) => {
	if (typeof color === "object") {
		if ("h" in color)
			color = HSVtoRGB(color)
		if ("r" in color)
			color = rgbObjectToHex(color)
	}
		
	return code([38, 2, ...hexToRgbArray(color)], 39)
}

/** Set text background color using 24bit rgb. */
export const bgRgb24 = (color: number | Rgb | Hsv) => {
	if (typeof color === "object") {
		if ("h" in color)
			color = HSVtoRGB(color)
		if ("r" in color)
			color = rgbObjectToHex(color)
	}

	return code([48, 2, ...hexToRgbArray(color)], 49)
}
	
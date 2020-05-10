import { green, magenta, cyan, yellow, dim, bold, rgb24 } from "./colors.ts";

const C = {
	NULL:      bold,
	UNDEFINED: dim,
	STRING:    green,
	ESCAPE:    rgb24(0x64ff64),
	NUMBER:    yellow,
	BOOL:      magenta,
	HEAD:      cyan,
}

const colorize = (thing: unknown, il = true, is = "    ", indent = 0) => {
	switch (typeof thing) {
		case "string":  return COLORIZE.STRING(thing)
		case "number":  return COLORIZE.NUMBER(thing)
		case "bigint":  return COLORIZE.NUMBER(thing)
		case "boolean": return COLORIZE.BOOL(thing)
		case "object":
			if (thing instanceof Array)
				return COLORIZE.ARRAY(thing, il, is, indent)
			else if (thing)
				return COLORIZE.OBJECT(thing, il, is, indent)
			else return COLORIZE.NULL(thing)
		case "undefined": return COLORIZE.UNDEFINED(thing)
		case "function":
			return COLORIZE.HEAD(
				thing.name.length ?
				`[Function: ${thing.name}]`
				: `[Function (anonymous)]`
			)
		default:
			return String(thing)
	}
}

const COLORIZE = {
	NULL: (n: null) => C.NULL.c(String(n)),
	UNDEFINED: (u: undefined) => C.UNDEFINED.c(String(u)),
	STRING: (str: string) => C.STRING.c(`"${str
		.replace(/\x1b/gi, COLORIZE.ESCAPE("\\x1b"))
		.replace(/\n/gi, COLORIZE.ESCAPE("\\n"))
		.replace(/\t/gi, COLORIZE.ESCAPE("\\t"))
	}"`),
	ESCAPE: (str: string) => C.ESCAPE.c(str),
	NUMBER: (n: number | bigint) => C.NUMBER.c(n.toString()),
	BOOL: (bool: boolean) => C.BOOL.c(bool ? "true" : "false"),
	HEAD: (punct: string) => C.HEAD.c(punct),
	ARRAY: (array: Array<unknown>, il = true, is = "    ", indent = 0) => {
		const tab = is.repeat(indent)
		let s = il ? "[" : `[\n${tab}${is}`

		const objs = array.map(obj => colorize(obj, il, is, indent + 1))

		s += objs.join(il ? ", " : `,\n${tab}${is}`)
		s += il ? "]" : `\n${tab}]`

		return s
	},
	OBJECT: (obj: NonNullable<object>, il = false, is = "    ", indent = 0) => {
		const tab = is.repeat(indent)
		let s = il ? "{ " : `{\n${tab}${is}`

		const props = Object.entries(obj)
			.map(value => value[0] + ": " + colorize(value[1], il, is, indent + 1))

		s += props.join(il ? ", " : `,\n${tab}${is}`)
		s += il ? " }" : `\n${tab}}`
		
		return s
	}
}

export const print = (...args: unknown[]) => {
	let s = []
	for (const arg of args) {
		if (typeof arg === "string")
			s.push(arg)
		else s.push(colorize(arg, false, "  "))
	}
	console.log(s.join(" "))
}
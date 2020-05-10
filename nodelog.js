console.log(a => "something and " + a)
console.log("hello")
console.log([123, 456, "what"])
const f = a => a

class OO {
	constructor() {
		this.c = {
			d: 'e'
		}
	}
}

const o = new OO
console.log([0xfff, f, f.name, {a: {b: o}}, OO, typeof OO, typeof string, true, false, undefined, null, typeof null])
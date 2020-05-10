import { print } from "./print.ts"
import { yml_obj } from "./yaml-stuff.ts"
import { rainbow } from "./miscellaneous.ts"

console.log(rainbow("abcdefghijklmnopqrstuvwxyz"))

const plain = {
	hello: "Hello world!",
	isImpressive: true,
	whatIsThis: undefined,
	level: 1000,
	f: (a: any) => a
}

print(plain, yml_obj)

console.table(plain)
console.table(yml_obj)
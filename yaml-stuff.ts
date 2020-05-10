import * as YAML from "https://raw.githubusercontent.com/denoland/deno/b11dea7eb45b7920fb49464d3e5ffdedff316339/std/encoding/yaml.ts"

const yml_raw = Deno.readTextFileSync("sample.yml")
export const yml_obj = YAML.parse(yml_raw)
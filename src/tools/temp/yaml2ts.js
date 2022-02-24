const fs = require("fs")
const yaml = require("js-yaml")
const path = require("path")

// import { readFileSync, writeFileSync } from "fs"
// import { load } from "js-yaml";

const dir = process.cwd()
const thisdir = "/tools/temp/"
const file = path.join(dir, thisdir, "navs.yaml")
const file2 = path.join(dir, thisdir, "navs.ts")

const data = yaml.load(fs.readFileSync(file).toString())
const json = JSON.stringify(data, null, 2)
const ts = `
export const navs: I18nNavMenu = ${json}
`

fs.writeFileSync(file2, ts)

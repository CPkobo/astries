"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
// import { writeFileSync, mkdirsSync } from "fs-extra"
// import pkg from 'fs-extra';
// const { writeFileSync, mkdirsSync } = pkg;
const js_yaml_1 = require("js-yaml");
const profGenerator_js_1 = require("./toys/profGenerator.js");
const tocGenerator_js_1 = require("./toys/tocGenerator.js");
const validater_js_1 = require("./toys/validater.js");
const dirOperator_js_1 = require("./toys/dirOperator.js");
// import { MlMl } from "./convMlMl.js"
const sitemap_js_1 = require("./toys/sitemap.js");
const postPagenation_js_1 = require("./toys/postPagenation.js");
class ToolBox {
    prof;
    toc;
    val;
    posts;
    dirs;
    writer;
    constructor(root = "", out = "") {
        this.dirs = new dirOperator_js_1.DirOperator();
        this.dirs.setRoot(root);
        this.dirs.setOut(out);
        this.prof = new profGenerator_js_1.ProfGenerator();
        this.prof.readProf(this.dirs);
        this.toc = new tocGenerator_js_1.TOCGenerator(this.dirs, this.prof.prof);
        this.val = new validater_js_1.Validator(this.dirs, this.prof.prof);
        this.posts = new postPagenation_js_1.PostPagenation();
        // this.mlml = new MlMl()
        this.writer = [];
    }
    // setDirs(root: string): void {
    //   const root_ = this.rootDir !== "" ? this.rootDir + "/" : "";
    //   this.contentsDir = `${root_}${ToolBox.contents}`
    //   this.srcDir = `${root_}${ToolBox.src}`
    //   this.pictDir = `${root_}${ToolBox.pict}`
    //   this.postsDir = this.postsDir.map(val => { return `${root_}${val}` })
    //   this.toc.setDirs(this.contentsDir, this.srcDir)
    //   this.val.setDirs(this.contentsDir, this.pictDir)
    // }
    // setLangs(langs: LangList[]): void {
    //   this.toc.setLangs(langs)
    //   this.val.setLangs(langs)
    //   // this.mlml.setLang(langs[0])
    // }
    convJson2Yaml(path) {
        const data = JSON.parse((0, fs_1.readFileSync)(path).toString());
        const yml = (0, js_yaml_1.dump)(data);
        console.log(yml);
        (0, fs_1.writeFileSync)(path.replace(".json", ".yaml"), yml);
    }
    convObj2Yaml(obj) {
        const yml = (0, js_yaml_1.dump)(obj);
        console.log(yml);
        (0, fs_1.writeFileSync)("./tools/obj.yaml", yml);
    }
    exportProf() {
        this.writer.push(this.prof.exportProf(this.dirs));
    }
    exportLangConf() {
        this.writer.push(this.prof.exportLangConfig(this.dirs));
    }
    exportToc() {
        this.writer.push(...this.toc.execGenerator(this.dirs));
    }
    exportValidateLog() {
        this.val.execBatchValidate();
        this.writer.push(this.val.exportErrors());
    }
    exportPagenation() {
        this.writer.push(...this.posts.exportPageIndices(this.dirs));
    }
    exportSitemap() {
        const map = new sitemap_js_1.Sitemap();
        this.writer.push(map.exportSitemap(this.dirs, this.prof.prof));
    }
    writeFiles() {
        if (this.writer.length > 0) {
            this.dirs.writeFiles(this.writer);
        }
    }
}
if (process.argv.length < 3) {
    const tbx = new ToolBox("../mlml-gb");
    tbx.exportPagenation();
    // const a = { incl: [{ ja: ["a", "b", "c"] }, { ja: ["1", "2", 3] }] }
    // tbx.convObj2Yaml(a)
}
else {
    const tbx = new ToolBox(process.argv[3], process.argv[4]);
    switch (process.argv[2].toLowerCase()) {
        case "-i":
        case "--init": {
            tbx.exportProf();
            tbx.exportLangConf();
            tbx.exportValidateLog();
            tbx.exportToc();
            tbx.exportSitemap();
            tbx.exportPagenation();
            tbx.writeFiles();
            break;
        }
        case "-p":
        case "--prof": {
            tbx.exportProf();
            tbx.writeFiles();
            break;
        }
        case "-l":
        case "--lang": {
            tbx.exportLangConf();
            tbx.writeFiles();
            break;
        }
        case "-c":
        case "--check":
            tbx.exportValidateLog();
            tbx.writeFiles();
            break;
        case "-t":
        case "--toc": {
            tbx.exportToc();
            tbx.writeFiles();
            break;
        }
        case "-m":
        case "--md":
            tbx.exportPagenation();
            tbx.writeFiles();
            break;
        case "-s":
        case "--sitemap":
            tbx.exportSitemap();
            tbx.writeFiles();
            break;
        case "-h":
        case "--help":
        default:
            console.log("Usage:");
            console.log("  -i, --init:    Initialize settings according to contents/.init/profile.yaml");
            console.log("  -p, --prof:    Generate stores/profile.ts");
            console.log("  -l, --lang:    Generate langconfig.ts");
            console.log("  -c, --check:   Check the yaml files in contents dir");
            console.log("  -t, --toc:     Generate TOC files and stores/navigations.ts");
            console.log("  -s, --sitemap: Generate sitemap.xml");
            // console.log("  -m, --md:      Convert the designated md file into mlml yaml at tools/gen.yaml")
            console.log("  -h, --help:    Display help");
            break;
    }
}

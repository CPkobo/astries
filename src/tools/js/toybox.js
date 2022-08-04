"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Astries の初期設定 & ファイル検証を行うためのツール群
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const profGenerator_js_1 = require("./toys/profGenerator.js");
const navGenerator_js_1 = require("./toys/navGenerator.js");
const validater_js_1 = require("./toys/validater.js");
const dirOperator_js_1 = require("./toys/dirOperator.js");
const postPageGenerator_js_1 = require("./toys/postPageGenerator.js");
const mtHandler_js_1 = require("./toys/mtHandler.js");
class ToolBox {
    env;
    prof;
    nav;
    val;
    posts;
    dirs;
    writer;
    config;
    mt;
    constructor(envPath) {
        this.env = JSON.parse((0, fs_1.readFileSync)(envPath).toString());
        this.dirs = new dirOperator_js_1.DirOperator();
        this.dirs.setRoot(this.env.root);
        this.dirs.setOut(this.env.outDir);
        this.dirs.setDirname("contents", this.env.contentsDir);
        this.dirs.setDirnames("posts", this.env.postsDir);
        this.prof = new profGenerator_js_1.ProfGenerator();
        this.prof.readProf(this.dirs);
        this.nav = new navGenerator_js_1.NavGenerator(this.dirs, this.prof.prof);
        this.val = new validater_js_1.Validator(this.dirs, this.prof.prof);
        this.posts = new postPageGenerator_js_1.PostPageGenerator();
        // this.mlml = new MlMl()
        this.mt = new mtHandler_js_1.MtHandler();
        this.writer = [];
        this.config = {};
    }
    // JSONで書いたコンテンツファイルをYAMLに変換する
    convJson2Yaml(path) {
        const data = JSON.parse((0, fs_1.readFileSync)(path).toString());
        const yml = (0, js_yaml_1.dump)(data);
        console.log(yml);
        (0, fs_1.writeFileSync)(path.replace(".json", ".yaml"), yml);
    }
    // JavaScriptオブジェクトをYAMLに変換する
    convObj2Yaml(obj) {
        const yml = (0, js_yaml_1.dump)(obj);
        console.log(yml);
        (0, fs_1.writeFileSync)("./tools/obj.yaml", yml);
    }
    initConfig() {
        this.prof.readProf(this.dirs);
        this.config.profile = this.prof.prof;
        const { navs, dirs, paths } = this.nav.execGenerator(this.dirs);
        this.config.navs = navs;
        this.config.staticDirs = dirs;
        this.config.staticPaths = paths;
        const { pagenatePaths, postPaths, pages } = this.posts.execGenerator(this.dirs);
        this.config.staticPosts = postPaths;
        this.config.staticPostPages = pagenatePaths;
        const astriesConfig = {
            dir: this.dirs.contents,
            name: "astries.config.ts",
            data: `
// Created by Astries Toybox
export type AstriesConfig = {
  profile?: Profile,
  navs?: Partial<I18nNavMenu>,
  staticDirs?: StaticDir[],
  staticPaths?: StaticPath[],
  staticPosts?: StaticPost[],
  staticPostPages?: StaticPostPagenate[],
}

export const config: AstriesConfig = ${JSON.stringify(this.config, null, 2)}
`
        };
        this.writer.push(astriesConfig);
        const envDeclare = {
            dir: this.dirs.src + "/_envs",
            name: "env.d.ts",
            data: this.createEnvDeclare()
        };
        this.writer.push(envDeclare);
        const postIndice = {
            dir: this.dirs.src + "/_envs",
            name: "postIndice.ts",
            data: `
// Created by Astries Toybox
export const indices: PostPagenation[] = ${JSON.stringify(pages, null, 2)}`
        };
        this.writer.push(postIndice);
    }
    createEnvDeclare() {
        const langList_ = [];
        const dispList_ = [];
        this.prof.prof.Langs.forEach(lang => {
            langList_.push(`"${lang.locale}"`);
            dispList_.push(`"${lang.display}"`);
        });
        const pageType_ = [];
        this.env.declares.pageType.forEach(pt => {
            pageType_.push(`"${pt}"`);
        });
        const data = `
declare const DEF_LANG = "${this.prof.prof.Langs[0].locale}"
declare type LangList = ${langList_.join(" | ")}
declare type LangDisps = ${dispList_.join(" | ")}

declare type PageType = ${pageType_.join(" | ")}

declare const SITE_NAME = "${this.prof.prof.SiteName}"
`;
        return data;
    }
    // プロフィールファイルを作成する
    exportProf() {
        this.writer.push(this.prof.exportProf(this.dirs));
    }
    exportLangConf() {
        this.writer.push(this.prof.exportLangConfig(this.dirs));
    }
    // exportToc(): void {
    //   this.writer.push(...this.nav.execGeneratorAsWritings(this.dirs))
    // }
    exportValidateLog() {
        this.val.execBatchValidate();
        this.writer.push(this.val.exportErrors());
    }
    // exportPagenation(): void {
    //   this.writer.push(...this.posts.exportPageIndices(this.dirs))
    // }
    writeFiles() {
        if (this.writer.length > 0) {
            this.dirs.writeFiles(this.writer);
        }
    }
    getMachineTranslations() {
    }
}
const ENV_PATH = "./astries.env.json";
if (process.argv.length < 3) {
    const tbx = new ToolBox(ENV_PATH);
    // tbx.dirs.setDirname("contents", envs.contentsDir)
    // tbx.dirs.setDirnames("posts", envs.postsDir)
    tbx.initConfig();
    tbx.writeFiles();
    // tbx.exportPagenation()
    // const a = { incl: [{ ja: ["a", "b", "c"] }, { ja: ["1", "2", 3] }] }
    // tbx.convObj2Yaml(a)
}
else {
    const tbx = new ToolBox(ENV_PATH);
    switch (process.argv[2].toLowerCase()) {
        case "-i":
        case "--init": {
            tbx.exportProf();
            tbx.exportLangConf();
            tbx.exportValidateLog();
            // tbx.exportToc()
            // tbx.exportPagenation()
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
        case "-n":
        case "--nav": {
            // tbx.exportToc()
            tbx.writeFiles();
            break;
        }
        case '-m':
        case '--mt': {
            tbx.mt.exec();
        }
        case "--post":
            // tbx.exportPagenation()
            tbx.writeFiles();
            break;
        case "-h":
        case "--help":
        default:
            console.log("Usage:");
            console.log("  -i, --init:    Initialize settings according to contents/_init/profile.yaml");
            console.log("  -p, --prof:    Generate stores/profile.ts");
            console.log("  -l, --lang:    Generate langconfig.ts");
            console.log("  -c, --check:   Check the yaml files in contents dir");
            console.log("  -n, --nav:     Generate index files and _resources/navs.ts");
            console.log("  --post:        Generate posts pagenations");
            // console.log("  -m, --md:      Convert the designated md file into mlml yaml at tools/gen.yaml")
            console.log("  -h, --help:    Display help");
            break;
    }
}

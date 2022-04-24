// Astries の初期設定 & ファイル検証を行うためのツール群
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs"
import { dump } from "js-yaml";
import { ProfGenerator } from "./toys/profGenerator.js"
import { NavGenerator } from "./toys/navGenerator.js"
import { Validator } from "./toys/validater.js"
import { DirOperator } from "./toys/dirOperator.js";
import { PostPagenation } from "./toys/postPagenation.js";

// ファイル書き出しのための型
export type Writing = {
  dir: string
  name: string,
  data: string,
  message?: string
}

export type AstriesConfig = {
  profile?: Profile,
  navs?: Partial<I18nNavMenu>,
  staticDirs?: StaticDir[],
  staticPaths?: StaticPath[],
  // posts: 
}

type AstriesEnv = {
  declares: {
    pageType: string[]
  }
  root: string,
  contentsDir: string,
  postsDir: string[],
  outDir: string
}

class ToolBox {
  public env: AstriesEnv
  public prof: ProfGenerator
  public nav: NavGenerator
  public val: Validator
  public posts: PostPagenation
  public dirs: DirOperator
  public writer: Array<Writing | null>
  public config: AstriesConfig

  constructor(envPath: string) {
    this.env = JSON.parse(readFileSync(envPath).toString()) as AstriesEnv
    this.dirs = new DirOperator()
    this.dirs.setRoot(this.env.root)
    this.dirs.setOut(this.env.outDir)
    this.dirs.setDirname("contents", this.env.contentsDir)
    this.dirs.setDirnames("posts", this.env.postsDir)

    this.prof = new ProfGenerator()
    this.prof.readProf(this.dirs)

    this.nav = new NavGenerator(this.dirs, this.prof.prof)
    this.val = new Validator(this.dirs, this.prof.prof)
    this.posts = new PostPagenation()
    // this.mlml = new MlMl()

    this.writer = []
    this.config = {}
  }

  // JSONで書いたコンテンツファイルをYAMLに変換する
  convJson2Yaml(path: string): void {
    const data = JSON.parse(readFileSync(path).toString())
    const yml = dump(data)
    console.log(yml)
    writeFileSync(path.replace(".json", ".yaml"), yml)
  }

  // JavaScriptオブジェクトをYAMLに変換する
  convObj2Yaml(obj: any): void {
    const yml = dump(obj)
    console.log(yml)
    writeFileSync("./tools/obj.yaml", yml)
  }

  initConfig(): void {
    this.prof.readProf(this.dirs)
    this.config.profile = this.prof.prof

    const { navs, dirs, paths } = this.nav.execGenerator(this.dirs)
    this.config.navs = navs
    this.config.staticDirs = dirs
    this.config.staticPaths = paths
    const astriesConfig: Writing = {
      dir: this.dirs.contents,
      name: "astries.config.ts",
      data: `
// Created by Astries Toybox
export type AstriesConfig = {
  profile?: Profile,
  navs?: Partial<I18nNavMenu>,
  staticDirs?: StaticDir[],
  staticPaths?: StaticPath[],
  // posts: 
}

export const config: AstriesConfig = ${JSON.stringify(this.config, null, 2)}
`
    }
    this.writer.push(astriesConfig)
    const envDaclare: Writing = {
      dir: this.dirs.src + "/_envs",
      name: "env.d.ts",
      data: this.createEnvDeclare()
    }
    this.writer.push(envDaclare)
  }

  createEnvDeclare(): string {
    const langList_: string[] = []
    const dispList_: string[] = []
    this.prof.prof.Langs.forEach(lang => {
      langList_.push(`"${lang.locale}"`)
      dispList_.push(`"${lang.display}"`)
    })
    const pageType_: string[] = []
    this.env.declares.pageType.forEach(pt => {
      pageType_.push(`"${pt}"`)
    })
    const data = `
declare const DEF_LANG = "${this.prof.prof.Langs[0].locale}"
declare type LangList = ${langList_.join(" | ")}
declare type LangDisps = ${dispList_.join(" | ")}

declare type PageType = ${pageType_.join(" | ")}

declare const SITE_NAME = "${this.prof.prof.SiteName}"
`
    return data
  }

  // プロフィールファイルを作成する
  exportProf(): void {
    this.writer.push(this.prof.exportProf(this.dirs))
  }

  exportLangConf(): void {
    this.writer.push(this.prof.exportLangConfig(this.dirs))
  }

  // exportToc(): void {
  //   this.writer.push(...this.nav.execGeneratorAsWritings(this.dirs))
  // }

  exportValidateLog(): void {
    this.val.execBatchValidate()
    this.writer.push(this.val.exportErrors())
  }

  exportPagenation(): void {
    this.writer.push(...this.posts.exportPageIndices(this.dirs))
  }

  writeFiles(): void {
    if (this.writer.length > 0) {
      this.dirs.writeFiles(this.writer)
    }
  }
}

const ENV_PATH = "./astries.env.json"
if (process.argv.length < 3) {
  const tbx = new ToolBox(ENV_PATH)
  // tbx.dirs.setDirname("contents", envs.contentsDir)
  // tbx.dirs.setDirnames("posts", envs.postsDir)
  tbx.initConfig()
  tbx.writeFiles()
  // tbx.exportPagenation()
  // const a = { incl: [{ ja: ["a", "b", "c"] }, { ja: ["1", "2", 3] }] }
  // tbx.convObj2Yaml(a)
} else {
  const tbx = new ToolBox(ENV_PATH)
  switch (process.argv[2].toLowerCase()) {
    case "-i":
    case "--init": {
      tbx.exportProf()
      tbx.exportLangConf()
      tbx.exportValidateLog()
      // tbx.exportToc()
      tbx.exportPagenation()
      tbx.writeFiles()
      break;
    }

    case "-p":
    case "--prof": {
      tbx.exportProf()
      tbx.writeFiles()
      break;
    }

    case "-l":
    case "--lang": {
      tbx.exportLangConf()
      tbx.writeFiles()
      break
    }

    case "-c":
    case "--check":
      tbx.exportValidateLog()
      tbx.writeFiles()
      break;

    case "-n":
    case "--nav": {
      // tbx.exportToc()
      tbx.writeFiles()
      break;
    }

    case "--post":
      tbx.exportPagenation()
      tbx.writeFiles()
      break

    case "-h":
    case "--help":
    default:
      console.log("Usage:")
      console.log("  -i, --init:    Initialize settings according to contents/_init/profile.yaml")
      console.log("  -p, --prof:    Generate stores/profile.ts")
      console.log("  -l, --lang:    Generate langconfig.ts")
      console.log("  -c, --check:   Check the yaml files in contents dir")
      console.log("  -n, --nav:     Generate index files and _resources/navs.ts")
      console.log("  --post:        Generate posts pagenations")
      // console.log("  -m, --md:      Convert the designated md file into mlml yaml at tools/gen.yaml")
      console.log("  -h, --help:    Display help")
      break;
  }
}

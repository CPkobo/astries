import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs"
import { join, sep } from "path"
// import { writeFileSync, mkdirsSync } from "fs-extra"
// import pkg from 'fs-extra';
// const { writeFileSync, mkdirsSync } = pkg;
import { dump } from "js-yaml";
import { ProfGenerator } from "./toys/profGenerator.js"
import { TOCGenerator } from "./toys/tocGenerator.js"
import { Validator } from "./toys/validater.js"
import { DirOperator } from "./toys/dirOperator.js";
// import { MlMl } from "./convMlMl.js"
import { Sitemap } from "./toys/sitemap.js"
import { PostPagenation } from "./toys/postPagenation.js";

export type Writing = {
  dir: string
  name: string,
  data: string,
  message?: string
}

class ToolBox {
  public prof: ProfGenerator
  public toc: TOCGenerator
  public val: Validator
  public posts: PostPagenation
  public dirs: DirOperator
  public writer: Array<Writing | null>

  constructor(root: string = "", out: string = "") {
    this.dirs = new DirOperator()
    this.dirs.setRoot(root)
    this.dirs.setOut(out)

    this.prof = new ProfGenerator()
    this.prof.readProf(this.dirs)

    this.toc = new TOCGenerator(this.dirs, this.prof.prof)
    this.val = new Validator(this.dirs, this.prof.prof)
    this.posts = new PostPagenation()
    // this.mlml = new MlMl()

    this.writer = []
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

  convJson2Yaml(path: string): void {
    const data = JSON.parse(readFileSync(path).toString())
    const yml = dump(data)
    console.log(yml)
    writeFileSync(path.replace(".json", ".yaml"), yml)
  }

  convObj2Yaml(obj: any): void {
    const yml = dump(obj)
    console.log(yml)
    writeFileSync("./tools/obj.yaml", yml)
  }

  exportProf(): void {
    this.writer.push(this.prof.exportProf(this.dirs))
  }

  exportLangConf(): void {
    this.writer.push(this.prof.exportLangConfig(this.dirs))
  }

  exportToc(): void {
    this.writer.push(...this.toc.execGenerator(this.dirs))
  }

  exportValidateLog(): void {
    this.val.execBatchValidate()
    this.writer.push(this.val.exportErrors())
  }

  exportPagenation(): void {
    this.writer.push(...this.posts.exportPageIndices(this.dirs))
  }

  exportSitemap(): void {
    const map = new Sitemap()
    this.writer.push(map.exportSitemap(this.dirs, this.prof.prof))
  }

  writeFiles(): void {
    if (this.writer.length > 0) {
      this.dirs.writeFiles(this.writer)
    }
  }
}

if (process.argv.length < 3) {
  const tbx = new ToolBox("../mlml-gb")
  tbx.exportPagenation()
  // const a = { incl: [{ ja: ["a", "b", "c"] }, { ja: ["1", "2", 3] }] }
  // tbx.convObj2Yaml(a)
} else {
  const tbx = new ToolBox(process.argv[3], process.argv[4])
  switch (process.argv[2].toLowerCase()) {
    case "-i":
    case "--init": {
      tbx.exportProf()
      tbx.exportLangConf()
      tbx.exportValidateLog()
      tbx.exportToc()
      tbx.exportSitemap()
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

    case "-t":
    case "--toc": {
      tbx.exportToc()
      tbx.writeFiles()
      break;
    }

    case "-m":
    case "--md":
      tbx.exportPagenation()
      tbx.writeFiles()
      break

    case "-s":
    case "--sitemap":
      tbx.exportSitemap()
      tbx.writeFiles()
      break;

    case "-h":
    case "--help":
    default:
      console.log("Usage:")
      console.log("  -i, --init:    Initialize settings according to contents/.init/profile.yaml")
      console.log("  -p, --prof:    Generate stores/profile.ts")
      console.log("  -l, --lang:    Generate langconfig.ts")
      console.log("  -c, --check:   Check the yaml files in contents dir")
      console.log("  -t, --toc:     Generate TOC files and stores/navigations.ts")
      console.log("  -s, --sitemap: Generate sitemap.xml")
      // console.log("  -m, --md:      Convert the designated md file into mlml yaml at tools/gen.yaml")
      console.log("  -h, --help:    Display help")
      break;
  }
}

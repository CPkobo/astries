import { existsSync, mkdirSync, writeFileSync } from "fs"
import { join, parse } from "path"
import { Writing } from "../toybox"

export class DirOperator {
  static _root = ""
  static _contents = "contents"
  static _src = "src"
  static _static = "static"
  static _pict = "pict"
  static _posts = ["posts"]
  static _prof = ".init/profile.yaml"
  static _tocyaml = "toc.yaml"

  static join = (...paths: string[]): string => {
    return join(...paths)
  }

  static _types = "@types/"
  static _profts = "profile.ts"
  static _langts = "langconfig.d.ts"
  static _sitemapxml = "sitemap.xml"

  public root: string
  public contents: string
  public src: string
  public static: string
  public pict: string
  public posts: string[]
  public prof: string
  public out: string

  constructor() {
    this.root = join(DirOperator._root)
    this.src = join(DirOperator._src)
    this.contents = join(DirOperator._contents)
    this.static = join(DirOperator._static)
    this.pict = join(DirOperator._static, DirOperator._pict)
    this.posts = DirOperator._posts.map(val => { return join(val) })
    this.prof = join(DirOperator._prof)
    this.out = ""
  }

  setDirname(key: "root" | "src" | "contents" | "pict" | "out", path: string): void {
    if (path === "") {
      // pass 
    } else {
      switch (key) {
        case "root":
          this.root = join(path)
          break;

        case "src":
          this.src = join(path)
          break;

        case "contents":
          this.contents = join(path)
          break;

        case "pict":
          this.pict = join(path)
          break;

        case "out":
          this.out = join(path)
          break;

        default:
          break;
      }
    }
  }

  setDirnames(key: "posts", paths: string[]): void {
    switch (key) {
      case "posts":
        this.posts = paths.map(val => { return join(val) })
        break;

      default:
        break;
    }
  }

  setRoot(root: string = ""): void {
    this.setDirname("root", root)
  }

  setOut(out: string = ""): void {
    this.setDirname("out", out)
  }

  getProfPath(): string {
    return join(this.root, this.contents, this.prof)
  }

  getContentsDir(): string {
    return join(this.root, this.contents)
  }

  getSrcDir(): string {
    return join(this.root, this.src)
  }

  getPictDir(): string {
    return join(this.root, this.pict)
  }

  getPostsDir(): string[] {
    return this.posts.map(val => { return join(this.root, val) })
  }

  getWriteProfPaths(): [string, string] {
    if (this.out === "") {
      return [join(this.root, this.src), join(DirOperator._profts)]
    } else {
      return [join(this.src), join(DirOperator._profts)]
    }
  }

  getWriteLangconfPaths(): [string, string] {
    if (this.out === "") {
      return [join(this.root, this.src, DirOperator._types), join(DirOperator._langts)]
    } else {
      return [join(this.src, DirOperator._types), join(DirOperator._langts)]
    }
  }

  getWriteTocPaths(path: string): [string, string] {
    if (this.out === "") {
      return [join(this.root, this.contents, path), join(DirOperator._tocyaml)]
    } else {
      return [join(this.contents, path), join(DirOperator._tocyaml)]
    }
  }

  writeFiles(writer: Array<Writing | null>): void {
    const wd = this.out === "" ? this.root : this.out
    if (existsSync(wd) === false) {
      mkdirSync(wd)
    }
    for (const w of writer) {
      if (w === null) {
        continue
      }
      const dirs = w.dir.replace(this.root, "").replace("/", "\\").split("\\")
      for (let i = 0; i < dirs.length; i++) {
        if (dirs[i] === this.root) {
          continue
        } else {
          const wd2 = join(wd, ...dirs.slice(0, i + 1))
          if (existsSync(wd2) === false) {
            mkdirSync(wd2)
          }
        }
      }
      writeFileSync(join(wd, ...dirs, w.name), w.data)
      if (w.message) {
        console.log(w.message)
      }
    }
  }
}
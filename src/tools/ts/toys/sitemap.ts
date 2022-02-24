import { readdirSync, readFileSync, statSync } from "fs"
import { load } from "js-yaml"
import { Writing } from "../toybox"
import { DirOperator } from "./dirOperator"

export class Sitemap {
  public host: string
  public defLang: LangList | ""
  // public contentsDir: string
  // public postsDirs: string[]
  public xml: string[]

  constructor() {
    this.host = ""
    this.defLang = ""
    // this.contentsDir = contents
    // this.postsDirs = posts
    this.xml = []
  }

  exportSitemap(dirope: DirOperator, prof: Profile): Writing {
    this.setHost(prof.url)
    this.resetXML()
    this.setDefLang(prof.Langs[0].locale)
    this.execCrawlContents(dirope.root, dirope.getContentsDir())
    this.execCrawlPosts(dirope.root, dirope.getPostsDir())
    this.closeXML()
    return {
      dir: dirope.static,
      name: DirOperator._sitemapxml,
      data: this.xml.join("\n")
    }
  }

  setHost(url: string): void {
    this.host = url.replace(/\/+$/, "")
  }

  resetXML(): void {
    this.xml = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
    ]
  }

  closeXML() {
    this.xml.push("</urlset>")
  }

  setDefLang(lang: LangList) {
    this.defLang = lang
  }

  execCrawlContents(root: string, contents: string) {
    const inTops = readdirSync(contents).filter(val => {
      return val.endsWith(".yaml")
    })
    for (const inTop of inTops) {
      if (inTop.endsWith("index.yaml") || inTop.endsWith("navs.yaml")) {
        continue
      } else {
        const path = DirOperator.join(contents, inTop)
        const yml = load(readFileSync(path).toString()) as PageContents<IsMulti>
        const stat = statSync(path)
        const mtime = this.getISODayStr(stat.mtime)
        this.xml.push(...this.getUrlStrs(root, inTop, mtime, yml.includes, true))
      }
    }

    const dirs = readdirSync(contents).filter(val => {
      return val.endsWith(".yaml") === false
    })
    for (const dir of dirs) {
      if (dir.startsWith(".")) {
        continue
      }
      const dirpath = DirOperator.join(contents, dir)
      const files = readdirSync(dirpath).filter(val => {
        return val.endsWith(".yaml")
      })
      for (const file of files) {
        if (file.endsWith("index.yaml")) {
          continue
        }
        const filepath = DirOperator.join(contents, dir, file)
        const stat = statSync(filepath)
        const mtime = this.getISODayStr(stat.mtime)
        if (file.endsWith("toc.yaml")) {
          const yml = load(readFileSync(filepath).toString()) as TOC<IsMulti>
          const langs = [...Object.keys(yml.$heading)]
          this.xml.push(...this.getUrlStrs(root, filepath, mtime, langs))
        } else {
          const yml = load(readFileSync(filepath).toString()) as PageContents<IsMulti>
          this.xml.push(...this.getUrlStrs(root, filepath, mtime, yml.includes))
        }
      }
    }
  }

  execCrawlPosts(root: string, posts: string[]): void {
    for (const dir of posts) {
      const files = readdirSync(dir).filter(val => {
        return val.endsWith(".md")
      })
      for (const file of files) {
        const path = `${dir}/${file}`
        const stat = statSync(path)
        const mtime = this.getISODayStr(stat.mtime)
        this.xml.push(this.getUrlStr(root, path.replace(".md", ""), mtime))
      }
    }
  }

  getISODayStr(mtime: string | Date): string {
    const date = new Date(mtime)
    return date.toISOString().split("T")[0]
  }

  getUrlStrs(root: string, url: string, mtime: string, langs: string[], isTopDir = false): string[] {
    const xmls = []
    if (isTopDir) {
      if (url === "top.yaml") {
        url = "/"
      }
    } else {
      url = url.replace(".yaml", "")
    }
    for (const lang of langs) {
      if (lang === this.defLang) {
        xmls.push(this.getUrlStr(root, url, mtime))
      } else {
        xmls.push(this.getUrlStr(root, `${url}--${lang}`, mtime))
      }
    }
    return xmls
  }

  getUrlStr(root: string, path: string, mtime: string): string {
    const mod = path.startsWith("/") ? "" : "/"
    const url = path.replace(root, "").replace(/\\/g, "/")
    return `<url>
<loc>${this.host}${mod}${url}</loc>
<lastmod>${mtime}</lastmod>
<changefreq>monthly</changefreq>
</url>`
  }
}
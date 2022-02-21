import { readdirSync, readFileSync, statSync } from "fs"
import { dump } from "js-yaml"
import fm from "front-matter"
import { marked } from "marked"
import { Writing } from "../toybox"
import { DirOperator } from "./dirOperator"

export class PostPagenation {
  public files: PostIndex[]

  constructor() {
    this.files = []
  }

  exportPageIndices(dirope: DirOperator): Writing[] {
    const writings: Writing[] = []
    this.execCrawlPosts(dirope.root, dirope.posts)
    const indices: Writing = {
      dir: "./",
      name: "indices.yaml",
      data: dump(this.files)
    }
    writings.push(indices)
    const minx: MinPostIndex[] = []
    for (const file of this.files.slice(0, 5)) {
      minx.push({
        title: file.title,
        href: file.href
      })
    }
    const data = `
    import { readable } from 'svelte/store'

export const latestPosts: MinPostIndex[] = ${JSON.stringify(minx, null, 2)}

export const latest = readable<MinPostIndex[]>(null, (set) => { set(latestPosts) })

    `
    const latest: Writing = {
      dir: "./",
      name: "latest.ts",
      data
    }
    writings.push(latest)
    return writings
  }

  execCrawlPosts(root: string, posts: string[]): void {
    const imgstr = new RegExp("\\!\\[.*\\]\\((.*)\\)");
    const tagstr = new RegExp("\\<.*\\>", "g")
    const lfstr = new RegExp("\\n", "g")
    const crstr = new RegExp("\\r", "g")
    for (const post of posts) {
      const target = DirOperator.join(root, post)
      const files = readdirSync(target).filter(val => {
        return val.endsWith(".md")
      })
      for (const file of files) {
        const path = DirOperator.join(target, file)
        const stat = statSync(path)
        const contents = fm<PostInfo>(readFileSync(path).toString())
        const summary = marked(contents.body)
          .replace(tagstr, "")
          .trim()
          .replace(crstr, "")
          .replace(lfstr, "<br />")
          .substring(0, 200)
        const index: PostIndex = {
          title: contents.attributes.title,
          published: contents.attributes.published,
          modified: contents.attributes.modified,
          pubstr: this.getISODayStr(contents.attributes.published),
          modstr: this.getISODayStr(contents.attributes.modified),
          image: contents.attributes.image,
          summary,
          href: file.replace(".md", "")
        }
        if (index.image === undefined) {
          const m = contents.body.match(imgstr)
          if (m !== null) {
            index.image = m[1]
          }
        }
        this.files.push(index)
      }
    }
    this.files.sort((a, b) => {
      if (a.modified.getTime() > b.modified.getTime()) {
        return -1
      } else if (a.modified.getTime() < b.modified.getTime()) {
        return 1
      } else {
        return 0
      }
    })
  }

  getISODayStr(time: string | Date): string {
    const date = new Date(time)
    return date.toISOString().split("T")[0]
  }

}
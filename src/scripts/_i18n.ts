import { readdirSync, readFileSync, existsSync } from "fs"
import { join } from "path"
import { load } from "js-yaml"
import { handleConvI18n2Str, handleConvI18n2StrInMeta, handleConvI18n2StrToc } from "./_convHandler"

export async function getContents(dirs: string, path: string, lang: LangList): Promise<PageContentsWithNav | null> {
  // const dirs = paths.slice(0, paths.length - 1)
  // const path = paths[paths.length - 1]

  const targetDir = dirs === "$" ? "contents" : join("contents", dirs)
  if (!existsSync(targetDir)) {
    // フォルダが見つからなかったら404にする
    return null
  }
  const srcFile = readdirSync(targetDir).find(fileName => fileName.endsWith(`${path}.yaml`))
  if (srcFile === undefined) {
    // ファイルが見つからなかったら404にする
    return null
  } else {
    const $yml = load(readFileSync(join(targetDir, srcFile)).toString()) as PageContents<IsMulti>
    const metas = handleConvI18n2StrInMeta($yml, lang)
    metas.href = path
    const contents = handleConvI18n2Str($yml.contents, lang)
    const next: NavToOtherPage = {
      href: "",
      title: ""
    }
    const prev: NavToOtherPage = {
      href: "",
      title: ""
    }
    const back: NavToOtherPage = {
      href: "",
      title: ""
    }
    if (dirs === "$") {

    } else {
      const toc = await getTOC(dirs, "toc", lang)
      let position = 1
      let breadCrumb: BreadcrumbList[] = [{
        "@type": "ListItem",
        position,
        name: "TOP",
        item: "/",
      }]
      position++
      if (toc !== null) {
        if (toc.data.length < 1) {
          back.href = "/"
          back.title = "TOP"

          breadCrumb.push({
            "@type": "ListItem",
            position,
            name: metas.$title,
            item: toc.root + "/toc",
          })
          position++

        } else if (toc.data.length < 2) {
          back.href = "/"
          back.title = "TOP"

          breadCrumb.push({
            "@type": "ListItem",
            position,
            name: metas.$title,
            item: toc.root,
          })
          position++

        } else {
          breadCrumb.push({
            "@type": "ListItem",
            position,
            name: toc.$heading,
            item: toc.root + "/toc",
          })
          position++
          breadCrumb.push({
            "@type": "ListItem",
            position,
            name: metas.$title,
            item: toc.root + "/" + metas.href,
          })
          position++
          let idx = -1
          for (let i = 0; i < toc.data.length; i++) {
            if (metas.name === toc.data[i].name) {
              idx = i
              break
            }
          }
          back.title = toc.$heading
          back.href = `${toc.root}/toc`
          if (idx > -1) {
            if (idx > 0) {
              prev.title = `<< ${toc.data[idx - 1].$title}` || ""
              prev.href = toc.data[idx - 1].href || ""
            }
            if (idx + 1 < toc.data.length) {
              next.title = `${toc.data[idx + 1].$title} >>` || ""
              next.href = toc.data[idx + 1].href || ""
            }
          }
        }
        metas.breadCrumb = breadCrumb
      }
    }
    return { ...metas, contents, next, prev, back }
  }
}

export async function getTOC(dirs: string, path: string, lang: LangList): Promise<TOC<IsSingle> | null> {
  // const dirs = paths.slice(0, paths.length - 1)
  // const path = paths[paths.length - 1]
  const srcFile = readdirSync(`contents/${dirs}`).find(fileName => fileName.endsWith(`${path}.yaml`))
  if (srcFile === undefined) {
    // ファイルが見つからなかったら404にする
    return null
  } else {
    const $yml = load(readFileSync(`contents/${dirs}/${srcFile}`).toString()) as TOC<IsMulti>
    return handleConvI18n2StrToc($yml, lang)
  }
}


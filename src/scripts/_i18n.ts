import { readdirSync, readFileSync, existsSync } from "fs"
import { join } from "path"
import { load } from "js-yaml"
import { handleConvI18n2Str, handleConvI18n2StrInMeta, handleConvI18n2StrToc } from "./_convHandler"
import { errorPage, errorTOC } from "$envs/error"

export async function getContents(dirs: string, path: string, lang: LangList): Promise<PageContentsWithCategory> {
  // const dirs = paths.slice(0, paths.length - 1)
  // const path = paths[paths.length - 1]

  const targetDir = dirs === "/" ? "contents" : join("contents", dirs)
  if (!existsSync(targetDir)) {
    // フォルダが見つからなかったら404にする
    return errorPage
  }
  const srcFile = readdirSync(targetDir).find(fileName => fileName.endsWith(`${path}.yaml`))
  if (srcFile === undefined) {
    // ファイルが見つからなかったら404にする
    return errorPage
  } else {
    const $yml = load(readFileSync(join(targetDir, srcFile)).toString()) as PageContents<IsMulti>
    const metas = handleConvI18n2StrInMeta($yml, lang)
    metas.href = path
    const contents = handleConvI18n2Str($yml.contents, lang)
    const toc = await getTOC(dirs, "index", lang)
    const breadCrumb = createBreadcrumb(toc, metas.$title, metas.href)
    // let idx = -1
    // for (let i = 0; i < toc.data.length; i++) {
    //   if (metas.name === toc.data[i].name) {
    //     idx = i
    //     break
    //   }
    // }
    metas.breadCrumb = breadCrumb
    return { ...metas, contents, category: toc }
  }
}

export async function getTOC(dirs: string, path: string, lang: LangList): Promise<CategoryIndex<IsSingle>> {
  // const dirs = paths.slice(0, paths.length - 1)
  // const path = paths[paths.length - 1]
  const srcFile = readdirSync(`contents/${dirs}`).find(fileName => fileName.endsWith(`${path}.yaml`))
  if (srcFile === undefined) {
    // ファイルが見つからなかったら404にする
    return errorTOC
  } else if (dirs === "/") {
    return errorTOC
  } else {
    const $yml = load(readFileSync(`contents/${dirs}/${srcFile}`).toString()) as CategoryIndex<IsMulti>
    return handleConvI18n2StrToc($yml, lang)
  }
}

function createBreadcrumb(toc: CategoryIndex<IsSingle>, title: string, href: string): BreadcrumbList[] {
  let position = 1
  const breadCrumb: BreadcrumbList[] = [{
    "@type": "ListItem",
    position,
    name: "TOP",
    item: "/",
  }]
  position++
  if (toc.name !== "ERROR TOC") {
    if (toc.data.length < 1) {
      toc = errorTOC
      breadCrumb.push({
        "@type": "ListItem",
        position,
        name: title,
        item: toc.root,
      })
      position++
    } else if (toc.data.length < 2) {
      breadCrumb.push({
        "@type": "ListItem",
        position,
        name: title,
        item: toc.root,
      })
      position++
    } else {
      breadCrumb.push({
        "@type": "ListItem",
        position,
        name: toc.$heading,
        item: toc.root,
      })
      position++
      breadCrumb.push({
        "@type": "ListItem",
        position,
        name: title,
        item: toc.root + "/" + href,
      })
      position++
    }
  }
  return breadCrumb
}

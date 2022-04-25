import { readdirSync, readFileSync, existsSync } from "fs"
import { navs } from "../_envs/paths"
import { join } from "path"
import { load } from "js-yaml"
import { handleConvI18n2Str, handleConvI18n2StrInMeta, handleConvI18n2StrToc } from "./_convHandler"
import { errorNav, errorPage } from "$envs/error"

export async function getContents(dirs: string, path: string, lang: LangList): Promise<PageContents<IsSingle>> {
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
    const navmenu = await getNavmenu(dirs, "toc", lang)
    const breadCrumb = createBreadcrumb(navmenu, metas.$title, metas.href)
    // let idx = -1
    // for (let i = 0; i < toc.data.length; i++) {
    //   if (metas.name === toc.data[i].name) {
    //     idx = i
    //     break
    //   }
    // }
    metas.breadCrumb = breadCrumb
    return { ...metas, contents }
  }
}

export async function getNavmenu(dirs: string, path: string, lang: LangList): Promise<NavigationMenu> {
  const url = `/${dirs}/${path}`
  for (const nav of navs[lang]) {
    if (nav.root === url) {
      return nav
    } else {
      for (const item of nav.items) {
        if (item.href === url) {
          return nav
        }
      }
    }
  }
  return errorNav
  // const dirs = paths.slice(0, paths.length - 1)
  // const path = paths[paths.length - 1]
  // const srcFile = readdirSync(`contents/${dirs}`).find(fileName => fileName.endsWith(`${path}.yaml`))
  // if (srcFile === undefined) {
  //   // ファイルが見つからなかったら404にする
  //   return errorTOC
  // } else if (dirs === "/") {
  //   return errorTOC
  // } else {
  //   const $yml = load(readFileSync(`contents/${dirs}/${srcFile}`).toString()) as SinglePageIndex<IsMulti>
  //   return handleConvI18n2StrToc($yml, lang)
  // }
}

function createBreadcrumb(navmenu: NavigationMenu, title: string, href: string): BreadcrumbList[] {
  let position = 1
  const breadCrumb: BreadcrumbList[] = [{
    "@type": "ListItem",
    position,
    name: "TOP",
    item: "/",
  }]
  position++
  if (navmenu.root !== "/404") {
    if (navmenu.items.length < 1) {
      // breadCrumb.push({
      //   "@type": "ListItem",
      //   position,
      //   name: title,
      //   item: navmenu.root,
      // })
      position++
    } else if (navmenu.items.length < 2) {
      breadCrumb.push({
        "@type": "ListItem",
        position,
        name: title,
        item: navmenu.root,
      })
      position++
    } else {
      breadCrumb.push({
        "@type": "ListItem",
        position,
        name: navmenu.category,
        item: navmenu.root,
      })
      position++
      breadCrumb.push({
        "@type": "ListItem",
        position,
        name: title,
        item: navmenu.root.replace("/toc", "") + "/" + href,
      })
      position++
    }
  }
  return breadCrumb
}

export async function getPostContents(dirs: string, path: string, lang: LangList): Promise<string> {
  const targetDir = dirs.endsWith("post") ? "posts" : join("posts", dirs).replace("/post/", "")
  if (!existsSync(targetDir)) {
    // フォルダが見つからなかったら404にする
    return
  }
  const srcFile = readdirSync(targetDir).find(fileName => fileName.endsWith(`${path}.md`))
  if (srcFile === undefined) {
    // ファイルが見つからなかったら404にする
    return
  } else {
    return readFileSync(join(targetDir, srcFile)).toString()
  }
}
import { readdirSync, readFileSync, existsSync } from "fs"
import { profile } from "../_envs/profile"
import { navs } from "../_envs/paths"
import { join } from "path"
import { load } from "js-yaml"
import { handleConvI18n2Str, handleConvI18n2StrInMeta, handleConvI18n2StrToc } from "./_convHandler"
import { errorNav, errorPage } from "$envs/error"
import { prof } from "./_env"

/**
 * 
 * @param {string} dirs アクセスされたURLのうち、BASE/<dirs>/<path> のdirs の部分が入る。深い階層の場合、真ん中に / が入る
 * @param {string} path アクセスされたURLのうち、BASE/<dirs>/<path> のpath の部分が入る。
 * @param {string} lang 
 * @returns 
 */
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
    const $yml = load(readFileSync(join(targetDir, srcFile)).toString()) as PageContentsInYaml<IsMulti>
    const metas = handleConvI18n2StrInMeta($yml, dirs, path, lang, profile.deflang)
    const contents = handleConvI18n2Str($yml.contents, lang)
    const navmenu = await getNavmenu(dirs, "toc", lang)
    console.log(navmenu)
    const breadCrumb = createBreadcrumb(navmenu, metas.$title, metas.fullpath)
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
        if (item.fullpath === url) {
          return nav
        }
      }
    }
  }
  return errorNav
}

function createBreadcrumb(navmenu: NavigationMenu, title: string, href: string): BreadcrumbList[] {
  let position = 1
  const breadCrumb: BreadcrumbList[] = [{
    "@type": "ListItem",
    position,
    name: "TOP",
    item: profile.url,
  }]
  position++
  if (navmenu.root !== "/404") {
    if (navmenu.items.length < 1) {
      position++
    } else if (navmenu.items.length < 2) {
      breadCrumb.push({
        "@type": "ListItem",
        position,
        name: title,
        item: `${profile.url}/${navmenu.root}`,
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
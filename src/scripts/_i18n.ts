import { readdirSync, readFileSync, existsSync } from "fs"
import { profile } from "$envs/profile"
import { navs } from "$envs/paths"
import { join } from "path"
import { load } from "js-yaml"
import { handleConvI18n2Str, handleConvI18n2StrInMeta, handleConvI18n2StrToc } from "./_convHandler"
import { errorNav, errorPage } from "$envs/error"

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
    const breadCrumb = createBreadcrumb(navmenu, metas.$title, metas.fullpath)
    metas.breadCrumb = breadCrumb
    const jsonLdBreadCrumnb: JsonLdBreadCrumnb = {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadCrumb
    }
    if (metas.jsonld === undefined) {
      metas.jsonld = [jsonLdBreadCrumnb]
    } else {
      metas.jsonld.push(jsonLdBreadCrumnb)
    }
    if ($yml.useJsonLd === 'faq') {
      metas.jsonld.push(createFaqJsonLd(contents))
    }
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

function createFaqJsonLd(contents: AnyBlock<IsSingle>[]): JsonLdFaq {
  const faq: JsonLdFaq = {
    "@context": "http://schema.org",
    "@type": "FAQPage",
    mainEntity: []
  }
  for (const blk of contents) {
    if (blk.type !== 'Faq') {
      continue
    } else if (!blk.isForJsonLd) {
      continue
    } else {
      for (const qa of blk.$qas) {
        const qts: string[] = []
        const acceptedAnswer: FaqAnswer[] = []
        for (const q of qa.$q) {
          if (q.type === 'plain') {
            if (typeof q.$texts === 'string') {
              qts.push(q.$texts)
            } else {
              qts.push(...q.$texts)
            }
          }
        }
        for (const a of qa.$a) {
          const ats: string[] = []
          if (a.type === 'plain' || a.type === 'list') {
            if (typeof a.$texts === 'string') {
              ats.push(a.$texts)
            } else {
              ats.push(...a.$texts)
            }
          } else if (a.type === 'markdown') {
            ats.push(a.$md)
          }
          if (ats.length > 0) {
            acceptedAnswer.push({
              "@type": "Answer",
              text: ats.join(' ')
            })
          }
        }
        faq.mainEntity.push({
          "@type": "Question",
          name: qts.join(' '),
          acceptedAnswer,
        })
      }
    }
  }
  return faq
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
        item: `${profile.url}/${navmenu.root}`,
      })
      position++
      breadCrumb.push({
        "@type": "ListItem",
        position,
        name: title,
        item: `${profile.url}/${href}`,
      })
      position++
    }
  }
  // console.log(breadCrumb)
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

export function getFormatedDate(published?: Date, modified?: Date): string {
  let pub: string = ''
  if (published) {
    // console.log(a.toString())
    const y = published.getFullYear()
    const m = published.getMonth() + 1
    const d = published.getDate()
    pub = `${y}年${m}月${d}日`
  }
  let mod: string = ''
  if (modified) {
    if (published !== modified) {
      const y = modified.getFullYear()
      const m = modified.getMonth() + 1
      const d = modified.getDate()
      mod = `${y}年${m}月${d}日`
    }
  }
  return pub === '' ? '（作成日未設定）' : mod === '' ? pub : `${pub} （更新：${mod}）`
}
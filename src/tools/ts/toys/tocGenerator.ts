import { readdirSync, readFileSync } from "fs"
import { load, dump } from "js-yaml"
import { Writing } from "../toybox"
import { DirOperator } from "./dirOperator"

export class TOCGenerator {
  public langs: LangList[]
  public contentsDir: string
  public srcDir: string

  public valid: Partial<ValidPaths>
  public navs: Partial<I18nNavMenu>

  private hasGened: boolean
  private blankI18n: I18nText = {}

  constructor(dirope: DirOperator, prof: Profile) {
    this.langs = prof.Langs.map(val => { return val.locale })
    this.contentsDir = dirope.getContentsDir()
    this.srcDir = dirope.getSrcDir()
    this.valid = {}
    this.navs = {}
    this.blankI18n = {}
    this.hasGened = false
  }

  setLangs(langs: LangList[]) {
    this.langs = langs
    this.langs.forEach(lang => {
      this.blankI18n[lang] = ""
      this.valid[lang] = []
      this.navs[lang] = []
    })
  }

  setDirs(contentsDir: string, srcDir: string) {
    this.contentsDir = contentsDir
    this.srcDir = srcDir
  }

  execGenerator(dirope: DirOperator): Writing[] {
    this.hasGened = true
    const tocs = []
    const writings: Writing[] = []
    const dirs = readdirSync(this.contentsDir).filter(val => {
      return val.endsWith(".yaml") === false
    })
    const inTops = readdirSync(this.contentsDir).filter(val => {
      return val.endsWith(".yaml")
    })
    for (const dir of dirs) {
      if (dir.startsWith(".")) {
        continue
      }
      const toc = this.genTOCinEachFolder(dir)
      if (toc !== null) {
        const data = dump(toc)
        const [dir_, name] = dirope.getWriteTocPaths(dir)
        writings.push({
          dir: dir_,
          name,
          data
        })
        tocs.push(toc)
      }
    }
    tocs.sort((a, b) => {
      if (a.position > b.position) {
        return 1
      }
      if (a.position < b.position) {
        return -1
      }
      return 0
    })
    const [valid, navs] = this.createNavFromToc(tocs)
    this.valid = valid
    this.navs = navs
    const navsdata = this.writeNavTS(valid, navs)
    return [...writings, ...navsdata]
  }

  /**
  * contents ディレクトリを走査し、各ディレクトリの toc ファイルを更新する
  * @param {string} dirs ディレクトリ名の配列
  * @return {TOC<IsMulti>} toc 多言語目次
  */
  genTOCinEachFolder(dir: string) {
    const thisdir = `${this.contentsDir}/${dir}`
    const files = readdirSync(thisdir).filter(file => {
      return file.endsWith(".yaml")
        && !(file.endsWith("template.yaml") || file.endsWith("toc.yaml"))
    })
    // index、toc、templeta 以外にファイルがなかった場合
    if (files.length < 2) {
      return null
    } else {
      // index、toc、templeta 以外に1ファイルしかなかった場合を分ける
      const notIndex = files[0] !== "index.yaml" ? files[0].replace(".yaml", "") : files[1].replace(".yaml", "")
      const root = files.length === 2 ? `/${dir}/${notIndex}` : `/${dir}`
      const toc: TOC<IsMulti> = {
        name: dir.toUpperCase(),
        position: 0,
        $heading: {},
        root,
        data: []
      }
      const nameInDir: string[] = []
      files.forEach(file => {
        if (!(file.endsWith(".yaml"))) {
          // continue
        } else if (file.endsWith("template.yaml") || file.endsWith("toc.yaml")) {
          // continue
        } else if (file.endsWith("index.yaml")) {
          const index = load(readFileSync(`${thisdir}/${file}`).toString()) as TOCIndex
          for (const lang of this.langs) {
            if (index[lang] !== undefined && index[lang] !== "") {
              toc.$heading[lang] = index[lang]
            }
            toc.position = index.position
          }
        } else {
          const contents = load(readFileSync(`${thisdir}/${file}`).toString()) as PageContents<IsMulti>
          const singleTOC: SingleTOC<IsMulti> = {
            name: contents.name || "",
            position: Number(contents.position) || toc.data.length,
            href: `/${dir}/${file.replace(".yaml", "")}`,
            img: contents.img || "",
            $title: contents.$title || this.blankI18n,
            $summary: contents.$summary || this.blankI18n,
            includes: contents.includes
          }
          if (nameInDir.includes(singleTOC.name)) {
            console.log(`The name ${singleTOC.name} is dupilicated in '${dir}'`)
          }
          nameInDir.push(singleTOC.name)
          toc.data.push(singleTOC)
        }
      })
      toc.data.sort((a, b) => {
        if (a.position > b.position) {
          return 1
        }
        if (a.position < b.position) {
          return -1
        }
        return 0
      })
      return toc
    }
  }


  /**
  * 目次オブジェクトからナビゲーションを作成する
  * @param {Array<TOC<IsMulti>>} toc 目次オブジェクト
  * @param {Number} depth 入れ子の層数を指定。デフォルト=2
  * @returns {[ValidPaths, I18nNavMenu]} 多言語ナビゲーション
  */
  createNavFromToc(tocs: TOC<IsMulti>[], depth = 2): [Partial<ValidPaths>, Partial<I18nNavMenu>] {
    /**
    * @type {ValidPaths} この関数が返す多言語ナビゲーション
    * LANG: string[] の形で、
    * 言語ごとに有効なパスの一覧を持つ
    */
    const valid: Partial<ValidPaths> = {}
    /**
    * @type {I18nNavMenu} この関数が返す多言語ナビゲーション
    * LANG: NavigationMenu の形で、
    * category: string, root: string, items?: NavItem[] を持つ
    */
    const i18nmenu: Partial<I18nNavMenu> = {}
    this.langs.forEach(lang => {
      const lv: string[] = ["/"]
      const lm: NavigationMenu[] = []
      for (const toc of tocs) {
        if (!toc.$heading[lang]) {
          continue
        }
        const navmenu: NavigationMenu = {
          category: toc.$heading[lang] || "",
          root: toc.root,
          items: [],
        }
        // root は 有効なパスとして登録
        lv.push(toc.root)
        if (toc.data.length > 1) {
          lv.push(`${toc.root}/toc`)
          navmenu.root = `${toc.root}/toc`
        }
        for (const datum of toc.data) {
          // datum の方は SingleTOC
          if (datum.$title[lang] === undefined) {
            // datum に 当該言語の $title がなければ登録しない
            continue
          } else if (datum.includes && !datum.includes.includes(lang)) {
            continue
          } else {
            // datum に 当該言語の $title があれば登録する
            const navitem: NavItem = {
              caption: datum.$title[lang] || "",
              // link: datum.href.endsWith("_") ? datum.href : datum.href + "_",
              link: datum.href,
              items: []
            }
            if (!lv.includes(navitem.link)) {
              lv.push(navitem.link)
            }
            if (datum.children) {
              const items = this.convToc2NavItems(datum.children, lang, depth, 0) || []
              if (items.length > 0) {
                navitem.items = items
              }
            }
            if (navmenu.items === undefined) {
              navmenu.items = [navitem]
            } else {
              navmenu.items.push(navitem)
            }
          }
        }
        lm.push(navmenu)
      }
      valid[lang] = lv
      i18nmenu[lang] = lm
    })
    return [valid, i18nmenu]
  }

  /**
  * SingleTOC<IsMulti>[] から NavItem[] をつくる
  * 場合によっては再起呼び出し
  * @param {SingleTOC<IsMulti>[]} stocs ページアイテムの配列
  * @param {String::LangList} lang 取り出す言語
  * @param {Number} depth 入れ子の層数を指定。
  * @param {Number} crt 現在の再帰呼び出し数
  * @return {NavItem[]} 単言語ナビゲーション
  */
  convToc2NavItems(stocs: SingleTOC<IsMulti>[], lang: LangList, depth: number, crt: number): NavItem[] | null {
    if (crt >= depth) {
      return null
    }
    /**
    * @type {NavItem[]} 単言語ナビゲーション
    */
    const navs: NavItem[] = []
    for (const stoc of stocs) {
      // 対応言語のタイトルがない場合、ナビゲーションに含めない
      if (!stoc.$title[lang]) {
        continue
      } else {
        /**
        * @type {NavItem} 単一ページ・単一言語に対応したナビゲーション項目
        */
        const nav_: NavItem = {
          caption: stoc.$title[lang] || "",
          link: stoc.href,
        }
        if (stoc.children) {
          const items = this.convToc2NavItems(stoc.children, lang, depth, crt++)
          if (items !== null && items.length > 0) {
            nav_.items = items
          }
        }
        navs.push(nav_)
      }
    }
    return navs
  }

  /**
  * stores に navigations.ts を書きだす
  * @param {ValidPaths} valid 言語ごとの有効なパスの配列
  * @param {I18nNavMenu} navs ナビゲーションメニュー
  */
  writeNavTS(valid: Partial<ValidPaths>, navs: Partial<I18nNavMenu>): Writing[] {
    const writings: Writing[] = []
    const navdata = dump(navs)
    writings.push({
      dir: `${this.contentsDir}/`,
      name: "navs.yaml",
      data: navdata
    })

    const navstore = `
    // This file is automaticaly generated by 'tocgen.js'
    
    import { readable } from 'svelte/store'
    
    const validPaths: ValidPaths = ${JSON.stringify(valid, null, 2)}
    const navmenu: I18nNavMenu = ${JSON.stringify(navs, null, 2)}
    export const navs = readable<I18nNavMenu>(null, (set) => { set(navmenu) })
    export const valid = readable<ValidPaths>(null, (set) => { set(validPaths) })
    `

    writings.push({
      dir: `${this.srcDir}/stores/`,
      name: "navigations.ts",
      data: navstore
    })
    return writings
  }
}
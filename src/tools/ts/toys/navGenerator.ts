import { readdirSync, readFileSync } from "fs"
import { load, dump } from "js-yaml"
import { Writing } from "../toybox"
import { DirOperator } from "./dirOperator"

export class NavGenerator {
  public langs: LangList[]
  public deflang: LangList
  public contentsDir: string
  public srcDir: string

  public stDirs: StaticDir[]
  public stPaths: StaticPath[]
  public navs: Partial<I18nNavMenu>

  private hasGened: boolean
  private blankI18n: I18nText = {}

  constructor(dirope: DirOperator, prof: Profile) {
    this.langs = prof.Langs.map(val => { return val.locale })
    this.deflang = this.langs[0]
    this.contentsDir = dirope.getContentsDir()
    this.srcDir = dirope.getSrcDir()
    this.stPaths = []
    this.stDirs = []
    this.navs = {}
    this.blankI18n = {}
    this.hasGened = false
  }

  setLangs(langs: LangList[]) {
    this.langs = langs
    this.langs.forEach(lang => {
      this.blankI18n[lang] = ""
      this.navs[lang] = []
    })
  }

  setDirs(contentsDir: string, srcDir: string) {
    this.contentsDir = contentsDir
    this.srcDir = srcDir
  }

  /**
  * contents ディレクトリを走査し、各ディレクトリの index ファイルを更新する
  * @param {DirOperator} dirope contentsフォルダの場所を格納しているオブジェクト
  * @return {Object} result 各ディレクトリの状態を返す
  * @return {Partial<I18nNavMenu>} result.navs
  * @return {StaticDir[]} result.dirs
  * @return {StaticPaths[]} result.paths
  */
  execGenerator(dirope: DirOperator): { navs: Partial<I18nNavMenu>, dirs: StaticDir[], paths: StaticPath[] } {
    this.hasGened = true
    const indices: SinglePageIndex<IsMulti>[] = []
    const onlyIndexDir: string[] = []
    const dirs: string[] = []
    // contentsDir にあるディレクトリを再帰的に配列にする
    dirs.push(...this.getDirListRecursive(this.contentsDir))
    // const dirs = readdirSync(this.contentsDir).filter(val => {
    //   return val.endsWith(".yaml") === false
    //     && !(val.startsWith("_") || val.startsWith("."))
    // })
    // const inTops = readdirSync(this.contentsDir).filter(val => {
    //   return val.endsWith(".yaml")
    //     && !(val.startsWith("_") || val.startsWith("."))
    // })
    // 各ディレクトリのインデックスを作成する
    for (const dir of dirs) {
      // 各ディレクトリのindex.yaml、その他のファイル、_ で始まるファイルのパスをそれぞれ配列に
      const { index, files, specials } = this.getFileNamesInEachFolder(dir)
      // フォルダがAstriesの要件を満たしていない場合、スキップ
      if (specials.includes("_init.yaml") === false) {
        continue
      } else if (files.length === 0) {
        if (index !== "") {
          // フォルダ内にIndexしかないファイルは別扱い
          onlyIndexDir.push(dir)
        }
        continue
      }
      const dirIndex = this.generateIndex(dir, files)
      // const data = dump(dirIndex)
      // const [dir_, name] = dirope.getWriteIndexPaths(dir)
      // writings.push({
      //   dir: dir_,
      //   name,
      //   data
      // })
      indices.push(dirIndex)
    }
    indices.sort((a, b) => {
      if (a.position > b.position) {
        return 1
      }
      if (a.position < b.position) {
        return -1
      }
      return 0
    })
    return this.createNavFromIndices(indices)
    // this.stDirs = stdirs
    // this.stPaths = stpaths
    // this.navs = navs
    // return {
    //   navs,
    //   dirs: stdirs,
    //   paths: stpaths
    // }
    // const navsdata = this.writeNavTS(stdirs, stpaths, navs)
    // return [...writings, ...navsdata]
  }

  getDirListRecursive(dir: string, subdir = ""): string[] {
    const dirList = readdirSync(DirOperator.join(dir, subdir), {
      withFileTypes: true,
    })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => DirOperator.join(subdir, dirent.name));
    const dirs = [...dirList]
    dirList.forEach(child => {
      dirs.push(...this.getDirListRecursive(dir, child))
    })
    return dirs
  }

  /**
  * contents ディレクトリの特定のフォルダを走査し、indexファイルと通常ファイル、特殊ファイルに分ける
  * @param {string} dir ディレクトリ名
  * @return {object} index インデックスファイルへのファイルパス, files 通常ファイルへのファイルパス, specials: 特殊ファイルへのファイルパス
  */
  getFileNamesInEachFolder(dir: string): { index: string, files: string[], specials: string[] } {
    const thisdir = DirOperator.join(this.contentsDir, dir)
    let index: string = ""
    const files: string[] = []
    const specials: string[] = []
    readdirSync(thisdir).map(file => {
      if (file.endsWith(".yaml")) {
        if (file.startsWith("_") || file.startsWith(".")) {
          specials.push(file)
        } else {
          if (file.endsWith("index.yaml")) {
            index = file
          } else {
            files.push(file)
          }
        }
      }
    })
    return { index, files, specials }
  }

  /**
  * contents ディレクトリを走査し、各ディレクトリの index ファイルのもととなるデータを作成
  * @param {string} dir ディレクトリ名
  * @return {CategoryIndex<IsMulti>} ctidx 多言語目次
  */
  generateIndex(dir: string, files: string[]): SinglePageIndex<IsMulti> {
    const init = load(readFileSync(
      DirOperator.join(this.contentsDir, dir, "_init.yaml")).
      toString()) as CategoryInit
    // ディレクトリトップのSinglePageIndex
    const dirtop: SinglePageIndex<IsMulti> = {
      name: dir.toUpperCase(),
      position: init.position | 0,
      $title: {},
      $summary: {},
      href: `/${dir}/toc`,
      img: init.img || '',
      langs: [],
      pageType: 'Base',
      data: []
    }
    // _initファイルの $heading に記載があり、かつ publishLangs に含まれている言語は目次に追加
    for (const k of Object.keys(init)) {
      if (k !== "position" && k !== "publishLangs") {
        const l = k as LangList
        if (init.publishLangs.includes(l)) {
          dirtop.$title[l] = init[l]
          dirtop.langs.push(l)
        }
      }
    }
    // 同じフォルダ内に同じnameが重複していなかをチェックするための配列
    const nameInDir: string[] = []
    files.forEach(file => {
      // 各yamlファイルを開いて中身から目次に必要な項目を抽出
      const filepath = DirOperator.join(this.contentsDir, dir, file)
      const contents = load(readFileSync(filepath).toString()) as PageContents<IsMulti>
      const singleIndex: SinglePageIndex<IsMulti> = {
        name: contents.name || file.replace(".yaml", ""),
        position: Number(contents.position) || dirtop.data.length || 0,
        href: `/${dir}/${file.replace(".yaml", "")}`,
        img: contents.img || "",
        $title: contents.$title || this.blankI18n,
        $summary: contents.$summary || this.blankI18n,
        langs: contents.langs,
        pageType: contents.pageType,
        data: [],
      }
      if (nameInDir.includes(singleIndex.name)) {
        console.log(`The name ${singleIndex.name} is dupilicated in '${dir}'`)
      }
      nameInDir.push(singleIndex.name)
      dirtop.data.push(singleIndex)
    })
    // フォルダ内にindex以外に1つしかファイルがない場合、直接アクセスできるようにする
    if (dirtop.data.length === 1) {
      dirtop.href = dirtop.data[0].href
    } else {
      // 複数のファイルがある場合は、position順に並び替え
      dirtop.data.sort((a, b) => {
        if (a.position > b.position) {
          return 1
        }
        if (a.position < b.position) {
          return -1
        }
        return 0
      })
    }
    return dirtop
  }

  /**
  * 目次オブジェクトからナビゲーションを作成する
  * @param {Array<CategoryIndex<IsMulti>>} toc 目次オブジェクト
  * @param {Number} depth 入れ子の層数を指定。デフォルト=2
  * @returns {[ValidPaths, I18nNavMenu]} 多言語ナビゲーション
  */
  createNavFromIndices(indices: SinglePageIndex<IsMulti>[]): {
    navs: Partial<I18nNavMenu>, dirs: StaticDir[], paths: StaticPath[]
  } {
    const stdirs: StaticDir[] = []
    const stpaths: StaticPath[] = []
    const i18nmenu: Partial<I18nNavMenu> = {}
    this.langs.forEach(lang => {
      const dupliPaths: string[] = []
      const singleLangDir: StaticDir[] = []
      const singleLangPath: StaticPath[] = []
      const singleLangMenu: NavigationMenu[] = []
      for (const index of indices) {
        if (!index.$title[lang]) {
          continue
        }
        const navmenu: NavigationMenu = {
          category: index.$title[lang] || "",
          root: index.href,
          items: [],
        }
        // Pageが複数ある場合はTOCに飛ばす
        if (index.data.length > 1) {
          singleLangDir.push(this.createStaticDir(index.href, lang))
        } else {
          singleLangPath.push(this.createStaticPath(index.href, lang, index.pageType))
        }
        if (!dupliPaths.includes(index.href)) {
          dupliPaths.push(index.href)
        }
        if (index.data.length > 1) {
          navmenu.root = index.href
        }
        for (const datum of index.data) {
          // datum の方は SingleTOC
          if (datum.$title[lang] === undefined) {
            // datum に 当該言語の $title がなければ登録しない
            continue
          } else if (datum.langs && !datum.langs.includes(lang)) {
            continue
          } else {
            const navitem: SinglePageIndex<IsSingle> = this.convMulti2Single(datum, lang)
            if (!dupliPaths.includes(navitem.href)) {
              singleLangPath.push(this.createStaticPath(navitem.href, lang, navitem.pageType))
            }
            if (navmenu.items === undefined) {
              navmenu.items = [navitem]
            } else {
              navmenu.items.push(navitem)
            }
          }
        }
        singleLangMenu.push(navmenu)
      }
      stdirs.push(...singleLangDir)
      stpaths.push(...singleLangPath)
      i18nmenu[lang] = singleLangMenu
    })
    return {
      navs: i18nmenu,
      dirs: stdirs,
      paths: stpaths,
    }
  }

  convMutli2SingleBatch(indices: SinglePageIndex<IsMulti>[], lang: LangList): SinglePageIndex<IsSingle>[] {
    const isSingles: SinglePageIndex<IsSingle>[] = []
    indices.forEach(index => {
      const singleIndex: SinglePageIndex<IsSingle> = {
        name: index.name,
        position: index.position,
        $title: index.$title[lang] || "",
        href: index.href,
        img: index.href,
        $summary: index.$summary[lang] || "",
        langs: index.langs,
        pageType: "Base",
        data: [],
      }
      if (index.data !== undefined) {
        if (index.data.length > 0) {
          singleIndex.data.push(...this.convMutli2SingleBatch(index.data, lang))
        }
      }
    })
    return isSingles
  }

  convMulti2Single(index: SinglePageIndex<IsMulti>, lang: LangList): SinglePageIndex<IsSingle> {
    const singleIndex: SinglePageIndex<IsSingle> = {
      name: index.name,
      position: index.position,
      $title: index.$title[lang] || "",
      href: index.href,
      img: index.href,
      $summary: index.$summary[lang] || "",
      langs: index.langs,
      pageType: index.pageType,
      data: [],
    }
    if (index.data !== undefined) {
      if (index.data.length > 0) {
        singleIndex.data.push(...this.convMutli2SingleBatch(index.data, lang))
      }
    }
    return singleIndex
  }

  /**
  * SingleTOC<IsMulti>[] から NavItem[] をつくる
  * 場合によっては再起呼び出し
  * @param {SinglePageIndex<IsMulti>[]} stocs ページアイテムの配列
  * @param {String::LangList} lang 取り出す言語
  * @param {Number} depth 入れ子の層数を指定。
  * @param {Number} crt 現在の再帰呼び出し数
  * @return {NavItem[]} 単言語ナビゲーション
  */
  // convToc2NavItems(stocs: SinglePageIndex<IsMulti>[], lang: LangList, depth: number, crt: number): NavItem[] | null {
  //   if (crt >= depth) {
  //     return null
  //   }
  //   /**
  //   * @type {NavItem[]} 単言語ナビゲーション
  //   */
  //   const navs: NavItem[] = []
  //   for (const stoc of stocs) {
  //     // 対応言語のタイトルがない場合、ナビゲーションに含めない
  //     if (!stoc.$title[lang]) {
  //       continue
  //     } else {
  //       /**
  //       * @type {NavItem} 単一ページ・単一言語に対応したナビゲーション項目
  //       */
  //       const nav_: NavItem = {
  //         caption: stoc.$title[lang] || "",
  //         link: stoc.href,
  //       }
  //       if (stoc.children) {
  //         const items = this.convToc2NavItems(stoc.children, lang, depth, crt++)
  //         if (items !== null && items.length > 0) {
  //           nav_.items = items
  //         }
  //       }
  //       navs.push(nav_)
  //     }
  //   }
  //   return navs
  // }

  /**
  * stores に navigations.ts を書きだす
  * @param {ValidPaths} stpaths 言語ごとの有効なパスの配列
  * @param {I18nNavMenu} navs ナビゲーションメニュー
  */
  writeNavTS(stdirs: StaticDir[], stpaths: StaticPath[], navs: Partial<I18nNavMenu>): Writing[] {
    const writings: Writing[] = []
    const navdata = dump(navs)
    writings.push({
      dir: `${this.contentsDir}/`,
      name: "navs.yaml",
      data: navdata
    })

    const navstore = `
// This file is automaticaly generated by 'toybox'
export const navs: I18nNavMenu = ${JSON.stringify(navs, null, 2)}
export const pagedirs: StaticDir[] = ${JSON.stringify(stdirs, null, 2)}
export const pagepaths: StaticPath[] = ${JSON.stringify(stpaths, null, 2)}
`

    writings.push({
      dir: `${this.srcDir}/_envs/`,
      name: "navs.ts",
      data: navstore
    })
    return writings
  }

  private createStaticDir(path: string, lang: LangList): StaticDir {
    const dirs = lang === this.deflang
      ? path.replace(/^\//, "").replace(/\/toc$/, "")
      : path.replace(/^\//, "").replace(/\/toc$/, `/${lang}`)
    return {
      params: {
        dirs,
      },
      props: {
        lang,
        layout: "TOC"
      }
    }
  }

  private createStaticPath(path: string, lang: LangList, layout: PageType): StaticPath {
    const paths = path.replace(/\\/g, "/").split("/")
    const pathLast = paths.length - 1
    const dirs = lang === this.deflang
      ? paths.slice(0, pathLast).join("/")
      : paths.slice(0, pathLast).join("/") + "/" + lang
    return {
      params: {
        dirs: dirs.replace(/^\//, ""),
        path: paths[pathLast]
      },
      props: { lang, layout }
    }
  }
}

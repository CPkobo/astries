import { readdirSync, readFileSync } from "fs"
import { load, dump } from "js-yaml"
import { Writing } from "../toybox"
import { DirOperator } from "./dirOperator"

export class NavGenerator {
  public langs: LangList[]
  public deflang: LangList
  public langDisps: LangToDisp[]
  public contentsDir: string
  public srcDir: string

  public stDirs: StaticDir[]
  public stPaths: StaticPath[]
  public stTops: StaticTop[]
  public navs: Partial<I18nNavMenu>

  private hasGened: boolean
  private blankI18n: I18nText = {}

  constructor(dirope: DirOperator, prof: Profile) {
    this.langs = prof.Langs.map(val => { return val.locale })
    this.deflang = this.langs[0]
    this.langDisps = prof.Langs
    this.contentsDir = dirope.getContentsDir()
    this.srcDir = dirope.getSrcDir()
    this.stTops = []
    this.stPaths = []
    this.stDirs = []
    this.navs = {}
    this.blankI18n = {}
    this.hasGened = false
  }

  public setLangs(langs: LangList[]) {
    this.langs = langs
    this.langs.forEach(lang => {
      this.blankI18n[lang] = ""
      this.navs[lang] = []
    })
  }

  public setDirs(contentsDir: string, srcDir: string) {
    this.contentsDir = contentsDir
    this.srcDir = srcDir
  }

  /**
  * 起点となる関数。contents ディレクトリを走査し、各ディレクトリの index ファイルを更新する
  * @param {DirOperator} dirope contentsフォルダの場所を格納しているオブジェクト
  * @return {Object} result 各ディレクトリの状態を返す
  * @return {Partial<I18nNavMenu>} result.navs
  * @return {StaticDir[]} result.dirs
  * @return {StaticPaths[]} result.paths
  */
  public execGenerator(dirope: DirOperator): { navs: Partial<I18nNavMenu>, tops: StaticTop[], dirs: StaticDir[], paths: StaticPath[] } {
    this.hasGened = true
    const indices: SinglePageIndex<IsMulti>[] = []
    // const onlyIndexDir: string[] = []
    // contentsDir にあるディレクトリを再帰的に配列にする
    const targetDirs: string[] = this.getDirListRecursive(this.contentsDir)
    // 各ディレクトリのインデックスを作成する
    targetDirs.forEach(dir => {
      const singleIndex: SinglePageIndex<IsMulti> | null = this.createIndiceInDir(dir)
      if (singleIndex !== null) {
        indices.push(singleIndex)
      }
    })
    // インデックスをポジション順にソート
    indices.sort((a, b) => {
      if (a.position > b.position) {
        return 1
      }
      if (a.position < b.position) {
        return -1
      }
      return 0
    })
    const tops = this.createTopPaths()
    const { navs, dirs, paths } = this.createNavFromIndices(indices)
    return { navs, tops, dirs, paths }
  }

  /** 
  * contentsDir にあるディレクトリを再帰的な配列にする
  * @param {string} dir contentsフォルダの場所
  * @param {string} subdir 再帰的に検索する際のサブディレクトリ。デフォルトは空白
  * @return {Array<string>} ディレクトリ名のリスト。サブディレクトリ以下は、親ディレクトリも含む文字列
  */
  private getDirListRecursive(dir: string, subdir = ""): string[] {
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
  * 特定のディレクトリにあるyamlファイルから多言語目次を作成する
  * @param {string} dir 対象のディレクトリ
  * @return {SinglePageIndex<IsMulti>} multiIndex 多言語目次
  */
  private createIndiceInDir(dir: string): SinglePageIndex<IsMulti> | null {
    // 各ディレクトリのindex.yaml、その他のファイル、_ で始まるファイルのパスをそれぞれ配列に
    const { index, files, specials } = this.getFileNamesInEachFolder(dir)
    // フォルダがAstriesの要件を満たしていない場合、スキップ
    if (specials.includes("_init.yaml") === false) {
      return null
    } else if (files.length === 0) {
      // if (index !== "") {
      //   // フォルダ内にIndexしかないファイルは別扱い
      //   onlyIndexDir.push(dir)
      // }
      // continue
      return null
    } else {
      const multiIndex: SinglePageIndex<IsMulti> = this.generateIndex(dir, files)
      return multiIndex
    }
    return null
  }

  /**
  * contents ディレクトリの特定のフォルダを走査し、indexファイルと通常ファイル、特殊ファイルに分ける
  * @param {string} dir ディレクトリ名
  * @return {object} index インデックスファイルへのファイルパス, files 通常ファイルへのファイルパス, specials: 特殊ファイルへのファイルパス
  */
  private getFileNamesInEachFolder(dir: string): { index: string, files: string[], specials: string[] } {
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
      // href: `/${dir}/toc`,
      path: 'toc',
      fullpath: `/${dir}/toc`,
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
        // href: `/${dir}/${file.replace(".yaml", "")}`,
        path: file.replace(".yaml", ""),
        fullpath: `/${dir}/${file.replace(".yaml", "")}`,
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
      // dirtop.href = dirtop.data[0].href
      dirtop.fullpath = dirtop.data[0].fullpath
      dirtop.path = dirtop.data[0].path
      dirtop.pageType = dirtop.data[0].pageType
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
  * トップディレクトリにあるファイルを走査して、静的パスを作成する
  * @returns {StaticTop[]} 多言語ナビゲーション
  * @param {DirOperator} dirope contentsフォルダの場所を格納しているオブジェクト
  */
  private createTopPaths(): StaticTop[] {
    const stTops: StaticTop[] = []
    const validLangs: string[] = []
    const files = readdirSync(this.contentsDir).filter(val => val.endsWith(".yaml"))
    if (files.includes("_init.yaml")) {
      const filepath = DirOperator.join(this.contentsDir, "_init.yaml")
      const contents = load(readFileSync(filepath).toString()) as CategoryInit
      validLangs.push(...contents.publishLangs)
    }
    files.forEach(file => {
      if (!file.startsWith("_")) {
        const path = file.replace(".yaml", "")
        const filepath = DirOperator.join(this.contentsDir, file)
        const contents = load(readFileSync(filepath).toString()) as PageContents<IsMulti>
        const links: MultiLingualLink[] = this.createLinks(contents.langs, filepath.replace(this.contentsDir, "").replace("index", "").replace(".yaml", ""))
        links[0].url = `/${this.deflang}`
        contents.langs.forEach(lang => {
          if ((validLangs.length === 0) || (validLangs.includes(lang))) {
            let filepath = ""
            if (path === "index") {
              filepath = lang
            } else {
              filepath === this.deflang ? path : `${lang}-${path}`
            }
            stTops.push({
              params: {
                path: filepath
              },
              props: {
                lang,
                layout: contents.pageType,
                isIndex: path === "index",
                links
              }
            })
          }
        })
      }
    })
    return stTops
  }

  /**
  * 目次オブジェクトからナビゲーションを作成する
  * @param {Array<CategoryIndex<IsMulti>>} toc 目次オブジェクト
  * @param {Number} depth 入れ子の層数を指定。デフォルト=2
  * @returns {[ValidPaths, I18nNavMenu]} 多言語ナビゲーション
  */
  private createNavFromIndices(indices: SinglePageIndex<IsMulti>[]): {
    navs: Partial<I18nNavMenu>, dirs: StaticDir[], paths: StaticPath[]
  } {
    const stdirs: StaticDir[] = []
    const stpaths: StaticPath[] = []
    const i18nmenu: Partial<I18nNavMenu> = {}
    const lang = this.langs;
    this.langs.forEach(lang => {
      const dupliPaths: string[] = []
      const singleLangDir: StaticDir[] = []
      const singleLangPath: StaticPath[] = []
      const singleLangMenu: NavigationMenu[] = []
      for (const index of indices) {
        if (!index.$title[lang]) {
          continue
        }
        const includingLangs = [...Object.keys(index.$title)]
        const navmenu: NavigationMenu = {
          category: index.$title[lang] || "",
          root: lang === this.deflang ? index.fullpath : `/${lang}${index.fullpath}`,
          items: [],
        }
        for (const inlang of includingLangs) {
          let displayName = ""
          for (const ld of this.langDisps) {
            if (inlang === ld.locale) {
              displayName = ld.display
              break
            }
          }
          // navmenu.links.push({
          //   lang: inlang,
          //   displayName,
          //   url: inlang === this.deflang ? index.fullpath : `/${inlang}${index.fullpath}`,
          // })
        }
        // Pageが複数ある場合はTOCに飛ばす
        if (index.data.length > 1) {
          // singleLangDir.push(this.createStaticDir(index.fullpath, lang))
          singleLangDir.push(this.createStaticDir(navmenu.root, lang, index.langs))
        } else {
          // singleLangPath.push(this.createStaticPath(index.fullpath, lang, index.pageType))
          singleLangPath.push(this.createStaticPath(navmenu.root, lang, index.langs, index.pageType))
        }
        if (!dupliPaths.includes(index.fullpath)) {
          dupliPaths.push(index.fullpath)
        }
        // if (index.data.length > 1) {
        //   navmenu.root = index.fullpath
        // }
        for (const datum of index.data) {
          // datum の方は SingleTOC
          if (datum.$title[lang] === undefined) {
            // datum に 当該言語の $title がなければ登録しない
            continue
          } else if (datum.langs && !datum.langs.includes(lang)) {
            continue
          } else {
            const navitem: SinglePageIndex<IsSingle> = this.convMulti2Single(datum, lang)
            if (!dupliPaths.includes(navitem.fullpath)) {
              singleLangPath.push(this.createStaticPath(navitem.fullpath, lang, index.langs, navitem.pageType))
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
        path: index.path,
        fullpath: index.fullpath,
        // href: index.href,
        img: index.img,
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
    })
    return isSingles
  }

  convMulti2Single(index: SinglePageIndex<IsMulti>, lang: LangList): SinglePageIndex<IsSingle> {
    const singleIndex: SinglePageIndex<IsSingle> = {
      name: index.name,
      position: index.position,
      $title: index.$title[lang] || "",
      // href: index.href,
      path: index.path,
      fullpath: index.fullpath,
      img: index.img,
      $summary: index.$summary[lang] || "",
      langs: index.langs,
      pageType: index.pageType,
      data: [],
    }
    if (lang !== this.deflang) {
      // singleIndex.path = `/${lang}${singleIndex.path}`
      singleIndex.fullpath = `/${lang}${singleIndex.fullpath}`
      // const pathEls = singleIndex.path.split("/")
      // singleIndex.path = pathEls.slice(0, pathEls.length - 1).join('/') + "/" + lang + "/" + pathEls[pathEls.length - 1]
      // const fullpathEls = singleIndex.fullpath.split("/")
      // singleIndex.fullpath = fullpathEls.slice(0, fullpathEls.length - 1).join('/') + "/" + lang + "/" + fullpathEls[fullpathEls.length - 1]
    }
    if (index.data !== undefined) {
      if (index.data.length > 0) {
        singleIndex.data.push(...this.convMutli2SingleBatch(index.data, lang))
      }
    }
    return singleIndex
  }

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

  private createStaticDir(path: string, lang: LangList, langs: string[]): StaticDir {
    // const dirs = lang === this.deflang
    //   ? path.replace(/^\//, "").replace(/\/toc$/, "")
    //   : lang + "/" + path.replace(/^\//, "").replace(/\/toc$/, "")
    const path_ = path.startsWith(`/${lang}/`) ? path.substring(lang.length + 1) : path
    const links = this.createLinks(langs, path_)
    return {
      params: {
        // dirs,
        dirs: path.replace(/^\//, "").replace(/\/toc$/, "")
      },
      props: {
        lang,
        layout: "TOC",
        links,
      }
    }
  }

  private createStaticPath(path: string, lang: LangList, langs: string[], layout: PageType): StaticPath {
    const paths = path.replace(/\\/g, "/").split("/")
    const pathLast = paths.length - 1
    // const dirs = path.replace(/\\/g, "/")
    // const dirs = lang === this.deflang
    //   ? path.replace(/\\/g, "/")
    //   : lang + "/" + path.replace(/\\/g, "/")
    // const dirs = paths.slice(0, pathLast).join("/")
    const path_ = path.startsWith(`/${lang}/`) ? path.substring(lang.length + 1) : path
    const links = this.createLinks(langs, path_)
    return {
      params: {
        dirs: paths.slice(0, pathLast).join("/").replace(/^\//, ""),
        path: paths[pathLast]
      },
      props: { lang, layout, links }
    }
  }

  private createLinks(langs: string[], path: string): MultiLingualLink[] {
    const links: MultiLingualLink[] = []
    for (const l of langs) {
      let displayName = ""
      for (const ld of this.langDisps) {
        if (l === ld.locale) {
          displayName = ld.display
          break
        }
      }
      if (l === this.deflang) {
        links.push({
          lang: l,
          displayName,
          url: `/${path}`.replace(/\/\//g, "/")
        })
      }
      else {
        links.push({
          lang: l,
          displayName,
          url: `/${l}/${path}`.replace(/\/\//g, "/")
        })
      }
    }
    return links
  }
}
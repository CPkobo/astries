"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavGenerator = void 0;
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const dirOperator_1 = require("./dirOperator");
class NavGenerator {
    langs;
    deflang;
    contentsDir;
    srcDir;
    stDirs;
    stPaths;
    navs;
    hasGened;
    blankI18n = {};
    constructor(dirope, prof) {
        this.langs = prof.Langs.map(val => { return val.locale; });
        this.deflang = this.langs[0];
        this.contentsDir = dirope.getContentsDir();
        this.srcDir = dirope.getSrcDir();
        this.stPaths = [];
        this.stDirs = [];
        this.navs = {};
        this.blankI18n = {};
        this.hasGened = false;
    }
    setLangs(langs) {
        this.langs = langs;
        this.langs.forEach(lang => {
            this.blankI18n[lang] = "";
            this.navs[lang] = [];
        });
    }
    setDirs(contentsDir, srcDir) {
        this.contentsDir = contentsDir;
        this.srcDir = srcDir;
    }
    /**
    * contents ディレクトリを走査し、各ディレクトリの index ファイルを更新する
    * @param {DirOperator} dirope contentsフォルダの場所を格納しているオブジェクト
    * @return {CategoryIndex<IsMulti>} index 多言語目次
    */
    execGenerator(dirope) {
        this.hasGened = true;
        const indices = [];
        const onlyIndexDir = [];
        const writings = [];
        const dirs = (0, fs_1.readdirSync)(this.contentsDir).filter(val => {
            return val.endsWith(".yaml") === false
                && !(val.startsWith("_") || val.startsWith("."));
        });
        const inTops = (0, fs_1.readdirSync)(this.contentsDir).filter(val => {
            return val.endsWith(".yaml")
                && !(val.startsWith("_") || val.startsWith("."));
        });
        for (const dir of dirs) {
            const { index, files, specials } = this.getFileNamesInEachFolder(dir);
            // フォルダがAstriesの要件を満たしていない場合、スキップ
            if (specials.includes("_init.yaml") === false) {
                continue;
            }
            else if (files.length === 0) {
                if (index !== "") {
                    // フォルダ内にIndexしかないファイルは別扱い
                    onlyIndexDir.push(dir);
                }
                continue;
            }
            const ctindx = this.generateCategoryIndex(dir, files);
            const data = (0, js_yaml_1.dump)(ctindx);
            const [dir_, name] = dirope.getWriteIndexPaths(dir);
            writings.push({
                dir: dir_,
                name,
                data
            });
            indices.push(ctindx);
        }
        indices.sort((a, b) => {
            if (a.position > b.position) {
                return 1;
            }
            if (a.position < b.position) {
                return -1;
            }
            return 0;
        });
        const [stdirs, stpaths, navs] = this.createNavFromIndices(indices);
        this.stDirs = stdirs;
        this.stPaths = stpaths;
        this.navs = navs;
        const navsdata = this.writeNavTS(stdirs, stpaths, navs);
        return [...writings, ...navsdata];
    }
    /**
    * contents ディレクトリの特定のフォルダを走査し、indexファイルと通常ファイル、特殊ファイルに分ける
    * @param {string} dir ディレクトリ名
    * @return {{index: string, files: string[], specials: string[]}}
    */
    getFileNamesInEachFolder(dir) {
        const thisdir = dirOperator_1.DirOperator.join(this.contentsDir, dir);
        let index = "";
        const files = [];
        const specials = [];
        (0, fs_1.readdirSync)(thisdir).map(file => {
            if (file.endsWith(".yaml")) {
                if (file.startsWith("_") || file.startsWith(".")) {
                    specials.push(file);
                }
                else {
                    if (file.endsWith("index.yaml")) {
                        index = file;
                    }
                    else {
                        files.push(file);
                    }
                }
            }
        });
        return { index, files, specials };
    }
    /**
    * contents ディレクトリを走査し、各ディレクトリの index ファイルのもととなるデータを作成
    * @param {string} dir ディレクトリ名
    * @return {CategoryIndex<IsMulti>} ctidx 多言語目次
    */
    generateCategoryIndex(dir, files) {
        const init = (0, js_yaml_1.load)((0, fs_1.readFileSync)(dirOperator_1.DirOperator.join(this.contentsDir, dir, "_init.yaml")).
            toString());
        const ctidx = {
            name: dir.toUpperCase(),
            position: init.position | 0,
            $heading: {},
            langs: [],
            root: `/${dir}/toc`,
            data: []
        };
        // _initファイルの $eading に記載のある言語は目次に追加
        for (const k of Object.keys(init)) {
            if (k !== "position") {
                const l = k;
                ctidx.$heading[l] = init[l];
                ctidx.langs.push(l);
            }
        }
        // 同じフォルダ内に同じnameが重複していなかをチェックするための配列
        const nameInDir = [];
        files.forEach(file => {
            // 各yamlファイルを開いて中身から目次に必要な項目を抽出
            const filepath = dirOperator_1.DirOperator.join(this.contentsDir, dir, file);
            const contents = (0, js_yaml_1.load)((0, fs_1.readFileSync)(filepath).toString());
            const singleIndex = {
                name: contents.name || file.replace(".yaml", ""),
                position: Number(contents.position) || ctidx.data.length,
                href: `/${dir}/${file.replace(".yaml", "")}`,
                img: contents.img || "",
                $title: contents.$title || this.blankI18n,
                $summary: contents.$summary || this.blankI18n,
                langs: contents.langs
            };
            if (nameInDir.includes(singleIndex.name)) {
                console.log(`The name ${singleIndex.name} is dupilicated in '${dir}'`);
            }
            nameInDir.push(singleIndex.name);
            ctidx.data.push(singleIndex);
        });
        // フォルダ内にindex以外に1つしかファイルがない場合、直接アクセスできるようにする
        if (ctidx.data.length === 1) {
            ctidx.root = ctidx.data[0].href;
        }
        else {
            // 複数のファイルがある場合は、position順に並び替え
            ctidx.data.sort((a, b) => {
                if (a.position > b.position) {
                    return 1;
                }
                if (a.position < b.position) {
                    return -1;
                }
                return 0;
            });
        }
        return ctidx;
    }
    /**
    * 目次オブジェクトからナビゲーションを作成する
    * @param {Array<CategoryIndex<IsMulti>>} toc 目次オブジェクト
    * @param {Number} depth 入れ子の層数を指定。デフォルト=2
    * @returns {[ValidPaths, I18nNavMenu]} 多言語ナビゲーション
    */
    createNavFromIndices(indices, depth = 2) {
        const stdirs = [];
        const stpaths = [];
        const i18nmenu = {};
        this.langs.forEach(lang => {
            const dupliPaths = [];
            const singleLangDir = [];
            const singleLangPath = [];
            const singleLangMenu = [];
            for (const index of indices) {
                if (!index.$heading[lang]) {
                    continue;
                }
                const navmenu = {
                    category: index.$heading[lang] || "",
                    root: index.root,
                    items: [],
                };
                // root は 有効なパスとして登録
                // Pageが複数ある場合はTOCに飛ばす
                if (index.data.length > 1) {
                    singleLangDir.push(this.createStaticDir(index.root, lang));
                }
                else {
                    singleLangPath.push(this.createStaticPath(index.root, lang));
                }
                if (!dupliPaths.includes(index.root)) {
                    dupliPaths.push(index.root);
                }
                if (index.data.length > 1) {
                    navmenu.root = index.root;
                }
                for (const datum of index.data) {
                    // datum の方は SingleTOC
                    if (datum.$title[lang] === undefined) {
                        // datum に 当該言語の $title がなければ登録しない
                        continue;
                    }
                    else if (datum.langs && !datum.langs.includes(lang)) {
                        continue;
                    }
                    else {
                        // datum に 当該言語の $title があれば登録する
                        const navitem = {
                            caption: datum.$title[lang] || "",
                            // link: datum.href.endsWith("_") ? datum.href : datum.href + "_",
                            link: datum.href,
                            items: []
                        };
                        if (!dupliPaths.includes(navitem.link)) {
                            singleLangPath.push(this.createStaticPath(navitem.link, lang));
                        }
                        if (datum.children) {
                            const items = this.convToc2NavItems(datum.children, lang, depth, 0) || [];
                            if (items.length > 0) {
                                navitem.items = items;
                            }
                        }
                        if (navmenu.items === undefined) {
                            navmenu.items = [navitem];
                        }
                        else {
                            navmenu.items.push(navitem);
                        }
                    }
                }
                singleLangMenu.push(navmenu);
            }
            stdirs.push(...singleLangDir);
            stpaths.push(...singleLangPath);
            i18nmenu[lang] = singleLangMenu;
        });
        return [stdirs, stpaths, i18nmenu];
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
    convToc2NavItems(stocs, lang, depth, crt) {
        if (crt >= depth) {
            return null;
        }
        /**
        * @type {NavItem[]} 単言語ナビゲーション
        */
        const navs = [];
        for (const stoc of stocs) {
            // 対応言語のタイトルがない場合、ナビゲーションに含めない
            if (!stoc.$title[lang]) {
                continue;
            }
            else {
                /**
                * @type {NavItem} 単一ページ・単一言語に対応したナビゲーション項目
                */
                const nav_ = {
                    caption: stoc.$title[lang] || "",
                    link: stoc.href,
                };
                if (stoc.children) {
                    const items = this.convToc2NavItems(stoc.children, lang, depth, crt++);
                    if (items !== null && items.length > 0) {
                        nav_.items = items;
                    }
                }
                navs.push(nav_);
            }
        }
        return navs;
    }
    /**
    * stores に navigations.ts を書きだす
    * @param {ValidPaths} stpaths 言語ごとの有効なパスの配列
    * @param {I18nNavMenu} navs ナビゲーションメニュー
    */
    writeNavTS(stdirs, stpaths, navs) {
        const writings = [];
        const navdata = (0, js_yaml_1.dump)(navs);
        writings.push({
            dir: `${this.contentsDir}/`,
            name: "navs.yaml",
            data: navdata
        });
        const navstore = `
// This file is automaticaly generated by 'toybox'
export const navs: I18nNavMenu = ${JSON.stringify(navs, null, 2)}
export const pagedirs: StaticDir[] = ${JSON.stringify(stdirs, null, 2)}
export const pagepaths: StaticPath[] = ${JSON.stringify(stpaths, null, 2)}
`;
        writings.push({
            dir: `${this.srcDir}/_envs/`,
            name: "navs.ts",
            data: navstore
        });
        return writings;
    }
    createStaticDir(path, lang) {
        const dirs = lang === this.deflang
            ? path.replace(/^\//, "").replace(/\/toc$/, "")
            : path.replace(/^\//, "").replace(/\/toc$/, `/${lang}`);
        return {
            params: {
                dirs,
            },
            props: {
                lang,
                layout: "TOC"
            }
        };
    }
    createStaticPath(path, lang) {
        const paths = path.replace(/\\/g, "/").split("/");
        const pathLast = paths.length - 1;
        const dirs = lang === this.deflang
            ? paths.slice(0, pathLast).join("/")
            : paths.slice(0, pathLast).join("/") + "/" + lang;
        return {
            params: {
                dirs: dirs.replace(/^\//, ""),
                path: paths[pathLast]
            },
            props: {
                lang,
                layout: "Base"
            }
        };
    }
}
exports.NavGenerator = NavGenerator;

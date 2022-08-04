"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const dirOperator_1 = require("./dirOperator");
class Validator {
    langs;
    inLangs;
    contentsDir;
    pictDir;
    filename;
    files;
    yml;
    blks;
    errors;
    alerts;
    errorFiles;
    constructor(dirope, prof) {
        this.langs = prof.Langs.map(val => { return val.locale; });
        this.inLangs = [];
        this.contentsDir = dirope.getContentsDir();
        this.pictDir = dirope.getPictDir();
        this.filename = "";
        this.files = [];
        this.yml = {};
        this.blks = [];
        this.errors = [];
        this.alerts = [];
        this.errorFiles = [];
    }
    reset() {
        this.yml = {};
        this.blks = [];
        this.errors = [];
        this.alerts = [];
        this.errorFiles = [];
    }
    // setLangs(langs: LangList[]): void {
    //   this.langs = langs
    // }
    // setDirs(contents: string, pict: string): void {
    //   this.contentsDir = contents
    //   this.pictDir = pict
    // }
    readFile(path) {
        this.filename = path;
        this.files.push(path);
        this.blks = [];
        this.yml = (0, js_yaml_1.load)((0, fs_1.readFileSync)(path).toString());
    }
    readStr(str) {
        this.filename = "__STR__";
        this.files.push("__STR__");
        this.yml = {};
        this.blks = (0, js_yaml_1.load)(str);
    }
    execValidate() {
        if (this.yml.contents) {
            this.validateMetas(this.yml);
            this.validateContents(this.yml.contents);
        }
        else {
            this.addError("Not a block contents yaml");
        }
    }
    execBatchValidate(designated) {
        const target = designated ? designated : this.contentsDir;
        const dirs = (0, fs_1.readdirSync)(target).filter(val => {
            return val.endsWith(".yaml") === false;
        });
        const inTops = (0, fs_1.readdirSync)(target).filter(val => {
            return val.endsWith(".yaml")
                && !(val.endsWith("toc.yaml"))
                && !(val.endsWith("index.yaml"))
                && !(val.endsWith("navs.yaml"));
        });
        inTops.forEach(file => {
            this.readFile(dirOperator_1.DirOperator.join(target, file));
            this.execValidate();
        });
        for (const dir of dirs) {
            if (dir.startsWith(".")) {
                continue;
            }
            const files = (0, fs_1.readdirSync)(dirOperator_1.DirOperator.join(target, dir)).filter(val => {
                return (val.endsWith(".yaml"))
                    && !(val.endsWith("toc.yaml"))
                    && !(val.endsWith("index.yaml"));
            });
            files.forEach(file => {
                this.readFile(dirOperator_1.DirOperator.join(target, dir, file));
                this.execValidate();
            });
        }
    }
    addError(message, isErr = true) {
        const log = `${this.filename}: ${message}`;
        if (isErr) {
            this.errors.push(log);
        }
        else {
            this.alerts.push(log);
        }
        if (!this.errorFiles.includes(this.filename)) {
            this.errorFiles.push(this.filename);
        }
    }
    exportErrors() {
        if (this.errors.length === 0) {
            return {
                dir: "log/",
                name: "errors.txt",
                data: "No Errors Found",
                message: "No Errors Found"
            };
        }
        else {
            const data = [
                "---FILES---",
                ...this.errorFiles,
                "---ERRORS---",
                ...this.errors,
                "---ALERTS---",
                ...this.alerts
            ];
            return {
                dir: "log/",
                name: "errors.txt",
                data: data.join("\n"),
                message: data.join("\n")
            };
        }
    }
    validateLangAndObj(i18nt, obj = "string") {
        const checkLangs = this.inLangs;
        if (typeof i18nt !== "object") {
            return [false, false];
        }
        else {
            let langOk = true;
            let typeOk = true;
            for (const key in i18nt) {
                if (checkLangs.indexOf(key) === -1) {
                    langOk = false;
                }
                else {
                    const langkey = key;
                    const i18nobj = i18nt[langkey];
                    if (i18nobj === undefined) {
                        typeOk = false;
                    }
                    else if (obj === "string") {
                        typeOk = typeof i18nobj === "string";
                    }
                    else if (obj === "array") {
                        typeOk = Array.isArray(i18nobj);
                    }
                    else if (obj === "string or array") {
                        typeOk = typeof i18nobj === "string" || Array.isArray(i18nobj);
                    }
                    else if (obj === "object") {
                        // pass
                    }
                }
            }
            return [langOk, typeOk];
        }
    }
    validateImageSrc(src) {
        if (src.startsWith("http")) {
            return true;
        }
        else {
            return (0, fs_1.existsSync)(dirOperator_1.DirOperator.join(this.pictDir, src));
        }
    }
    validateMetas(pg) {
        if (!pg.langs) {
            this.addError("missing 'includes'");
            this.inLangs = this.langs;
        }
        else {
            if (!Array.isArray(pg.langs)) {
                this.addError("pg.includes should be a type of Array<Langs>");
                this.inLangs = this.langs;
            }
            else if (pg.langs.length === 0) {
                this.addError("pg.includes is blank");
                this.inLangs = this.langs;
            }
            else {
                this.inLangs = [];
                for (const lang of pg.langs) {
                    if (this.langs.includes(lang) === false) {
                        this.addError("pg.includes includeds invalid lang");
                    }
                    else {
                        this.inLangs.push(lang);
                    }
                }
            }
        }
        if (!pg.name) {
            this.addError("missing 'name'");
        }
        if (!pg.position) {
            this.addError("missing 'position'");
        }
        else {
            if (typeof pg.position !== "number") {
                this.addError("position should be a type of 'number'");
            }
        }
        if (!pg.$title) {
            this.addError("missing '$title'");
        }
        else {
            if (typeof pg.$title !== "object") {
                this.addError("$title in yaml should be a type of 'I18nText'");
            }
            else {
                const [langOk, typeOk] = this.validateLangAndObj(pg.$title);
                if (!langOk) {
                    this.addError("$title includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of $title is incorrect type");
                }
            }
        }
        if (!pg.img) {
            this.addError("missing 'img'");
        }
        else {
            if (this.validateImageSrc(pg.img) === false) {
                this.addError(`the file '${pg.img}' does not exist`);
            }
        }
        if (!pg.$description) {
            this.addError("missing '$description'");
        }
        else {
            const [langOk, typeOk] = this.validateLangAndObj(pg.$description);
            if (!langOk) {
                this.addError("$description includes invalid lang key");
            }
            if (!typeOk) {
                this.addError("the value of $description is incorrect type");
            }
        }
        if (!pg.$summary) {
            this.addError("missing '$summary'");
        }
        else {
            const [langOk, typeOk] = this.validateLangAndObj(pg.$summary);
            if (!langOk) {
                this.addError("$summary includes invalid lang key");
            }
            if (!typeOk) {
                this.addError("the value of $summary is incorrect type");
            }
        }
    }
    validateContents(blks) {
        blks.forEach(blk => {
            switch (blk.type) {
                case "rawHTML":
                case "plain":
                case "link":
                case "image":
                case "heading 2":
                case "heading 3":
                case "heading 4":
                case "icon heading 2":
                case "icon heading 3":
                case "icon heading 4":
                case "list":
                case "define":
                case "relatives":
                case "spacer":
                case "separator":
                    this.validateSimpleBlock(blk);
                    break;
                case 'Media Right':
                case 'Media Left':
                case "Features":
                case "Horizontal":
                case "Flow":
                case "Table":
                    this.validateComplexBlock(blk);
                    break;
                case "FLEX":
                case "COLUMN":
                    this.validateLayoutBlock(blk);
                    break;
                default:
                    break;
            }
        });
    }
    validateSimpleBlock(blk) {
        switch (blk.type) {
            case "rawHTML": {
                const [langOk, typeOk] = this.validateLangAndObj(blk.$html);
                if (!langOk) {
                    this.addError("$rawHTML includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of $rawHTML is incorrect type");
                }
                break;
            }
            case "plain": {
                const [langOk, typeOk] = this.validateLangAndObj(blk.$texts, "string or array");
                if (!langOk) {
                    this.addError("Plain.$texts includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of $Plain.$texts is incorrect type");
                }
                break;
            }
            case "link": {
                const [langOk, typeOk] = this.validateLangAndObj(blk.$text);
                if (!langOk) {
                    this.addError("Link.$text includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of $Link.$text is incorrect type");
                }
                if (blk.href === undefined || blk.href === "") {
                    this.addError("missing Link.href");
                }
                break;
            }
            case "image": {
                const [langOk, typeOk] = this.validateLangAndObj(blk.$alt);
                if (!langOk) {
                    this.addError("Image.$alt includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of $Image.$alt is incorrect type");
                }
                const [langOk2, typeOk2] = this.validateLangAndObj(blk.$alt, "string or array");
                if (!langOk2) {
                    this.addError("Image.$alt includes invalid lang key");
                }
                if (!typeOk2) {
                    this.addError("the value of $Image.$alt is incorrect type");
                }
                if (blk.src === undefined || blk.src === "") {
                    this.addError("missing Image.src");
                }
                else {
                    if (this.validateImageSrc(blk.src) === false) {
                        this.addError(`the file '${blk.src}' does not exist`);
                    }
                }
                break;
            }
            case "heading 2":
            case "heading 3":
            case "heading 4": {
                const [langOk, typeOk] = this.validateLangAndObj(blk.$text);
                if (!langOk) {
                    this.addError("Heading.$text includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of $Heading.$text is incorrect type");
                }
                break;
            }
            case "icon heading 2":
            case "icon heading 3":
            case "icon heading 4": {
                const [langOk, typeOk] = this.validateLangAndObj(blk.$text);
                if (!langOk) {
                    this.addError("icon heading.$text includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of $icon heading.$text is incorrect type");
                }
                if (!blk.icon) {
                    this.addError("missing icon heading.icon", false);
                }
                break;
            }
            case "list": {
                const [langOk, typeOk] = this.validateLangAndObj(blk.$texts, "array");
                if (!langOk) {
                    this.addError("List.$texts includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of List.$texts is incorrect type");
                }
                break;
            }
            case "define": {
                const [langOk, typeOk] = this.validateLangAndObj(blk.$texts, "array");
                if (!langOk) {
                    this.addError("Define.$texts includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of Define.$texts is incorrect type");
                }
                break;
            }
            case "relatives": {
                if (!Array.isArray(blk.$articles)) {
                    this.addError("Relatives.$articles in yaml should be a type of 'Array<Article>'");
                }
                else {
                    for (const article of blk.$articles) {
                        if (!article.$title) {
                            this.addError("missing 'article.$title'");
                        }
                        else {
                            const [langOk, typeOk] = this.validateLangAndObj(article.$title);
                            if (!langOk) {
                                this.addError("Icon Article.$title includes invalid lang key");
                            }
                            if (!typeOk) {
                                this.addError("the value of Article.$title is incorrect type");
                            }
                        }
                        if (!article.href) {
                            this.addError("missing 'article.href'");
                        }
                    }
                }
                break;
            }
            case "spacer":
                break;
            case "separator":
                break;
            default:
                this.addError(`including invalid block type ${blk.type} `);
                break;
        }
    }
    validateComplexBlock(blk) {
        switch (blk.type) {
            case 'Media Right':
            case 'Media Left': {
                if (!blk.src) {
                    this.addError("missing 'Media.src'");
                }
                else {
                    if (this.validateImageSrc(blk.src) === false) {
                        this.addError(`the file '${blk.src}' does not exist`);
                    }
                }
                const [langOk, typeOk] = this.validateLangAndObj(blk.$alt);
                if (!langOk) {
                    this.addError("Icon Media.$alt includes invalid lang key");
                }
                if (!typeOk) {
                    this.addError("the value of Media.$alt is incorrect type");
                }
                if (!blk.$blks) {
                    this.addError("missing 'Media.$blks'");
                }
                else if (!Array.isArray(blk.$blks)) {
                    this.addError("Media.$blks should be a type of 'Array<SimpleBlock>'");
                }
                else {
                    for (const subblk of blk.$blks) {
                        this.validateSimpleBlock(subblk);
                    }
                }
                break;
            }
            case "Gallary": {
                if (!blk.$blks) {
                    this.addError("missing 'Media.$blks'");
                }
                else if (!Array.isArray(blk.$blks)) {
                    this.addError("Media.$blks should be a type of 'Array<SimpleBlock>'");
                }
                else {
                    for (const subblk of blk.$blks) {
                        if (subblk.type !== "image") {
                            this.addError("Gallary Block can only include ImageBlock");
                        }
                        else {
                            this.validateSimpleBlock(subblk);
                        }
                    }
                }
                break;
            }
            case "Features": {
                if (!blk.$items) {
                    this.addError("missing 'Features.$items'");
                }
                else if (!Array.isArray(blk.$items)) {
                    this.addError("Features.$items should be a type of 'Array<FeatureItem>'");
                }
                else {
                    for (const itm of blk.$items) {
                        if (!itm.icon) {
                            this.addError("missing 'featureitem.icon'");
                        }
                        if (!itm.$title) {
                            this.addError("missing 'featureitem.itemtitle'");
                        }
                        else if (typeof itm.$title !== "object") {
                            this.addError("featureitem.$title should be a type of 'I18nText'");
                        }
                        if (!itm.$blks) {
                            this.addError("missing 'featureitem.$blks'");
                        }
                        else if (!Array.isArray(itm.$blks)) {
                            this.addError("featureitem.$blks should be a type of 'Array<SimpleBlock>'");
                        }
                        else {
                            for (const subblk of itm.$blks) {
                                this.validateSimpleBlock(subblk);
                            }
                        }
                    }
                }
                break;
            }
            case "Horizontal":
                if (!blk.$items) {
                    this.addError("missing 'Horizontal.$items'");
                }
                else if (!Array.isArray(blk.$items)) {
                    this.addError("Horizontal.$items should be a type of 'Array<HorizontalItem>'");
                }
                else {
                    for (const itm of blk.$items) {
                        if (!itm.img) {
                            this.addError("missing 'Horizontal.$item.img'");
                        }
                        else {
                            if (this.validateImageSrc(itm.img)) {
                                this.addError(`the file '${itm.img}' does not exist`);
                            }
                        }
                        if (!itm.$title) {
                            this.addError("missing 'Horizontal.$item.$title'");
                            const [langOk, typeOk] = this.validateLangAndObj(itm.$title);
                            if (!langOk) {
                                this.addError("Icon Horizontal.$title includes invalid lang key");
                            }
                            if (!typeOk) {
                                this.addError("the value of $Horizontal.$title is incorrect type");
                            }
                            if (!itm.$blks) {
                                this.addError("missing 'Horizontal.$blks'");
                            }
                            else if (!Array.isArray(itm.$blks)) {
                                this.addError("Horizontal.$blks should be a type of 'Array<SimpleBlock>'");
                            }
                            else {
                                for (const subblk of itm.$blks) {
                                    this.validateSimpleBlock(subblk);
                                }
                            }
                        }
                    }
                    break;
                }
            case "Flow":
                // todo
                break;
            case "Table": {
                if (blk.$th) {
                    if (!Array.isArray(blk.$th)) {
                        this.addError("Table.th should be a type of 'Array<I18nText>'");
                    }
                    else {
                        this.validateLangAndObj(blk.$th, "array");
                    }
                }
                if (!Array.isArray(blk.$trs)) {
                    this.addError("Table.tr should be a type of 'Array<SimpleBlock[]>'");
                }
                else {
                    blk.$trs.forEach(row => {
                        if (!Array.isArray(row)) {
                            this.addError("Each Table.tr should be a type of 'Array<SimpleBlock>'");
                        }
                        else {
                            row.forEach(cell => {
                                this.validateSimpleBlock(cell);
                            });
                        }
                    });
                }
                // todo
                break;
            }
            default:
                break;
        }
    }
    validateLayoutBlock(blk) {
        switch (blk.type) {
            case "FLEX":
                if (!Array.isArray(blk.$blkss)) {
                    this.addError("FLEX.$blksss should be a type of 'Array<RealBlock[]>'");
                }
                else {
                    blk.$blkss.forEach($blks => {
                        if (!Array.isArray($blks)) {
                            this.addError("Each FLEX.$blkss should be a type of 'Array<RealBlock>'");
                        }
                        else {
                            this.validateContents($blks);
                        }
                    });
                }
                break;
            case "COLUMN":
                if (!Array.isArray(blk.$blkss)) {
                    this.addError("COLUMN.$blksss should be a type of 'Array<RealBlock[]>'");
                }
                else {
                    blk.$blkss.forEach($blks => {
                        if (!Array.isArray($blks)) {
                            this.addError("Each COLUMN.$blkss should be a type of 'Array<RealBlock>'");
                        }
                        else {
                            this.validateContents($blks);
                        }
                    });
                }
                break;
            default:
                break;
        }
    }
}
exports.Validator = Validator;

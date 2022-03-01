"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirOperator = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class DirOperator {
    static _root = "";
    static _contents = "contents";
    static _src = "src";
    static _static = "static";
    static _pict = "pict";
    static _posts = ["posts"];
    static _prof = "_init/profile.yaml";
    static _indexyaml = "index.yaml";
    static join = (...paths) => {
        return (0, path_1.join)(...paths);
    };
    static _types = "@types/";
    static _profts = "profile.ts";
    static _langts = "langconfig.d.ts";
    static _sitemapxml = "sitemap.xml";
    root;
    contents;
    src;
    static;
    pict;
    posts;
    prof;
    out;
    constructor() {
        this.root = (0, path_1.join)(DirOperator._root);
        this.src = (0, path_1.join)(DirOperator._src);
        this.contents = (0, path_1.join)(DirOperator._contents);
        this.static = (0, path_1.join)(DirOperator._static);
        this.pict = (0, path_1.join)(DirOperator._static, DirOperator._pict);
        this.posts = DirOperator._posts.map(val => { return (0, path_1.join)(val); });
        this.prof = (0, path_1.join)(DirOperator._prof);
        this.out = "";
    }
    setDirname(key, path) {
        if (path === "") {
            // pass 
        }
        else {
            switch (key) {
                case "root":
                    this.root = (0, path_1.join)(path);
                    break;
                case "src":
                    this.src = (0, path_1.join)(path);
                    break;
                case "contents":
                    this.contents = (0, path_1.join)(path);
                    break;
                case "pict":
                    this.pict = (0, path_1.join)(path);
                    break;
                case "out":
                    this.out = (0, path_1.join)(path);
                    break;
                default:
                    break;
            }
        }
    }
    setDirnames(key, paths) {
        switch (key) {
            case "posts":
                this.posts = paths.map(val => { return (0, path_1.join)(val); });
                break;
            default:
                break;
        }
    }
    setRoot(root = "") {
        this.setDirname("root", root);
    }
    setOut(out = "") {
        this.setDirname("out", out);
    }
    getProfPath() {
        return (0, path_1.join)(this.root, this.contents, this.prof);
    }
    getContentsDir() {
        return (0, path_1.join)(this.root, this.contents);
    }
    getSrcDir() {
        return (0, path_1.join)(this.root, this.src);
    }
    getPictDir() {
        return (0, path_1.join)(this.root, this.pict);
    }
    getPostsDir() {
        return this.posts.map(val => { return (0, path_1.join)(this.root, val); });
    }
    getWriteProfPaths() {
        if (this.out === "") {
            return [(0, path_1.join)(this.root, this.src), (0, path_1.join)(DirOperator._profts)];
        }
        else {
            return [(0, path_1.join)(this.src), (0, path_1.join)(DirOperator._profts)];
        }
    }
    getWriteLangconfPaths() {
        if (this.out === "") {
            return [(0, path_1.join)(this.root, this.src, DirOperator._types), (0, path_1.join)(DirOperator._langts)];
        }
        else {
            return [(0, path_1.join)(this.src, DirOperator._types), (0, path_1.join)(DirOperator._langts)];
        }
    }
    getWriteIndexPaths(path) {
        if (this.out === "") {
            return [(0, path_1.join)(this.root, this.contents, path), (0, path_1.join)(DirOperator._indexyaml)];
        }
        else {
            return [(0, path_1.join)(this.contents, path), (0, path_1.join)(DirOperator._indexyaml)];
        }
    }
    writeFiles(writer) {
        const wd = this.out === "" ? this.root : this.out;
        if ((0, fs_1.existsSync)(wd) === false) {
            (0, fs_1.mkdirSync)(wd);
        }
        for (const w of writer) {
            if (w === null) {
                continue;
            }
            const dirs = w.dir.replace(this.root, "").replace("/", "\\").split("\\");
            for (let i = 0; i < dirs.length; i++) {
                if (dirs[i] === this.root) {
                    continue;
                }
                else {
                    const wd2 = (0, path_1.join)(wd, ...dirs.slice(0, i + 1));
                    if ((0, fs_1.existsSync)(wd2) === false) {
                        (0, fs_1.mkdirSync)(wd2);
                    }
                }
            }
            (0, fs_1.writeFileSync)((0, path_1.join)(wd, ...dirs, w.name), w.data);
            if (w.message) {
                console.log(w.message);
            }
        }
    }
}
exports.DirOperator = DirOperator;

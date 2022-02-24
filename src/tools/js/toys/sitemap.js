"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sitemap = void 0;
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const dirOperator_1 = require("./dirOperator");
class Sitemap {
    host;
    defLang;
    // public contentsDir: string
    // public postsDirs: string[]
    xml;
    constructor() {
        this.host = "";
        this.defLang = "";
        // this.contentsDir = contents
        // this.postsDirs = posts
        this.xml = [];
    }
    exportSitemap(dirope, prof) {
        this.setHost(prof.url);
        this.resetXML();
        this.setDefLang(prof.Langs[0].locale);
        this.execCrawlContents(dirope.root, dirope.getContentsDir());
        this.execCrawlPosts(dirope.root, dirope.getPostsDir());
        this.closeXML();
        return {
            dir: dirope.static,
            name: dirOperator_1.DirOperator._sitemapxml,
            data: this.xml.join("\n")
        };
    }
    setHost(url) {
        this.host = url.replace(/\/+$/, "");
    }
    resetXML() {
        this.xml = [
            `<?xml version="1.0" encoding="UTF-8"?>`,
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
        ];
    }
    closeXML() {
        this.xml.push("</urlset>");
    }
    setDefLang(lang) {
        this.defLang = lang;
    }
    execCrawlContents(root, contents) {
        const inTops = (0, fs_1.readdirSync)(contents).filter(val => {
            return val.endsWith(".yaml");
        });
        for (const inTop of inTops) {
            if (inTop.endsWith("index.yaml") || inTop.endsWith("navs.yaml")) {
                continue;
            }
            else {
                const path = dirOperator_1.DirOperator.join(contents, inTop);
                const yml = (0, js_yaml_1.load)((0, fs_1.readFileSync)(path).toString());
                const stat = (0, fs_1.statSync)(path);
                const mtime = this.getISODayStr(stat.mtime);
                this.xml.push(...this.getUrlStrs(root, inTop, mtime, yml.includes, true));
            }
        }
        const dirs = (0, fs_1.readdirSync)(contents).filter(val => {
            return val.endsWith(".yaml") === false;
        });
        for (const dir of dirs) {
            if (dir.startsWith(".")) {
                continue;
            }
            const dirpath = dirOperator_1.DirOperator.join(contents, dir);
            const files = (0, fs_1.readdirSync)(dirpath).filter(val => {
                return val.endsWith(".yaml");
            });
            for (const file of files) {
                if (file.endsWith("index.yaml")) {
                    continue;
                }
                const filepath = dirOperator_1.DirOperator.join(contents, dir, file);
                const stat = (0, fs_1.statSync)(filepath);
                const mtime = this.getISODayStr(stat.mtime);
                if (file.endsWith("toc.yaml")) {
                    const yml = (0, js_yaml_1.load)((0, fs_1.readFileSync)(filepath).toString());
                    const langs = [...Object.keys(yml.$heading)];
                    this.xml.push(...this.getUrlStrs(root, filepath, mtime, langs));
                }
                else {
                    const yml = (0, js_yaml_1.load)((0, fs_1.readFileSync)(filepath).toString());
                    this.xml.push(...this.getUrlStrs(root, filepath, mtime, yml.includes));
                }
            }
        }
    }
    execCrawlPosts(root, posts) {
        for (const dir of posts) {
            const files = (0, fs_1.readdirSync)(dir).filter(val => {
                return val.endsWith(".md");
            });
            for (const file of files) {
                const path = `${dir}/${file}`;
                const stat = (0, fs_1.statSync)(path);
                const mtime = this.getISODayStr(stat.mtime);
                this.xml.push(this.getUrlStr(root, path.replace(".md", ""), mtime));
            }
        }
    }
    getISODayStr(mtime) {
        const date = new Date(mtime);
        return date.toISOString().split("T")[0];
    }
    getUrlStrs(root, url, mtime, langs, isTopDir = false) {
        const xmls = [];
        if (isTopDir) {
            if (url === "top.yaml") {
                url = "/";
            }
        }
        else {
            url = url.replace(".yaml", "");
        }
        for (const lang of langs) {
            if (lang === this.defLang) {
                xmls.push(this.getUrlStr(root, url, mtime));
            }
            else {
                xmls.push(this.getUrlStr(root, `${url}--${lang}`, mtime));
            }
        }
        return xmls;
    }
    getUrlStr(root, path, mtime) {
        const mod = path.startsWith("/") ? "" : "/";
        const url = path.replace(root, "").replace(/\\/g, "/");
        return `<url>
<loc>${this.host}${mod}${url}</loc>
<lastmod>${mtime}</lastmod>
<changefreq>monthly</changefreq>
</url>`;
    }
}
exports.Sitemap = Sitemap;

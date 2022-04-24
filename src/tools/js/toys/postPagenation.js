"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPagenation = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const front_matter_1 = tslib_1.__importDefault(require("front-matter"));
const marked_1 = require("marked");
const dirOperator_1 = require("./dirOperator");
class PostPagenation {
    files;
    constructor() {
        this.files = [];
    }
    exportPageIndices(dirope) {
        const writings = [];
        this.execCrawlPosts(dirope.root, dirope.posts);
        const indices = {
            dir: "./posts",
            name: "indices.yaml",
            data: (0, js_yaml_1.dump)(this.files)
        };
        writings.push(indices);
        const minx = [];
        for (const file of this.files.slice(0, 5)) {
            minx.push({
                title: file.title,
                href: file.href
            });
        }
        const data = `
export const latestPosts: MinPostIndex[] = ${JSON.stringify(minx, null, 2)}
    `;
        const latest = {
            dir: "./src/_env",
            name: "latest.ts",
            data
        };
        writings.push(latest);
        return writings;
    }
    execCrawlPosts(root, posts) {
        const imgstr = new RegExp("\\!\\[.*\\]\\((.*)\\)");
        const tagstr = new RegExp("\\<.*\\>", "g");
        const lfstr = new RegExp("\\n", "g");
        const crstr = new RegExp("\\r", "g");
        for (const post of posts) {
            const target = dirOperator_1.DirOperator.join(root, post);
            const files = (0, fs_1.readdirSync)(target).filter(val => {
                return val.endsWith(".md");
            });
            for (const file of files) {
                const path = dirOperator_1.DirOperator.join(target, file);
                const stat = (0, fs_1.statSync)(path);
                const contents = (0, front_matter_1.default)((0, fs_1.readFileSync)(path).toString());
                const summary = (0, marked_1.marked)(contents.body)
                    .replace(tagstr, "")
                    .trim()
                    .replace(crstr, "")
                    .replace(lfstr, "<br />")
                    .substring(0, 200);
                const index = {
                    title: contents.attributes.title,
                    published: contents.attributes.published,
                    modified: contents.attributes.modified,
                    pubstr: this.getISODayStr(contents.attributes.published),
                    modstr: this.getISODayStr(contents.attributes.modified),
                    image: contents.attributes.image,
                    summary,
                    href: file.replace(".md", "")
                };
                if (index.image === undefined) {
                    const m = contents.body.match(imgstr);
                    if (m !== null) {
                        index.image = m[1];
                    }
                }
                this.files.push(index);
            }
        }
        this.files.sort((a, b) => {
            if (a.modified === undefined) {
                if (b.modified === undefined) {
                    return 0;
                }
                else {
                    return -1;
                }
            }
            else if (b.modified === undefined) {
                if (a.modified === undefined) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
            else {
                if (a.modified.getTime() > b.modified.getTime()) {
                    return -1;
                }
                else if (a.modified.getTime() < b.modified.getTime()) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        });
    }
    getISODayStr(time) {
        if (time === undefined) {
            const date = new Date();
            return date.toISOString().split("T")[0];
        }
        else {
            const date = new Date(time);
            return date.toISOString().split("T")[0];
        }
    }
}
exports.PostPagenation = PostPagenation;

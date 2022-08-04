"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MtHandler = void 0;
const deepl_node_1 = require("deepl-node");
const dotenv_1 = require("dotenv");
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
class MtHandler {
    baseDir;
    srcDirs;
    outDir;
    srcLang;
    tgtLang;
    sums;
    key;
    engine;
    constructor() {
        const env = (0, dotenv_1.config)();
        this.key = process.env.DEEPL_KEY || '';
        this.baseDir = process.env.BASE_DIR || '';
        const srcDirs = process.env.SOURCE_DIRS || '';
        this.srcDirs = srcDirs.replace(' ', '').split(',');
        this.outDir = process.env.OUT_DIR || '';
        this.normalizeDirNames();
        this.srcLang = '';
        this.tgtLang = '';
        this.sums = [];
        this.setLangs(process.env.SOURCE_LANG, process.env.TARGET_LANG);
        this.engine = new deepl_node_1.Translator(this.key);
    }
    setLangs(src = '', tgt = '') {
        this.srcLang = src.toLowerCase();
        this.tgtLang = tgt.toLowerCase();
    }
    exec() {
        this.execWrapper()
            .then(() => {
                this.writeStats();
            })
            .catch(() => {
                // pass
            });
    }
    normalizeDirNames() {
        const endSlash = new RegExp('/+?$', '');
        const startSlash = new RegExp('^[./]+', '');
        this.baseDir = this.baseDir.replace('\\', '/').replace(endSlash, '');
        this.outDir = this.outDir.replace('\\', '/').replace(endSlash, '');
        this.srcDirs = this.srcDirs.map(srcDir => srcDir.replace('\\', '/').replace(startSlash, ''));
    }
    execWrapper() {
        return new Promise((resolve, reject) => {
            if (this.key === '') {
                reject('key is empty');
            }
            const prs = [];
            this.srcDirs.forEach(srcDir => {
                prs.push(this.execToADirectory(srcDir));
            });
            Promise.all(prs)
                .then(() => {
                    resolve(true);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }
    execToADirectory(srcDir) {
        return new Promise((resolve, reject) => {
            const files = srcDir === '$' ?
                (0, fs_1.readdirSync)(`${this.baseDir}`).filter(val => {
                    return val.endsWith('.yaml') && !val.startsWith('_');
                })
                : (0, fs_1.readdirSync)(`${this.baseDir}/${srcDir}`).filter(val => {
                    return val.endsWith('.yaml') && !val.startsWith('_') && val !== 'index.yaml';
                });
            const thisDir = this.sums.length;
            this.sums.push([]);
            files.forEach((file, index) => {
                this.sums[thisDir].push({
                    dir: srcDir,
                    name: file,
                    sum: 0
                });
                const target = srcDir === '$' ? `${this.baseDir}/${file}` : `${this.baseDir}/${srcDir}/${file}`;
                const $yml = (0, js_yaml_1.load)((0, fs_1.readFileSync)(target).toString());
                this.walker(thisDir, index, $yml, this.srcLang, this.tgtLang, this.getMt)
                    .then(translated => {
                        const multiYaml = (0, js_yaml_1.dump)(translated);
                        const newFile = `${this.outDir}/${srcDir}__${file}`;
                        (0, fs_1.writeFileSync)(newFile, multiYaml);
                        resolve(true);
                    })
                    .catch(err => {
                        console.error(err);
                        reject(err);
                    });
            });
        });
    }
    walker(dirIndex, fileIndex, data, src, tgt, func) {
        return new Promise((resolve, reject) => {
            const prs = [];
            prs.push(this.setTimer());
            Object.keys(data).forEach(key => {
                if (data !== null || undefined) {
                    const val = data[key] || {};
                    if (val[src] !== undefined) {
                        prs.push(this.getMt(dirIndex, fileIndex, data, key, val, src, tgt));
                    }
                    else {
                        if (typeof val === 'object') {
                            prs.push(this.setTimer());
                            this.walker(dirIndex, fileIndex, val, src, tgt, func);
                        }
                        else {
                            // console.log(typeof val)
                        }
                    }
                }
            });
            Promise.all(prs)
                .then(() => {
                    resolve(data);
                })
                .catch(() => {
                    reject();
                });
        });
    }
    getMt(dirIndex, fileIndex, data, key, value, src, tgt) {
        return new Promise((resolve, reject) => {
            const value_ = value[src];
            const isStr = typeof value_ === 'string';
            const isArray = isStr ? false : typeof value_[0] === 'string';
            let text = isStr ? value_
                : isArray ? value_.join('\n')
                    : '';
            if (!isStr && !isArray) {
                const texts = [];
                value_.forEach((val) => {
                    texts.push(val.join('<br/>'));
                });
                text = texts.join('\n');
            }
            this.sums[dirIndex][fileIndex].sum += text.length;
            const sl = this.srcLang;
            const tl = this.tgtLang;
            this.engine.translateText(text, sl, tl)
                .then(res => {
                    if (isStr) {
                        data[key][tgt] = res.text;
                    }
                    else if (isArray) {
                        data[key][tgt] = res.text.split('\n');
                    }
                    else {
                        const texts = res.text.split('\n');
                        data[key][tgt] = texts.map(val => val.split('<br/>'));
                    }
                    resolve(true);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }
    setTimer() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 5000);
        });
    }
    writeStats() {
        const data = [];
        this.sums.forEach(dir => {
            dir.forEach(file => {
                data.push(`${file.dir}___${file.name}\t${file.sum}`);
            });
        });
        const name = `${this.outDir}/result.tsv`;
        (0, fs_1.writeFileSync)(name, data.join('\n'));
    }
}
exports.MtHandler = MtHandler;

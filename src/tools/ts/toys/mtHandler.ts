import { Translator } from 'deepl-node'
import type { SourceLanguageCode, TargetLanguageCode } from 'deepl-node'
import { config } from 'dotenv'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { load, dump } from 'js-yaml'

type WalkerCallback = (dirIndex: number, fileIndex: number, data: any, key: string, value: string | string[], src: string, tgt: string) => Promise<boolean>

interface FileStats {
  dir: string
  name: string
  sum: number
}

export class MtHandler {
  public baseDir: string
  public srcDirs: string[]
  public outDir: string
  public srcLang: string
  public tgtLang: string
  public sums: FileStats[][]
  private key: string
  private engine: Translator


  constructor() {
    const env = config()
    this.key = process.env.DEEPL_KEY || ''
    this.baseDir = process.env.BASE_DIR || ''
    const srcDirs = process.env.SOURCE_DIRS || ''
    this.srcDirs = srcDirs.replace(' ', '').split(',')
    this.outDir = process.env.OUT_DIR || ''
    this.normalizeDirNames()
    this.srcLang = ''
    this.tgtLang = ''
    this.sums = [] as FileStats[][]
    this.setLangs(process.env.SOURCE_LANG, process.env.TARGET_LANG)
    this.engine = new Translator(this.key)
  }

  public setLangs(src = '', tgt = '') {
    this.srcLang = src.toLowerCase()
    this.tgtLang = tgt.toLowerCase()
  }

  public exec() {
    this.execWrapper()
      .then(() => {
        this.writeStats()
      })
      .catch(() => {
        // pass
      })
  }

  private normalizeDirNames() {
    const endSlash = new RegExp('/+?$', '')
    const startSlash = new RegExp('^[./]+', '')
    this.baseDir = this.baseDir.replace('\\', '/').replace(endSlash, '')
    this.outDir = this.outDir.replace('\\', '/').replace(endSlash, '')
    this.srcDirs = this.srcDirs.map(srcDir => srcDir.replace('\\', '/').replace(startSlash, ''))
  }

  private execWrapper(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.key === '') {
        reject('key is empty')
      }
      const prs: Promise<boolean>[] = []
      this.srcDirs.forEach(srcDir => {
        prs.push(this.execToADirectory(srcDir))
      })
      Promise.all(prs)
        .then(() => {
          resolve(true)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }

  private execToADirectory(srcDir: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const files = srcDir === '$' ?
        readdirSync(`${this.baseDir}`).filter(val => {
          return val.endsWith('.yaml') && !val.startsWith('_')
        })
        : readdirSync(`${this.baseDir}/${srcDir}`).filter(val => {
          return val.endsWith('.yaml') && !val.startsWith('_') && val !== 'index.yaml'
        })
      const thisDir = this.sums.length
      this.sums.push([])
      files.forEach((file, index) => {
        this.sums[thisDir].push({
          dir: srcDir,
          name: file,
          sum: 0
        })
        const target = srcDir === '$' ? `${this.baseDir}/${file}` : `${this.baseDir}/${srcDir}/${file}`
        const $yml = load(readFileSync(target).toString()) as PageContentsInYaml<IsMulti>
        this.walker(thisDir, index, $yml, this.srcLang, this.tgtLang, this.getMt)
          .then(translated => {
            const multiYaml = dump(translated)
            const newFile = `${this.outDir}/${srcDir}__${file}`
            writeFileSync(newFile, multiYaml)
            resolve(true)
          })
          .catch(err => {
            console.error(err)
            reject(err)
          })
      })
    })
  }

  private walker(dirIndex: number, fileIndex: number, data: any, src: string, tgt: string, func: WalkerCallback): Promise<any> {
    return new Promise((resolve, reject) => {
      const prs: Promise<boolean>[] = []
      prs.push(this.setTimer())
      Object.keys(data).forEach(key => {
        if (data !== null || data !== undefined) {
          const val = data[key] || {}
          if (val[src] !== undefined) {
            prs.push(this.getMt(dirIndex, fileIndex, data, key, val, src, tgt))
          }
          else {
            if (typeof val === 'object') {
              prs.push(this.setTimer())
              this.walker(dirIndex, fileIndex, val, src, tgt, func)
            }
            else {
              // console.log(typeof val)
            }
          }
        }
      })
      Promise.all(prs)
        .then(() => {
          resolve(data)
        })
        .catch(() => {
          reject()
        })
    })
  }

  private getMt(dirIndex: number, fileIndex: number, data: any, key: string, value: any, src: string, tgt: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const value_ = value[src]
      const isStr = typeof value_ === 'string'
      const isArray = isStr ? false : typeof value_[0] === 'string'
      let text = isStr ? value_
        : isArray ? value_.join('\n')
          : ''
      if (!isStr && !isArray) {
        const texts: string[] = []
        value_.forEach((val: string[]) => {
          texts.push(val.join('<br/>'))
        });
        text = texts.join('\n')
      }
      this.sums[dirIndex][fileIndex].sum += text.length
      const sl = this.srcLang as SourceLanguageCode
      const tl = this.tgtLang as TargetLanguageCode
      this.engine.translateText(text, sl, tl)
        .then(res => {
          if (isStr) {
            data[key][tgt] = res.text
          }
          else if (isArray) {
            data[key][tgt] = res.text.split('\n')
          }
          else {
            const texts = res.text.split('\n')
            data[key][tgt] = texts.map(val => val.split('<br/>'))
          }
          resolve(true)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }

  private setTimer(): Promise<true> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 5000)
    })
  }

  private writeStats() {
    const data: string[] = []
    this.sums.forEach(dir => {
      dir.forEach(file => {
        data.push(`${file.dir}___${file.name}\t${file.sum}`)
      })

    })
    const name = `${this.outDir}/result.tsv`
    writeFileSync(name, data.join('\n'))
  }
}

import { readFileSync, readdirSync, existsSync } from "fs"
import { load } from "js-yaml"
import { Writing } from "../toybox"
import { DirOperator } from "./dirOperator"

export class Validator {
  public langs: string[]
  public inLangs: string[]
  public contentsDir: string
  public pictDir: string
  public filename: string
  public files: string[]
  public yml: Partial<PageContents<I18nText, I18nArray, I18n2DArray>>
  public blks: AnyBlock<I18nText, I18nArray, I18n2DArray>[]
  public errors: string[]
  public alerts: string[]
  public errorFiles: string[]

  constructor(dirope: DirOperator, prof: Profile) {
    this.langs = prof.Langs.map(val => { return val.locale })
    this.inLangs = []
    this.contentsDir = dirope.getContentsDir()
    this.pictDir = dirope.getPictDir()
    this.filename = ""
    this.files = []
    this.yml = {}
    this.blks = []
    this.errors = []
    this.alerts = []
    this.errorFiles = []
  }

  reset(): void {
    this.yml = {}
    this.blks = []
    this.errors = []
    this.alerts = []
    this.errorFiles = []
  }

  // setLangs(langs: LangList[]): void {
  //   this.langs = langs
  // }

  // setDirs(contents: string, pict: string): void {
  //   this.contentsDir = contents
  //   this.pictDir = pict
  // }

  readFile(path: string): void {
    this.filename = path
    this.files.push(path)
    this.blks = []
    this.yml = load(readFileSync(path).toString()) as Partial<PageContents<I18nText, I18nArray, I18n2DArray>>
  }

  readStr(str: string): void {
    this.filename = "__STR__"
    this.files.push("__STR__")
    this.yml = {}
    this.blks = load(str) as AnyBlock<I18nText, I18nArray, I18n2DArray>[]
  }

  execValidate(): void {
    if (this.yml.contents) {
      this.validateMetas(this.yml)
      this.validateContents(this.yml.contents)
    } else {
      this.addError("Not a block contents yaml")
    }
  }

  execBatchValidate(designated?: string): void {
    const target = designated ? designated : this.contentsDir
    const dirs = readdirSync(target).filter(val => {
      return val.endsWith(".yaml") === false
    })
    const inTops = readdirSync(target).filter(val => {
      return val.endsWith(".yaml")
        && !(val.endsWith("toc.yaml"))
        && !(val.endsWith("index.yaml"))
        && !(val.endsWith("navs.yaml"))
    })
    inTops.forEach(file => {
      this.readFile(DirOperator.join(target, file))
      this.execValidate()
    })
    for (const dir of dirs) {
      if (dir.startsWith(".")) {
        continue
      }
      const files = readdirSync(DirOperator.join(target, dir)).filter(val => {
        return (val.endsWith(".yaml"))
          && !(val.endsWith("toc.yaml"))
          && !(val.endsWith("index.yaml"))
      })
      files.forEach(file => {
        this.readFile(DirOperator.join(target, dir, file))
        this.execValidate()
      })
    }
  }

  addError(message: string, isErr = true): void {
    const log = `${this.filename}: ${message}`
    if (isErr) {
      this.errors.push(log)
    } else {
      this.alerts.push(log)
    }
    if (!this.errorFiles.includes(this.filename)) {
      this.errorFiles.push(this.filename)
    }
  }

  exportErrors(): Writing {
    if (this.errors.length === 0) {
      return {
        dir: "log/",
        name: "errors.txt",
        data: "No Errors Found",
        message: "No Errors Found"
      }
    } else {
      const data: string[] = [
        "---FILES---",
        ...this.errorFiles,
        "---ERRORS---",
        ...this.errors,
        "---ALERTS---",
        ...this.alerts
      ]
      return {
        dir: "log/",
        name: "errors.txt",
        data: data.join("\n"),
        message: data.join("\n")
      }
    }
  }

  validateLangAndObj(i18nt: I18nText | I18nArray | I18n2DArray, obj: "string" | "array" | "string or array" | "object" = "string"): [boolean, boolean] {
    const checkLangs = this.inLangs
    if (typeof i18nt !== "object") {
      return [false, false]
    } else {
      let langOk = true
      let typeOk = true
      for (const key in i18nt) {
        if (checkLangs.indexOf(key) === -1) {
          langOk = false
        } else {
          const langkey = key as LangList
          const i18nobj: string | string[] | string[][] | undefined = i18nt[langkey]
          if (i18nobj === undefined) {
            typeOk = false
          } else if (obj === "string") {
            typeOk = typeof i18nobj === "string"
          } else if (obj === "array") {
            typeOk = Array.isArray(i18nobj)
          } else if (obj === "string or array") {
            typeOk = typeof i18nobj === "string" || Array.isArray(i18nobj)
          } else if (obj === "object") {
            // pass
          }
        }
      }
      return [langOk, typeOk]
    }
  }

  validateImageSrc(src: string): boolean {
    if (src.startsWith("http")) {
      return true
    } else {
      return existsSync(DirOperator.join(this.pictDir, src))
    }
  }

  validateMetas(pg: Partial<PageContents<I18nText, I18nArray, I18n2DArray>>) {
    if (!pg.includes) {
      this.addError("missing 'includes'")
      this.inLangs = this.langs
    } else {
      if (!Array.isArray(pg.includes)) {
        this.addError("pg.includes should be a type of Array<Langs>")
        this.inLangs = this.langs
      } else if (pg.includes.length === 0) {
        this.addError("pg.includes is blank")
        this.inLangs = this.langs
      } else {
        this.inLangs = []
        for (const lang of pg.includes) {
          if (this.langs.includes(lang) === false) {
            this.addError("pg.includes includeds invalid lang")
          } else {
            this.inLangs.push(lang)
          }
        }
      }
    }

    if (!pg.name) {
      this.addError("missing 'name'")
    }

    if (!pg.position) {
      this.addError("missing 'position'")
    } else {
      if (typeof pg.position !== "number") {
        this.addError("position should be a type of 'number'")
      }
    }

    if (!pg.href) {
      this.addError("missing 'href'")
    }

    if (!pg.$title) {
      this.addError("missing '$title'")
    } else {
      if (typeof pg.$title !== "object") {
        this.addError("$title in yaml should be a type of 'I18nText'")
      } else {
        const [langOk, typeOk] = this.validateLangAndObj(pg.$title)
        if (!langOk) {
          this.addError("$title includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of $title is incorrect type")
        }
      }
    }

    if (!pg.img) {
      this.addError("missing 'img'")
    } else {
      if (this.validateImageSrc(pg.img) === false) {
        this.addError(`the file '${pg.img}' does not exist`)
      }
    }

    if (!pg.$description) {
      this.addError("missing '$description'")
    } else {
      const [langOk, typeOk] = this.validateLangAndObj(pg.$description)
      if (!langOk) {
        this.addError("$description includes invalid lang key")
      }
      if (!typeOk) {
        this.addError("the value of $description is incorrect type")
      }
    }

    if (!pg.$summary) {
      this.addError("missing '$summary'")
    } else {
      const [langOk, typeOk] = this.validateLangAndObj(pg.$summary)
      if (!langOk) {
        this.addError("$summary includes invalid lang key")
      }
      if (!typeOk) {
        this.addError("the value of $summary is incorrect type")
      }
    }
  }

  validateContents(blks: AnyBlock<I18nText, I18nArray, I18n2DArray>[]) {
    blks.forEach(blk => {
      switch (blk.type) {
        case "RawHTML":
        case "Plain":
        case "Link":
        case "Image":
        case "Heading 2":
        case "Heading 3":
        case "Heading 4":
        case "Icon Heading 2":
        case "Icon Heading 3":
        case "Icon Heading 4":
        case "List":
        case "Define":
        case "Relatives":
        case "Spacer":
        case "Separator":
          this.validateSimpleBlock(blk)
          break

        case 'Media Right':
        case 'Media Left':
        case "Features":
        case "Horizontal":
        case "Flow":
        case "Table":
          this.validateComplexBlock(blk)
          break;

        case "FLEX":
        case "COLUMN":
          this.validateLayoutBlock(blk)
          break;

        default:
          break;
      }
    })
  }

  validateSimpleBlock(blk: SimpleBlock<I18nText, I18nArray, I18n2DArray>): void {
    switch (blk.type) {
      case "RawHTML": {
        const [langOk, typeOk] = this.validateLangAndObj(blk.$html)
        if (!langOk) {
          this.addError("$RawHTML includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of $RawHTML is incorrect type")
        }
        break;
      }

      case "Plain": {
        const [langOk, typeOk] = this.validateLangAndObj(blk.$texts, "string or array")
        if (!langOk) {
          this.addError("Plain.$texts includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of $Plain.$texts is incorrect type")
        }
        break;
      }

      case "Link": {
        const [langOk, typeOk] = this.validateLangAndObj(blk.$text)
        if (!langOk) {
          this.addError("Link.$text includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of $Link.$text is incorrect type")
        }
        if (blk.href === undefined || blk.href === "") {
          this.addError("missing Link.href")
        }
        break;
      }

      case "Image": {
        const [langOk, typeOk] = this.validateLangAndObj(blk.$alt)
        if (!langOk) {
          this.addError("Image.$alt includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of $Image.$alt is incorrect type")
        }

        const [langOk2, typeOk2] = this.validateLangAndObj(blk.$alt, "string or array")
        if (!langOk2) {
          this.addError("Image.$alt includes invalid lang key")
        }
        if (!typeOk2) {
          this.addError("the value of $Image.$alt is incorrect type")
        }
        if (blk.src === undefined || blk.src === "") {
          this.addError("missing Image.src")
        } else {
          if (this.validateImageSrc(blk.src) === false) {
            this.addError(`the file '${blk.src}' does not exist`)
          }
        }
        break;
      }

      case "Heading 2":
      case "Heading 3":
      case "Heading 4": {
        const [langOk, typeOk] = this.validateLangAndObj(blk.$text)
        if (!langOk) {
          this.addError("Heading.$text includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of $Heading.$text is incorrect type")
        }
        break;
      }

      case "Icon Heading 2":
      case "Icon Heading 3":
      case "Icon Heading 4": {
        const [langOk, typeOk] = this.validateLangAndObj(blk.$text)
        if (!langOk) {
          this.addError("Icon Heading.$text includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of $Icon Heading.$text is incorrect type")
        }
        if (!blk.icon) {
          this.addError("missing Icon Heading.icon", false)
        }
        break;
      }

      case "List": {
        const [langOk, typeOk] = this.validateLangAndObj(blk.$texts, "array")
        if (!langOk) {
          this.addError("List.$texts includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of List.$texts is incorrect type")
        }
        break;
      }

      case "Define": {
        const [langOk, typeOk] = this.validateLangAndObj(blk.$texts, "array")
        if (!langOk) {
          this.addError("Define.$texts includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of Define.$texts is incorrect type")
        }
        break;
      }

      case "Relatives": {
        if (!Array.isArray(blk.$articles)) {
          this.addError("Relatives.$articles in yaml should be a type of 'Array<Article>'")
        } else {
          for (const article of blk.$articles) {
            if (!article.$title) {
              this.addError("missing 'article.$title'")
            } else {
              const [langOk, typeOk] = this.validateLangAndObj(article.$title)
              if (!langOk) {
                this.addError("Icon Article.$title includes invalid lang key")
              }
              if (!typeOk) {
                this.addError("the value of Article.$title is incorrect type")
              }
            }
            if (!article.href) {
              this.addError("missing 'article.href'")
            }
          }
        }
        break;
      }

      case "Spacer":
        break;

      case "Separator":
        break;

      default:
        this.addError(`including invalid block type ${blk.type} `)
        break
    }
  }

  validateComplexBlock(blk: ComplexBlock<I18nText, I18nArray, I18n2DArray>): void {
    switch (blk.type) {
      case 'Media Right':
      case 'Media Left': {
        if (!blk.src) {
          this.addError("missing 'Media.src'")
        } else {
          if (this.validateImageSrc(blk.src) === false) {
            this.addError(`the file '${blk.src}' does not exist`)
          }
        }
        const [langOk, typeOk] = this.validateLangAndObj(blk.$alt)
        if (!langOk) {
          this.addError("Icon Media.$alt includes invalid lang key")
        }
        if (!typeOk) {
          this.addError("the value of Media.$alt is incorrect type")
        }
        if (!blk.$blks) {
          this.addError("missing 'Media.$blks'")
        } else if (!Array.isArray(blk.$blks)) {
          this.addError("Media.$blks should be a type of 'Array<SimpleBlock>'")
        } else {
          for (const subblk of blk.$blks) {
            this.validateSimpleBlock(subblk)
          }
        }
        break;
      }

      case "Gallary": {
        if (!blk.$blks) {
          this.addError("missing 'Media.$blks'")
        } else if (!Array.isArray(blk.$blks)) {
          this.addError("Media.$blks should be a type of 'Array<SimpleBlock>'")
        } else {
          for (const subblk of blk.$blks) {
            if (subblk.type !== "Image") {
              this.addError("Gallary Block can only include ImageBlock")
            } else {
              this.validateSimpleBlock(subblk)
            }
          }
        }
        break;
      }

      case "Features": {
        if (!blk.$items) {
          this.addError("missing 'Features.$items'")
        } else if (!Array.isArray(blk.$items)) {
          this.addError("Features.$items should be a type of 'Array<FeatureItem>'")
        } else {
          for (const itm of blk.$items) {
            if (!itm.icon) {
              this.addError("missing 'featureitem.icon'")
            }
            if (!itm.$title) {
              this.addError("missing 'featureitem.itemtitle'")
            } else if (typeof itm.$title !== "object") {
              this.addError("featureitem.$title should be a type of 'I18nText'")
            }

            if (!itm.$blks) {
              this.addError("missing 'featureitem.$blks'")
            } else if (!Array.isArray(itm.$blks)) {
              this.addError("featureitem.$blks should be a type of 'Array<SimpleBlock>'")
            } else {
              for (const subblk of itm.$blks) {
                this.validateSimpleBlock(subblk)
              }
            }
          }
        }
        break;
      }

      case "Horizontal":
        if (!blk.$items) {
          this.addError("missing 'Horizontal.$items'")
        } else if (!Array.isArray(blk.$items)) {
          this.addError("Horizontal.$items should be a type of 'Array<HorizontalItem>'")
        } else {
          for (const itm of blk.$items) {
            if (!itm.img) {
              this.addError("missing 'Horizontal.$item.img'")
            } else {
              if (this.validateImageSrc(itm.img)) {
                this.addError(`the file '${itm.img}' does not exist`)
              }
            }
            if (!itm.$title) {
              this.addError("missing 'Horizontal.$item.$title'")
              const [langOk, typeOk] = this.validateLangAndObj(itm.$title)
              if (!langOk) {
                this.addError("Icon Horizontal.$title includes invalid lang key")
              }
              if (!typeOk) {
                this.addError("the value of $Horizontal.$title is incorrect type")
              }

              if (!itm.$blks) {
                this.addError("missing 'Horizontal.$blks'")
              } else if (!Array.isArray(itm.$blks)) {
                this.addError("Horizontal.$blks should be a type of 'Array<SimpleBlock>'")
              } else {
                for (const subblk of itm.$blks) {
                  this.validateSimpleBlock(subblk)
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
            this.addError("Table.th should be a type of 'Array<I18nText>'")
          } else {
            this.validateLangAndObj(blk.$th, "array")
          }
        }
        if (!Array.isArray(blk.$trs)) {
          this.addError("Table.tr should be a type of 'Array<SimpleBlock[]>'")
        } else {
          blk.$trs.forEach(row => {
            if (!Array.isArray(row)) {
              this.addError("Each Table.tr should be a type of 'Array<SimpleBlock>'")
            } else {
              row.forEach(cell => {
                this.validateSimpleBlock(cell)
              })
            }
          })
        }
        // todo
        break;
      }

      default:
        break;
    }
  }

  validateLayoutBlock(blk: LayoutBlock<I18nText, I18nArray, I18n2DArray>): void {
    switch (blk.type) {
      case "FLEX":
        if (!Array.isArray(blk.$blkss)) {
          this.addError("FLEX.$blksss should be a type of 'Array<RealBlock[]>'")
        } else {
          blk.$blkss.forEach($blks => {
            if (!Array.isArray($blks)) {
              this.addError("Each FLEX.$blkss should be a type of 'Array<RealBlock>'")
            } else {
              this.validateContents($blks)
            }
          })
        }
        break;

      case "COLUMN":
        if (!Array.isArray(blk.$blkss)) {
          this.addError("COLUMN.$blksss should be a type of 'Array<RealBlock[]>'")
        } else {
          blk.$blkss.forEach($blks => {
            if (!Array.isArray($blks)) {
              this.addError("Each COLUMN.$blkss should be a type of 'Array<RealBlock>'")
            } else {
              this.validateContents($blks)
            }
          })
        }
        break;

      default:
        break;
    }
  }
}

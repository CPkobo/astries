import { readFileSync } from "fs"
import { load } from "js-yaml"
import { Writing } from "../toybox"
import { DirOperator } from "./dirOperator"

export class ProfGenerator {
  public prof: Profile
  public dir: string
  public path: string
  public langs: LangList[]
  public disps: string[]

  constructor() {
    this.prof = {
      SiteName: "",
      OrganizationName: "",
      Tel: "",
      Fax: "",
      url: "",
      Email: "",
      Langs: [],
      deflang: "",
    }
    this.dir = ""
    this.path = ""
    this.langs = []
    this.disps = []
  }

  readProf(dirope: DirOperator) {
    const profpath = dirope.getProfPath()
    const prof: any = load(readFileSync(profpath).toString())
    const nprof: Profile = {
      SiteName: prof.SiteName,
      OrganizationName: prof.OrganizationName,
      Tel: prof.Tel || "",
      Fax: prof.Fax || "",
      // url の正規化で末尾の / を削除する
      url: prof.url.replace(/\/+$/, "") || "",
      Email: prof.Email || "",
      Langs: [],
      deflang: "",
    }
    for (const lang of prof.Langs) {
      const langkey = Object.keys(lang)[0] as LangList
      this.langs.push(langkey)
      this.disps.push(lang[langkey])
      nprof.Langs.push({
        locale: langkey,
        display: lang[langkey]
      })
    }
    nprof.deflang = nprof.Langs[0].locale
    this.prof = nprof
  }

  exportProf(dirope: DirOperator): Writing {
    const [dir, name] = dirope.getWriteProfPaths()
    const data = `
import { readable } from 'svelte/store'

export const profile: Profile = ${JSON.stringify(this.prof, null, 2)}

export const prof = readable<Profile>(null, (set) => { set(profile) })
`
    return { dir, name, data, }
  }

  exportLangConfig(dirope: DirOperator): Writing | null {
    if (this.langs.length > 0 && this.langs.length === this.disps.length) {
      const [dir, name] = dirope.getWriteLangconfPaths()
      let langlist: string[] = []
      for (const lang of this.langs) {
        langlist.push(`"${lang}"`)
      }
      const data = `
declare type LangList = ${langlist.join("|")}
declare const DEF_LANG = "${this.langs[0]}"

declare type I18nText = {
  [key in LangList]?: string;
}

declare type I18nArray = {
  [key in LangList]?: string[];
}

declare type I18n2DArray = {
  [key in LangList]?: string[][];
}

declare type LangSet = {
  crt: LangList,
  valid: LangList[],
  disp: string,
  disps: string[]
}
`
      return { dir, name, data, }
    } else {
      console.log("need to set the same number of lansg & langdisps")
      return null
    }
  }
}



// const path = "contents/.init/profile.yaml"
// const prof = new ProfGenerator()
// prof.readProf(path)
// prof.extract()
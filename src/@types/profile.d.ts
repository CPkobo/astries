declare type LangToDisp = {
  locale: LangList,
  display: string,
}

declare interface Profile {
  SiteName: string
  OrganizationName: string
  Tel: string
  Fax: string
  url: string
  Email: string
  Langs: LangToDisp[]
  deflang: LangList | ""
}


declare type LangList = "ja"|"zh"|"en"
declare const DEF_LANG = "ja"

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

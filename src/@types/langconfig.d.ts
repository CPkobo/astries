declare type I18nText = {
  [key in LangList]?: string;
}

declare type I18nArray = {
  [key in LangList]?: string[];
}

declare type I18n2DArray = {
  [key in LangList]?: string[][];
}

declare type IsSingle = true
declare type IsMulti = false

declare type IsStr<T extends IsSingle | IsMulti> = T extends true ? string : I18nText 
declare type IsStrArray<T extends IsSingle | IsMulti> = T extends true ? string[] : I18nArray 
declare type IsStr2DArray<T extends IsSingle | IsMulti> = T extends true ? string[][] : I18n2DArray 

declare type LangSet = {
  crt: LangList,
  valid: LangList[],
  disp: string,
  disps: string[]
}

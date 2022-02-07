// 目次
declare interface SingleTOC<T extends string | I18nText> {
  name: string;
  position: number;
  $title: T;
  href: string;
  img: string;
  $summary: T;
  includes?: LangList[];
  children?: SingleTOC<T>[];
}

declare interface TOC<T extends string | I18nText> {
  name: string;
  position: number;
  $heading: T;
  root: string;
  data: SingleTOC<T>[];
}

// contents内各フォルダ直下のindex.yaml
declare type HeadingInIndex = {
  [key in LangList]: string;
}

declare interface TOCIndex extends HeadingInIndex {
  position: number;
} 
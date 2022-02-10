// 目次
declare interface SingleTOC<T extends IsSingle | IsMulti> {
  name: string;
  position: number;
  $title: IsStr<T>;
  href: string;
  img: string;
  $summary: IsStr<T>;
  includes?: LangList[];
  children?: SingleTOC<T>[];
}

declare interface TOC<T extends IsSingle | IsMulti> {
  name: string;
  position: number;
  $heading: IsStr<T>;
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
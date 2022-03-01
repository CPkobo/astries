// 目次
declare interface SinglePageIndex<T extends IsSingle | IsMulti> {
  name: string;
  position: number;
  $title: IsStr<T>;
  href: string;
  img: string;
  $summary: IsStr<T>;
  langs: string[];
  children?: SinglePageIndex<T>[];
}

declare interface CategoryIndex<T extends IsSingle | IsMulti> {
  name: string;
  position: number;
  $heading: IsStr<T>;
  langs: string[];
  root: string;
  data: SinglePageIndex<T>[];
}

// contents内各フォルダ直下のindex.yaml
declare type HeadingInInit = {
  [key in LangList]: string;
}

declare interface CategoryInit extends HeadingInInit {
  position: number;
} 
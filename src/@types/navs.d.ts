// グローバルナビゲーション
// ヘッダー、フッター、サイドメニューを生成するもと

// declare type ValidPaths = {
//   [key in LangList]: string[];
// }

// ロケール名をキーに、NavigationMenuの配列を値に持つ
declare type I18nNavMenu = {
  [key in LangList]: NavigationMenu[]
  // ja: NavigationMenu[];
  // zh: NavigationMenu[];
  // en: NavigationMenu[];
}

// グローバルナビゲーションのカテゴリごとのオブジェクト
// 子項目がある場合、items として作成する
declare interface NavigationMenu {
  category: string;
  root: string;
  items?: SinglePageIndex<IsSingle>[];
}

// 目次
declare interface SinglePageIndex<T extends IsSingle | IsMulti> {
  name: string;
  position: number;
  $title: IsStr<T>;
  href: string;
  img: string;
  $summary: IsStr<T>;
  langs: string[];
  pageType: PageType;
  data: SinglePageIndex<T>[];
}

// グローバルナビゲーションのサブカテゴリごとのオブジェクト
// declare interface NavItem {
//   caption: string;
//   link: string;
//   items?: NavItem[];
// }

// declare interface CategoryIndex<T extends IsSingle | IsMulti> {
//   name: string;
//   position: number;
//   $heading: IsStr<T>;
//   langs: string[];
//   root: string;
//   data: SinglePageIndex<T>[];
// }

// contents内各フォルダ直下のindex.yaml
declare type HeadingInInit = {
  [key in LangList]: string;
}
declare interface CategoryInit extends HeadingInInit {
  position: number;
  img?: string;
  publishLangs: LangList[];
}

declare interface StaticPath {
  params: {
    dirs: string
    path: string
  }
  props: PageProp
}

declare interface StaticDir {
  params: {
    dirs: string
  },
  props: PageProp
}

// declare type I18nStaticPaths = {
//   [key in LangList]: StaticPath[];
// }

declare interface PageProp {
  layout: PageType,
  lang: LangList
}
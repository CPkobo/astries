// グローバルナビゲーション
// ヘッダー、フッター、サイドメニューを生成するもと

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
  // path: string;
  // fullpath: stirng;
  items?: SinglePageIndex<IsSingle>[];
}

// 目次
declare interface SinglePageIndex<T extends IsSingle | IsMulti> {
  name: string;
  position: number;
  $title: IsStr<T>;
  // href: string;
  path: string;
  fullpath: string;
  img: string;
  $summary: IsStr<T>;
  langs: string[];
  pageType: PageType;
  data: SinglePageIndex<T>[];
}

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

declare interface StaticPost {
  params: {
    dirs: string
    path: string
  }
  props: {
    title: string
  }
}

declare interface StaticPostPagenate {
  params: {
    dirs: string
    pageNum: string
  }
}

declare interface PageProp {
  layout: PageType,
  lang: LangList
}

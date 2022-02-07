// グローバルナビゲーション
// ヘッダー、フッター、サイドメニューを生成するもと

declare type ValidPaths = {
  [key in LangList]: string[];
}

// ロケール名をキーに、NavigationMenuの配列を値に持つ
declare type I18nNavMenu = {
  [key in LangList]: NavigationMenu[]
  // ja: NavigationMenu[];
  // zh: NavigationMenu[];
  // en: NavigationMenu[];
}

// ナビゲーションの作り変え
// グローバルナビゲーションのカテゴリごとのオブジェクト
// 子項目がある場合、items として作成する
declare interface NavigationMenu {
  category: string;
  root: string;
  items?: NavItem[];
}

// グローバルナビゲーションのサブカテゴリごとのオブジェクト
declare interface NavItem {
  caption: string;
  link: string;
  items?: NavItem[];
}
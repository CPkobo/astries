// レイアウト
declare interface AstriesHead {
    lang: LangList
    title: string
    description: string
}

declare interface AstriesDirection {
    head: AstriesHead
    hasHeaderMenu: boolean
    hasFooterMenu: boolean
    hasSideMenu: boolean
    pagetype: PageType
    navigations: NavigationMenu[]
}

// 各ページ
declare interface PageContents<T extends IsSingle | IsMulti> {
    name: string;
    position: number;
    href: string;
    breadCrumb?: BreadcrumbList[];
    jsonld?: any;
    $title: IsStr<T>;
    img: string;
    $description: IsStr<T>;
    $summary: IsStr<T>;
    langs: LangList[];
    pageType: PageType;
    contents: AnyBlock<T>[];
}

declare interface BreadcrumbList {
    "@type": "ListItem",
    position: number,
    name: string,
    item: string,
}

declare interface NavToOtherPage {
    title: string;
    href: string;
}

declare interface PageContentsWithNav extends PageContents<IsSingle> {
    prev: NavToOtherPage;
    next: NavToOtherPage
    back: NavToOtherPage;
}

// declare interface PageContentsWithCategory extends PageContents<IsSingle> {
//     category: CategoryIndex<IsSingle>
// }


// Post Pages
declare interface PostPagenation {
    title: string;
    pages: PostIndex[];
    num: number;
    prev: NavToOtherPage;
    next: NavToOtherPage;
}

// declare type MinPostIndex = Pick<PostIndex, "title" | "href">

declare interface PostInfo {
    title: string
    published?: Date,
    modified?: Date,
    pubstr: string,
    modstr: string,
    image?: string
}

declare interface PostIndex extends PostInfo {
    summary: string
    href: string
}

declare interface PostPage {
    meta: PostInfo
    body: string
}

// 各ページ
declare interface PageContents<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> {
    name: string;
    position: number;
    href: string;
    breadCrumb?: BreadcrumbList[];
    jsonld?: any;
    $title: T;
    img: string;
    $description: T;
    $summary: T;
    includes: LangList[];
    contents: AnyBlock<T, U, S>[];
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

declare interface PageContentsWithNav extends PageContents<string, string[], string[][]> {
    prev: NavToOtherPage;
    next: NavToOtherPage
    back: NavToOtherPage;
}

declare interface PostIndices {
    title: string;
    pages: PostIndex[];
    num: number;
    prev: NavToOtherPage;
    next: NavToOtherPage;
}

declare interface PostIndex extends PostInfo {
    summary: string
    href: string
}

declare type MinPostIndex = Pick<PostIndex, "title" | "href">

declare interface PostInfo {
    title: string
    published?: Date,
    modified?: Date,
    pubstr: string,
    modstr: string,
    image?: string
}

declare interface PostPage {
    meta: PostInfo
    body: string
}

// const Langs = import("./langconfig").LANGS

// コンテンツのブロック単位
declare type BlockType =
    'RawHTML' | 'Plain' | 'Link' | 'Image' |
    'Hero' | 'Sub Hero' | 'Sub Bar' |
    'Heading 2' | 'Heading 3' | 'Heading 4' |
    'Icon Heading 2' | 'Icon Heading 3' | 'Icon Heading 4' |
    'List' | 'Define' |
    'Relatives' |
    'Spacer' | 'Separator' |
    'Media Right' | 'Media Left' | "Gallary" |
    'Features' | 'Horizontal' | 'Flow' |
    'Table' |
    "FLEX" | "COLUMN"

declare type SimpleBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> =
    RawHTML<T> | PlainBlock<U> | LinkBlock<T> | ImageBlock<T> |
    HeroBlock<T> | SubHeroBlock<T> | SubBarBlock<T> |
    HeadingBlock<T> | IconHeadingBlock<T> |
    ListBlock<U> | DefineBlock<S> |
    RelativeBlock<T> |
    Spacer | Separator


declare type ComplexBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> =
    MediaTextBlock<T, U, S> | GallaryBlock<T, U, S> |
    FeaturesBlock<T, U, S> | FlowBlock<T, U, S> | HorizontalBlock<T, U, S> |
    TableBlock<T, U, S>

declare type RealBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> = SimpleBlock<T, U, S> | ComplexBlock<T, U, S>

declare type LayoutBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> =
    FlexLayout<T, U, S> | ColumnLayout<T, U, S>


declare type AnyBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> = RealBlock<T, U, S> | LayoutBlock<T, U, S>

declare interface BaseBlock {
    type: BlockType
    id?: string
    classes?: string
    preset?: string
    name?: string
}

// Simple Blocks
declare interface RawHTML<T extends string | I18nText> extends BaseBlock {
    type: 'RawHTML',
    $html: T
}

declare interface PlainBlock<T extends string[] | I18nArray> extends BaseBlock {
    type: 'Plain';
    $texts: T;
}

declare interface LinkBlock<T extends string | I18nText> extends BaseBlock {
    type: 'Link';
    $text: T;
    href: string;
    target?: "_self" | "_blank"
    anchor?: string;
}

declare interface ImageBlock<T extends string | I18nText> extends BaseBlock {
    type: 'Image';
    src: string;
    $alt: T;
    href?: string;
    target?: "_self" | "_blank"
}

declare interface HeroBlock<T extends string | I18nText> extends BaseBlock {
    type: "Hero";
    src: string;
    $alt: T;
    $title: T;
    $subtitle: T
    cta?: string
}

declare interface SubHeroBlock<T extends string | I18nText> extends BaseBlock {
    type: "Sub Hero";
    src: string;
    $alt: T;
    $title: T;
}

declare interface SubBarBlock<T extends string | I18nText> extends BaseBlock {
    type: "Sub Bar";
    $title: T;
}


declare interface HeadingBlock<T extends string | I18nText> extends BaseBlock {
    type: 'Heading 2' | 'Heading 3' | 'Heading 4';
    $text: T
}

declare interface IconHeadingBlock<T extends string | I18nText> extends BaseBlock {
    type: 'Icon Heading 2' | 'Icon Heading 3' | 'Icon Heading 4';
    $text: T;
    icon: string;
}

declare interface ListBlock<U extends string[] | I18nArray> extends BaseBlock {
    type: 'List';
    $texts: U;
}

declare interface DefineBlock<S extends string[][] | I18n2DArray> extends BaseBlock {
    type: 'Define';
    $texts: S;
}

declare interface RelativeBlock<T extends string | I18nText> extends BaseBlock {
    type: 'Relatives';
    $title?: T;
    $articles: Article<T>[];
}

declare interface Article<T extends string | I18nText> {
    $title: T;
    src: string;
    $alt: T;
    $description: T;
    href: string;
}

declare interface Spacer extends BaseBlock {
    type: 'Spacer';
    x?: number;
    y?: number;
}

declare interface Separator extends BaseBlock {
    type: 'Separator';
}

// Complex Blocs
declare interface MediaTextBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> extends BaseBlock {
    type: 'Media Right' | 'Media Left';
    // $texts: T[];
    $blks: SimpleBlock<T, U, S>[];
    src: string;
    $alt: T;
}

declare interface GallaryBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> extends BaseBlock {
    type: "Gallary"
    $blks: ImageBlock<T>[];
}

// カラム型の特徴を並べる際のオブジェクト
declare interface FeaturesBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> extends BaseBlock {
    type: 'Features';
    $items: FeaturesItem<T, U, S>[];
}

declare interface FeaturesItem<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> {
    icon: string;
    $title: T;
    $blks: SimpleBlock<T, U, S>[]
    link?: string;
}

// カラム型の特徴を並べる際のオブジェクト
declare interface HorizontalBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> extends BaseBlock {
    type: 'Horizontal';
    $items: HorizontalItem<T, U, S>[];
}

declare interface HorizontalItem<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> {
    img: string;
    $title: T;
    $blks: SimpleBlock<T, U, S>[]
    link?: string;
}


declare interface FlowBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> extends BaseBlock {
    type: 'Flow';
    $items: FlowItem<T, U, S>[];
}

declare interface FlowItem<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> {
    $blks: SimpleBlock<T, U, S>[]
}

declare interface TableBlock<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> extends BaseBlock {
    type: 'Table';
    $th?: U;
    $trs: SimpleBlock<T, U, S>[][];
}

// レイアウト専門
declare interface FlexLayout<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> extends BaseBlock {
    type: "FLEX";
    $blkss: RealBlock<T, U, S>[][];
}

declare interface ColumnLayout<T extends string | I18nText, U extends string[] | I18nArray, S extends string[][] | I18n2DArray> extends BaseBlock {
    type: "COLUMN";
    $blkss: RealBlock<T, U, S>[][];
}

  // コンテンツのブロック単位ここまで


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

declare type SimpleBlock<T extends IsSingle | IsMulti> =
  RawHTML<T> | PlainBlock<T> | LinkBlock<T> | ImageBlock<T> |
  HeroBlock<T> | SubHeroBlock<T> | SubBarBlock<T> |
  HeadingBlock<T> | IconHeadingBlock<T> |
  ListBlock<T> | DefineBlock<T> |
  RelativeBlock<T> |
  Spacer | Separator


declare type ComplexBlock<T extends IsSingle | IsMulti> =
  MediaTextBlock<T> | GallaryBlock<T> |
  FeaturesBlock<T> | FlowBlock<T> | HorizontalBlock<T> |
  TableBlock<T>

declare type RealBlock<T extends IsSingle | IsMulti> = SimpleBlock<T> | ComplexBlock<T>

declare type LayoutBlock<T extends IsSingle | IsMulti> =
  FlexLayout<T> | ColumnLayout<T>


declare type AnyBlock<T extends IsSingle | IsMulti> = RealBlock<T> | LayoutBlock<T>

declare interface BaseBlock {
  type: BlockType
  id?: string
  classes?: string
  preset?: string
  name?: string
}

// Simple Blocks
declare interface RawHTML<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'RawHTML',
  $html: IsStr<T>
}

declare interface PlainBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Plain';
  $texts: IsStrArray<T>;
}

declare interface LinkBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Link';
  $text: IsStr<T>;
  href: string;
  target?: "_self" | "_blank"
  anchor?: string;
}

declare interface ImageBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Image';
  src: string;
  $alt: IsStr<T>;
  href?: string;
  target?: "_self" | "_blank"
}

declare interface HeroBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: "Hero";
  src: string;
  $alt: IsStr<T>;
  $title: IsStr<T>;
  $subtitle: IsStr<T>
  cta?: string
}

declare interface SubHeroBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: "Sub Hero";
  src: string;
  $alt: IsStr<T>;
  $title: IsStr<T>;
}

declare interface SubBarBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: "Sub Bar";
  $title: IsStr<T>;
}


declare interface HeadingBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Heading 2' | 'Heading 3' | 'Heading 4';
  $text: IsStr<T>
}

declare interface IconHeadingBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Icon Heading 2' | 'Icon Heading 3' | 'Icon Heading 4';
  $text: IsStr<T>;
  icon: string;
}

declare interface ListBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'List';
  $texts: IsStrArray<T>;
}

declare interface DefineBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Define';
  $texts: IsStr2DArray<T>;
}

declare interface RelativeBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Relatives';
  $title?: IsStr<T>;
  $articles: Article<T>[];
}

declare interface Article<T extends IsSingle | IsMulti> {
  $title: IsStr<T>;
  src: string;
  $alt: IsStr<T>;
  $description: IsStr<T>;
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
declare interface MediaTextBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Media Right' | 'Media Left';
  // $texts: T[];
  $blks: SimpleBlock<T>[];
  src: string;
  $alt: IsStr<T>;
}

declare interface GallaryBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: "Gallary"
  $blks: ImageBlock<T>[];
}

// カラム型の特徴を並べる際のオブジェクト
declare interface FeaturesBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Features';
  $items: FeaturesItem<T>[];
}

declare interface FeaturesItem<T extends IsSingle | IsMulti> {
  icon: string;
  $title: IsStr<T>;
  $blks: SimpleBlock<T>[]
  link?: string;
}

// カラム型の特徴を並べる際のオブジェクト
declare interface HorizontalBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Horizontal';
  $items: HorizontalItem<T>[];
}

declare interface HorizontalItem<T extends IsSingle | IsMulti> {
  img: string;
  $title: IsStr<T>;
  $blks: SimpleBlock<T>[]
  link?: string;
}


declare interface FlowBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Flow';
  $items: FlowItem<T>[];
}

declare interface FlowItem<T extends IsSingle | IsMulti> {
  $blks: SimpleBlock<T>[]
}

declare interface TableBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Table';
  $th?: IsStrArray<T>;
  $trs: SimpleBlock<T>[][];
}

// レイアウト専門
declare interface FlexLayout<T extends IsSingle | IsMulti> extends BaseBlock {
  type: "FLEX";
  $blkss: RealBlock<T>[][];
}

declare interface ColumnLayout<T extends IsSingle | IsMulti> extends BaseBlock {
  type: "COLUMN";
  $blkss: RealBlock<T>[][];
}

  // コンテンツのブロック単位ここまで


// const Langs = import('./langconfig').LANGS

// コンテンツのブロック単位
declare type BlockType =
  '_' | 'rawHTML' | 'plain' | 'markdown' | 'link' | 'image' |
  'hero' | 'sub hero' | 'sub bar' |
  'heading 2' | 'heading 3' | 'heading 4' |
  'icon heading 2' | 'icon heading 3' | 'icon heading 4' |
  'list' | 'define' |
  'relatives' |
  'spacer' | 'separator' |
  'Media Right' | 'Media Left' | 'Gallary' |
  'Features' | 'Horizontal' | 'Flow' |
  'Table' | 'Faq' | 'Slide' |
  'FLEX' | 'COLUMN'

declare type ChildBlock<T extends IsSingle | IsMulti> =
  NonBlock | RawHTML<T> | PlainBlock<T> | MarkdownBlock<T> | LinkBlock<T> | ImageBlock<T> |
  HeroBlock<T> | SubHeroBlock<T> | SubBarBlock<T> |
  HeadingBlock<T> | IconHeadingBlock<T> |
  ListBlock<T> | DefineBlock<T> |
  RelativeBlock<T> |
  Spacer | Separator


declare type ParentBlock<T extends IsSingle | IsMulti> =
  MediaTextBlock<T> | GallaryBlock<T> |
  FeaturesBlock<T> | FlowBlock<T> | HorizontalBlock<T> |
  TableBlock<T> | FaqBlock<T> | SlideHero<T>

declare type RealBlock<T extends IsSingle | IsMulti> = ChildBlock<T> | ParentBlock<T>

declare type AncestorBlock<T extends IsSingle | IsMulti> =
  FlexLayout<T> | ColumnLayout<T>


declare type AnyBlock<T extends IsSingle | IsMulti> = RealBlock<T> | AncestorBlock<T>

declare interface BaseBlock {
  type: BlockType
  id?: string
  classes?: string
  preset?: string
  name?: string
}

// Child Blocks
declare interface NonBlock extends BaseBlock {
  type: '_'
}

declare interface RawHTML<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'rawHTML',
  $html: IsStr<T>
}

declare interface MarkdownBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'markdown',
  $md: IsStr<T>
}

declare interface PlainBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'plain';
  $texts: IsStrArray<T>;
}

declare interface LinkBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'link';
  $text: IsStr<T>;
  href: string;
  target?: '_self' | '_blank'
  anchor?: string;
}

declare interface ImageBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'image';
  src: string;
  $alt: IsStr<T>;
  href?: string;
  target?: '_self' | '_blank'
}

declare interface HeroBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'hero';
  src: string;
  $alt: IsStr<T>;
  $title: IsStr<T>;
  $subtitle: IsStr<T>
  cta?: string
}

declare interface SubHeroBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'sub hero';
  src: string;
  $alt: IsStr<T>;
  $title: IsStr<T>;
}

declare interface SubBarBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'sub bar';
  $title: IsStr<T>;
}

declare interface HeadingBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'heading 2' | 'heading 3' | 'heading 4';
  $text: IsStr<T>
}

declare interface IconHeadingBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'icon heading 2' | 'icon heading 3' | 'icon heading 4';
  $text: IsStr<T>;
  icon: string;
}

declare interface ListBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'list';
  $texts: IsStrArray<T>;
}

declare interface DefineBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'define';
  $texts: IsStr2DArray<T>;
}

declare interface RelativeBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'relatives';
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
  type: 'spacer';
  x?: number;
  y?: number;
}

declare interface Separator extends BaseBlock {
  type: 'separator';
}

// Parent Blocs
declare interface MediaTextBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Media Right' | 'Media Left';
  // $texts: T[];
  $blks: ChildBlock<T>[];
  src: string;
  $alt: IsStr<T>;
}

declare interface GallaryBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Gallary'
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
  $blks: ChildBlock<T>[]
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
  $blks: ChildBlock<T>[]
  link?: string;
}


declare interface FlowBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Flow';
  $items: FlowItem<T>[];
  isForJsonLd?: boolean;
}

declare interface FlowItem<T extends IsSingle | IsMulti> {
  $blks: ChildBlock<T>[]
}

declare interface TableBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Table';
  $th?: IsStrArray<T>;
  $trs: ChildBlock<T>[][];
}

declare interface FaqBlock<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Faq';
  $qas: QuestionAndAnser<T>[]
  isForJsonLd?: boolean
}

declare interface QuestionAndAnser<T extends IsSingle | IsMulti> {
  $q: ChildBlock<T>[];
  $a: ChildBlock<T>[];
  slag?: string;
}

declare interface SlideHero<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'Slide';
  $blks: HeroBlock<T>[]
}

// Ancestor
declare interface FlexLayout<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'FLEX';
  $blkss: RealBlock<T>[][];
}

declare interface ColumnLayout<T extends IsSingle | IsMulti> extends BaseBlock {
  type: 'COLUMN';
  $blkss: RealBlock<T>[][];
}

  // コンテンツのブロック単位ここまで


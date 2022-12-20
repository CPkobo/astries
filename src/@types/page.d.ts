// レイアウト
declare interface AstriesHead {
  lang: LangList;
  title: string;
  description: string;
  ogp: AstriesOGP;
  jsonld?: JsonLdData[]
}

declare interface AstriesDirection {
  head: AstriesHead;
  hasHeaderMenu: boolean;
  hasFooterMenu: boolean;
  hasSideMenu: boolean;
  pagetype: PageType;
  navigations: NavigationMenu[];
  links: MultiLingualLink[];
}

declare interface AstriesOGP {
  url: string;
  type: 'website' | 'blog' | 'article' | 'product';
  title: string;
  description: string;
  name: string;
  img: string;
}

// 各ページ
declare interface PageContentsInYaml<T extends IsSingle | IsMulti> {
  name: string;
  position: number;
  // href: string;
  $title: IsStr<T>;
  img: string;
  $description: IsStr<T>;
  $summary: IsStr<T>;
  langs: LangList[];
  pageType: PageType;
  contents: AnyBlock<T>[];
  jsonld?: JsonLdData[];
  useJsonLd?: 'faq' | 'howto' | ''
}

declare interface MultiLingualLink {
  lang: string;
  displayName: string;
  url: string;
}

declare interface PageContents<T extends IsSingle | IsMulti> extends Omit<PageContentsInYaml<T>, 'useJsonLd'> {
  path: string;
  fullpath: string;
  links: MultiLingualLink[];
  breadCrumb?: BreadcrumbList[];
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
  title: string;
  published?: Date;
  modified?: Date;
  pubstr: string;
  modstr: string;
  image?: string;
  summary?: string;
}

declare interface PostIndex extends PostInfo {
  summary: string;
  href: string;
}

declare interface PostPage {
  meta: PostInfo;
  body: string;
}


// ---ここからJSON LD関連のデータ
declare interface JsonLdBase {
  "@context": "http://schema.org";
}

declare interface JsonLdWebsite extends JsonLdBase {
  "@type": "website",
  name?: string;
  inLanguage?: string[]; //ウェブサイトの言語
  publisher?: {
    "@type": "Organization",
    name: string; // "ウェブサイトの運営会社",
    logo?: {
      "@type": "ImageObject",
      url: string;
    }
  },
  copyrightYear?: string;
  headline?: string;
  description?: string;
  url?: string;
}

declare interface JsonLdOrganization extends JsonLdBase {
  "@type": "Organization",
  name: string;
  founder?: string;
  foundingDate?: string;
  description?: string;
  telephone?: string;
  faxNumber?: string;
  address?: {
    "@type": "PostalAddress";
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    streetAddress?: string;
    addressCountry?: string;
  },
  contactPoint?: Array<{
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
  }>;
  url?: string;
  logo?: string;
  sameAs?: string[];
}

declare interface JsonLdBreadCrumnb extends JsonLdBase {
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbList[]
}


declare interface JsonLdFaq extends JsonLdBase {
  "@type": "FAQPage"
  mainEntity: Array<FaqItem>
}

declare interface FaqItem {
  "@type": "Question",
  name: string;
  acceptedAnswer: Array<FaqAnswer>;
}

declare interface FaqAnswer {
  "@type": "Answer"
  text: string;
}

declare interface JsonLdHowTo extends JsonLdBase {
  "@type": "HowTo";
  name: string;
  step: Array<HowToStep>
}

declare interface HowToStep {
  "@type": "HowToStep";
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
}


declare interface JsonLdArticle extends JsonLdBase {
  "@type": "Article",
  mainEntityOfPage?: {
    "@type": "WebPage",
    "@id": string; // "トップページまたはニュースのインデックスページ"
  },
  headline: string; // "記事タイトルや見出し",
  alternativeHeadline?: string; // "リードや小見出し",
  description?: string; // "記事の概略",
  image?: string[];
  datePublished?: string;
  dateModified?: string;
  publisher?: {
    "@type": "Organization",
    name: string,
    logo: {
      "@type": "ImageObject",
      url: string;
    }
  };
  author?: {
    "@type": "Person" | "Organization",
    name: string;
  };
}

declare interface JsonLdEvent extends JsonLdBase {
  "@type": "Event";
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  eventStatus: "https://schema.org/EventScheduled" | "https://schema.org/EventPostOpened" | "https://schema.org/EventCancel;ed" | "https://schema.org/EventMovedOnline" | "";
  eventAttendanceMode: string;
  location: Array<EventLocationOffline | EventLocationOffline>;
  performer: Array<EventPerformer>;
}

declare interface EventLocationVirtual {
  "@type": "VirtualLocation"
  url: string;
}

declare interface EventLocationOffline {
  "@type": "Place";
  name: string;
  address: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  }
}

declare interface EventPerformer {
  "@type": "Person" | "PerformingGroup" | 'MusicGroup' | 'DanceGroup' | 'TheaterGroup';
  name: string;
}


declare interface JsonLDLocalBusiness extends JsonLdBase {
  "@type": "LocalBusiness";
  name: string;
  telephone: string;
  address: string;
}

declare interface JsonLdProduct extends JsonLdBase {
  "@type": "Product";
  name: string;
  brand: string;
  description: string;
  logo: string;
  url: string;
  image: string;
  manufacturer: string;
}

declare type JsonLdData =
  JsonLdWebsite | JsonLdOrganization | JsonLdBreadCrumnb |
  JsonLdFaq | JsonLdHowTo | JsonLdArticle |
  JsonLdEvent | JsonLDLocalBusiness | JsonLdProduct
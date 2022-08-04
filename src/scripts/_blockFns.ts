import { marked } from 'marked'

export function convI18n2Str(i18nt: I18nText | string, lang: string, fallback = true): string {
  if (typeof i18nt === "string") {
    return i18nt
  } else {
    for (const key in i18nt) {
      if (key === lang) {
        const k = key as LangList
        return i18nt[k] || ""
      }
    }
    if (fallback) {
      const def = Object.keys(i18nt)[0] as LangList
      return i18nt[def] || ""
    } else {
      return ""
    }
  }
}

export function convI18ns2Strs(i18nts: I18nText | I18nArray, lang: string, fallback = true): string[] {
  for (const key in i18nts) {
    if (key === lang) {
      const k = key as LangList
      const strs: string | string[] = i18nts[k] || []
      return typeof strs === "string" ? [strs] : strs
    }
  }
  if (fallback) {
    const def = Object.keys(i18nts)[0] as LangList
    const strs: string | string[] = i18nts[def] || []
    return typeof strs === "string" ? [strs] : strs
  } else {
    return []
  }
}

export function convI18ns2D2Strs(i18nts: I18n2DArray, lang: string, fallback = true): string[][] {
  for (const key in i18nts) {
    if (key === lang) {
      const k = key as LangList
      return i18nts[k] || []
    }
  }
  if (fallback) {
    const def = Object.keys(i18nts)[0] as LangList
    return i18nts[def] || []
  } else {
    return []
  }
}

export function normalizeSrc(src: string | undefined | null): string {
  if (src === undefined || src === null) {
    return ""
  } else {
    if (src.startsWith("http") || src.startsWith("/pict/") || src.startsWith("/system/")) {
      return src
    } else if (src === "__") {
      return ""
    } else {
      return `/pict/${src}`
    }
  }
}

export function normalizeHref(href: string | undefined | null): string {
  if (href === undefined || href === null) {
    return ""
  } else {
    if (href.endsWith("/")) {
      return href
    } else {
      return `${href}/`
    }
  }
}

export function _rawHtml(blk: RawHTML<IsMulti>, lang: string): RawHTML<IsSingle> | null {
  const nblk: RawHTML<IsSingle> = {
    type: blk.type,
    $html: convI18n2Str(blk.$html, lang)
  }
  if (nblk.$html !== null && nblk.$html !== "") {
    return nblk
  } else {
    return null
  }
}

export function _plain(blk: PlainBlock<IsMulti>, lang: string): PlainBlock<IsSingle> | null {
  const nblk: PlainBlock<IsSingle> = {
    ...blk,
    $texts: convI18ns2Strs(blk.$texts, lang),
  }
  if (nblk.$texts.length > 0) {
    return nblk
  } else {
    return null
  }
}

export function _markdown(blk: MarkdownBlock<IsMulti>, lang: string): MarkdownBlock<IsSingle> | null {
  const nblk: MarkdownBlock<IsSingle> = {
    ...blk,
    $md: marked(convI18n2Str(blk.$md, lang).replace(/\\#/, '#'))
  }
  if (nblk.$md.length > 0) {
    return nblk
  } else {
    return null
  }
}

export function _link(blk: LinkBlock<IsMulti>, lang: string): LinkBlock<IsSingle> | null {
  const nblk: LinkBlock<IsSingle> = {
    ...blk,
    $text: convI18n2Str(blk.$text, lang),
    href: blk.href || "",
    target: blk.target === undefined ? "_self" : blk.target === "_blank" ? blk.target : "_self"
  }
  if (nblk.$text !== "" || nblk.href !== "") {
    return nblk
  } else {
    return null
  }
}

export function _image(blk: ImageBlock<IsMulti>, lang: string): ImageBlock<IsSingle> | null {
  const nblk: ImageBlock<IsSingle> = {
    ...blk,
    src: normalizeSrc(blk.src),
    $alt: convI18n2Str(blk.$alt, lang),
    href: blk.href,
    target: blk.target === undefined ? "_self" : blk.target === "_blank" ? blk.target : "_self"
  }
  if (nblk.src !== "") {
    return nblk
  } else {
    return null
  }
}

export function _hero(blk: HeroBlock<IsMulti>, lang: string): HeroBlock<IsSingle> | null {
  const nblk: HeroBlock<IsSingle> = {
    ...blk,
    src: normalizeSrc(blk.src),
    $alt: convI18n2Str(blk.$alt, lang),
    $title: convI18n2Str(blk.$title, lang),
    $subtitle: convI18n2Str(blk.$subtitle, lang),
    cta: blk.cta,
  }
  if (nblk.src !== "" && nblk.$title !== "") {
    return nblk
  } else {
    return null
  }
}

export function _subhero(blk: SubHeroBlock<IsMulti>, lang: string): SubHeroBlock<IsSingle> | null {
  const nblk: SubHeroBlock<IsSingle> = {
    ...blk,
    src: normalizeSrc(blk.src),
    $alt: convI18n2Str(blk.$alt, lang),
    $title: convI18n2Str(blk.$title, lang),
  }
  if (nblk.src !== "" && nblk.$title !== "") {
    return nblk
  } else {
    return null
  }
}

export function _subbar(blk: SubBarBlock<IsMulti>, lang: string): SubBarBlock<IsSingle> | null {
  const nblk: SubBarBlock<IsSingle> = {
    ...blk,
    $title: convI18n2Str(blk.$title, lang),
  }
  if (nblk.$title !== "") {
    return nblk
  } else {
    return null
  }
}

export function _heading(blk: HeadingBlock<IsMulti>, lang: string): HeadingBlock<IsSingle> | null {
  const nblk: HeadingBlock<IsSingle> = {
    ...blk,
    $text: convI18n2Str(blk.$text, lang)
  }
  if (nblk.$text !== "") {
    return nblk
  } else {
    return null
  }
}

export function _iconHeading(blk: IconHeadingBlock<IsMulti>, lang: string): IconHeadingBlock<IsSingle> | null {
  const nblk: IconHeadingBlock<IsSingle> = {
    ...blk,
    icon: blk.icon === "__" ? "" : blk.icon || "",
    $text: convI18n2Str(blk.$text, lang)
  }
  if (nblk.$text !== "") {
    return nblk
  } else {
    return null
  }
}

export function _list(blk: ListBlock<IsMulti>, lang: string): ListBlock<IsSingle> | null {
  const nblk: ListBlock<IsSingle> = {
    ...blk,
    $texts: convI18ns2Strs(blk.$texts, lang),
  }
  if (nblk.$texts.length > 0) {
    return nblk
  } else {
    return null
  }
}

export function _define(blk: DefineBlock<IsMulti>, lang: string): DefineBlock<IsSingle> | null {
  const nblk: DefineBlock<IsSingle> = {
    ...blk,
    $texts: convI18ns2D2Strs(blk.$texts, lang)
  }
  if (nblk.$texts.length > 0) {
    return nblk
  } else {
    return null
  }
}

export function _relatives(blk: RelativeBlock<IsMulti>, lang: string): RelativeBlock<IsSingle> | null {
  const nblk: RelativeBlock<IsSingle> = {
    ...blk,
    $title: blk.$title ? convI18n2Str(blk.$title, lang) : "",
    $articles: []
  }
  blk.$articles.forEach(itm => {
    const article: Article<IsSingle> = {
      $title: convI18n2Str(itm.$title, lang),
      href: itm.href,
      src: normalizeSrc(itm.src),
      $alt: convI18n2Str(itm.$alt, lang),
      $description: convI18n2Str(itm.$description, lang),
    }
    if (article.$title !== "") {
      nblk.$articles.push(article)
    }
  })
  if (nblk.$articles.length > 0) {
    return nblk
  } else {
    return null
  }
}

export function _spacer(blk: Spacer): Spacer {
  return blk
}

export function _separator(blk: Separator): Separator {
  return blk
}

export function _media(blk: MediaTextBlock<IsMulti>, lang: string): MediaTextBlock<IsSingle> | null {
  const nblk: MediaTextBlock<IsSingle> = {
    ...blk,
    src: normalizeSrc(blk.src),
    $alt: convI18n2Str(blk.$alt, lang),
    $blks: []
  }
  if (nblk.src !== "") {
    return nblk
  } else {
    return null
  }
}

export function _gallary(blk: GallaryBlock<IsMulti>, lang: string): GallaryBlock<IsSingle> | null {
  const nblk: GallaryBlock<IsSingle> = {
    ...blk,
    $blks: []
  }
  for (const $blk of blk.$blks) {
    if ($blk.type === "image") {
      const iblk = _image($blk, lang)
      if (iblk !== null) {
        nblk.$blks.push(iblk)
      }
    }
  }
  if (nblk.$blks.length > 0) {
    return nblk
  } else {
    return null
  }
}

export function _features(blk: FeaturesBlock<IsMulti>, lang: string): FeaturesBlock<IsSingle> {
  const nblk: FeaturesBlock<IsSingle> = {
    ...blk,
    $items: []
  }
  return nblk
}

export function _horizontal(blk: HorizontalBlock<IsMulti>, lang: string): HorizontalBlock<IsSingle> {
  const nblk: HorizontalBlock<IsSingle> = {
    ...blk,
    $items: []
  }
  return nblk
}

export function _flow(blk: FlowBlock<IsMulti>, lang: string): FlowBlock<IsSingle> {
  const nblk: FlowBlock<IsSingle> = {
    ...blk,
    $items: []
  }
  return nblk
}

export function _table(blk: TableBlock<IsMulti>, lang: string): TableBlock<IsSingle> {
  const $th: string[] = []
  const $trs: ChildBlock<IsSingle>[][] = []
  const nblk: TableBlock<IsSingle> = {
    ...blk,
    $th,
    $trs
  }
  return nblk
}

export function _faq(blk: FaqBlock<IsMulti>, lang: string): FaqBlock<IsSingle> {
  const $qas: QuestionAndAnser<IsSingle>[] = []
  const nblk: FaqBlock<IsSingle> = {
    ...blk,
    $qas,
  }
  return nblk
}

export function _slide(blk: SlideHero<IsMulti>, lang: string): SlideHero<IsSingle> | null {
  const nblk: SlideHero<IsSingle> = {
    ...blk,
    $blks: []
  }
  for (const $blk of blk.$blks) {
    const hblk = _hero($blk, lang)
    if (hblk !== null) {
      nblk.$blks.push(hblk)
    }
  }
  if (nblk.$blks.length > 0) {
    return nblk
  } else {
    return null
  }
}
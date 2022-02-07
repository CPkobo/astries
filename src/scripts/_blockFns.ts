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

export function _rawHtml(blk: RawHTML<I18nText>, lang: string): RawHTML<string> | null {
  const nblk: RawHTML<string> = {
    type: blk.type,
    $html: convI18n2Str(blk.$html, lang)
  }
  if (nblk.$html !== null && nblk.$html !== "") {
    return nblk
  } else {
    return null
  }
}

export function _plain(blk: PlainBlock<I18nText, I18nArray>, lang: string): PlainBlock<string, string[]> | null {
  const nblk: PlainBlock<string, string[]> = {
    ...blk,
    $texts: convI18ns2Strs(blk.$texts, lang),
  }
  if (nblk.$texts.length > 0) {
    return nblk
  } else {
    return null
  }
}

export function _link(blk: LinkBlock<I18nText>, lang: string): LinkBlock<string> | null {
  const nblk: LinkBlock<string> = {
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

export function _image(blk: ImageBlock<I18nText>, lang: string): ImageBlock<string> | null {
  const nblk: ImageBlock<string> = {
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

export function _hero(blk: HeroBlock<I18nText>, lang: string): HeroBlock<string> | null {
  const nblk: HeroBlock<string> = {
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

export function _subhero(blk: SubHeroBlock<I18nText>, lang: string): SubHeroBlock<string> | null {
  const nblk: SubHeroBlock<string> = {
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

export function _subbar(blk: SubBarBlock<I18nText>, lang: string): SubBarBlock<string> | null {
  const nblk: SubBarBlock<string> = {
    ...blk,
    $title: convI18n2Str(blk.$title, lang),
  }
  if (nblk.$title !== "") {
    return nblk
  } else {
    return null
  }
}

export function _heading(blk: HeadingBlock<I18nText>, lang: string): HeadingBlock<string> | null {
  const nblk: HeadingBlock<string> = {
    ...blk,
    $text: convI18n2Str(blk.$text, lang)
  }
  if (nblk.$text !== "") {
    return nblk
  } else {
    return null
  }
}

export function _iconHeading(blk: IconHeadingBlock<I18nText>, lang: string): IconHeadingBlock<string> | null {
  const nblk: IconHeadingBlock<string> = {
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

export function _list(blk: ListBlock<I18nArray>, lang: string): ListBlock<string[]> | null {
  const nblk: ListBlock<string[]> = {
    ...blk,
    $texts: convI18ns2Strs(blk.$texts, lang),
  }
  if (nblk.$texts.length > 0) {
    return nblk
  } else {
    return null
  }
}

export function _define(blk: DefineBlock<I18n2DArray>, lang: string): DefineBlock<string[][]> | null {
  const nblk: DefineBlock<string[][]> = {
    ...blk,
    $texts: convI18ns2D2Strs(blk.$texts, lang)
  }
  if (nblk.$texts.length > 0) {
    return nblk
  } else {
    return null
  }
}

export function _relatives(blk: RelativeBlock<I18nText>, lang: string): RelativeBlock<string> | null {
  const nblk: RelativeBlock<string> = {
    ...blk,
    $title: blk.$title ? convI18n2Str(blk.$title, lang) : "",
    $articles: []
  }
  blk.$articles.forEach(itm => {
    const article: Article<string> = {
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

export function _media(blk: MediaTextBlock<I18nText, I18nArray, I18n2DArray>, lang: string): MediaTextBlock<string, string[], string[][]> | null {
  const nblk: MediaTextBlock<string, string[], string[][]> = {
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

export function _gallary(blk: GallaryBlock<I18nText, I18nArray, I18n2DArray>, lang: string): GallaryBlock<string, string[], string[][]> | null {
  const nblk: GallaryBlock<string, string[], string[][]> = {
    ...blk,
    $blks: []
  }
  for (const $blk of blk.$blks) {
    if ($blk.type === "Image") {
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

export function _features(blk: FeaturesBlock<I18nText, I18nArray, I18n2DArray>, lang: string): FeaturesBlock<string, string[], string[][]> {
  const nblk: FeaturesBlock<string, string[], string[][]> = {
    ...blk,
    $items: []
  }
  return nblk
}

export function _horizontal(blk: HorizontalBlock<I18nText, I18nArray, I18n2DArray>, lang: string): HorizontalBlock<string, string[], string[][]> {
  const nblk: HorizontalBlock<string, string[], string[][]> = {
    ...blk,
    $items: []
  }
  return nblk
}

export function _flow(blk: FlowBlock<I18nText, I18nArray, I18n2DArray>, lang: string): FlowBlock<string, string[], string[][]> {
  const nblk: FlowBlock<string, string[], string[][]> = {
    ...blk,
    $items: []
  }
  return nblk
}

export function _table(blk: TableBlock<I18nText, I18nArray, I18n2DArray>, lang: string): TableBlock<string, string[], string[][]> {
  const $th: string[] = []
  const $trs: SimpleBlock<string, string[], string[][]>[][] = []
  const nblk: TableBlock<string, string[], string[][]> = {
    ...blk,
    $th,
    $trs
  }
  return nblk
}
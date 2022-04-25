import {
  convI18n2Str, convI18ns2Strs, convI18ns2D2Strs,
  normalizeSrc,
  _rawHtml, _plain, _link, _image,
  _hero, _subhero, _subbar,
  _heading, _iconHeading, _list, _define, _relatives,
  _spacer, _separator,
  _media, _gallary, _features, _horizontal, _flow, _table
} from "./_blockFns"

// 多言語 → 単一言語 コンテンツへの変換
export function handleConvI18n2StrToc($toc: SinglePageIndex<IsMulti>, lang: LangList): SinglePageIndex<IsSingle> {
  const toc: SinglePageIndex<IsSingle> = {
    name: $toc.name,
    position: $toc.position,
    $title: convI18n2Str($toc.$title, lang),
    href: $toc.href,
    img: $toc.img,
    $summary: convI18n2Str($toc.$summary, lang),
    langs: $toc.langs,
    pageType: $toc.pageType,
    data: [],
  }
  // if ($toc.data) {
  //   $toc.data.forEach(eachtoc => {
  //     if (eachtoc.langs === undefined) {
  //       toc.data.push({
  //         name: eachtoc.name,
  //         position: eachtoc.position,
  //         $title: convI18n2Str(eachtoc.$title, lang),
  //         href: eachtoc.href,
  //         img: normalizeSrc(eachtoc.img),
  //         $summary: convI18n2Str(eachtoc.$summary, lang),
  //         langs: eachtoc.langs,
  //       })
  //     } else if (eachtoc.langs.includes(lang)) {
  //       toc.data.push({
  //         name: eachtoc.name,
  //         position: eachtoc.position,
  //         $title: convI18n2Str(eachtoc.$title, lang),
  //         href: eachtoc.href,
  //         img: normalizeSrc(eachtoc.img),
  //         $summary: convI18n2Str(eachtoc.$summary, lang),
  //         langs: eachtoc.langs
  //       })
  //     }
  //   });
  // }
  return toc
}

export function handleConvI18n2StrInMeta(
  $pg: Omit<PageContents<IsMulti>, "contents"> | PageContents<IsMulti>,
  lang: LangList): Omit<PageContents<IsSingle>, "contents"> {
  const href = `${$pg.href}--${lang}`
  return {
    name: $pg.name,
    href,
    jsonld: $pg.jsonld,
    $title: convI18n2Str($pg.$title, lang),
    $description: convI18n2Str($pg.$description, lang),
    $summary: convI18n2Str($pg.$summary, lang),
    img: $pg.img,
    position: $pg.position,
    pageType: $pg.pageType,
    langs: $pg.langs,
  }
}

export function handleConvI18n2Str(
  $blks: AnyBlock<IsMulti>[], lang: LangList): AnyBlock<IsSingle>[] {
  const strBlks: AnyBlock<IsSingle>[] = []
  if ($blks === undefined) {
    return strBlks
  }
  $blks.forEach(blk => {
    switch (blk.type) {
      // complex
      case 'Media Right':
      case 'Media Left':
      case "Gallary":
      case "Features":
      case "Horizontal":
      case "Flow":
      case "Table": {
        const nblk = convComplexBlock(blk, lang)
        if (nblk !== null) {
          strBlks.push(nblk)
        }
        break;
      }

      // Layout
      case "FLEX":
      case "COLUMN": {
        const nblk = convLayoutBlock(blk, lang)
        if (nblk !== null) {
          strBlks.push(nblk)
        }
        break;
      }

      // Simple Blocks or the others
      default: {
        const nblk = convSimpleBlock(blk, lang)
        if (nblk !== null) {
          strBlks.push(nblk)
        }
        break;
      }
    }
  })
  return strBlks
}

export function convSimpleBlock(
  blk: SimpleBlock<IsMulti>, lang: string): SimpleBlock<IsSingle> | null {
  switch (blk.type) {
    case "RawHTML":
      return _rawHtml(blk, lang)

    case "Plain":
      return _plain(blk, lang)

    case "Link":
      return _link(blk, lang)

    case "Image":
      return _image(blk, lang)

    case "Hero":
      return _hero(blk, lang)

    case "Sub Hero":
      return _subhero(blk, lang)

    case "Sub Bar":
      return _subbar(blk, lang)

    case "Heading 2":
    case "Heading 3":
    case "Heading 4":
      return _heading(blk, lang)

    case "Icon Heading 2":
    case "Icon Heading 3":
    case "Icon Heading 4":
      return _iconHeading(blk, lang)

    case "List":
      return _list(blk, lang)

    case "Define":
      return _define(blk, lang)

    case "Relatives":
      return _relatives(blk, lang)

    default:
      return null
  }
}

export function batchConvSimpleBlocks(blks: SimpleBlock<IsMulti>[], lang: string): SimpleBlock<IsSingle>[] {
  const nblks: SimpleBlock<IsSingle>[] = []
  for (const blk of blks) {
    const nblk = convSimpleBlock(blk, lang)
    if (nblk !== null) {
      nblks.push(nblk)
    }
  }
  return nblks
}

export function convComplexBlock(blk: ComplexBlock<IsMulti>, lang: string): ComplexBlock<IsSingle> | null {
  switch (blk.type) {
    case 'Media Right':
    case 'Media Left': {
      const pblk = _media(blk, lang)
      if (pblk !== null) {
        const $blks = batchConvSimpleBlocks(blk.$blks, lang)
        if ($blks.length > 0) {
          pblk.$blks = $blks
          return pblk
        }
      }
      return null
    }

    case "Gallary":
      return _gallary(blk, lang)

    case "Features": {
      if (blk.$items !== undefined) {
        const pblk: FeaturesBlock<IsSingle> = _features(blk, lang)
        if (pblk !== null) {
          blk.$items.forEach(itm => {
            const inItm: SimpleBlock<IsSingle>[] = batchConvSimpleBlocks(itm.$blks, lang)
            if (inItm.length > 0) {
              pblk.$items.push({
                icon: itm.icon === "__" ? "" : itm.icon || "",
                $blks: inItm,
                link: itm.link === "__" ? "" : itm.link || "",
                $title: convI18n2Str(itm.$title, lang),
              })
            }
          })
          if (pblk.$items.length > 0) {
            return pblk
          }
        }
      }
      return null
    }

    case "Horizontal": {
      if (blk.$items !== undefined) {
        const pblk: HorizontalBlock<IsSingle> = _horizontal(blk, lang)
        if (pblk !== null) {
          blk.$items.forEach(itm => {
            const inItm: SimpleBlock<IsSingle>[] = batchConvSimpleBlocks(itm.$blks, lang)
            if (inItm.length > 0) {
              pblk.$items.push({
                img: normalizeSrc(itm.img),
                $blks: inItm,
                link: itm.link === "__" ? "" : itm.link || "",
                $title: convI18n2Str(itm.$title, lang),
              })
            }
          })
          if (pblk.$items.length > 0) {
            return pblk
          }
        }
      }
      return null
    }

    case "Flow": {
      if (blk.$items !== undefined) {
        const pblk: FlowBlock<IsSingle> = _flow(blk, lang)
        if (pblk !== null) {
          blk.$items.forEach(itm => {
            const inItm: SimpleBlock<IsSingle>[] = batchConvSimpleBlocks(itm.$blks, lang)
            if (inItm.length > 0) {
              pblk.$items.push({
                $blks: inItm,
              })
            }
          })
          if (pblk.$items.length > 0) {
            return pblk
          }
        }
      }
      return null
    }

    case "Table": {
      if (blk.$trs !== undefined) {
        const pblk: TableBlock<IsSingle> = _table(blk, lang)
        if (pblk !== null) {
          if (blk.$th) {
            pblk.$th = convI18ns2Strs(blk.$th, lang)
          }
          blk.$trs.forEach(itm => {
            const inItm: SimpleBlock<IsSingle>[] = batchConvSimpleBlocks(itm, lang)
            if (inItm.length > 0) {
              pblk.$trs.push(inItm)
            }
          })
          if (pblk.$trs.length > 0) {
            return pblk
          }
        }
      }
      return null
    }

    default:
      return null
  }
}

export function batchConvRealBlocks(blks: RealBlock<IsMulti>[], lang: string): RealBlock<IsSingle>[] {
  const nblks: RealBlock<IsSingle>[] = []
  for (const blk of blks) {
    switch (blk.type) {
      case 'Media Right':
      case 'Media Left':
      case "Gallary":
      case "Features":
      case "Horizontal":
      case "Flow":
      case "Table": {
        const nblk = convComplexBlock(blk, lang)
        if (nblk !== null) {
          nblks.push(nblk)
        }
        break;
      }

      default: {
        const nblk = convSimpleBlock(blk, lang)
        if (nblk !== null) {
          nblks.push(nblk)
        }
        break;
      }
    }
  }
  return nblks
}

export function convLayoutBlock(blk: LayoutBlock<IsMulti>, lang: string): LayoutBlock<IsSingle> | null {
  switch (blk.type) {
    case 'FLEX': {
      const nblkss: RealBlock<IsSingle>[][] = []
      for (const $blks of blk.$blkss) {
        const nblks: RealBlock<IsSingle>[] = batchConvRealBlocks($blks, lang)
        if (nblks.length > 0) {
          nblkss.push(nblks)
        }
      }
      const lblk: FlexLayout<IsSingle> = {
        ...blk,
        $blkss: nblkss
      }
      return lblk
    }
    case 'COLUMN': {
      const nblkss: RealBlock<IsSingle>[][] = []
      for (const $blks of blk.$blkss) {
        const nblks: RealBlock<IsSingle>[] = batchConvRealBlocks($blks, lang)
        if (nblks.length > 0) {
          nblkss.push(nblks)
        }
      }
      const lblk: ColumnLayout<IsSingle> = {
        ...blk,
        $blkss: nblkss
      }
      return lblk
    }
    default:
      return null
  }
}

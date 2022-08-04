import {
  convI18n2Str, convI18ns2Strs, convI18ns2D2Strs,
  normalizeSrc,
  _rawHtml, _plain, _markdown, _link, _image,
  _hero, _subhero, _subbar,
  _heading, _iconHeading, _list, _define, _relatives,
  _spacer, _separator,
  _media, _gallary, _features, _horizontal, _flow, _table, _faq, _slide
} from "./_blockFns"

// 多言語 → 単一言語 コンテンツへの変換
export function handleConvI18n2StrToc($toc: SinglePageIndex<IsMulti>, lang: LangList): SinglePageIndex<IsSingle> {
  const toc: SinglePageIndex<IsSingle> = {
    name: $toc.name,
    position: $toc.position,
    $title: convI18n2Str($toc.$title, lang),
    // href: $toc.href,
    path: $toc.path,
    fullpath: $toc.fullpath,
    img: $toc.img,
    $summary: convI18n2Str($toc.$summary, lang),
    langs: $toc.langs,
    pageType: $toc.pageType,
    data: [],
  }
  return toc
}

export function handleConvI18n2StrInMeta(
  $pg: Omit<PageContentsInYaml<IsMulti>, "contents"> | PageContentsInYaml<IsMulti>,
  dir: string, path: string, lang: LangList, deflang: string): Omit<PageContents<IsSingle>, "contents"> {
  const pathWithLang = lang === deflang ? path : `${path}--${lang}`
  return {
    name: $pg.name,
    path: pathWithLang,
    fullpath: `${dir}/${path}`,
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
      case "Table":
      case 'Faq':
      case "Slide": {
        const nblk = convParentBlock(blk, lang)
        if (nblk !== null) {
          strBlks.push(nblk)
        }
        break;
      }

      // Layout
      case "FLEX":
      case "COLUMN": {
        const nblk = convAncestorBlock(blk, lang)
        if (nblk !== null) {
          strBlks.push(nblk)
        }
        break;
      }

      // Simple Blocks or the others
      default: {
        const nblk = convChildBlock(blk, lang)
        if (nblk !== null) {
          strBlks.push(nblk)
        }
        break;
      }
    }
  })
  return strBlks
}

export function convChildBlock(
  blk: ChildBlock<IsMulti>, lang: string): ChildBlock<IsSingle> {

  if (blk === undefined || blk === null) {
    return { type: '_' }
  }
  switch (blk.type) {
    case '_':
      return blk

    case "rawHTML":
      return _rawHtml(blk, lang)

    case "plain":
      return _plain(blk, lang)

    case 'markdown':
      return _markdown(blk, lang)

    case "link":
      return _link(blk, lang)

    case "image":
      return _image(blk, lang)

    case "hero":
      return _hero(blk, lang)

    case "sub hero":
      return _subhero(blk, lang)

    case "sub bar":
      return _subbar(blk, lang)

    case "heading 2":
    case "heading 3":
    case "heading 4":
      return _heading(blk, lang)

    case "icon heading 2":
    case "icon heading 3":
    case "icon heading 4":
      return _iconHeading(blk, lang)

    case "list":
      return _list(blk, lang)

    case "define":
      return _define(blk, lang)

    case "relatives":
      return _relatives(blk, lang)

    case "separator":
      return _separator(blk)

    case "spacer":
      return _spacer(blk)

    default:
      return { type: '_' }
  }
}

export function batchConvChildBlocks(blks: ChildBlock<IsMulti>[], lang: string): ChildBlock<IsSingle>[] {
  const nblks: ChildBlock<IsSingle>[] = []
  if (blks === undefined || blks === null) {
    return [{ type: '_' }]
  } else {
    for (const blk of blks) {
      const nblk = convChildBlock(blk, lang)
      if (nblk !== null) {
        nblks.push(nblk)
      }
    }
    return nblks
  }

}

export function convParentBlock(blk: ParentBlock<IsMulti>, lang: string): ParentBlock<IsSingle> | null {
  switch (blk.type) {
    case 'Media Right':
    case 'Media Left': {
      const pblk = _media(blk, lang)
      if (pblk !== null) {
        const $blks = batchConvChildBlocks(blk.$blks, lang)
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
            const inItm: ChildBlock<IsSingle>[] = batchConvChildBlocks(itm.$blks, lang)
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
            const inItm: ChildBlock<IsSingle>[] = batchConvChildBlocks(itm.$blks, lang)
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
            const inItm: ChildBlock<IsSingle>[] = batchConvChildBlocks(itm.$blks, lang)
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
            const inItm: ChildBlock<IsSingle>[] = batchConvChildBlocks(itm, lang)
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

    case 'Faq': {
      const pblk = _faq(blk, lang)
      if (pblk !== null) {
        blk.$qas.forEach($qa => {
          const $q = batchConvChildBlocks($qa.$q, lang)
          const $a = batchConvChildBlocks($qa.$a, lang)
          pblk.$qas.push({ $q, $a, slag: $qa.slag })
        })
        if (pblk.$qas.length > 0) {
          return pblk
        }
      }
      return null
    }

    case "Slide":
      return _slide(blk, lang)

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
      case "Table":
      case 'Faq':
      case "Slide": {
        const nblk = convParentBlock(blk, lang)
        if (nblk !== null) {
          nblks.push(nblk)
        }
        break;
      }

      default: {
        const nblk = convChildBlock(blk, lang)
        if (nblk !== null) {
          nblks.push(nblk)
        }
        break;
      }
    }
  }
  return nblks
}

export function convAncestorBlock(blk: AncestorBlock<IsMulti>, lang: string): AncestorBlock<IsSingle> | null {
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

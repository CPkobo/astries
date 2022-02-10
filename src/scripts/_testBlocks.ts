const plain: PlainBlock<IsSingle> = {
    type: "Plain",
    $texts: ["akasatana"]
}

const list: ListBlock<IsSingle> = {
    type: "List",
    $texts: ["a", "b", "c"]
}

const define: DefineBlock<IsSingle> = {
    type: "Define",
    $texts: [["a", "b", "c"], ["d", "e"]]
}

const link: LinkBlock<IsSingle> = {
    type: "Link",
    $text: "Link",
    href: "/",
}

const img: ImageBlock<IsSingle> = {
    type: "Image",
    src: "/pict/mv01.jpg",
    $alt: "pict",
    href: "/"
}

const hd2: HeadingBlock<IsSingle> = {
    type: "Heading 2",
    $text: "akasatana"
}

const hd3: HeadingBlock<IsSingle> = {
    type: "Heading 3",
    $text: "akasatana"
}

const hd4: HeadingBlock<IsSingle> = {
    type: "Heading 4",
    $text: "akasatana"
}

const ih2: IconHeadingBlock<IsSingle> = {
    type: "Icon Heading 2",
    icon: "",
    $text: "akasatana"
}

const ih3: IconHeadingBlock<IsSingle> = {
    type: "Icon Heading 2",
    icon: "",
    $text: "akasatana"
}

const ih4: IconHeadingBlock<IsSingle> = {
    type: "Icon Heading 4",
    icon: "",
    $text: "akasatana"
}

const hero: HeroBlock<IsSingle> = {
    type: "Hero",
    $title: "HERO",
    $subtitle: "Hero...",
    src: "/pict/mv01.jpg",
    $alt: "hero"
}

const shero: SubHeroBlock<IsSingle> = {
    type: "Sub Hero",
    $title: "HERO",
    src: "/pict/mv01.jpg",
    $alt: "hero"
}

const bar: SubBarBlock<IsSingle> = {
    type: "Sub Bar",
    $title: "HERO",
}

const rels: RelativeBlock<IsSingle> = {
    type: "Relatives",
    $title: "関連記事",
    $articles: [
        {
            $title: "first",
            src: "/pict/mv01.jpg",
            $alt: "pict",
            $description: "this is first",
            href: "/"
        },
        {
            $title: "second",
            src: "/pict/mv01.jpg",
            $alt: "pict",
            $description: "this is second",
            href: "/"
        },
    ]
}

const mediaR: MediaTextBlock<IsSingle> = {
    type: "Media Right",
    src: "/pict/mv01.jpg",
    $alt: "pict",
    $blks: [plain, plain, list]
}

const mediaL: MediaTextBlock<IsSingle> = {
    type: "Media Left",
    src: "/pict/mv01.jpg",
    $alt: "pict",
    $blks: [define, ih2, hd4]
}

const ftr: FeaturesBlock<IsSingle> = {
    type: "Features",
    $items: [
        {
            $title: "hohoho",
            icon: "",
            $blks: [plain, plain]
        },
        {
            $title: "fufufu",
            icon: "",
            $blks: [list, define]
        }
    ]
}

const flw: FlowBlock<IsSingle> = {
    type: "Flow",
    $items: [
        {
            $blks: [plain, plain]
        },
        {
            $blks: [list, define]
        }
    ]
}

const gal: GallaryBlock<IsSingle> = {
    type: "Gallary",
    $blks: [img, img, img, img]
}

const hor: HorizontalBlock<IsSingle> = {
    type: "Horizontal",
    $items: [
        {
            img: "/pict/mv01.jpg",
            $title: "hori1",
            $blks: [plain, plain, plain]
        },
        {
            img: "/pict/mv01.jpg",
            $title: "hori2",
            $blks: [plain, plain, plain]
        },
        {
            img: "/pict/mv01.jpg",
            $title: "hori3",
            $blks: [plain, plain, plain]
        },
    ]
}

const tbl: TableBlock<IsSingle> = {
    type: "Table",
    $th: [
        "h1", "h2", "h3"
    ],
    $trs: [
        [
            plain,
            list,
            define
        ],
        [
            plain,
            define,
            list,
        ],
        [
            ih2, ih3, ih4
        ]
    ]
}

export const eachBlock = {
    plain, list, define, link, img,
    hd2, hd3, hd4, ih2, ih3, ih4, hero, shero, bar, rels,
    mediaR, mediaL, ftr, flw, gal, hor, tbl
}

export const arrayBlocks = [
    plain, list, define, link, img,
    hd2, hd3, hd4, ih2, ih3, ih4, hero, shero, bar, rels,
    mediaR, mediaL, ftr, flw, gal, hor, tbl
]


const plain: PlainBlock<string[]> = {
    type: "Plain",
    $texts: ["akasatana"]
}

const list: ListBlock<string[]> = {
    type: "List",
    $texts: ["a", "b", "c"]
}

const define: DefineBlock<string[][]> = {
    type: "Define",
    $texts: [["a", "b", "c"], ["d", "e"]]
}

const link: LinkBlock<string> = {
    type: "Link",
    $text: "Link",
    href: "/",
}

const img: ImageBlock<string> = {
    type: "Image",
    src: "/pict/mv01.jpg",
    $alt: "pict",
    href: "/"
}

const hd2: HeadingBlock<string> = {
    type: "Heading 2",
    $text: "akasatana"
}

const hd3: HeadingBlock<string> = {
    type: "Heading 3",
    $text: "akasatana"
}

const hd4: HeadingBlock<string> = {
    type: "Heading 4",
    $text: "akasatana"
}

const ih2: IconHeadingBlock<string> = {
    type: "Icon Heading 2",
    icon: "",
    $text: "akasatana"
}

const ih3: IconHeadingBlock<string> = {
    type: "Icon Heading 2",
    icon: "",
    $text: "akasatana"
}

const ih4: IconHeadingBlock<string> = {
    type: "Icon Heading 4",
    icon: "",
    $text: "akasatana"
}

const hero: HeroBlock<string> = {
    type: "Hero",
    $title: "HERO",
    $subtitle: "Hero...",
    src: "/pict/mv01.jpg",
    $alt: "hero"
}

const shero: SubHeroBlock<string> = {
    type: "Sub Hero",
    $title: "HERO",
    src: "/pict/mv01.jpg",
    $alt: "hero"
}

const bar: SubBarBlock<string> = {
    type: "Sub Bar",
    $title: "HERO",
}

const rels: RelativeBlock<string> = {
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

const mediaR: MediaTextBlock<string, string[], string[][]> = {
    type: "Media Right",
    src: "/pict/mv01.jpg",
    $alt: "pict",
    $blks: [plain, plain, list]
}

const mediaL: MediaTextBlock<string, string[], string[][]> = {
    type: "Media Left",
    src: "/pict/mv01.jpg",
    $alt: "pict",
    $blks: [define, ih2, hd4]
}

const ftr: FeaturesBlock<string, string[], string[][]> = {
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

const flw: FlowBlock<string, string[], string[][]> = {
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

const gal: GallaryBlock<string, string[], string[][]> = {
    type: "Gallary",
    $blks: [img, img, img, img]
}

const hor: HorizontalBlock<string, string[], string[][]> = {
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

const tbl: TableBlock<string, string[], string[][]> = {
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
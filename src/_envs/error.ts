export const errorPageOld: PageContentsWithNav = {
  prev: {
    title: "top",
    href: "/",
  },
  next: {
    title: "top",
    href: "/",
  },
  back: {
    title: "top",
    href: "/"
  },
  name: "Page Not Found",
  position: -1,
  langs: [],
  $title: "Not Found",
  $description: "Page Not Found",
  $summary: "Page Not Found",
  href: "/",
  img: "gb-logo.png",
  contents: [
    {
      type: "Heading 2",
      $text: "Page Not Found"
    },
    {
      type: "Image",
      src: "https://http.cat/404",
      $alt: "404"
    },
    {
      type: "Link",
      $text: "Back to TOP",
      href: "/"
    }
  ]
}


export const errorTOC: CategoryIndex<IsSingle> = {
  name: "ERROR TOC",
  position: -1,
  $heading: "Under Construction",
  langs: [],
  root: "/",
  data: [],
}

export const errorPage: PageContentsWithCategory = {
  name: "Page Not Found",
  position: -1,
  langs: [],
  $title: "Not Found",
  $description: "Page Not Found",
  $summary: "Page Not Found",
  href: "/",
  img: "gb-logo.png",
  contents: [
    {
      type: "Heading 2",
      $text: "Page Not Found"
    },
    {
      type: "Image",
      src: "https://http.cat/404",
      $alt: "404"
    },
    {
      type: "Link",
      $text: "Back to TOP",
      href: "/"
    }
  ],
  category: errorTOC
}

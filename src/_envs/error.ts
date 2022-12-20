export const errorPage: PageContentsWithNav = {
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
  path: "/",
  fullpath: "/",
  img: "gb-logo.svg",
  pageType: "LeftMain",
  links: [],
  contents: [
    {
      type: "heading 2",
      $text: "Page Not Found"
    },
    {
      type: "image",
      src: "https://http.cat/404",
      $alt: "404"
    },
    {
      type: "link",
      $text: "Back to TOP",
      href: "/"
    }
  ]
}


export const errorNav: NavigationMenu = {
  category: "Under Construction",
  root: "/404",
  links: []
}

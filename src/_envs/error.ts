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
  href: "/",
  img: "gb-logo.svg",
  pageType: "LeftMain",
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


export const errorNav: NavigationMenu = {
  category: "Under Construction",
  root: "/404",
}

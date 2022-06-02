import { config } from "../../contents/astries.config"

export const { profile } = config

const locales: string[] = []
profile.Langs.forEach(lang => {
  locales.push(lang.locale)
})

export const defaultJsonLd: JsonLdWebsite = {
  "@context": "http://schema.org",
  "@type": "website",
  name: profile.OrganizationName,
  inLanguage: locales,
  publisher: {
    "@type": "Organization",
    name: profile.OrganizationName,
    logo: {
      "@type": "ImageObject",
      url: `${profile.url}/pict/gb-golo.png`,
    }
  },
  copyrightYear: "2022",
  headline: profile.SiteName,
  description: profile.SiteName,
  url: profile.url,
}
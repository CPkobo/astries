const fs = require("fs")
const glob = require("glob");
const { XMLParser, XMLBuilder } = require('fast-xml-parser')

function find(pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files)
    });
  })
}

function getYamlModifiedDates() {
  return new Promise((resolve, reject) => {
    const yamlPattern = './contents/**/*.yaml'
    const modDates = []
    find(yamlPattern)
      .then(yamls => {
        for (const yaml of yamls) {
          const lastMod = fs.statSync(yaml).mtime
          modDates.push({
            name: yaml.replace('./contents/', '').replace('.yaml', '/'),
            lastMod,
          })
        }
        resolve(modDates)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function getMarkdownModifiedDates() {
  return new Promise((resolve, reject) => {
    const mdPattern = './posts/**/*.md'
    const modDates = []
    find(mdPattern)
      .then(mds => {
        for (const md of mds) {
          const lastMod = fs.statSync(md).mtime
          modDates.push({
            name: md.replace('./posts/', '').replace('.md', '/'),
            lastMod,
          })
        }
        resolve(modDates)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const prs = [getYamlModifiedDates(), getMarkdownModifiedDates()]
Promise.all(prs)
  .then(results => {
    const modDates = [...results[0], ...results[1]]
    const sitemap = fs.readFileSync('./dist/sitemap.xml').toString()
    const parser = new XMLParser()
    const xml = parser.parse(sitemap)
    for (const url of xml.urlset.url) {
      for (const modDate of modDates) {
        if (url.loc.endsWith(modDate.name)) {
          url.lastMod = modDate.lastMod
          break
        }
      }
    }
    const bulder = new XMLBuilder()
    const newXML = bulder.build(xml.urlset)
    const newSitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${newXML}</urlset>`
    fs.writeFileSync('./dist/sitemap.xml', newSitemap)
  })
  .catch(err => {
    console.log(err)
  }) 

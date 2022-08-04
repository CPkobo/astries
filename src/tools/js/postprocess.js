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

function replaceJSONLD() {
  const pattern = "./dist/**/*.html";
  find(pattern)
    .then(htmls => {
      for (const html of htmls) {
        let file = fs.readFileSync(html).toString()
        const jsonldStr = file.match(/&lt;!--JSONLD .* JSONLD\-\-&gt;/, file)
        if (jsonldStr === null) {
          console.log(`No json-ld strings in ${html}`)
        } else {
          const scriptTag = jsonldStr[0]
            .replace('&lt;!--JSONLD ', '')
            .replace(' JSONLD--&gt;', '')
            .replaceAll('&lt;', '<')
            .replaceAll('&gt;', '>')
            .replaceAll('&quot;', '"');
          file = file.replace(jsonldStr, scriptTag)
          fs.writeFileSync(html, file)
        }
      }
    })
    .catch(err => {
      console.error('glob error')
      console.log(err)
    })
}

function getYamlModifiedDates() {
  return new Promise((resolve, reject) => {
    const yamlPattern = './contents/**/*.yaml'
    const modDates = []
    find(yamlPattern)
      .then(yamls => {
        for (const yaml of yamls) {
          const lastmod = fs.statSync(yaml).mtime
          const modYear = lastmod.getFullYear();
          let modMonth = lastmod.getMonth() + 1;
          if (modMonth < 10) {
            modMonth = `0${modMonth}`
          }
          let modDay = lastmod.getDate();
          if (modDay < 10) {
            modDay = `0${modDay}`
          }
          modDates.push({
            name: yaml.replace('./contents/', '').replace('.yaml', '/'),
            lastmod: `${modYear}-${modMonth}-${modDay}`,
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
          const lastmod = fs.statSync(md).mtime
          const modYear = lastmod.getFullYear();
          let modMonth = lastmod.getMonth() + 1;
          if (modMonth < 10) {
            modMonth = `0${modMonth}`
          }
          let modDay = lastmod.getDate();
          if (modDay < 10) {
            modDay = `0${modDay}`
          }
          modDates.push({
            name: md.replace('./posts/', '').replace('.md', '/'),
            lastmod: `${modYear}-${modMonth}-${modDay}`,
          })

        }
        resolve(modDates)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function replaceSitemap() {
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
            url.lastmod = modDate.lastmod
            break
          }
        }
      }
      const bulder = new XMLBuilder()
      const newXML = bulder.build(xml.urlset)
      const newSitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${newXML}</urlset>`

      fs.writeFileSync('./dist/sitemap.xml', newSitemap.replaceAll('<', '\n<').replaceAll('>', '>\n').replaceAll('\n\n', '\n'))
    })
    .catch(err => {
      console.log(err)
    })
}


replaceJSONLD()
replaceSitemap()
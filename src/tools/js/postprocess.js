const fs = require("fs")
const glob = require("glob");
const { h } = require("vue");

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




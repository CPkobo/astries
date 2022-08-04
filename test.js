// const axios = require('axios')

// async function getMt(text) {
//     const req = axios.create({
//         baseURL: 'https://api-free.deepl.com',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         responseType: 'json'
//     })
//     const url = `v2/translate?auth_key=8491fccf-d6a1-723b-6f92-3bc3e3b9c779:fx`
//     const params = {
//         text,
//         source_lang: 'JA',
//         target_lang: 'ZH'
//     }
//     const res = await req.post(url, params)
//     console.log(res.data)
//     const mt = JSON.parse(res.data).translated[0].text
//     console.log(mt)
// }

// getMt('こんにちは')

async function getMT() {
    const deepl = require('deepl-node')
    const translator = new deepl.Translator('8491fccf-d6a1-723b-6f92-3bc3e3b9c779:fx');
    const result = await translator.translateText('Hello, world!', null, 'zh');
    console.log(result.text); // Bonjour, le monde !
}

getMT()
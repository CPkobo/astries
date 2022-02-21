export const LANGS = ["ja", "zh", "en"] as const
export const DEF_LANG = LANGS[0]
export const LANG_DISPS = ["日本語", "中文", "ENGLISH"] as const

const langsets = []
for (const i in LANGS) {
    langsets.push([LANGS[i], LANG_DISPS[i]])
}

export const LANGSETS = langsets

export const prof: Profile = {
    "SiteName": "株式会社ゴールデンブリッジ 公式Webサイト",
    "OrganizationName": "株式会社ゴールデンブリッジ",
    "Tel": "06-6543-6898",
    "Fax": "06-7635-9508",
    "url": "https://goldenbridge2002.com",
    "Email": "trans@goldenbridge",
    "Langs": [
        {
            "locale": "ja",
            "display": "日本語"
        },
        {
            "locale": "zh",
            "display": "中文"
        },
        {
            "locale": "en",
            "display": "ENGLISH"
        }
    ],
    "deflang": "ja"
}
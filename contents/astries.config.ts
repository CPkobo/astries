
// Created by Astries Toybox
export type AstriesConfig = {
  profile?: Profile,
  navs?: Partial<I18nNavMenu>,
  staticDirs?: StaticDir[],
  staticPaths?: StaticPath[],
  staticPosts?: StaticPost[],
  staticPostPages?: StaticPostPagenate[],
}

export const config: AstriesConfig = {
  "profile": {
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
  },
  "navs": {
    "ja": [
      {
        "category": "会社概要",
        "root": "/about/toc",
        "items": [
          {
            "name": "information",
            "position": 1,
            "$title": "会社情報",
            "href": "/about/information",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの各種情報を掲載しています。",
            "langs": [
              "ja",
              "en"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "philosophy",
            "position": 2,
            "$title": "経営理念・社是",
            "href": "/about/philosophy",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの経営理念・社是についてご紹介します",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "message",
            "position": 3,
            "$title": "社長あいさつ",
            "href": "/about/message",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの社長 楊金峰よりご挨拶申し上げます",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "privacy policy",
            "position": 4,
            "$title": "プライバシーポリシー",
            "href": "/about/privacy",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジのプライバシーポリシーです",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "recruit",
            "position": 5,
            "$title": "採用・募集",
            "href": "/about/recruit",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの登録翻訳者・社内スタッフ募集ページです。",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      },
      {
        "category": "翻訳・通訳",
        "root": "/lang/toc",
        "items": [
          {
            "name": "Translation",
            "position": 1,
            "$title": "翻訳",
            "href": "/lang/translation",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの翻訳サービスの紹介です",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Interpretation",
            "position": 2,
            "$title": "通訳",
            "href": "/lang/interpretation",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの通訳サービスについての紹介です",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "online",
            "position": 3,
            "$title": "オンライン通訳",
            "href": "/lang/online",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジのオンライン通訳サービスについての紹介です",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Machine Translation",
            "position": 4,
            "$title": "機械翻訳",
            "href": "/lang/mt",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの機械翻訳の紹介です",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Past Works",
            "position": 5,
            "$title": "翻訳・通訳実績一覧",
            "href": "/lang/works",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの翻訳・通訳実績一覧です",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      },
      {
        "category": "EC",
        "root": "/ec/ec",
        "items": [
          {
            "name": "onlineshop",
            "position": 1,
            "$title": "Online Shop",
            "href": "/ec/ec",
            "img": "ec/shopping-bag.jpg",
            "$summary": "株式会社ゴールデンブリッジのオンラインショップ（EC）事業についての紹介です",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      },
      {
        "category": "IT事業",
        "root": "/it/toc",
        "items": [
          {
            "name": "cat",
            "position": 1,
            "$title": "翻訳支援ツール",
            "href": "/it/cat",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジで使用している翻訳支援ツール（CATツール）と、独自開発ツールについて紹介しています。",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Natural Language Processing",
            "position": 2,
            "$title": "自然言語処理",
            "href": "/it/nlp",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの機械翻訳・自然言語処理について紹介しています。",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "digital transformation",
            "position": 3,
            "$title": "DX・テレワーク",
            "href": "/it/dx",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジのデジタル・トランスフォーメーション（DX）と、テレワークの取り組みについて紹介しています。",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      },
      {
        "category": "その他",
        "root": "/others/toc",
        "items": [
          {
            "name": "edit",
            "position": 1,
            "$title": "編集・DTP",
            "href": "/others/edit",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの編集・ＤＴＰサービスの紹介です。翻訳成果物の録音・ナレーションや動画字幕、DTPなどご要望の形態に編集いたします。",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "INBOUND",
            "position": 2,
            "$title": "インバウンド交流事業",
            "href": "/others/inbound",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジのインバウンド事業の紹介です",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Training",
            "position": 3,
            "$title": "語学研修",
            "href": "/others/train",
            "img": "gb-logo.png",
            "$summary": "ビジネスに使える中国語を、経験豊富な講師が丁寧に指導いたします。オンラインやカスタマイズなども自由",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "copy right",
            "position": 4,
            "$title": "著作権登録",
            "href": "/others/copyright",
            "img": "gb-logo.png",
            "$summary": "株式会社ゴールデンブリッジの著作権登録サービスの紹介です。中国進出を考える日本企業へ、知財の視点からサポートを提供いたします",
            "langs": [
              "ja"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      }
    ],
    "zh": [],
    "en": []
  },
  "staticDirs": [
    {
      "params": {
        "dirs": "about"
      },
      "props": {
        "lang": "ja",
        "layout": "TOC"
      }
    },
    {
      "params": {
        "dirs": "lang"
      },
      "props": {
        "lang": "ja",
        "layout": "TOC"
      }
    },
    {
      "params": {
        "dirs": "it"
      },
      "props": {
        "lang": "ja",
        "layout": "TOC"
      }
    },
    {
      "params": {
        "dirs": "others"
      },
      "props": {
        "lang": "ja",
        "layout": "TOC"
      }
    }
  ],
  "staticPaths": [
    {
      "params": {
        "dirs": "about",
        "path": "information"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "about",
        "path": "philosophy"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "about",
        "path": "message"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "about",
        "path": "privacy"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "about",
        "path": "recruit"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "translation"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "interpretation"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "online"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "mt"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "works"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "ec",
        "path": "ec"
      },
      "props": {
        "lang": "ja",
        "layout": "Base"
      }
    },
    {
      "params": {
        "dirs": "it",
        "path": "cat"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "it",
        "path": "nlp"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "it",
        "path": "dx"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "others",
        "path": "edit"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "others",
        "path": "inbound"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "others",
        "path": "train"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    },
    {
      "params": {
        "dirs": "others",
        "path": "copyright"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain"
      }
    }
  ],
  "staticPosts": [
    {
      "params": {
        "dirs": "post",
        "path": "website-renewal-notice"
      },
      "props": {
        "title": "Webサイトをリニューアルしました"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "liaoning-export-2021"
      },
      "props": {
        "title": "遼寧省輸出展示会の運営をサポートしました"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "aiko-release"
      },
      "props": {
        "title": "医薬特化型AI 翻訳エンジン AIKO SciLingualをリリースしました"
      }
    }
  ],
  "staticPostPages": [
    {
      "params": {
        "dirs": "post",
        "pageNum": "1"
      }
    }
  ]
}

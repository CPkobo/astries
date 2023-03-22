
// Created by Astries Toybox
export type AstriesConfig = {
  profile?: Profile,
  navs?: Partial<I18nNavMenu>,
  staticTops?: StaticTop[],
  staticDirs?: StaticDir[],
  staticPaths?: StaticPath[],
  staticPosts?: StaticPost[],
  staticPostPages?: StaticPostPagenate[],
}

export const config: AstriesConfig = {
  "profile": {
    "SiteName": "中国語翻訳・通訳・インバウンド　株式会社ゴールデンブリッジ",
    "OrganizationName": "株式会社ゴールデンブリッジ",
    "Tel": "06-6543-6898",
    "Fax": "06-7635-9508",
    "url": "https://goldenbridge2002.com",
    "Email": "trans@goldenbridge2002.com",
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
            "path": "information",
            "fullpath": "/about/information",
            "img": "about/toc-information.jpg",
            "$summary": "株式会社ゴールデンブリッジの各種情報を掲載しています",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "philosophy",
            "position": 2,
            "$title": "経営理念・社是",
            "path": "philosophy",
            "fullpath": "/about/philosophy",
            "img": "about/toc-philosophy.jpg",
            "$summary": "株式会社ゴールデンブリッジの経営理念・社是についてご紹介します",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "message",
            "position": 3,
            "$title": "社長あいさつ",
            "path": "message",
            "fullpath": "/about/message",
            "img": "about/toc-message.jpg",
            "$summary": "株式会社ゴールデンブリッジの社長 楊金峰よりご挨拶申し上げます",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "privacy policy",
            "position": 4,
            "$title": "プライバシーポリシー",
            "path": "privacy",
            "fullpath": "/about/privacy",
            "img": "about/toc-privacy.jpg",
            "$summary": "株式会社ゴールデンブリッジのプライバシーポリシーです。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "recruit",
            "position": 5,
            "$title": "採用・募集",
            "path": "recruit",
            "fullpath": "/about/recruit",
            "img": "about/toc-recruit.jpg",
            "$summary": "株式会社ゴールデンブリッジの登録翻訳者・社内スタッフ募集ページです。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "faq",
            "position": 6,
            "$title": "よくある質問",
            "path": "faq",
            "fullpath": "/about/faq",
            "img": "about/toc-information.jpg",
            "$summary": "翻訳・通訳などについてよくある質問をまとめました",
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
            "path": "translation",
            "fullpath": "/lang/translation",
            "img": "lang/toc/translation.jpg",
            "$summary": "株式会社ゴールデンブリッジの翻訳サービスの紹介です",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Interpretation",
            "position": 2,
            "$title": "通訳",
            "path": "interpretation",
            "fullpath": "/lang/interpretation",
            "img": "lang/toc/interpretation.jpg",
            "$summary": "株式会社ゴールデンブリッジの通訳サービスについての紹介です",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "online",
            "position": 3,
            "$title": "オンライン通訳",
            "path": "online",
            "fullpath": "/lang/online",
            "img": "lang/toc/online.jpg",
            "$summary": "株式会社ゴールデンブリッジのオンライン通訳サービスについての紹介です",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Machine Translation",
            "position": 4,
            "$title": "機械翻訳",
            "path": "mt",
            "fullpath": "/lang/mt",
            "img": "lang/toc/mt.png",
            "$summary": "株式会社ゴールデンブリッジの機械翻訳の紹介です",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Past Works",
            "position": 5,
            "$title": "翻訳・通訳実績一覧",
            "path": "works",
            "fullpath": "/lang/works",
            "img": "lang/toc/works.jpg",
            "$summary": "株式会社ゴールデンブリッジの翻訳・通訳実績一覧です",
            "langs": [
              "ja",
              "zh"
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
            "path": "ec",
            "fullpath": "/ec/ec",
            "img": "ec/shopping-bag.jpg",
            "$summary": "株式会社ゴールデンブリッジのオンラインショップ（EC）事業について紹介します",
            "langs": [
              "ja",
              "zh"
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
            "path": "cat",
            "fullpath": "/it/cat",
            "img": "it/toc/catovis-logo.svg",
            "$summary": "株式会社ゴールデンブリッジで使用している翻訳支援ツール（CATツール）と、独自開発ツールについて紹介しています",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Natural Language Processing",
            "position": 2,
            "$title": "自然言語処理",
            "path": "nlp",
            "fullpath": "/it/nlp",
            "img": "it/toc/nlp.jpg",
            "$summary": "株式会社ゴールデンブリッジの機械翻訳・自然言語処理について紹介しています",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "digital transformation",
            "position": 3,
            "$title": "DX・テレワーク",
            "path": "dx",
            "fullpath": "/it/dx",
            "img": "it/toc/dx.jpg",
            "$summary": "株式会社ゴールデンブリッジのデジタル・トランスフォーメーション（DX）と、テレワークの取り組みについて紹介しています",
            "langs": [
              "ja",
              "zh"
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
            "path": "edit",
            "fullpath": "/others/edit",
            "img": "others/toc/edit.jpg",
            "$summary": "株式会社ゴールデンブリッジの編集・ＤＴＰサービスの紹介です。翻訳成果物の録音・ナレーションや動画字幕、DTPなどご要望の形態に編集いたします。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "INBOUND",
            "position": 2,
            "$title": "インバウンド交流事業",
            "path": "inbound",
            "fullpath": "/others/inbound",
            "img": "others/toc/inbound.jpg",
            "$summary": "株式会社ゴールデンブリッジのインバウンド事業の紹介です",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Training",
            "position": 3,
            "$title": "語学研修",
            "path": "train",
            "fullpath": "/others/train",
            "img": "others/toc/train.jpg",
            "$summary": "ビジネスに使える中国語を、経験豊富な講師が丁寧に指導いたします。オンラインやカスタマイズなども自由自在",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "copy right",
            "position": 4,
            "$title": "著作権登録",
            "path": "copyright",
            "fullpath": "/others/copyright",
            "img": "others/toc/copyright.jpg",
            "$summary": "株式会社ゴールデンブリッジの著作権登録サービスの紹介です。中国進出を考える日本企業へ、知財の視点からサポートを提供いたします",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      }
    ],
    "zh": [
      {
        "category": "关于我们",
        "root": "/zh/about/toc",
        "items": [
          {
            "name": "information",
            "position": 1,
            "$title": "公司信息",
            "path": "information",
            "fullpath": "/zh/about/information",
            "img": "about/toc-information.jpg",
            "$summary": "关于株式会社金桥公司的各种信息",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "philosophy",
            "position": 2,
            "$title": "经营理念和社训",
            "path": "philosophy",
            "fullpath": "/zh/about/philosophy",
            "img": "about/toc-philosophy.jpg",
            "$summary": "介绍株式会社金桥的经营理念和社训",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "message",
            "position": 3,
            "$title": "社长致辞",
            "path": "message",
            "fullpath": "/zh/about/message",
            "img": "about/toc-message.jpg",
            "$summary": "来自株式会社金桥社长杨金峰的问候",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "privacy policy",
            "position": 4,
            "$title": "隐私政策",
            "path": "privacy",
            "fullpath": "/zh/about/privacy",
            "img": "about/toc-privacy.jpg",
            "$summary": "株式会社金桥公司的隐私政策。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "recruit",
            "position": 5,
            "$title": "招聘和招募",
            "path": "recruit",
            "fullpath": "/zh/about/recruit",
            "img": "about/toc-recruit.jpg",
            "$summary": "金桥公司注册译员和内部员工的招聘页面。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      },
      {
        "category": "笔译和口译",
        "root": "/zh/lang/toc",
        "items": [
          {
            "name": "Translation",
            "position": 1,
            "$title": "笔译",
            "path": "translation",
            "fullpath": "/zh/lang/translation",
            "img": "lang/toc/translation.jpg",
            "$summary": "介绍株式会社金桥的笔译服务",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Interpretation",
            "position": 2,
            "$title": "口译",
            "path": "interpretation",
            "fullpath": "/zh/lang/interpretation",
            "img": "lang/toc/interpretation.jpg",
            "$summary": "介绍株式会社的口译服务",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "online",
            "position": 3,
            "$title": "线上口译",
            "path": "online",
            "fullpath": "/zh/lang/online",
            "img": "lang/toc/online.jpg",
            "$summary": "介绍株式会社金桥的线上口译服务",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Machine Translation",
            "position": 4,
            "$title": "机械翻译",
            "path": "mt",
            "fullpath": "/zh/lang/mt",
            "img": "lang/toc/mt.png",
            "$summary": "金桥公司的机械翻译介绍。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Past Works",
            "position": 5,
            "$title": "笔译与口译成果一览",
            "path": "works",
            "fullpath": "/zh/lang/works",
            "img": "lang/toc/works.jpg",
            "$summary": "株式会社金桥的笔译与口译成果一览",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      },
      {
        "category": "网上商店",
        "root": "/zh/ec/ec",
        "items": [
          {
            "name": "onlineshop",
            "position": 1,
            "$title": "网上商店",
            "path": "ec",
            "fullpath": "/zh/ec/ec",
            "img": "ec/shopping-bag.jpg",
            "$summary": "介绍株式会社金桥的网上商店（EC）业务。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      },
      {
        "category": "IT领域",
        "root": "/zh/it/toc",
        "items": [
          {
            "name": "cat",
            "position": 1,
            "$title": "翻译工具",
            "path": "cat",
            "fullpath": "/zh/it/cat",
            "img": "it/toc/catovis-logo.svg",
            "$summary": "介绍株式会社金桥使用的翻译工具（CAT工具）以及我们独立开发的工具",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Natural Language Processing",
            "position": 2,
            "$title": "自然语言处理",
            "path": "nlp",
            "fullpath": "/zh/it/nlp",
            "img": "it/toc/nlp.jpg",
            "$summary": "介绍株式会社金桥的机械翻译和自然语言处理",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "digital transformation",
            "position": 3,
            "$title": "数字化转型（DX）和远程办公",
            "path": "dx",
            "fullpath": "/zh/it/dx",
            "img": "it/toc/dx.jpg",
            "$summary": "介绍金桥公司的数字化转型（DX）及其远程办公举措。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      },
      {
        "category": "其他",
        "root": "/zh/others/toc",
        "items": [
          {
            "name": "edit",
            "position": 1,
            "$title": "编辑和DTP（桌面出版）",
            "path": "edit",
            "fullpath": "/zh/others/edit",
            "img": "others/toc/edit.jpg",
            "$summary": "介绍株式会社金桥的编辑和DTP服务。我们可以将译文编辑成客户需要的形式，包括解说录音、视频字幕和DTP等。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "INBOUND",
            "position": 2,
            "$title": "入境交流业务",
            "path": "inbound",
            "fullpath": "/zh/others/inbound",
            "img": "others/toc/inbound.jpg",
            "$summary": "介绍株式会社金桥公司的入境业务",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "Training",
            "position": 3,
            "$title": "语言培训",
            "path": "train",
            "fullpath": "/zh/others/train",
            "img": "others/toc/train.jpg",
            "$summary": "经验丰富的l傲视将会认真指导学习商务中文。我们还有在线课程以及定制课程，可供自由选择",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          },
          {
            "name": "copy right",
            "position": 4,
            "$title": "著作权登记",
            "path": "copyright",
            "fullpath": "/zh/others/copyright",
            "img": "others/toc/copyright.jpg",
            "$summary": "介绍株式会社金桥的著作权登记服务的介绍。从知识产权角度为考虑希望开拓中国市场的日本公司提供支持与服务。",
            "langs": [
              "ja",
              "zh"
            ],
            "pageType": "LeftMain",
            "data": []
          }
        ]
      }
    ],
    "en": []
  },
  "staticTops": [
    {
      "params": {
        "path": "ja"
      },
      "props": {
        "lang": "ja",
        "layout": "LP",
        "isIndex": true,
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/ja"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/"
          }
        ]
      }
    },
    {
      "params": {
        "path": "zh"
      },
      "props": {
        "lang": "zh",
        "layout": "LP",
        "isIndex": true,
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/ja"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/"
          }
        ]
      }
    }
  ],
  "staticDirs": [
    {
      "params": {
        "dirs": "about"
      },
      "props": {
        "lang": "ja",
        "layout": "TOC",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/toc"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/toc"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "lang"
      },
      "props": {
        "lang": "ja",
        "layout": "TOC",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/toc"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/toc"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "it"
      },
      "props": {
        "lang": "ja",
        "layout": "TOC",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/it/toc"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/it/toc"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "others"
      },
      "props": {
        "lang": "ja",
        "layout": "TOC",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/toc"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/toc"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/about"
      },
      "props": {
        "lang": "zh",
        "layout": "TOC",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/toc"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/toc"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/lang"
      },
      "props": {
        "lang": "zh",
        "layout": "TOC",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/toc"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/toc"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/it"
      },
      "props": {
        "lang": "zh",
        "layout": "TOC",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/it/toc"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/it/toc"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/others"
      },
      "props": {
        "lang": "zh",
        "layout": "TOC",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/toc"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/toc"
          }
        ]
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
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/information"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/information"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "about",
        "path": "philosophy"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/philosophy"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/philosophy"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "about",
        "path": "message"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/message"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/message"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "about",
        "path": "privacy"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/privacy"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/privacy"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "about",
        "path": "recruit"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/recruit"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/recruit"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "about",
        "path": "faq"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/faq"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/faq"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "translation"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/translation"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/translation"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "interpretation"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/interpretation"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/interpretation"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "online"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/online"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/online"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "mt"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/mt"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/mt"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "lang",
        "path": "works"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/works"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/works"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "ec",
        "path": "ec"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/ec/ec"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/ec/ec"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "it",
        "path": "cat"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/it/cat"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/it/cat"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "it",
        "path": "nlp"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/it/nlp"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/it/nlp"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "it",
        "path": "dx"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/it/dx"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/it/dx"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "others",
        "path": "edit"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/edit"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/edit"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "others",
        "path": "inbound"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/inbound"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/inbound"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "others",
        "path": "train"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/train"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/train"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "others",
        "path": "copyright"
      },
      "props": {
        "lang": "ja",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/copyright"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/copyright"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/about",
        "path": "information"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/information"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/information"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/about",
        "path": "philosophy"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/philosophy"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/philosophy"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/about",
        "path": "message"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/message"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/message"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/about",
        "path": "privacy"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/privacy"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/privacy"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/about",
        "path": "recruit"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/about/recruit"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/about/recruit"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/lang",
        "path": "translation"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/translation"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/translation"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/lang",
        "path": "interpretation"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/interpretation"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/interpretation"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/lang",
        "path": "online"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/online"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/online"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/lang",
        "path": "mt"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/mt"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/mt"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/lang",
        "path": "works"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/lang/works"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/lang/works"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/ec",
        "path": "ec"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/ec/ec"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/ec/ec"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/ec",
        "path": "ec"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/ec/ec"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/ec/ec"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/it",
        "path": "cat"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/it/cat"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/it/cat"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/it",
        "path": "nlp"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/it/nlp"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/it/nlp"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/it",
        "path": "dx"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/it/dx"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/it/dx"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/others",
        "path": "edit"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/edit"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/edit"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/others",
        "path": "inbound"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/inbound"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/inbound"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/others",
        "path": "train"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/train"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/train"
          }
        ]
      }
    },
    {
      "params": {
        "dirs": "zh/others",
        "path": "copyright"
      },
      "props": {
        "lang": "zh",
        "layout": "LeftMain",
        "links": [
          {
            "lang": "ja",
            "displayName": "日本語",
            "url": "/others/copyright"
          },
          {
            "lang": "zh",
            "displayName": "中文",
            "url": "/zh/others/copyright"
          }
        ]
      }
    }
  ],
  "staticPosts": [
    {
      "params": {
        "dirs": "post",
        "path": "20230322-ma-cream"
      },
      "props": {
        "title": "高保湿クリーム「純雪肌 まーくりーむ」100gを入荷しました！"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20230316-shandong-OOH"
      },
      "props": {
        "title": "【インバウンド事業再開】山東省屋外広告協会訪日視察・交流団が来日しました"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20230104-new-year"
      },
      "props": {
        "title": "新年明けましておめでとうございます"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20221222-report-online-ux"
      },
      "props": {
        "title": "【リモート同時通訳レポート】UX調査・オンラインインタビューの日中同時通訳"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20220922-kankeiren-jc50"
      },
      "props": {
        "title": "【同時通訳・ハイブリッド会議運営レポート】関西経済連合会 日中国交正常化50周年記念事業"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20220922-jc-high-level-forum"
      },
      "props": {
        "title": "【同時通訳レポート】第一回日中科学技術交流ハイレベルフォーラム"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20220824-taiwa-shandong"
      },
      "props": {
        "title": "【開催報告】対話山東2022―日本・山東シルバー産業協力交流会"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20220616rsi-report"
      },
      "props": {
        "title": "【同時通訳レポート】日中国交正常化50周年イベントにて"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "2022-interpreter-cource"
      },
      "props": {
        "title": "【受講生募集】短期集中！オンライン・教室ハイブリッド型通訳養成講座　日⇔中　中級コース"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "sanpo-yoshi"
      },
      "props": {
        "title": "【三方よし研究所】積善の家には必ず余慶あり"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20220519"
      },
      "props": {
        "title": "ニュースで話題のあの人、中国語でなんて言うの？"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "amani-shopinfo"
      },
      "props": {
        "title": "アマニ油の再入荷（5月20日）について"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "introduce-voov"
      },
      "props": {
        "title": "WEB会議ツール「VooV Meeting」日本語版のダウンロード・インストールの仕方"
      }
    },
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
        "path": "20220302"
      },
      "props": {
        "title": "近畿経産局「はなやかKANSAI魅力アップ事例集」に取り上げられました"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20220126"
      },
      "props": {
        "title": "漢方のど飴　オンラインショップの一番人気商品"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20220110"
      },
      "props": {
        "title": "第1回AIKO ウェビナー：中国語編 医学・医薬特化型AI翻訳エンジンの 実力と使い方"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20220101"
      },
      "props": {
        "title": "新年あけましておめでとうございます。"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20201209"
      },
      "props": {
        "title": "【無事終了】第二回オンライン勉強会＆第一回ZOOM同通体験会"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20201225"
      },
      "props": {
        "title": "【無事終了】第二回オンライン勉強会＆第一回ZOOM同通体験会"
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
    },
    {
      "params": {
        "dirs": "post",
        "path": "20211108"
      },
      "props": {
        "title": "AI翻訳　MTセミナーのご案内"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20210819"
      },
      "props": {
        "title": "「日中翻訳におけるＡＩ技術の応用」 オンラインセミナーのご案内"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20210530"
      },
      "props": {
        "title": "楽天「YOU樂SHOP」（ゆうらくしょっぷ）開店"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20210304"
      },
      "props": {
        "title": "【イベント通知】3月7日15時～「未来へつなげ、震災で結ばれた若き絆」中日青年オンライン交流会"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20200603"
      },
      "props": {
        "title": "オンライン、遠隔同時/逐次通訳承ります！"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20200805"
      },
      "props": {
        "title": "対話山東 日本・山東産業協力交流会がオンラインで開催"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20210101"
      },
      "props": {
        "title": "★新年のご挨拶★"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20200901"
      },
      "props": {
        "title": "事務所に遠隔同通センター設置！オンライン国際会議をサポート"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20200305"
      },
      "props": {
        "title": "守る、生き残る、共存共栄"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20200210-suport-for-wuhan"
      },
      "props": {
        "title": "中国へ支援物資を発送　NHKニュースで報道されました"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20200203"
      },
      "props": {
        "title": "ITソリューション部　設立のお知らせ"
      }
    },
    {
      "params": {
        "dirs": "post",
        "path": "20190105"
      },
      "props": {
        "title": "エベレストの山旅に行ってきました"
      }
    }
  ],
  "staticPostPages": [
    {
      "params": {
        "dirs": "post",
        "pageNum": "1"
      }
    },
    {
      "params": {
        "dirs": "post",
        "pageNum": "2"
      }
    },
    {
      "params": {
        "dirs": "post",
        "pageNum": "3"
      }
    },
    {
      "params": {
        "dirs": "post",
        "pageNum": "4"
      }
    }
  ]
}

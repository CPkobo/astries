
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
            "path": "information",
            "fullpath": "/about/information",
            "img": "about/toc-information.jpg",
            "$summary": "株式会社ゴールデンブリッジの各種情報を掲載しています",
            "langs": [
              "ja"
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
              "ja"
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
              "ja"
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
              "ja"
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
              "ja"
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
              "ja"
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
              "ja"
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
              "ja"
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
              "ja"
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
            "path": "ec",
            "fullpath": "/ec/ec",
            "img": "ec/shopping-bag.jpg",
            "$summary": "株式会社ゴールデンブリッジのオンラインショップ（EC）事業について紹介します",
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
            "path": "cat",
            "fullpath": "/it/cat",
            "img": "it/toc/catovis-logo.svg",
            "$summary": "株式会社ゴールデンブリッジで使用している翻訳支援ツール（CATツール）と、独自開発ツールについて紹介しています",
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
            "path": "nlp",
            "fullpath": "/it/nlp",
            "img": "it/toc/nlp.jpg",
            "$summary": "株式会社ゴールデンブリッジの機械翻訳・自然言語処理について紹介しています",
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
            "path": "dx",
            "fullpath": "/it/dx",
            "img": "it/toc/dx.jpg",
            "$summary": "株式会社ゴールデンブリッジのデジタル・トランスフォーメーション（DX）と、テレワークの取り組みについて紹介しています",
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
            "path": "edit",
            "fullpath": "/others/edit",
            "img": "others/toc/edit.jpg",
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
            "path": "inbound",
            "fullpath": "/others/inbound",
            "img": "others/toc/inbound.jpg",
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
            "path": "train",
            "fullpath": "/others/train",
            "img": "others/toc/train.jpg",
            "$summary": "ビジネスに使える中国語を、経験豊富な講師が丁寧に指導いたします。オンラインやカスタマイズなども自由自在",
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
            "path": "copyright",
            "fullpath": "/others/copyright",
            "img": "others/toc/copyright.jpg",
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
        "dirs": "about",
        "path": "faq"
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
        "layout": "LeftMain"
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
    }
  ]
}

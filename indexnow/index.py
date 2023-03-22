import requests

key = 'a7257b09f7754b85a387c7434459249d'
hosts = {
    'index_now': {
        'url': 'https://api.indexnow.org/indexnow',
        'use': True
    },
    'bing': {
        'url': 'https://www.bing.com/indexnow',
        'use': True
    },
    'seznam': {
        'url': 'https://search.seznam.cz/indexnow',
        'use': True
    },
    'yandex': {
        'url': 'https://yandex.com/indexnow',
        'use': True
    }
}

headers = {
    'Content-Type': 'application/json',
    'charset': 'utf-8',
}

body = {
    'host': 'www.goldenbridge2002.com/',
    'key': 'a7257b09f7754b85a387c7434459249d',
    'keyLocation': 'https://www.goldenbridge2002.com/a7257b09f7754b85a387c7434459249d.txt',
    'urlList': [
        'https://www.goldenbridge2002.com/posts/post/20220616rsi-report/'
        # 'https://www.goldenbridge2002.com/',
        # 'https://www.goldenbridge2002.com/about/faq/',
        # 'https://www.goldenbridge2002.com/about/information/',
        # 'https://www.goldenbridge2002.com/about/message/',
        # 'https://www.goldenbridge2002.com/about/philosophy/',
        # 'https://www.goldenbridge2002.com/about/privacy/',
        # 'https://www.goldenbridge2002.com/about/recruit/',
        # 'https://www.goldenbridge2002.com/about/toc/',
        # 'https://www.goldenbridge2002.com/ec/ec/',
        # 'https://www.goldenbridge2002.com/it/cat/',
        # 'https://www.goldenbridge2002.com/it/dx/',
        # 'https://www.goldenbridge2002.com/it/nlp/',
        # 'https://www.goldenbridge2002.com/it/toc/',
        # 'https://www.goldenbridge2002.com/lang/interpretation/',
        # 'https://www.goldenbridge2002.com/lang/mt/',
        # 'https://www.goldenbridge2002.com/lang/online/',
        # 'https://www.goldenbridge2002.com/lang/toc/',
        # 'https://www.goldenbridge2002.com/lang/translation/',
        # 'https://www.goldenbridge2002.com/lang/works/',
        # 'https://www.goldenbridge2002.com/others/copyright/',
        # 'https://www.goldenbridge2002.com/others/edit/',
        # 'https://www.goldenbridge2002.com/others/inbound/',
        # 'https://www.goldenbridge2002.com/others/toc/',
        # 'https://www.goldenbridge2002.com/others/train/',
        # 'https://www.goldenbridge2002.com/posts/post/2022-interpreter-cource/',
        # 'https://www.goldenbridge2002.com/posts/post/20190105/',
        # 'https://www.goldenbridge2002.com/posts/post/20200203/',
        # 'https://www.goldenbridge2002.com/posts/post/20200305/',
        # 'https://www.goldenbridge2002.com/posts/post/20200603/',
        # 'https://www.goldenbridge2002.com/posts/post/20200805/',
        # 'https://www.goldenbridge2002.com/posts/post/20200901/',
        # 'https://www.goldenbridge2002.com/posts/post/20201209/',
        # 'https://www.goldenbridge2002.com/posts/post/20201225/',
        # 'https://www.goldenbridge2002.com/posts/post/20210101/',
        # 'https://www.goldenbridge2002.com/posts/post/20210304/',
        # 'https://www.goldenbridge2002.com/posts/post/20210530/',
        # 'https://www.goldenbridge2002.com/posts/post/20210819/',
        # 'https://www.goldenbridge2002.com/posts/post/20211108/',
        # 'https://www.goldenbridge2002.com/posts/post/20220101/',
        # 'https://www.goldenbridge2002.com/posts/post/20220110/',
        # 'https://www.goldenbridge2002.com/posts/post/20220126/',
        # 'https://www.goldenbridge2002.com/posts/post/20220302/',
        # 'https://www.goldenbridge2002.com/posts/post/20220519/',
        # 'https://www.goldenbridge2002.com/posts/post/aiko-release/',
        # 'https://www.goldenbridge2002.com/posts/post/amani-shopinfo/',
        # 'https://www.goldenbridge2002.com/posts/post/introduce-voov/',
        # 'https://www.goldenbridge2002.com/posts/post/liaoning-export-2021/',
        # 'https://www.goldenbridge2002.com/posts/post/page-1/',
        # 'https://www.goldenbridge2002.com/posts/post/page-2/',
        # 'https://www.goldenbridge2002.com/posts/post/page-3/',
        # 'https://www.goldenbridge2002.com/posts/post/sanpo-yoshi/',
        # 'https://www.goldenbridge2002.com/posts/post/website-renewal-notice/',
    ]
}

for name, host in hosts.items():
    if host['use']:
        print(f'Sending to {name}')
        res = requests.post(host['url'], json=body, headers=headers)
        print(res.status_code)
        print(res.text)
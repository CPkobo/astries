import { readdirSync, readFileSync, statSync } from 'fs'
import fm from 'front-matter'
import { marked } from 'marked'
import { DirOperator } from './dirOperator'

export class PostPageGenerator {
  public posts: PostIndex[]
  public pagenatePaths: StaticPostPagenate[]
  public postPaths: StaticPost[]
  public pages: PostPagenation[]

  constructor() {
    this.posts = []
    this.pagenatePaths = []
    this.postPaths = []
    this.pages = [{
      title: 'ニュースリリース',
      pages: [],
      num: 1,
      prev: {
        title: '前のページへ',
        href: ''
      },
      next: {
        title: '次のページへ',
        href: '/posts/post/page-2'
      },
    }]
  }

  public execGenerator(dirope: DirOperator): {
    pagenatePaths: StaticPostPagenate[],
    postPaths: StaticPost[],
    pages: PostPagenation[],
  } {
    this.setPageInfos(dirope)
    return {
      pagenatePaths: this.pagenatePaths,
      postPaths: this.postPaths,
      pages: this.pages
    }
  }

  private setPageInfos(dirope: DirOperator): void {
    this.execCrawlPosts(dirope.root, dirope.posts)
    let count = 1
    for (const post of this.posts) {
      count++
      if (count > 10) {
        this.addPagenateInfo()
        count = 1
      }
      this.addPageInfo(post)
    }
    this.addPagenateInfo()
    if (this.pages[this.pages.length - 1].pages.length === 0) {
      this.pages = this.pages.slice(0, this.pages.length - 1);
    }
    this.pages[this.pages.length - 1].next.href = ''
  }

  private execCrawlPosts(root: string, posts: string[]): void {
    const imgstr = new RegExp('\\!\\[.*\\]\\((.*)\\)');
    const tagstr = new RegExp('\\<.*\\>', 'g')
    const lfstr = new RegExp('\\n', 'g')
    const crstr = new RegExp('\\r', 'g')
    for (const post of posts) {
      const target = DirOperator.join(root, post)
      const files = readdirSync(target).filter(val => {
        return val.endsWith('.md')
      })
      for (const file of files) {
        const path = DirOperator.join(target, file)
        const stat = statSync(path)
        const contents = fm<PostInfo>(readFileSync(path).toString())
        const summary = contents.attributes.summary
          ? contents.attributes.summary
          : marked(contents.body)
            .replace(tagstr, '')
            .trim()
            .replace(crstr, '')
            .replace(lfstr, '\n')
            .substring(0, 100)
        const index: PostIndex = {
          title: contents.attributes.title,
          published: contents.attributes.published,
          modified: contents.attributes.modified,
          pubstr: this.getISODayStr(contents.attributes.published),
          modstr: this.getISODayStr(contents.attributes.modified),
          image: contents.attributes.image,
          summary,
          href: file.replace('.md', '')
        }
        if (index.image === undefined) {
          const m = contents.body.match(imgstr)
          if (m !== null) {
            index.image = m[1]
          }
        }
        this.posts.push(index)
      }
    }
    this.posts.sort((a, b) => {
      if (a.modified === undefined) {
        if (b.modified === undefined) {
          return 0
        } else {
          return -1
        }
      } else if (b.modified === undefined) {
        if (a.modified === undefined) {
          return 0
        } else {
          return 1
        }
      } else {
        if (a.modified.getTime() > b.modified.getTime()) {
          return -1
        } else if (a.modified.getTime() < b.modified.getTime()) {
          return 1
        } else {
          return 0
        }
      }
    })
  }

  private addPagenateInfo(isEnded = false) {
    const last = this.pages.length + 1
    this.pages.push({
      title: 'ニュースリリース',
      pages: [],
      num: last,
      prev: {
        title: '前のページへ',
        href: `/posts/post/page-${last - 1}`
      },
      next: {
        title: isEnded ? '' : '次のページへ',
        href: isEnded ? '' : `/posts/post/page-${last + 1}`
      },
    })
    this.pagenatePaths.push({
      params: {
        dirs: 'post',
        pageNum: String(last - 1)
      },
    })
  }

  private addPageInfo(post: PostIndex) {
    this.postPaths.push({
      params: {
        dirs: 'post',
        path: post.href
      },
      props: {
        title: post.title
      }
    })
    const last = this.pages.length - 1
    this.pages[last].pages.push(post)
  }

  private getISODayStr(time: string | Date | undefined): string {
    if (time === undefined) {
      const date = new Date()
      return date.toISOString().split('T')[0]
    } else {
      const date = new Date(time)
      return date.toISOString().split('T')[0]
    }
  }
}

```jsx
{blks.map(blk => {
    const switcher = (blk: AnyBlock<IsSingle>) => {
      switch (blk.type) {
        case "heading 2":
          return (<Hd2 blk={blk} />)
          
        case "heading 3":
          return (<Hd3 blk={blk} />)
          
        case "heading 4":
          return (<Hd4 blk={blk} />)
          

          
        case  "Plain":
          return (<Plain blk={blk} />)
          
        case  "Link":
          return (<Link blk={blk} />)
          
        case  "Image":
          // return <Image blk={blk} />
          
        case  "List":
          return (<List blk={blk} />)
          
        case  "Define":
          return (<Define blk={blk} />)
          
        case  "Hero":
          return (<Hero blk={blk} />)
          
        case  "Sub Hero":
          return (<SubHero blk={blk} />)
          
        case  "Sub Bar":
          return (<SubBar blk={blk} />)
          
        case  "Spacer":
          return (<Spacer blk={blk} />)

        case  "Separator":
          return (<Separator blk={blk} />)
          
        case  "rawHTML":
          
        case  "Relatives":
          return (<Relatives blk={blk} />)

                    
        // case  "Media Right":
          // return <MediaRight blk={blk} />
          
        // case  "Media Left":
          // return <MediaLeft blk={blk} />
          
        // case  "Gallary":
          // return <Gallary blk={blk} />
          
        // case  "Features":
          // return <Features blk={blk} />
          
        // case  "Horizontal":
          // return <Horizontal blk={blk} />
          
        // case  "Flow":
          // return <Flows blk={blk} />
          
        // case  "Table":
          // return <Table blk={blk} />
          
        // case  "FLEX":
        //   return <Flexlayout blk={blk} />
        //   
        // case  "COLUMN":
        //   return <Columnlayout blk={blk} />
        //   
        default:
          return <p>hoge</p>
      }
    }
    return (
      <>
        <p>hey</p>
        {switcher(blk)}
      </>
    )
  })}
  ```

  ```jsx
  if (blk.href) {
      if (blk.href.startsWith("http")) {
        return (
          <a href={blk.href} target="_blank">
            <img src={blk.src} alt={blk.$alt} />
          </a>
        )
      } else {
        return (
          <a href={blk.href}>
            <img src={blk.src} alt={blk.$alt} />
          </a>
        )
      }  
    }
    return (<img src={blk.src} alt={blk.$alt} />)
  ```
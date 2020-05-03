import React, { useEffect , useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components'
import { loadFile } from './../utils/utils'
import MetaTags from './MetaTags'
import ContentFooter from "./ContentFooter"
import { setLastUIElement } from "../utils/eventLogging"
import { extractDataFromUrl } from "../utils/utils"


function Content(props) {
  const { location} = props
  const [content, setContent] = useState("")
  const [memo, setMemo] = useState({})
  const { catalogMap, categoryMap, catalog } = props

  const loadPost = (urlHandle) => {
    if(urlHandle !== "")
    {
      const onSuccess = (data) => {
        let newMemo = {...memo}
        newMemo[urlHandle] = data
        setMemo(newMemo)
        setContent(data)
      }
      const onAPIFailure = () => setContent("This page isn't available")
      const onCDNFailure = () => loadFile(`https://surran.github.io/mark-downs/${urlHandle}?`, onSuccess, onAPIFailure)
      loadFile(`https://surran.github.io/mark-downs/${urlHandle}`, onSuccess, onCDNFailure)
    }
  } 

  const loadPostIfApplicable = () => {
    const fromUrl = extractDataFromUrl()
    const {urlHandle, isReservedWord} = fromUrl
    const inMemo = !isReservedWord && urlHandle in memo
    if (!urlHandle || isReservedWord) setContent("")
    else if (inMemo) setContent(memo[urlHandle])
    else loadPost(urlHandle)
  }
  
  useEffect(loadPostIfApplicable, [location])

  const getCategory = () => {
    const fromUrl = extractDataFromUrl()
    const { categoryHandle } = fromUrl
    const noteObject = catalogMap[fromUrl.urlHandle]
    if (noteObject && noteObject.tags && noteObject.tags.length > 0 )
    {
      const matchingCategories = noteObject.tags.filter(tag => tag in categoryMap)
      const firstMatchingCategory = (matchingCategories.length > 0) ? matchingCategories[0] : false

      const categoryTitle = firstMatchingCategory &&
                            categoryMap[firstMatchingCategory].title
      const categoryHandle = firstMatchingCategory &&
                              categoryMap[firstMatchingCategory].handle
      if (categoryTitle && categoryHandle)
          return (<React.Fragment>&nbsp;>&nbsp;<Link onClick={() => setLastUIElement("BC")} to={`/${categoryHandle}`}>{categoryTitle}</Link></React.Fragment>)
    }
    return ""
  }

  const getNoteTitle = () => {
    const fromUrl = extractDataFromUrl()
    const noteObject = catalogMap[fromUrl.urlHandle]
    if (noteObject)
    {
      const noteTitle = noteObject.name
      return (<React.Fragment>&nbsp;>&nbsp;{noteTitle}</React.Fragment>)
    }
    return ""
  }

  const getNoteObject = () => {
    const fromUrl = extractDataFromUrl()
    return catalogMap[fromUrl.urlHandle]
  }

  const getNextNoteObject = () => {
    const thisNote = getNoteObject()
    if (thisNote)
    {
      const thisNoteCategoryTag = thisNote.tags && thisNote.tags.length > 0 && thisNote.tags[0]
      const thisNoteHandle = thisNote.handle
      let noteFoundFlag = false;
      let nextSerially, nextInCategory, firstNote;
      catalog.map(note => {
        if (!firstNote) firstNote = note
        if (noteFoundFlag && !nextSerially) nextSerially = note
        if (noteFoundFlag && !nextInCategory && thisNoteCategoryTag == note.tags[0])
          nextInCategory = note
        if(thisNoteHandle == note.handle) noteFoundFlag = true
      })
      return  nextInCategory || nextSerially || firstNote
    }
  }

  const noteObject = getNoteObject() || {}
  const {name, desc} = noteObject

  if (content === "") 
    return null
  else
    return (<div id="content">
              {name && <MetaTags title={name} description={desc} index={true}/>}
              <BreadCrumb><Link onClick={() => setLastUIElement("BC")} to="/">All Notes</Link>{getCategory()}{getNoteTitle()}</BreadCrumb>
              <div dangerouslySetInnerHTML={{__html:content}} />
              <ContentFooter thisNote={getNoteObject()}
                             catalogMap={catalogMap}
                             categoryMap={categoryMap}
                             nextNote={getNextNoteObject()}/>
            </div>)
}

export default withRouter(Content);

const BreadCrumb = styled.div`
  padding: 0px 10px;
`
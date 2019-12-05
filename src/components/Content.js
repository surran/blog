import React, { useEffect , useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components'
import { loadFile } from './../utils/utils'
import MetaTags from './MetaTags'


function Content(props) {
  const { location, reservedWords } = props
  const [content, setContent] = useState("")
  const [memo, setMemo] = useState({})
  const { catalogMap, categoryMap} = props

  const isReservedWordFunction = (word) => {
    return reservedWords.some(rword => rword == word)
  }

  const extractDataFromUrl = () => {
    const urlComponents = window.location.pathname.split("/")
    let urlHandle = false, isReservedWord = false, inMemo = false
    if (urlComponents.length >= 2)
    {
      urlHandle = urlComponents[1]
      isReservedWord = urlHandle && isReservedWordFunction(urlHandle)
      inMemo = !isReservedWord && urlHandle in memo
    }
    return { urlHandle, isReservedWord, inMemo }
  }

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
    const {urlHandle, isReservedWord, inMemo} = fromUrl
    if (!urlHandle || isReservedWord) setContent("")
    else if (inMemo) setContent(memo[urlHandle])
    else loadPost(urlHandle)
  }
  
  useEffect(loadPostIfApplicable, [location])

  const getCategory = () => {
    const fromUrl = extractDataFromUrl()
    const noteObject = catalogMap[fromUrl.urlHandle]
    if (noteObject)
    {
      const categoryTag = noteObject.tags && noteObject.tags.length > 0 &&noteObject.tags[0]
      const categoryTitle = categoryTag && categoryMap && 
                            categoryTag in categoryMap && 
                            categoryMap[categoryTag].title
      const categoryHandle = categoryTag && categoryMap && 
                             categoryTag in categoryMap &&
                             categoryMap[categoryTag].handle
      if (categoryTitle && categoryHandle)
        return (<React.Fragment>&nbsp;>&nbsp;<Link to={categoryHandle}>{categoryTitle}</Link></React.Fragment>)
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

  const noteObject = getNoteObject() || {}
  const {name, desc} = noteObject

  if (content === "") 
    return null
  else
    return (<div>
              <MetaTags title={name} description={desc}/>
              <BreadCrumb><Link to="/">All Notes</Link>{getCategory()}{getNoteTitle()}</BreadCrumb>
              <div dangerouslySetInnerHTML={{__html:content}} />
            </div>)
}

export default withRouter(Content);

const BreadCrumb = styled.div`
  padding: 0px 10px;
`
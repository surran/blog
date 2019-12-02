import React, { useEffect , useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components'
import { loadFile } from './../utils/utils'


function Content(props) {
  const { location, reservedWords } = props
  const [content, setContent] = useState("")
  const [memo, setMemo] = useState({})

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

  return (<div dangerouslySetInnerHTML={{__html:content}} />)
}

export default withRouter(Content);

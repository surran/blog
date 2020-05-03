import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { setLastUIElement } from '../utils/eventLogging'
import { getCategoryFromNoteHandle } from '../utils/utils'


function getNextNoteData(nextNote, catalogMap, categoryMap) {
	if ( nextNote && nextNote.handle) 
	{
		const nextHandleCategory = getCategoryFromNoteHandle(nextNote.handle, catalogMap, categoryMap)
		const nextUrl = `/${nextHandleCategory}/${nextNote.handle}`
		const nextTitle = nextNote && nextNote.name
		const nextDesc = nextNote && nextNote.desc
		return {nextUrl, nextDesc, nextTitle}
	}
	return {}
}

function ContentFooter(props) {
	const title = props.thisNote && props.thisNote.name
	const { nextNote, categoryMap, catalogMap } = props
	const { nextUrl, nextTitle, nextDesc } = getNextNoteData(nextNote, catalogMap, categoryMap)
	const currentUrl = window.location.href;
	const shareURL = {
		facebook: `https://www.facebook.com/sharer/sharer.php?caption=${title}&u=${currentUrl}`,
		twitter: `https://twitter.com/share?text=${title}&amp;url=${currentUrl}`
	}
	const sharePopup = (URL, event, title, dimension) => {
		window.open(URL, title, `width=${dimension.width},height=${dimension.height}`); 
		event.preventDefault(); 
		return false;
	}
	return (<Container>
				<SocialContainer>
					<div class="post-share">
						<ShareText>Share:</ShareText>
						<a class="twitter" 
						   href={shareURL.twitter} 
						   onClick= {(event) => { sharePopup(shareURL.twitter, 
									   						 event, 
									   						 "twitter-share", 
									   						 {width:550, height: 235})}}>
						   <SocialIcon src="/twitter.svg"/>
						</a>
						<a class="facebook" 
						   href={shareURL.facebook} 
						   onClick= {(event) => { sharePopup(shareURL.facebook, 
									   						 event, 
									   						 "facebook-share", 
									   						 {width:580, height: 296})}}>
						   <SocialIcon src="/facebook.svg" style={{backgroundColor: "white", width: "45px"}}/>
						</a>
					</div>
				</SocialContainer>
				<hr />
				<NameContainer>
				    <MeImg src="/me.jpg" />
					Surya Ranjan Shandil
				</NameContainer>
				
				{nextNote &&<NextContainer to={nextUrl} onClick = {() => { setLastUIElement("NX"); setTimeout(() => {document.getElementById("outer-container").scrollTop = 0}, 0)}}> 
							<NextPreTitle>Next:&nbsp;</NextPreTitle><NextTitle>{nextTitle}</NextTitle><br />
							{nextDesc}
							</NextContainer>}
    		</Container>)
}

export default ContentFooter

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 0px;
  width: 100%;
 `

 const SocialIcon = styled.img`
 width: 40px;
   vertical-align: middle;
 `

const ShareText = styled.span`
	padding: 12px;
	vertical-align: middle;
	font-size: 12px;
`

const SocialContainer = styled.div`
  padding: 15px;
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
`

const NameContainer = styled.div`
  padding: 5px 15px;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
  display:inline-block
`

const NextContainer = styled(Link)`
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
  width: calc(100% - 240px);
  display:inline-block;
  box-sizing: border-box;
  cursor: pointer;
  color: rgba(0,0,0,.75);
  text-decoration: none;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 750px) {
    width: 100%;
  }

`

const NextTitle = styled.span`
	color: #0c93e4;
	font-size: 16px;
`

const NextPreTitle = styled.span`
	font-weight: bold;
	font-size: 16px;
`

const MeImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  vertical-align: middle;
  margin: 15px;
`
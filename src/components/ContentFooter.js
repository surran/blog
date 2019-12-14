import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function ContentFooter(props) {
	const { title = "Terminal Notes"} = props
	const currentUrl = window.location.href;
	const shareURL = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
		twitter: `https://twitter.com/share?text=${title}&amp;url=${currentUrl}`
	}
	const sharePopup = (URL, event, title, dimension) => {
		window.open(URL, title, `width=${dimension.width},height=${dimension.height}`); 
		event.preventDefault(); 
		return false;
	}
	return (<Container>
				<div class="post-share">
					<ShareText>Share:</ShareText>
					<a class="twitter" 
					   href={shareURL.twitter} 
					   onClick= {(event) => { sharePopup(shareURL.twitter, 
								   						 event, 
								   						 "twitter-share", 
								   						 {width:550, height: 235})}}>
					   <SocialIcon src="twitter.svg"/>
					</a>
					<a class="facebook" 
					   href={shareURL.facebook} 
					   onClick= {(event) => { sharePopup(shareURL.facebook, 
								   						 event, 
								   						 "facebook-share", 
								   						 {width:580, height: 296})}}>
					   <SocialIcon src="facebook.svg" style={{backgroundColor: "white", width: "45px"}}/>
					</a>
				</div>
    		</Container>)
}

export default ContentFooter

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  font-size: 11px;
  margin: 0px;
  width: 100%;
  padding: 15px;
  text-align: right;
  vertical-align: middle;
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
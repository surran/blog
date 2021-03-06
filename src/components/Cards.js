import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'
import MetaTags from '@surran/meta-tags'
import CategoryTabs from './CategoryTabs';
import { getCategoryFromNoteHandle } from '../utils/utils'
import { setLastUIElement } from "@surran/events" 

function getColor() {
  const lightcolors = ["pink", "white", "#ccff99", "#ccffff"]
  const darkcolors = ["#ff3300", "#996600", "#99ff33", "#0099ff"]
  const colors = lightcolors
  const randomNumber = Math.floor(colors.length*Math.random())
  return colors[randomNumber]
}

function getRandomInt(min,max) {
  return Math.floor((max - min + 1)*Math.random())
}

function getSize(word) {
  const wordLength = word.length
  const minSize = 25, maxSize = 50
  const computedSize = Math.floor(30*(7/wordLength))
  if (computedSize < minSize) {
    return `${minSize}px`
  }
  if (computedSize > maxSize) {
    return `${maxSize}px`
  }   
  return `${computedSize}px`
}

function Cards(props) {
  const { cardsList, title, category, description, image, catalogMap, categoryMap } = props
  
  let metaDesc = "Web Development Solutions in "
  const cards = cardsList.map((card, index)=> {
    const { name, desc, handle, illustration : {text, image} } = card
    const categoryHandle = category && category.handle || getCategoryFromNoteHandle(handle, catalogMap, categoryMap)
    metaDesc += (index == 0 ? "" : (index == cardsList.length - 1) ? " and " : ", ") + text
    const words = text.split(" ").map(word => {
      return (<IllustrationText color={getColor()} fontSize={getSize(word)}>
                {word.toUpperCase()}
              </IllustrationText>)
    })
    return (<CardContainer to={`/${categoryHandle}/${handle}`} key={handle} onClick = {() => {setLastUIElement(undefined); setTimeout(() => {document.getElementById("outer-container").scrollTop = 0}, 0)}}>
              <Illustration>
                <IllustrationTextContainer>
                    {words}
                </IllustrationTextContainer>
              </Illustration>
              <Title>{name}</Title>
              <Desc>{desc}</Desc>
            </CardContainer>)
  })

  const getCategoryTitle = () => {
    const categoryTitle = category && category.title 
    if (categoryTitle)
      return (<React.Fragment>&nbsp;>&nbsp;{category.title}</React.Fragment>)
    else 
      return ""
  }

  const getHome = () => {
    if (category)
      return (<Link to="/"  onClick={() => setLastUIElement("BC")}>All Notes</Link>)
    else
      return null
  }

  /*points = {topLeft:{x:getRandomInt(0,50), y:0},
            topRight:{x:getRandomInt(0,50), y:0},
            bottomLeft:{x:getRandomInt(0,150), y:0},
            bottomRight:{x:getRandomInt(0,50), y:0},}
  */
  const categoryTitle = category && category.title 
  const imageUrl = image && image.url
  if (categoryTitle != "All" && cards.length > 0)
  {
    return (
    <Container>
      <MetaTags title={categoryTitle ? `${categoryTitle} - Terminal Notes` : undefined} 
                description={metaDesc} 
                image={imageUrl}/>
      {/*<BreadCrumb>{getHome()}{getCategoryTitle()}</BreadCrumb>*/}
      {/*<svg height="210" width="100%" style={{position:"absolute"}}>
        <polygon points="0,0 getRandomInt(),0 160,210 10,200" style={{fill:"#fcfcfc"}} />
        Sorry, your browser does not support inline SVG.
      </svg>*/}
      <Description>
        <L1 left={getRandomInt(0,40)} dangerouslySetInnerHTML={{__html: description.l1}}></L1>
        <L2 left={getRandomInt(0,40)} dangerouslySetInnerHTML={{__html: description.l2}}></L2>
        <L3 left={getRandomInt(0,40)} dangerouslySetInnerHTML={{__html: description.l3}}></L3>
      </Description>
      {/*<ContainerTitle>{title}</ContainerTitle>*/}
      {cards}
    </Container>
    );
  } 
  return null;
}

export default Cards

const Container = styled.div`
`
const ContainerTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0px 10px 5px;
`
const CardContainer = styled(Link)`
  width: 238px;
  display: inline-table;
  
  border-bottom: 1px solid #cccccc;
  margin: 6px; 
  height: 130px;
  padding: 3px;
  text-decoration: none;
  color: black;
  box-sizing: content;

  &:hover {
    background-color: #f5f5f5;
    margin: 0px;
    padding: 9px;
    border-bottom: 1px solid rgba(0,0,0,0)
  }

  @media (max-width: 1038px) and (min-width: 750px) {
    width: calc(33.33% - 18px)
  }
    @media (max-width: 749px) and (min-width: 500px) {
    width: calc(50% - 18px)
  }
  @media (max-width: 499px) {
    width: calc(100% - 18px);
    height: 75px;
  }
`

const Illustration = styled.div`
  width: 100%;
  display: block;
  color: white;
  text-align: center;
  height: 135px;
  position: relative;
  background-color: #3b3b65;
  box-sizing: border-box;
  }
`

const IllustrationTextContainer = styled.div`
    width: 70%; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
`

const IllustrationText = styled.p`
  //display: inline-block
  color: ${props => props.color};
  font-size: 30px;
  line-height: 1;
  margin: 0px;
  vertical-align: text-top;

  font-size: ${props => props.fontSize};
  overflow: hidden;
  font-family: 'Luckiest Guy', cursive;
  }
`

const Title = styled.a`
  font-size: 16px;
  text-decoration: none;
  color:  #0c93e4;
  cursor: pointer;
  width: 100%;
  margin-top: 13px;
  height: 52px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 499px) {
    height: 25px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`

const Desc = styled.div`
  font-size: 14px;
  margin-top: 5px;
  width: 100%;
  height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #222222;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (max-width: 499px) {
    height: 50px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

const BreadCrumb = styled.div`
  padding: 0px 10px;
  height: 30px;
  box-sizing: border-box
`

const Description = styled.div`
  padding: 40px 10px 50px;
  width: calc(100% - 20px);
  text-align: left;
  color:#353029;
  font-size: 18px;
  font-weight:200;
  background-color: #f4f6f7;

  @media (max-width: 1023px) {
    padding: 30px 30px 30px;
    margin: 0px;
    margin-bottom: 5px;
    margin-top: -40px;
    width: 100%;
    font-size: 17px;
    background-color: #e2e8eb;
  }

  margin: 10px;
  margin-top: 8px;
  margin-bottom: 20px;
  box-sizing: border-box;
`
const L1 = styled.div`
  margin-left:${props => props.left}px;
  transition: all 1s;
    @media (max-width: 749px) {
    margin-left: 0px;
}
`
const L2 = styled.div`
  margin-left:${props => props.left}px;
  transition: all 1s;
  @media (max-width: 749px) {
    margin-left: 0px;
}
`
const L3 = styled.div`
  color:#b956e4;
  transition: all 1s;
  margin-left:${props => props.left}px;
  @media (max-width: 749px) {
    margin-left: 0px;
    margin-top: 20px;
    font-size:19px;
  }
`
import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'
import MetaTags from './MetaTags'

function Cards(props) {
  const { cardsList, title, category } = props
  const cards = cardsList.map((card)=> {
    const { name, desc, handle } = card
    return (<CardContainer to={`/${handle}`} key={handle}>
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
      return (<Link to="/">All Notes</Link>)
    else
      return null
  }

  const categoryTitle = category && category.title 
  return (
    <Container>
      <MetaTags title={categoryTitle} />
      <BreadCrumb>{getHome()}{getCategoryTitle()}</BreadCrumb>
      <ContainerTitle>{title}</ContainerTitle>
      {cards}
    </Container>
  );
}

export default Cards

const Container = styled.div`
`
const ContainerTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 50px 0px 10px 5px;
`
const CardContainer = styled(Link)`
  width: 238px;
  display: inline-table;
  
  border-bottom: 1px solid #cccccc;
  margin: 6px; 
  height: 140px;
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

  @media (max-width: 1023px) and (min-width: 750px) {
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

const Title = styled.a`
  font-size: 16px;
  text-decoration: none;
  color:  #0c93e4;
  cursor: pointer;
  width: 100%;
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
  color: #888888;
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
`
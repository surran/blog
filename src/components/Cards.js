import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'


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
      return (<React.Fragment>All Notes</React.Fragment>)
  }

  return (
    <Container>
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
  width: 250px;
  display: inline-table;
  border: 1px solid #888888;
  border-radius: 5px; 
  margin: 5px; 
  height: 150px;
  padding: 5px;
  text-decoration: none;
  color: black;
  box-sizing: border-box;


  @media (max-width: 1023px) and (min-width: 750px) {
    width: calc(33.33% - 10px)
  }
    @media (max-width: 749px) and (min-width: 500px) {
    width: calc(50% - 10px)
  }
  @media (max-width: 499px) {
    width: calc(100% - 10px)
  }
`

const Title = styled.a`
  font-size: 16px;
  text-decoration: none;
  color:  #0c93e4;
  cursor: pointer;
`

const Desc = styled.div`
  font-size: 14px;
  margin-top: 5px;
`

const BreadCrumb = styled.div`
  padding: 0px 10px;
`
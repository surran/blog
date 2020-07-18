import React, {useState, useEffect} from 'react';
import { Link, withRouter} from "react-router-dom";
import styled from 'styled-components'
import CategoryTabs from './CategoryTabs';
import { setLastUIElement } from "@surran/events"


function Header(props) {
  const [showHeaderMenu, setShowHeaderMenu] = useState(false)
  const { categories, location: {pathname}, catalogMap } = props

  const categoryMenuItems = categories.map(category => {
    const { title, handle } = category
    return (<HeaderMenuItem key={handle}  
                            onClick={() => { setLastUIElement("M" + handle); setShowHeaderMenu(false)}} 
                            to={`/${handle}`}>
              {title.toUpperCase()}
            </HeaderMenuItem>)})


  return (
    <React.Fragment>
      <HeaderContainer>
        <Logo to="/" onClick={() => setLastUIElement("L")}><LogoText>TERMINAL NOTES_</LogoText><Title>Web Development Solutions</Title></Logo>
        <CategoryTabsContainer>
          <CategoryTabs categories={categories}/>
        </CategoryTabsContainer>
        {/*<MenuIcon onClick={() => setShowHeaderMenu(!showHeaderMenu)}>
          <svg height="50" width="50">
            <rect x="0" y="0" height="4" width="25" fill="black"></rect>
            <rect x="0" y="7" height="4" width="25" fill="black"></rect>
            <rect x="0" y="14" height="4" width="25" fill="black"></rect>
          </svg>
         </MenuIcon>*/}
      </HeaderContainer>
      {showHeaderMenu &&  <HeaderMenu>
                              {categoryMenuItems}
                          </HeaderMenu>}
     </React.Fragment>
  );
}

export default withRouter(Header);

const HeaderContainer = styled.div`
  height: 60px;
  line-height: 1;
  width: 100%;
  text-align: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 4px;
  z-index:10;
  position:fixed;
`
const CategoryTabsContainer = styled.div`
  float:right;
  @media only screen and (max-width: 1023px) {
    display:none;
  }
`
const MenuIcon = styled.div`
  float: right;
  padding: 20px;
  width: 65px;
  height: 60px;
  cursor: pointer;
  box-sizing: border-box

  @media only screen and (min-width: 1024px) {
    display:none;
  }
`
const HeaderMenu = styled.div`
  font-size: 16px;
  width: 100%;
  z-index: 5;
  position: absolute;
  top: 60px;
  left: 0px;
  padding: 20px
  box-shadow: rgba(0, 0, 0, 0.15) 0px 12px 14px;
  background-color: white;
  box-sizing: border-box;
  
  @media (min-width: 1024px) {
    display: none;
  }
`

const HeaderMenuItem = styled(Link)`
  width: 100%;
  height: 50px;
  display: block;
  padding: 10px;
  font-weight: 500;
  text-decoration: none !important;
  box-sizing: border-box;

  color: hsla(0, 0%, 6.7%, 0.6);
  cursor: pointer;
`
const Logo = styled(Link)`
  float:left;
  font-size: 30px;
  font-weight: bold;
  padding: 15px 0px 5px 40px;
  color: black;
  text-decoration: none;
  font-family: Monospace;

  @media only screen and (max-width: 450px) {
    padding: 21px 0px 15px 15px;
    font-size: 20px;
  }
`

const LogoText = styled.span`
  //font-family: 'Luckiest Guy', cursive;
  //font-weight: 100;
`

const Title = styled.span`
  font-size: 12px;
  font-weight: normal;
  vertical-align: middle;
  padding: 10px;
  display:inline-block;
  line-height: 1.4;

  @media only screen and (max-width: 659px) {
    display:none;
  }
  @media only screen and (min-width: 1024px) and (max-width: 1150px) {
    display:none;
  }
`
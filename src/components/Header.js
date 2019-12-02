import React, {useState} from 'react';
import { Link} from "react-router-dom";
import styled from 'styled-components'


function Header(props) {
  const [showHeaderMenu, setShowHeaderMenu] = useState(false)
  const { categories } = props
  const categoryTabs = categories.map(category => {
    const { title, handle } = category
    return (<HeaderButton key={handle} to={`/${handle}`}>{title}</HeaderButton>)})

  const categoryMenuItems = categories.map(category => {
    const { title, handle } = category
    return (<HeaderMenuItem key={handle} 
                            onClick={() => setShowHeaderMenu(false)} 
                            to={`/${handle}`}>
              {title}
            </HeaderMenuItem>)})


  return (
    <React.Fragment>
      <HeaderContainer>
        <Logo to="/">TERMINAL NOTES_<Title>(Everyday issues) => Simple solutions</Title></Logo>
        <HeaderBar>
          {categoryTabs}
        </HeaderBar>
        
        <MenuIcon onClick={() => setShowHeaderMenu(!showHeaderMenu)}>
          <svg>
            <rect x="0" y="0" height="4" width="25" fill="black"></rect>
            <rect x="0" y="7" height="4" width="25" fill="black"></rect>
            <rect x="0" y="14" height="4" width="25" fill="black"></rect>
          </svg>
        </MenuIcon>
      </HeaderContainer>
      {showHeaderMenu &&  <HeaderMenu>
                              {categoryMenuItems}
                          </HeaderMenu>}
     </React.Fragment>
  );
}

export default Header;

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

const HeaderBar = styled.div`
  float: right;
  padding: 0px 40px 0px 0px;

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
  text-decoration: none !important;
  box-sizing: border-box;

  color: blue;
  cursor: pointer;
`


const HeaderButton = styled(Link)`
  font-size: 16px;
  display:inline-block;
  text-decoration: none;
  margin: 14px 0px;
  padding: 10px 10px 5px;
  color: blue;
  cursor: pointer;
  font-size: 14px
`



const Logo = styled(Link)`
  float:left;
  font-size: 30px;
  font-weight: bold;
  padding: 15px 40px 5px;
  color: black;
  text-decoration: none;

  @media only screen and (max-width: 450px) {
    padding: 21px 0px 15px 15px;
    font-size: 20px;
  }
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
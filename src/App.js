import React, {useState, useEffect} from 'react';
import showdown from 'showdown'
import styled from 'styled-components'

function App() {
  const [content, setContent] = useState("")
  const converter = new showdown.Converter()


  const loadMarkDownFromFile = (filePath) => {
    fetch(filePath).then(function(res) {
          if (res.status >= 400) {
              throw new Error("Data Not Found");
          }
          return res.text();
      })
      .then(function(responseData) {
        setContent(responseData)
      });
  }

  useEffect(() => {    
      loadMarkDownFromFile("https://surran.github.io/mark-downs/VirtualHost.md") 
    },[])

  return (
    <React.Fragment>
      <div style={{height:"60px", width:"100%", textAlign:"center", backgroundColor:"white", boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 4px", zIndex:"10", position:"fixed"}}>
      <Logo>TERMINAL NOTES<Title>(Everyday issues) => Simple solutions</Title></Logo>
      <HeaderBar>
        <HeaderButton>Backend Setups</HeaderButton>
        <HeaderButton>Coding Practices</HeaderButton>
        <HeaderButton>Tech Explore</HeaderButton>
        <HeaderButton>SEO/Share</HeaderButton>
        <HeaderButton>Useful Tools</HeaderButton>
      </HeaderBar>
      </div>
      <OuterContainer>
        <Container dangerouslySetInnerHTML={{__html:content}}>
        </Container>
      </OuterContainer>
    </React.Fragment>
    
  );
}

export default App;

const HeaderBar = styled.div`
  float: right;
  padding: 0px 40px;
`
const HeaderButton = styled.div`
  font-size: 16px;
  display:inline-block;
  margin: 14px 0px;
  padding: 10px 10px;
  color: blue;
  cursor: pointer;
`

const Logo = styled.div`
  float:left;
  font-size: 30px;
  font-weight: bold;
  padding: 15px 40px;
`

const Title = styled.span`
  font-size: 12px;
  font-weight: normal;
  vertical-align: middle;
  padding: 10px;
  display:inline-block;
  line-height: 1.4;
`

const Container = styled.div`
  padding: 20px 0px;
  color: rgba(0,0,0,.75);

  width:100%;
  max-width: 1024px;
  margin: 0 auto;
  font-family: Lato,Helvetica Neue,Helvetica,sans-serif;
  font-variant-ligatures: common-ligatures;
  line-height: 1.67;`


const OuterContainer = styled.div`
  top: 60px;
  position: relative;
  background-color: #fcfcfc;
  width:100%;
  min-height: calc(100vh - 60px);
 `
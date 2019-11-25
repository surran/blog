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
      loadMarkDownFromFile("mark-downs/virtualHost.md") 
    },[])

  return (
    <OuterContainer>
      <Container dangerouslySetInnerHTML={{__html:converter.makeHtml(content)}}>
      </Container>
    </OuterContainer>
    
  );
}

export default App;

const Container = styled.div`
  padding: 20px 40px;
  color: rgba(0,0,0,.75);
  width:100%;
  max-width: 1024px;
  margin: 0 auto;
  font-family: Lato,Helvetica Neue,Helvetica,sans-serif;
  font-variant-ligatures: common-ligatures;
  line-height: 1.67;`


const OuterContainer = styled.div`
  background-color: #fcfcfc;
  width:100%;
  height: 100vh;
 `
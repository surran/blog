import React, {useState, useEffect} from 'react';
import { BrowserRouter as Switch, Route, Link} from "react-router-dom";
import styled from 'styled-components'
import { ErrorBoundary } from './components/ErrorBoundary'
import Cards from './components/Cards'
import Content from './components/Content'
import Header from './components/Header'
import MetaTags from './components/MetaTags'
import { loadFile } from './utils/utils'

function App() {
/* Data */
  const [catalog, setCatalog] = useState([])

  const CATEGORIES = [
    {handle: "backend", title: "Backend Setups",    searchTags: ["backend"]},
    {handle: "coding",  title: "Coding Practices",  searchTags: ["backend"]},
    {handle: "explore", title: "Tech Explore",      searchTags: ["backend"]},
    {handle: "share",   title: "SEO/Share",         searchTags: ["backend"]},
    {handle: "tools",   title: "Useful Tools",      searchTags: ["backend"]}
  ]

  let reservedWords = [""]
  reservedWords = reservedWords.concat(CATEGORIES.map(category => category.handle))

  const categoryRoutes = CATEGORIES.map(category => {
    const { handle, title } = category
    return (<Route  exact path={`/${handle}`} 
                    component={() =>(<Cards cardsList={filterCatalogByTag(handle)} title={`Notes on ${title}`}/>)} />)})

  const filterCatalogByTag = (tagTerm) => {
    return catalog.filter(post => post.tags.some(tag => tag == tagTerm ))
  }

  const loadCatalog = () => {
    let onSuccess = (data) => {setCatalog(JSON.parse(data));}
    loadFile("https://surran.github.io/mark-downs/index.json", onSuccess) 
  }

  /* on Mount */
  useEffect(() => {  
      loadCatalog()
    },[])

  return (
      <ErrorBoundary>  
        <Switch>
          <Header categories={CATEGORIES}/>   
          <MetaTags />
          <OuterContainer>
            <Container>          
              <Route exact path={"/"} 
                     component={() =>(<Cards cardsList={catalog} title="All Notes"/>)} />
              {categoryRoutes}
              {/* If none of the above routes match try the content route*/}
              <Route component={() =>(<Content reservedWords={reservedWords}/>)} />
            </Container>        
          </OuterContainer>

        </Switch>
      </ErrorBoundary>  

  );
}

export default App;

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
  height: calc(100vh - 60px);
  overflow-y: auto
 `
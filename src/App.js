import React, {useState, useEffect} from 'react';
import { BrowserRouter as Switch, Route, Link} from "react-router-dom";
import styled from 'styled-components'
import { ErrorBoundary } from './components/ErrorBoundary'
import Cards from './components/Cards'
import Content from './components/Content'
import Header from './components/Header'
import Footer from './components/Footer'
import SupplimentaryContent from './components/SupplimentaryContent'
import { loadFile } from './utils/utils'

function App() {
/* Data */
  const [catalog, setCatalog] = useState([])

  const CATEGORIES = [
    {handle: "backend",       title: "Backend Setups",    searchTags: ["backend"]},
    {handle: "coding",        title: "Coding Practices",  searchTags: ["coding"]},
    {handle: "explore",       title: "Tech Explore",      searchTags: ["explore"]},
    {handle: "share",         title: "SEO/Share",         searchTags: ["share"]},
    {handle: "tools",         title: "Useful Tools",      searchTags: ["tools"]},
  ]

  const SUPPLIMENTARY_CONTENT = [
    {handle: "privacy-policy",title: "Privacy Policy",    searchTags: ["tools"]},
    {handle: "terms-of-use",  title: "Terms of Use",      searchTags: ["tools"]}
  ]

  let catalogMap = {}
  catalog.map(note => {
    const { handle } = note;
    catalogMap[handle] = note
  })
  let categoryMap = {}
  CATEGORIES.map(category => {
    const { handle } = category
    categoryMap[handle] = category
  })

  let reservedWords = [""]
  reservedWords = reservedWords.concat(CATEGORIES.map(category => category.handle))
  reservedWords = reservedWords.concat(SUPPLIMENTARY_CONTENT.map(category => category.handle))

  const categoryRoutes = CATEGORIES.map(category => {
    const { handle, title } = category
    return (<Route  exact path={`/${handle}`} 
                    component={() =>(<Cards cardsList={filterCatalogByTag(handle)} 
                                            category={categoryMap[handle]} 
                                            title={`Notes on ${title}`}/>)} />)})

  const SupplimentaryContentRoutes = SUPPLIMENTARY_CONTENT.map(category => {
    const { handle} = category
    return (<Route  exact path={`/${handle}`} 
                    component={() =>(<SupplimentaryContent  handle={handle} />)} />)})

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
          <OuterContainer>
            <Container>          
              <Route exact path={"/"} 
                     component={() =>(<Cards cardsList={catalog} title="All Notes"/>)} />
              {categoryRoutes}
              {SupplimentaryContentRoutes}
              {/* If none of the above routes match try the content route*/}
              <Route component={() =>(<Content reservedWords={reservedWords} 
                                               catalogMap={catalogMap} 
                                               categoryMap={categoryMap}/>)} />
            </Container>
            <Footer />        
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
  min-height: calc(100vh - 128px);
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
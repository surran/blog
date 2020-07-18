import React, {useState, useEffect} from 'react';
import { BrowserRouter as Switch, Route, Link} from "react-router-dom";
import styled from 'styled-components'
import { ErrorBoundary } from './components/ErrorBoundary'
import Cards from './components/Cards'
import Content from './components/Content'
import Header from './components/Header'
import Footer from '@surran/footer'
import CATEGORIES from './data/categories'
import SUPPLIMENTARY_CONTENT from './data/supplimentaryContent'
import SupplimentaryContent from './components/SupplimentaryContent'
import { loadFile } from './utils/utils'
import CategoryTabs from './components/CategoryTabs';
import { initializeEvents, pauseEvents, resumeEvents, exitEvent } from "@surran/events" 

function App() {
/* Data */
  const [catalog, setCatalog] = useState([])

  const mainDescription = CATEGORIES[0].description

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

  const categoryRoutes = CATEGORIES.map(category => {
    const { handle, title, description, image } = category
    return (<Route  exact path={`/${handle}`} 
                    component={() =>(<Cards cardsList={filterCatalogByTag(handle)}
                                            categories={CATEGORIES}
                                            catalogMap={catalogMap}
                                            categoryMap={categoryMap}
                                            category={categoryMap[handle]} 
                                            title={`Notes on ${title}`}
                                            description={description}
                                            image={image} />)}/>)})

  const SupplimentaryContentRoutes = SUPPLIMENTARY_CONTENT.map(category => {
    const { handle} = category
    return (<Route  exact path={`/${handle}`} 
                    component={() =>(<SupplimentaryContent   handle={handle}/>)} />)})

  const filterCatalogByTag = (tagTerm) => {
    return catalog.filter(post => post.tags.some(tag => tag == tagTerm ))
  }

  const loadCatalog = () => {
    let onSuccess = (data) => {setCatalog(JSON.parse(data));}
    loadFile("https://surran.github.io/mark-downs/index.json", onSuccess) 
  }

  const attachTabCHangeListener = () => {
    document.addEventListener("visibilitychange", function() {
      if (document.hidden){
          pauseEvents()
      } else {
          resumeEvents()
      }
    });
    window.addEventListener('beforeunload', function(event) {
      exitEvent()
    });
  }

  /* on Mount */
  useEffect(() => {
      initializeEvents();
      loadCatalog();
      attachTabCHangeListener();
    },[])

  if (categoryRoutes.length > 0 && SupplimentaryContentRoutes.length > 0)
  return (
      <ErrorBoundary>  
        <Switch>
          <Header categories={CATEGORIES} catalogMap={catalogMap}/>
          
          <OuterContainer id = "outer-container">
            <CategoryTabsContainer>
              <CategoryTabs  categories={CATEGORIES} scrollableTabs/> 
            </CategoryTabsContainer>
            <Container >          
              <Route exact path={"/"} 
                     component={() =>(<Cards cardsList={catalog} 
                                             title="All Notes" 
                                             categories={CATEGORIES}
                                             catalogMap={catalogMap}
                                             categoryMap={categoryMap}
                                             description={mainDescription}/>)} />
              {categoryRoutes}
              {SupplimentaryContentRoutes}
              
              {/* If none of the above routes match try the content route */}
              <Route component={() =>(<Content catalogMap={catalogMap}
                                               catalog={catalog} 
                                               categoryMap={categoryMap}/>)} />
            </Container>

            <Footer leftText = {[{
                        type: "text",
                        value: "While using this site, you agree to have read and accepted our "},
                     {
                        type: "link",
                        value: "terms of use",
                        to: "/terms-of-use",
                        
                     },
                     {
                      type: "text",
                      value: ", "
                     },
                     {
                        type: "link",
                        value: "cookie and privacy policy",
                        to: "/privacy-policy",   
                     },
                     {
                        type: "text",
                        value: ". Copyright 2019. All Rights Reserved."
                     }
                    ]} />        
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
  overflow-y: scroll;
 `

 const CategoryTabsContainer = styled.div`
  width: 100%;
  height: 71px;
  position: absolute;
  margin-bottom: 20px;
  padding-left: 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #e2e8eb;
  position: relative;
  overflow: hidden;
  
  @media only screen and (min-width: 1024px) {
    display:none;
  }
`
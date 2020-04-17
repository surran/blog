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
    {handle: "",              title: "All",       searchTags: [""],
     description: {l1: "Setting up your first <b>Website</b>?",
                   l2: "Or setting sight for your <b>First 1000 Users</b>?",
                   l3: "A Developer's Notes on various aspects of <b>Web development</b>."}
    },
    {handle: "share",         title: "Growth",  searchTags: ["share"],
    description: {l1: "How often does your website appear on <b>Google Search</b>?",
                  l2: "How does it look when posted on <b>Facebook</b>?",
                  l3: "If you are thinking <b>Growth</b>, then these are vital concerns that need good solutions."}
    },
    {handle: "tools",         title: "Infrastructure",     searchTags: ["tools"],
    description: {l1: "What is the <b>Level of Automation</b> in your code deployment? Is there a <b>Downtime</b>?",
                  l2: "Is your deployment <b>Error Resistant</b> and <b>Failure Proof?",
                  l3: "Your website of tomorrow needs good scripts, tools and <b>Infrastructure</b> today."}
    },
    {handle: "backend",       title: "Backend",   searchTags: ["backend"],
    description: {l1: "How to configure your server to host <b>Multiple Websites</b>?",
                  l2: "How to get <b>Server Side Routing</b> right?",
                  l3: "Get started with basic backend <b>Configurations</b> for your website."}
    },
    {handle: "coding",        title: "Frontend",  searchTags: ["coding"],
    description: {l1: "What is the right <b>Construct</b> for embeddable applications?",
                  l2: "How to <b>Architect</b> parallel processing on browser?",
                  l3: "Explore the full potential of <b>Javascript.</b>"}
    },
    {handle: "explore",       title: "Projects",  searchTags: ["explore"],
    description: {l1: "Curious about building on <b>Ideas</b>?",
                  l2: "And writing your own application development story",
                  l3: "Take a look at things from a <b>Product Perspective</b>."}
    },  
  ]

  const mainDescription = CATEGORIES[0].description

  const SUPPLIMENTARY_CONTENT = [
    {handle: "privacy-policy",title: "Privacy Policy",    searchTags: ["tools"], noindex: true},
    {handle: "terms-of-use",  title: "Terms of Use",      searchTags: ["tools"], noindex: true}
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
    const { handle, title, description } = category
    return (<Route  exact path={`/${handle}`} 
                    component={() =>(<Cards cardsList={filterCatalogByTag(handle)}
                                            category={categoryMap[handle]} 
                                            title={`Notes on ${title}`}
                                            description={description} />)}/>)})

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

  /* on Mount */
  useEffect(() => {  
      loadCatalog()
    },[])

  return (
      <ErrorBoundary>  
        <Switch>
          <Header categories={CATEGORIES} catalogMap={catalogMap}/>   
          <OuterContainer id = "outer-container">
            <Container >          
              <Route exact path={"/"} 
                     component={() =>(<Cards cardsList={catalog} title="All Notes" description={mainDescription}/>)} />
              {categoryRoutes}
              {SupplimentaryContentRoutes}
              {/* If none of the above routes match try the content route */}
              <Route component={() =>(<Content reservedWords={reservedWords} 
                                               catalogMap={catalogMap}
                                               catalog={catalog} 
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
  overflow-y: scroll;
 `
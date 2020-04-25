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
import CategoryTabs from './components/CategoryTabs';
import { initializeEvents, pauseEvents, resumeEvents, exitEvent } from "./utils/eventLogging" 

function App() {
/* Data */
  const [catalog, setCatalog] = useState([])

  const CATEGORIES = [
    {handle: "",              title: "All",       searchTags: [""],
     description: {l1: "Setting up your first <em>Website</em>?",
                   l2: "Or setting sight for your <em>First 1000 Users</em>?",
                   l3: "A Developer's Notes on various aspects of <em>Web development</em>."}
    },
    {handle: "growth",         title: "Growth",  searchTags: ["share"],
    image: {url: "https://terminalnotes.com/growthImages/growth.png", alt: "Growth, Google SEO and Facebook Share"},
    description: {l1: "How often does your website appear on <em>Google Search</em>?",
                  l2: "How does it look when posted on <em>Facebook</em>?",
                  l3: "If you are thinking <em>Growth</em>, then these are vital concerns that need good solutions."}
    },
    {handle: "infrastructure",         title: "Infrastructure",     searchTags: ["tools"],
    image: {url: "growthImages/infrastructure.png", alt: "Infrastructure, Tool and Scripts"},
    description: {l1: "What is the <em>Level of Automation</em> in your code deployment? Is there a <b>Downtime</b>?",
                  l2: "Is your deployment <em>Error Resistant</em> and <em>Failure Proof?",
                  l3: "Your website of tomorrow needs good scripts, tools and <em>Infrastructure</em> today."}
    },
    {handle: "backend",       title: "Backend",   searchTags: ["backend"],
    image: {url: "https://terminalnotes.com/growthImages/backEnd.png", alt: "Backend, Configuration, Scripts and Database"},
    description: {l1: "How to configure your server to host <em>Multiple Websites</em>?",
                  l2: "How to get <em>Server Side Routing</em> right?",
                  l3: "Get started with basic backend <em>Configurations</em> for your website."}
    },
    {handle: "frontend",        title: "Frontend",  searchTags: ["coding"],
     image: {url: "https://terminalnotes.com/growthImages/frontEnd.png", alt: "Front End, Javascript and Coding"},
    description: {l1: "What is the right <em>Construct</em> for embeddable applications?",
                  l2: "How to <em>Architect</em> parallel processing on browser?",
                  l3: "Explore the full potential of <em>Javascript.</em>"}
    },
    {handle: "projects",       title: "Projects",  searchTags: ["explore"],
    image: {url: "https://terminalnotes.com/growthImages/all.png", alt: "Projects, Ideas, Explore and Applications"},
    description: {l1: "Curious about building on <em>Ideas</em>?",
                  l2: "And writing your own application development story",
                  l3: "Take a look at things from a <em>Product Perspective</em>."}
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
    const { handle, title, description, image } = category
    return (<Route  exact path={`/${handle}`} 
                    component={() =>(<Cards cardsList={filterCatalogByTag(handle)}
                                            categories={CATEGORIES}
                                            catalogMap={catalogMap}
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
              <CategoryTabs  categories={CATEGORIES} catalogMap={catalogMap} scrollableTabs/> 
            </CategoryTabsContainer>
            <Container >          
              <Route exact path={"/"} 
                     component={() =>(<Cards cardsList={catalog} 
                                             title="All Notes" 
                                             categories={CATEGORIES}
                                             catalogMap={catalogMap}
                                             description={mainDescription}/>)} />
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
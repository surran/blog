import { postData } from './utils'

const eventsStore = {}
  
export const initializeEvents = () => {
    const d = new Date();
    eventsStore.siteStartTime = d.getTime();
    eventsStore.pageStartTime = eventsStore.siteStartTime;
}

export const setLastUIElement = (elId) => {
    eventsStore.lastUIElement = elId
}

export const pageViewEvent = () => {
    const data = {type: "P", previousPage: eventsStore.previousPage}
    const d = new Date();  
    logEvent(data)
    eventsStore.previousPage = window.location.pathname
    eventsStore.pageStartTime = d.getTime();
}

/*
export const userEvent = (anchorId) => {
    const data = {type: "U", anchorId}
    logEvent(data)
}*/

function shortenPlatform(pf) {
    if(pf == "Linux x86_64") return "L1"
}

export const logEvent = (data) => {
    if (eventsStore.siteStartTime) {
        const {type, previousPage}  = data
        const resWidth = window.screen.width
        const resHeight = window.screen.height
        const clientWidth = document.body.clientWidth
        const clientHeight = document.body.clientHeight

        const url = window.location.pathname
        const d = new Date();
        const tz = d.getTimezoneOffset();
        const tStamp = Math.round((d.getTime() - 1587455104934)/1000) // seconds from when is started event logging//d.toLocaleString();
        const currentTime = d.getTime();
        const tPage = Math.round((currentTime - eventsStore.pageStartTime)/1000)
        const tSite = Math.round((currentTime - eventsStore.siteStartTime)/1000)
        const platform = shortenPlatform(navigator.platform)
        const anchorId = eventsStore.lastUIElement
        /*
        device: {
            type: String
        },
        ip: {
            type: String
        }*/
        data = {type, resWidth, resHeight, clientHeight, clientWidth, 
                url, tz, tStamp, tSite, tPage, platform, anchorId, previousPage}
        //console.log(data)
        //postData("https://terminalnotes.com/event/terminalNotes", data)
    }
}
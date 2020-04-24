import React, {useState, useEffect} from 'react';
import Helmet from "react-helmet";
import { withRouter} from "react-router-dom";
import { pageViewEvent } from '../utils/eventLogging'

function MetaTags(props) {
	const {location} = props
	const [locationPath, setLocationPath] = useState(location);
	if(locationPath != location) setLocationPath(location)
	useEffect(() => {
		pageViewEvent();
	},[locationPath])

	const {title = "Terminal Notes - Web Development Solutions",
		   description = "<em>Terminal Notes<em> Web Development Solutions in Javascript, HTML and Nodejs. A developer's notes on graphics, backend, deployment, database, front end and much more.",
	       type, 
	       imageUrl = "https://www.terminalnotes.com/growthImages/all.png",
	       index=true} = props
	return (<Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
    			<meta property="og:type" content={type} />
    			<meta property="og:image" content={imageUrl} />
    			<meta property="og:title" content={title} />
 				<meta property="og:description" content={description} />
 				<meta name="robots" content={index ? "index" : "noindex"} />
    		</Helmet>)
}

export default withRouter(MetaTags)
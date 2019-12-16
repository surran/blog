import React, {useState} from 'react';
import Helmet from "react-helmet";

function MetaTags(props) {
	const {title = "Terminal Notes",
	       description = "Simple solutions to everyday issues in web development.", type, imageUrl,
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

export default MetaTags
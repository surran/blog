import React from 'react';
import { data } from "./contentPagesData"
import MetaTags from './MetaTags'

const SupplimentaryContent = (props) => {
	const { handle } = props
	console.log(handle)
	console.log(data)
	const content = data[handle] || ""
	return (<div>
		       <MetaTags index={false}/>
		       <div dangerouslySetInnerHTML={{__html:content}} />
		    </div>)
}

export default SupplimentaryContent
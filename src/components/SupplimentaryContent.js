import React from 'react';
import { data } from "./contentPagesData"

const SupplimentaryContent = (props) => {
	const { handle } = props
	console.log(handle)
	console.log(data)
	const content = data[handle] || ""
	return (<div><div dangerouslySetInnerHTML={{__html:content}} /></div>)
}

export default SupplimentaryContent
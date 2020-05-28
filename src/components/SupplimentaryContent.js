import React from 'react';
import { data } from "./contentPagesData"
import styled from 'styled-components'
import MetaTags from './MetaTags'

const SupplimentaryContent = (props) => {
	const { handle } = props
	const content = data[handle] || ""
	return (<Container>
				<MetaTags index={false}/>
				<div dangerouslySetInnerHTML={{__html:content}} />
			</Container>)
}

export default SupplimentaryContent

const Container = styled.div`
	margin: 0 auto;
	max-width: 750px;
	padding: 0px 30px;
`
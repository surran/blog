import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Footer(props) {
	return (<Container>
				While using this site, you agree to have read and accepted our 
				&nbsp;<Link to="/terms-of-use">terms of use</Link>,&nbsp;
				<Link to="/privacy-policy">cookie and privacy policy</Link>.&nbsp;
Copyright 2019. All Rights Reserved.
    		</Container>)
}

export default Footer

const Container = styled.div`
  position: relative;
  background-color: #dddddd;
  box-sizing: border-box;
  font-size: 11px;
  margin: 0px;
  width: 100%;
  padding: 5px;
 `
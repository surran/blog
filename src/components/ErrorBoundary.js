import React from "react"
import styled from 'styled-components'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Container>Something went wrong.</Container>;
    }

    return this.props.children; 
  }
}

const Container = styled.div`
  padding: 80px 0px;
  color: rgba(0,0,0,.75);
  text-align: center;
  font-size: 25px;
  font-weight: bold

  width:100%;
  max-width: 1024px;
  margin: 0 auto;
  font-family: Lato,Helvetica Neue,Helvetica,sans-serif;
  font-variant-ligatures: common-ligatures;
  line-height: 1.67;`
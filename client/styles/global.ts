import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: whitesmoke;
    color: ${props => props.theme.colors.text};
    font: 400 16px Roboto, sans-serif;
  }
`

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  #root {
    height: 100vh;
    /* grid container settings */
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
      'header'
      'main'
      'footer';
  }

  #root > header {
    grid-area: header;
  }

  #root > main {
    grid-area: main;
    padding: 15px 5px 10px 5px;
  }

  #root > footer {
    grid-area: footer;
  } 
`;

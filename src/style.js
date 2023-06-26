import { css, styled } from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
   text-decoration: none;
   color: black;
   box-sizing: border-box;

  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
`;

export default GlobalStyle;

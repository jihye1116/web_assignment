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

export const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: white;
`;

export const HeaderTop = styled.div`
  height: 100px;

  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;

  margin: auto 20%;

  font-family: "GmarketSansTTFMedium";
`;

export const HeaderBottom = styled.div`
  margin: auto 20%;
  display: flex;
  flex-direction: row;

  font-family: "GmarketSansTTFMedium";

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const headerItem = styled.div`
  padding: 15px 25px;
  font-weight: 600;
  font-size: 15px;
  border-bottom: ${(props) => (props.isActive ? "2px solid #0b53e4" : "none")};
`;

export const LogoText = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: black;
`;

export const LoginButton = styled.button`
  color: black;
  border: none;
  height: 50px;
  font-size: 20px;
  font-weight: 600;

  background-color: inherit;
  cursor: pointer;

  font-family: "GmarketSansTTFMedium";
`;

export const User = styled.div`
  color: black;
  font-size: 20px;
  background-color: inherit;
`;

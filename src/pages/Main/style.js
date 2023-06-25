import { styled } from "styled-components";

export const Header = styled.header`
  position: sticky;
  top: 0;
  height: 100px;

  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid lightgray;
  margin-bottom: 1rem;
`;

export const LogoText = styled.div`
  font-size: 25px;
  color: black;
`;

export const LoginButton = styled.button`
  color: black;
  border: none;
  height: 50px;
  font-size: 20px;
  background-color: inherit;
  font-family: "GmarketSansTTFMedium";
  cursor: pointer;
`;

export const User = styled.div`
  color: black;
  font-size: 20px;
  background-color: inherit;
  font-family: "GmarketSansTTFMedium";
`;

export const PostBox = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc((100% - 20px) / 2), 1fr)
  );
  column-gap: 30px;
  row-gap: 30px;
`;

export const PostContainer = styled.div`
  padding: 20px 20px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  justify-content: space-between;
  background-color: aliceblue;
`;

export const PostContents = styled.div``;

export const PostBottom = styled.div``;

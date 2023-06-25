import { styled } from "styled-components";

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

import { styled } from "styled-components";

export const RatingBox = styled.div`
  margin: 0 auto;

  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }

  &:hover svg {
    color: black;
  }

  & svg:hover ~ svg {
    color: #c4c4c4;
  }

  .black {
    color: black;
  }
`;

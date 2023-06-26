import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 20%;
`;

export const Title = styled.input`
  padding: 10px;
  font-size: 30px;
  border: none;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;

  border: none;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

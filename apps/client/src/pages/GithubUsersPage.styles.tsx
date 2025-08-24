import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 1rem;
`;

export const MainTitle = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

export const SearchContainer = styled.div`
  width: 50%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

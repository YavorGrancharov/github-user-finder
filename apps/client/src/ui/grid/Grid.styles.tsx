import styled from "styled-components";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
`;

export const CellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  width: 150px;
  &:hover {
    cursor: pointer;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;

  opacity: 0;
  filter: blur(8px);
  transition: opacity 0.4s ease, filter 0.4s ease;

  &.loaded {
    opacity: 1;
    filter: blur(0);
  }
`;

export const StyledLabel = styled.div`
  margin-top: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

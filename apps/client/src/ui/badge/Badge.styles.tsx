import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const BadgeWrapper = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: green;
  color: white;
  font-weight: bold;
  font-size: 12px;
  min-width: 18px;
  height: 18px;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px white;
  user-select: none;
`;

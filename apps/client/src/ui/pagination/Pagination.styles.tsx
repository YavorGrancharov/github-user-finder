import styled from "styled-components";

export const PaginationWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "position",
})<{
  position: "start" | "center" | "end";
}>`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
  justify-content: ${(props) =>
    props.position === "start"
      ? "flex-start"
      : props.position === "end"
      ? "flex-end"
      : "center"};
`;

export const StyledButton = styled.button`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:hover:not(:disabled) {
    background-color: lightgray;
  }
`;

import styled from "styled-components";

const StyledHighlight = styled.b`
  background: #ffe505;
  border-radius: 2px;
`;

type HighlightProps = {
  textToHighlight: string;
  fullText: string;
};

export const Highlight = ({ textToHighlight, fullText }: HighlightProps) => {
  if (!textToHighlight) return fullText;
  const regex = new RegExp(`(${textToHighlight})`, "gi");
  if (/<\/?b>/i.test(textToHighlight)) return textToHighlight;
  const parts = fullText.split(regex);

  return parts.map((part, index) => {
    return part.toLowerCase() === textToHighlight.toLowerCase() ? (
      <StyledHighlight key={textToHighlight + index}>{part}</StyledHighlight>
    ) : (
      part
    );
  });
};

export default Highlight;

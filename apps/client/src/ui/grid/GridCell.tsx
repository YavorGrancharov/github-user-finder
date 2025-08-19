import { useState } from "react";
import { Badge } from "@ui";
import {
  CellWrapper,
  ImageWrapper,
  StyledImage,
  StyledLabel,
} from "./Grid.styles";

type GridCellProps = {
  label: string;
  imageUrl: string;
  count: number;
  onClick?: () => void;
};

export const GridCell = ({
  label,
  imageUrl,
  onClick,
  count,
}: GridCellProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const Image = (
    <StyledImage
      src={imageUrl}
      alt={label}
      loading="lazy"
      onLoad={(e) => {
        setIsLoaded(true);
        e.currentTarget.classList.add("loaded");
      }}
    />
  );

  return (
    <CellWrapper onClick={onClick}>
      <ImageWrapper>
        {count != null && count > 0 ? (
          <Badge count={isLoaded ? count : 0}>{Image}</Badge>
        ) : (
          Image
        )}
      </ImageWrapper>
      <StyledLabel>{label}</StyledLabel>
    </CellWrapper>
  );
};

export default GridCell;

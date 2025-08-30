import { useState } from "react";
import Badge from "@ui/badge/Badge";
import { GridItem } from "./Grid";
import {
  CellWrapper,
  ImageWrapper,
  StyledImage,
  StyledLabel,
} from "./Grid.styles";

type GridCellProps = Omit<GridItem, "id"> & {
  onCellClick: () => void;
};

export const GridCell = ({
  label,
  imageUrl,
  onCellClick,
  count,
}: GridCellProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const Image = (
    <StyledImage
      src={imageUrl}
      loading="lazy"
      onLoad={(e) => {
        setIsLoaded(true);
        e.currentTarget.classList.add("loaded");
      }}
    />
  );

  return (
    <CellWrapper onClick={onCellClick}>
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

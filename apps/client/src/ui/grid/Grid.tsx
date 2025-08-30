import { ReactNode } from "react";
import GridCell from "./GridCell";
import { GridWrapper } from "./Grid.styles";

export type GridItem = {
  id: number;
  label: ReactNode;
  imageUrl: string;
  count?: number;
  [key: string]: any;
};

type GridProps = {
  items: GridItem[];
  onClick?: (item: GridItem) => void;
};

export const Grid = ({ items, onClick }: GridProps) => {
  const handleOnClick = (item: GridItem) => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <GridWrapper>
      {items.map((item) => (
        <GridCell
          key={item.id}
          onCellClick={() => handleOnClick(item)}
          label={item.label}
          imageUrl={item.imageUrl}
          count={item.count ?? 0}
        />
      ))}
    </GridWrapper>
  );
};

export default Grid;

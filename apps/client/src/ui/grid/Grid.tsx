import { ReactNode } from "react";
import DataGridCell from "./GridCell";
import { GridWrapper } from "./Grid.styles";

export type GridItem = {
  id: number;
  label: ReactNode;
  imageUrl: string;
  count: number;
  onCellClick?: () => void;
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
        <DataGridCell
          key={item.id}
          onClick={() => handleOnClick(item)}
          label={item.label}
          imageUrl={item.imageUrl}
          count={item.count}
        />
      ))}
    </GridWrapper>
  );
};

export default Grid;

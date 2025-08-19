import DataGridCell from "./GridCell";
import { GridWrapper } from "./Grid.styles";

export type GridItem = {
  label: string;
  imageUrl: string;
  count: number;
  [key: string]: any;
};

type GridProps = {
  items: GridItem[];
  onCellClick?: (item: GridItem) => void;
};

export const Grid = ({ items, onCellClick }: GridProps) => {
  const handleOnClick = (item: GridItem) => {
    if (onCellClick) {
      onCellClick(item);
    }
  };

  return (
    <GridWrapper>
      {items.map((item) => (
        <DataGridCell
          key={item.label}
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

import { DEFAULT_PAGE_SIZE } from "shared";
import { Grid, Pagination, GridItem } from "@ui";
import { getInfoMessage } from "./utils";
import { InfoContainer } from "./DataGrid.styles";

type DataGridProps = {
  searchTerm: string;
  currentPage: number;
  items: GridItem[];
  totalItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onItemClick: (item: GridItem) => void;
  withMessage?: boolean;
};

export const DataGrid = ({
  searchTerm,
  currentPage,
  items,
  totalItems,
  isLoading,
  onPageChange,
  onItemClick,
  withMessage = true,
}: DataGridProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <>
      {withMessage && (
        <InfoContainer>
          {getInfoMessage(isLoading, !!items?.length, !!searchTerm)}
        </InfoContainer>
      )}
      <Grid items={items} onClick={(item) => onItemClick(item)} />
      {items && totalItems > DEFAULT_PAGE_SIZE && (
        <Pagination
          currentPage={currentPage}
          pageSize={DEFAULT_PAGE_SIZE}
          totalItems={totalItems}
          disabled={isLoading}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default DataGrid;

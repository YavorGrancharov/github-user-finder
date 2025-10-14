import { DEFAULT_PAGE_SIZE } from "shared";
import { Grid, Pagination, GridItem } from "github-search-ui";
import { getInfoMessage } from "./utils";
import InfoMessage from "@components/InfoMessage/InfoMessage";

type DataGridProps = {
  searchTerm: string;
  currentPage: number;
  items: GridItem[];
  totalItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onItemClick: (item: GridItem) => void;
};

export const DataGrid = ({
  searchTerm,
  currentPage,
  items,
  totalItems,
  isLoading,
  onPageChange,
  onItemClick,
}: DataGridProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const infoMessage = getInfoMessage(isLoading, !!items?.length, !!searchTerm);

  return (
    <>
      <InfoMessage message={infoMessage} />
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

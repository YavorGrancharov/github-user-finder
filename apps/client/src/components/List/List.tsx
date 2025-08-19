import { DEFAULT_PAGE_SIZE } from "shared";
import { Grid, GridItem, Pagination } from "@ui";
import { getInfoMessage } from "./utils";
import { InfoContainer } from "./List.styles";

type ListProps = {
  searchTerm: string;
  currentPage: number;
  items: GridItem[];
  totalItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onItemClick: (item: GridItem) => void;
};

export const List = ({
  searchTerm,
  currentPage,
  items,
  totalItems,
  isLoading,
  onPageChange,
  onItemClick,
}: ListProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <>
      <InfoContainer>
        {getInfoMessage(isLoading, !!items?.length, !!searchTerm)}
      </InfoContainer>
      <Grid items={items} onCellClick={(item) => onItemClick(item)} />
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

export default List;

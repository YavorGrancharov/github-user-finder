import Icon from "../icon/Icon";
import { goToPage } from "./utils";
import { PaginationWrapper, StyledButton } from "./Pagination.styles";

export type PaginationAction = "first" | "next" | "prev" | "last";

type PaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  maxItems?: number;
  disabled?: boolean;
  position?: "start" | "center" | "end";
};

export const Pagination = ({
  currentPage,
  pageSize,
  maxItems = 1000, // Github related
  totalItems,
  position = "center",
  disabled,
  onPageChange,
}: PaginationProps) => {
  const maxPages = Math.floor(maxItems / pageSize);
  const totalPages = Math.min(Math.ceil(totalItems / pageSize), maxPages);

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goTo = goToPage(currentPage, totalPages);

  return (
    <PaginationWrapper position={position}>
      Page: {currentPage} of {totalPages}
      <StyledButton
        disabled={!hasPrevPage || disabled}
        onClick={() => onPageChange(goTo("first"))}
      >
        <Icon icon="first_page" size={26} />
      </StyledButton>
      <StyledButton
        disabled={!hasPrevPage || disabled}
        onClick={() => onPageChange(goTo("prev"))}
      >
        <Icon icon="prev_page" size={26} />
      </StyledButton>
      <StyledButton
        disabled={!hasNextPage || disabled}
        onClick={() => onPageChange(goTo("next"))}
      >
        <Icon icon="next_page" size={26} />
      </StyledButton>
      <StyledButton
        disabled={!hasNextPage || disabled}
        onClick={() => onPageChange(goTo("last"))}
      >
        <Icon icon="last_page" size={26} />
      </StyledButton>
    </PaginationWrapper>
  );
};

export default Pagination;

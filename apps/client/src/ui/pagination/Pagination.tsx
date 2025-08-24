import Icon from "../icon/Icon";
import { goToPage } from "./utils";
import { PaginationWrapper, StyledButton } from "./Pagination.styles";

export type PaginationAction = "first" | "next" | "prev" | "last";

type PaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  position?: "start" | "center" | "end";
};

export const Pagination = ({
  currentPage,
  pageSize,
  totalItems,
  position = "center",
  disabled,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

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
        <Icon icon="first_page" />
      </StyledButton>
      <StyledButton
        disabled={!hasPrevPage || disabled}
        onClick={() => onPageChange(goTo("prev"))}
      >
        <Icon icon="prev_page" />
      </StyledButton>
      <StyledButton
        disabled={!hasNextPage || disabled}
        onClick={() => onPageChange(goTo("next"))}
      >
        <Icon icon="next_page" />
      </StyledButton>
      <StyledButton
        disabled={!hasNextPage || disabled}
        onClick={() => onPageChange(goTo("last"))}
      >
        <Icon icon="last_page" />
      </StyledButton>
    </PaginationWrapper>
  );
};

export default Pagination;

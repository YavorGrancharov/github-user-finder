import React from "react";
import { BadgeWrapper, Container } from "./Badge.styles";

type BadgeProps = {
  count: number;
  maxCount?: number;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Badge: React.FC<BadgeProps> = ({
  count,
  maxCount = 99,
  children,
  className,
  ...rest
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count;

  return (
    <Container className={className} {...rest}>
      {children}
      {count > 0 && <BadgeWrapper>{displayCount}</BadgeWrapper>}
    </Container>
  );
};

export default Badge;

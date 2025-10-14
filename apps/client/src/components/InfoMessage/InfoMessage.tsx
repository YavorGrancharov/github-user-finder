import styled from "styled-components";

export const InfoContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type InfoMessageProps = {
  message?: string;
};

export const InfoMessage = ({ message }: InfoMessageProps) => {
  return <>{message ? <InfoContainer>{message}</InfoContainer> : <></>}</>;
};

export default InfoMessage;

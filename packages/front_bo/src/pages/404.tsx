import { Image404 } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { NextPage } from "next";
import {colors} from "@academy-manager/ui";

const NotFoundPage: NextPage = () => {
  return (
    <ErrorContainer>
      <h1>404</h1>
      <img src={Image404.src} />
    </ErrorContainer>
  );
};

export default NotFoundPage;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  & > h1 {
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 5rem;
    color: ${colors.colors.white};
    text-shadow: 0 0 10px ${colors.colors.shadow};
  }
  & > img {
    width: 50%;
    height: auto;
    box-shadow: 0 0 10px ${colors.colors.shadow};
  }
`
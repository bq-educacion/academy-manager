import { styles, MButton, colors, useTranslate } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRouter } from "next/router";

export const ErrorContent: FC<{ error: number }> = ({ error }) => {
  const router = useRouter();
  const t = useTranslate();

  return (
    <ErrorContainer>
      <div>
        <styles.PG>{error}</styles.PG>
        <styles.P2>{t(`components.error-content.${error}.title`)}</styles.P2>
        <styles.P4>{t(`components.error-content.${error}.text`)}</styles.P4>
        <MButton
          text={t("components.error-content.button")}
          Click={() => {
            router.push("/");
          }}
        ></MButton>
      </div>
    </ErrorContainer>
  );
};

export default ErrorContent;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.colors.grayBlueTransparent};
  width: calc(100% - 250px);
  height: 100vh;
  padding-left: 250px;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100% - 60px);
    height: calc(100% - 80px);
    background-color: ${colors.colors.white};

    p:first-of-type {
      margin-bottom: 20px;
    }
    p:nth-of-type(2) {
      margin-bottom: 10px;
    }
    p:nth-of-type(3) {
      margin-bottom: 20px;
    }
  }
`;

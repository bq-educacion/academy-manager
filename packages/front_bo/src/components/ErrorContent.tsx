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
        <PGError>{error}</PGError>
        <P2Error>{t(`components.error-content.${error}.title`)}</P2Error>
        <P4Error>{t(`components.error-content.${error}.text`)}</P4Error>
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
  }
`;

const PGError = styled(styles.PG)`
  margin-bottom: 20px;
`;

const P2Error = styled(styles.P2)`
  margin-bottom: 10px;
`;

const P4Error = styled(styles.P4)`
  margin-bottom: 20px;
`;

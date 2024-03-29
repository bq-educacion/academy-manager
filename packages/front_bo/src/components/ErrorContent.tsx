import { styles, colors, useTranslate, Button } from "@academy-manager/ui";
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
        <Button
          main
          text={t("components.error-content.button")}
          onClick={() => {
            router.push("/");
          }}
        ></Button>
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
  width: 100%;
  height: 100vh;
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

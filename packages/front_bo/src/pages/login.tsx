import styled from "@emotion/styled";
import { NextPage } from "next";
import {
  BQLogoGray,
  colors,
  GoogleButton,
  styles,
  useTranslate,
} from "@academy-manager/ui";

const LogInPage: NextPage = () => {
  const t = useTranslate();

  return (
    <Layout>
      <BQLogoGray />
      <LogInBox>
        <LogInP2>{t("pages.login.title")}</LogInP2>
        <styles.RainbowDivider />
        <LogIn>
          <GoogleButton />
        </LogIn>
      </LogInBox>
    </Layout>
  );
};

export default LogInPage;

const Layout = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;

  & > svg {
    margin: 75px 0 40px 0;
  }
`;

const LogInBox = styled.div`
  box-shadow: 0 20px 60px 0 ${colors.colors.shadow1};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 440px;
  width: 393px;
`;

const LogInP2 = styled(styles.P2)`
  margin: 29px 0 26px 0;
`;

const LogIn = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

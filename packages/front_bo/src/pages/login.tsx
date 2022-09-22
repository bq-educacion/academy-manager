import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { v1 } from "uuid";
import queryString from "query-string";
import {
  BQLogoGray,
  colors,
  GoogleButton,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import withApollo from "../apollo/withApollo";
import { googleAuthEndpoint, googleScopes } from "../config";

const uuid = v1;

const appID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

export interface IloginProps {
  clientId?: string;
  redirectUri?: string;
}

const LogInPage: NextPage<IloginProps> = ({
  clientId = appID,
  redirectUri = "google-redirect",
}) => {
  const t = useTranslate();

  const router = useRouter();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();

    sessionStorage.setItem("googleAuthState", uuid());
    sessionStorage.setItem("googleAuthNonce", uuid());
    sessionStorage.setItem("googlePrevPathname", router.pathname);

    const location = window.location;
    const authParams = {
      response_type: "token",
      client_id: clientId,
      redirect_uri: `${location.protocol}//${location.host}/${redirectUri}`,
      scope: googleScopes,
    };

    location.assign(
      googleAuthEndpoint + "?" + queryString.stringify(authParams)
    );
  };

  return (
    <Layout>
      <BQLogoGray />
      <LogInBox>
        <LogInP2>{t("pages.login.title")}</LogInP2>
        <styles.RainbowDivider />
        <LogIn>
          <styles.P4>Accede con tu cuenta BQ</styles.P4>
          <GoogleButton onClick={onClick} />
        </LogIn>
      </LogInBox>
    </Layout>
  );
};

export default withApollo(LogInPage, { requiresAccess: false });

const Layout = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;

  & > svg {
    margin: 105px 0 80px 0;
  }
`;

const LogInBox = styled.div`
  box-shadow: 0 20px 60px 0 ${colors.colors.shadow1};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 231px;
  width: 393px;
`;

const LogInP2 = styled(styles.P2)`
  margin: 29px 0 26px 0;
  font-weight: bold;
`;

const LogIn = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > p {
    margin: 0 0 10px 40px;
    align-self: flex-start;
  }
`;

import { P2, RainbowDivider } from "@academy-manager/ui/src/theme/styles";
import styled from "@emotion/styled";
import { NextPage } from "next";
import LogoBQ from "../../public/images/bq-logo-gray.svg";
import { GoogleButton } from "@academy-manager/ui/src/components/GoogleButton";

const LogInPage: NextPage = () => {
  return (
    <Layout>
      <LogoBQ/>
      <LogInBox>
        <LogInP2>Inicia sesión</LogInP2>
        <RainbowDivider/>
        <LogIn>
            <GoogleButton/>
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
    box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 440px;
    width: 393px;
`

const LogInP2 = styled(P2)`
    margin: 29px 0 26px 0;
`

const LogIn = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`

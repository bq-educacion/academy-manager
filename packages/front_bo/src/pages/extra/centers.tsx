import { NextPage } from "next";
import { Layout } from "../../components";
import { sections } from "../../config";
// import withApollo from "../../apollo/withApollo";
import {
  colors,
  FirstActionButton,
  Icon,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";

const CentersPage: NextPage = () => {
  const t = useTranslate();

  return (
    <Layout
      childrenHeader={
        <>
          <LeftHeader>
            <FirstActionButton margin="0 20px 0 40px"/>
            <BoldP1>{t("general.sections.links.centers")}</BoldP1>
          </LeftHeader>
          <Input
            placeholder={t("components.content-start.search-placeholder")}
          />
          <LensSearch name="lens" />
        </>
      }
      section={sections[0].title}
    >
      <h1>Test</h1>
    </Layout>
  );
};

// export default withApollo(CentersPage);
export default CentersPage;

const BoldP1 = styled(styles.P1)`
  font-weight: bold;
`

const LeftHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  width: 22.7%;
  height: 40px;
  border-radius: 5px;
  border: solid 1px ${colors.colors.gray};
  margin-right: 40px;
  &::placeholder {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.07;
    letter-spacing: normal;
    color: ${colors.colors.gray2};
    padding-left: 20px;
  }
`;

const LensSearch = styled(Icon)`
  color: ${colors.colors.grayBlue2};
  position: absolute;
  right: 61px;
  z-index: 1;
`;

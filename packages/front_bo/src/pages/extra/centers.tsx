import { NextPage } from "next";
import { Layout } from "../../components";
import { sections } from "../../config";
import withApollo from "../../apollo/withApollo";
import {
  colors,
  FirstActionButton,
  Icon,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { GET_CENTER } from "../../apollo/queries";

const CentersPage: NextPage = () => {
  const t = useTranslate();

  const { data, loading, error, refetch } = useQuery(GET_CENTER);

  return (
    <Layout
      childrenHeader={
        <>
          <DivHeader>
            <FirstActionButton margin="0 20px 0 40px" />
            <BoldP2>{t("general.sections.links.centers")}</BoldP2>
          </DivHeader>

          <DivHeader>
            <RelativeDiv>
              <Input
                placeholder={t("components.content-start.search-placeholder")}
              />
              <LensSearch name="lens" />
            </RelativeDiv>
            <AdvanceSearch>
              <BoldP4>{t("pages.centers.advance-search")}</BoldP4>
            </AdvanceSearch>
          </DivHeader>
        </>
      }
      section={sections[0].title}
    >
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error: {error.message}</h1>}
      {data && <h1>{data.getCenter.name}</h1>}
      <button
        onClick={() => {
          refetch();
        }}
      >
        Refetch
      </button>
    </Layout>
  );
};

// export default withApollo(CentersPage);
export default withApollo(CentersPage, { requiresAccess: false });

const BoldP2 = styled(styles.P2)`
  font-weight: bold;
`;

const BoldP4 = styled(styles.P4)`
  font-weight: bold;
`;

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RelativeDiv = styled.div`
  position: relative;
  width: 270px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  border: solid 1px ${colors.colors.gray};
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

const AdvanceSearch = styled.button`
  font-weight: bold;
  height: 40px;
  width: 166px;
  border-radius: 4px;
  background-color: ${colors.colors.gray60};
  border: none;
  margin: 0 40px 0 10px;
  cursor: pointer;
`;

const LensSearch = styled(Icon)`
  color: ${colors.colors.grayBlue2};
  position: absolute;
  right: 20px;
  z-index: 1;
`;

import { NextPage } from "next";
import { Column, Layout } from "../../components";
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
import { useState } from "react";
import { OrderFilter, useGetCentersFQuery } from "../../generated/graphql";

const CentersPage: NextPage = () => {
  const t = useTranslate();
  const [inputText, setInputText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [order, setOrder] = useState<number>(1);
  const [filter, setFilter] = useState<OrderFilter>(OrderFilter.Name);

  const { data, error } = useGetCentersFQuery({
    variables: {
      searchText: searchText,
      orderFilter: filter,
      order: order,
      page: 1,
      pageSize: 20,
    },
    fetchPolicy: "network-only",
  });

  //TODO: Advance Search

  return (
    <Layout
      childrenHeader={
        <>
          <DivHeader>
            <FirstActionButton margin="0 20px 0 40px" />
            <BoldP2>{t("general.sections.links.centers")}</BoldP2>
          </DivHeader>

          <DivHeader>
            <RelativeDiv
              onClick={() => {
                setSearchText(inputText);
              }}
            >
              <Input
                placeholder={t("components.content-start.search-placeholder")}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
                onKeyDownCapture={(e) => {
                  {
                    e.key === "Enter" && setSearchText(inputText);
                  }
                }}
              />
              <LensSearch name="lens" />
            </RelativeDiv>
            <AdvanceSearch>
              <BoldP4>{t("pages.centers.advance-search")}</BoldP4>
            </AdvanceSearch>
          </DivHeader>
        </>
      }
      childrenSubHeader={
        <SubHeaderDiv>
          {data && (
            <SubHeaderP4>
              {t("pages.paginate.first")} {data.getCenters.data?.length}{" "}
              {t("pages.paginate.middle")} {data.getCenters.totalNumber}{" "}
            </SubHeaderP4>
          )}
          <GreyDivider />
        </SubHeaderDiv>
      }
      section={sections[0].title}
      label={sections[0].links[1].label}
    >
      {error && <h1>Error: {error.message}</h1>}
      {data && (
        <>
          <Column
            filter={OrderFilter.Name}
            actualFilter={filter}
            center={false}
            order={order}
            title={t("components.column.name")}
            content={data.getCenters.data?.map((elem) => elem?.name)}
            ChangeOrder={setOrder}
            ChangeOrderFilter={setFilter}
          />
          <Column
            filter={OrderFilter.Languages}
            actualFilter={filter}
            center
            order={order}
            title={t("components.column.languages")}
            content={data.getCenters.data?.map((elem) =>
              JSON.stringify(elem?.languages)
                .replace(/\[|\]/g, "")
                .replace(/"/g, " ")
            )}
            ChangeOrder={setOrder}
            ChangeOrderFilter={setFilter}
          />
          <Column
            filter={OrderFilter.Population}
            actualFilter={filter}
            center
            order={order}
            title={t("components.column.population")}
            content={data.getCenters.data?.map((elem) => elem?.population)}
            ChangeOrder={setOrder}
            ChangeOrderFilter={setFilter}
          />
          <Column
            filter={OrderFilter.Modality}
            actualFilter={filter}
            center
            order={order}
            title={t("components.column.modality")}
            content={data.getCenters.data?.map((elem) => elem?.modality)}
            ChangeOrder={setOrder}
            ChangeOrderFilter={setFilter}
          />
          <Column
            filter={OrderFilter.Type}
            actualFilter={filter}
            center
            order={order}
            title={t("components.column.type")}
            content={data.getCenters.data?.map((elem) => elem?.type)}
            ChangeOrder={setOrder}
            ChangeOrderFilter={setFilter}
          />
        </>
      )}
    </Layout>
  );
};

// export default withApollo(CentersPage);
export default withApollo(CentersPage, { requiresAccess: false });

const SubHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const GreyDivider = styled.div`
  width: calc(100% - 210px);
  margin: 30px 0 0 20px;
  background-color: ${colors.colors.gray40};
  height: 1px;
`;

const BoldP2 = styled(styles.P2)`
  font-weight: bold;
`;

const BoldP4 = styled(styles.P4)`
  font-weight: bold;
`;

const SubHeaderP4 = styled(styles.P4)`
  margin: 31px 0 0 40px;
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
  margin-right: 40px;
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
  display: none;
  font-weight: bold;
  height: 40px;
  width: 166px;
  border-radius: 4px;
  background-color: ${colors.colors.gray60};
  border: none;
  margin: 0 0px 0 10px;
  cursor: pointer;
`;

const LensSearch = styled(Icon)`
  color: ${colors.colors.grayBlue2};
  position: absolute;
  right: 20px;
  z-index: 1;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

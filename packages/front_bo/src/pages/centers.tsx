import { NextPage } from "next";
import { Layout, Modal, Table } from "../components";
import { sections } from "../config";
import withApollo from "../apollo/withApollo";
import {
  colors,
  FirstActionButton,
  Icon,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Center, OrderFilter, useGetCentersFQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import CreateCenter from "../components/CreateCenter";

const CentersPage: NextPage = () => {
  const t = useTranslate();
  const [inputText, setInputText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [order, setOrder] = useState<{ key: OrderFilter; direction: number }>({
    key: OrderFilter.Name,
    direction: 1,
  });

  const [tableData, setTableData] = useState<
    Array<Partial<Center> & { id: string }>
  >([]);

  const [pageData, setPageData] = useState<{
    page: number;
    pageSize: number;
    total: number;
  }>({ page: 1, pageSize: 0, total: 0 });

  const { data, error, refetch } = useGetCentersFQuery({
    variables: {
      searchText: searchText,
      orderFilter: order.key,
      order: order.direction,
      page: 1,
      pageSize: 20,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    data &&
      setPageData({
        page: data.getCenters.page,
        pageSize: data.getCenters.pageSize,
        total: data.getCenters.totalNumber,
      });
    data?.getCenters.data && setTableData(data.getCenters.data);
  }, [data]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>(
    t("pages.centers.modal-create.center.title")
  );

  //TODO: Advance Search

  const route = useRouter();
  if (error) {
    route.push("/500");
  }

  return (
    <>
      {modalOpen && (
        <Modal
          setModal={setModalOpen}
          title={modalTitle}
          endTitle={t("pages.centers.modal-create.center.end-title")}
        >
          <CreateCenter
            refetch={refetch}
            changeTitle={setModalTitle}
            close={setModalOpen}
          />
        </Modal>
      )}
      <Layout
        childrenHeader={
          <>
            <DivHeader1>
              <FirstActionButton
                onClick={() => {
                  setModalOpen(true);
                }}
              />
              <styles.BoldP2>
                {t("general.sections.links.centers")}
              </styles.BoldP2>
            </DivHeader1>

            <DivHeader2>
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
                <styles.BoldP4>
                  {t("pages.centers.advance-search")}
                </styles.BoldP4>
              </AdvanceSearch>
            </DivHeader2>
          </>
        }
        childrenSubHeader={
          <SubHeaderDiv>
            <>
              <SubHeaderP4>
                {t("pages.paginate.first")} {tableData.length}{" "}
                {t("pages.paginate.middle")} {pageData.total}{" "}
              </SubHeaderP4>
              <GreyDivider />
            </>
          </SubHeaderDiv>
        }
        section={sections[0].title}
        label={sections[0].links[1].label}
      >
        <ContentDiv>
          <Table<Partial<Center> & { id: string }>
            data={tableData}
            order={order}
            onSetOrder={setOrder}
            columns={[
              {
                label: t("components.table.name"),
                key: OrderFilter.Name,
                content: (item) => <div>{item.name}</div>,
              },
              {
                label: t("components.table.languages"),
                key: OrderFilter.Languages,
                // reduce to a string of languages
                content: (item) => (
                  <div>
                    {item.languages
                      ?.map((elem) => t(`pages.centers.languages.${elem}`))
                      .join(", ")}
                  </div>
                ),
              },
              {
                label: t("components.table.population"),
                key: OrderFilter.Population,
                content: (item) => <div>{item.population}</div>,
              },
              {
                label: t("components.table.nature"),
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //No se puede ordenar por naturaleza, mal puesto a type
                //Saltará problema de keys
                key: OrderFilter.Type,
                content: (item) => (
                  <div>{t(`pages.centers.nature.${item.nature}`)}</div>
                ),
              },
              {
                label: t("components.table.type"),
                key: OrderFilter.Type,
                content: (item) => (
                  <div>
                    {item.type
                      ?.map((elem) => t(`pages.centers.type.${elem}`))
                      .join(", ")}
                  </div>
                ),
              },
            ]}
          />
          {tableData.length === 0 && searchText !== "" && (
            <ErrorContainer>
              <styles.P4>{t("pages.centers.search-error.0")}</styles.P4>
              <styles.P4>
                {t("pages.centers.search-error.1")}{" "}
                <a>{t("pages.centers.search-error.2")}</a>
              </styles.P4>
            </ErrorContainer>
          )}
          {tableData.length === 0 && searchText === "" && (
            <ErrorContainer>
              <styles.P4>{t("pages.centers.data-error")}</styles.P4>
              <styles.P4>
                <a>{t("pages.centers.data-error-options.0")}</a>{" "}
                {t("pages.centers.data-error-options.1")}{" "}
                <a>{t("pages.centers.data-error-options.2")}</a>
              </styles.P4>
            </ErrorContainer>
          )}
        </ContentDiv>
      </Layout>
    </>
  );
};

// export default withApollo(CentersPage);
export default withApollo(CentersPage, { requiresAccess: false });

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  & > p {
    margin-bottom: 9px;
  }
`;

const SubHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const GreyDivider = styled.div`
  width: calc(100% - 210px);
  margin: 40px 0 0 20px;
  background-color: ${colors.colors.gray40};
  height: 1px;
`;

const SubHeaderP4 = styled(styles.P4)`
  margin: 31px 0 0 40px;
`;

const DivHeader1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > div {
    margin: 0 20px 0 40px;
  }
`;

const DivHeader2 = styled.div`
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
  padding-left: 20px;
  &::placeholder {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.07;
    letter-spacing: normal;
    color: ${colors.colors.gray2};
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

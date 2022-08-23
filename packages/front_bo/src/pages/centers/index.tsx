import { NextPage } from "next";
import { Layout, Modal, Table } from "../../components";
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
import { useEffect, useState } from "react";
import {
  Center,
  OrderFilterCenter,
  useGetCentersFQuery,
} from "../../generated/graphql";
import CreateCenter from "../../components/CreateCenter";
import { ApolloError } from "@apollo/client";

const CentersPage: NextPage = () => {
  const t = useTranslate();
  const [inputText, setInputText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [order, setOrder] = useState<{
    key: OrderFilterCenter;
    direction: number;
  }>({
    key: OrderFilterCenter.Name,
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
      searchText,
      orderFilter: order.key,
      order: order.direction,
      page: pageData.page,
      pageSize: 20,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setPageData({
        page: data.getCenters.page,
        pageSize: data.getCenters.pageSize,
        total: data.getCenters.totalNumber,
      });
      setTableData(data.getCenters.data);
    }
  }, [data]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>(
    t("pages.centers.modal-create.center.title")
  );

  //TODO: Advance Search

  const [componentError, setComponentError] = useState<ApolloError | undefined>(
    undefined
  );
  if (error || componentError) {
    return <Layout section={sections[1].title} error={500} label={""} />;
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
            setError={setComponentError}
            refetch={refetch}
            changeTitle={setModalTitle}
            close={setModalOpen}
          />
        </Modal>
      )}
      <Layout
        title={sections[0].bigTitle}
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
                    if (e.target.value === "") {
                      setSearchText("");
                    }
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
            onSetOrder={(order) =>
              setOrder(order as { key: OrderFilterCenter; direction: number })
            }
            columns={[
              {
                label: t("components.table.name"),
                key: OrderFilterCenter.Name,
                content: (item) => <div>{item.name}</div>,
              },
              {
                label: t("components.table.languages"),
                key: OrderFilterCenter.Languages,
                content: (item) => (
                  <div>
                    {item.languages
                      ?.map((elem) => t(`pages.centers.languages.${elem}`))
                      .join(", ")}
                  </div>
                ),
              },
              {
                label: t("components.table.city"),
                key: OrderFilterCenter.City,
                content: (item) => <div>{item.city}</div>,
              },
              {
                label: t("components.table.nature"),
                key: OrderFilterCenter.Nature,
                content: (item) => (
                  <div>{t(`pages.centers.nature.${item.nature}`)}</div>
                ),
              },
              {
                label: t("components.table.type"),
                key: OrderFilterCenter.Type,
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
              {/* <styles.P4>
                {t("pages.centers.search-error.1")}{" "}
                <a>{t("pages.centers.search-error.2")}</a>
              </styles.P4> */}
            </ErrorContainer>
          )}
          {tableData.length === 0 && searchText === "" && (
            <ErrorContainer>
              <styles.P4>{t("pages.centers.data-error")}</styles.P4>
              <styles.P4>
                <a onClick={() => setModalOpen(true)}>
                  {t("pages.centers.data-error-options.0")}
                </a>
                {/*{" "}
                {t("pages.centers.data-error-options.1")}{" "}
          <a>{t("pages.centers.data-error-options.2")}</a>*/}
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

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const ErrorContainer = styled.div`
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

export const SubHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const GreyDivider = styled.div`
  width: calc(100% - 210px);
  margin: 40px 0 0 20px;
  background-color: ${colors.colors.gray40};
  height: 1px;
`;

export const SubHeaderP4 = styled(styles.P4)`
  margin: 31px 0 0 40px;
`;

export const DivHeader1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > div {
    margin: 0 20px 0 40px;
  }
`;

export const DivHeader2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RelativeDiv = styled.div`
  position: relative;
  width: 270px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 40px;
`;

export const Input = styled.input`
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

export const AdvanceSearch = styled.button`
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

export const LensSearch = styled(Icon)`
  color: ${colors.colors.grayBlue2};
  position: absolute;
  right: 20px;
  z-index: 1;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

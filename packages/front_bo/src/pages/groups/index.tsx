import { NextPage } from "next";
import { CreateGroup, Layout, Modal, Table } from "../../components";
import { sections } from "../../config";
import withApollo from "../../apollo/withApollo";
import { FirstActionButton, styles, useTranslate } from "@academy-manager/ui";
import {
  AdvanceSearch,
  ContentDiv,
  DivHeader1,
  DivHeader2,
  ErrorContainer,
  GreyDivider,
  Input,
  LensSearch,
  RelativeDiv,
  SubHeaderDiv,
  SubHeaderP4,
} from "../centers";
import {
  Group,
  OrderFilterGroup,
  useGetGroupsQuery,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";

const GroupsPage: NextPage = () => {
  const t = useTranslate();
  const [inputText, setInputText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>(
    t("pages.groups.modal-create.title")
  );
  const [tableData, setTableData] = useState<
    Array<Partial<Group> & { id: string }>
  >([]);
  const [order, setOrder] = useState<{
    key: OrderFilterGroup;
    direction: number;
  }>({
    key: OrderFilterGroup.IdGroup,
    direction: 1,
  });

  const [pageData, setPageData] = useState<{
    page: number;
    pageSize: number;
    total: number;
  }>({ page: 1, pageSize: 0, total: 0 });

  const { data, error, refetch, loading } = useGetGroupsQuery({
    variables: {
      searchText,
      orderFilter: order.key,
      order: order.direction,
      page: 1,
      pageSize: 20,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setPageData({
        page: data.getGroups.page,
        pageSize: data.getGroups.pageSize,
        total: data.getGroups.totalNumber,
      });
      setTableData(
        data.getGroups.data as Array<Partial<Group> & { id: string }>
      );
    }
  }, [data]);

  const [componentError, setComponentError] = useState<ApolloError | undefined>(
    undefined
  );
  if (error || componentError) {
    return <Layout section={sections[0].title} error={500} label={""} />;
  }
  // const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false);
  // useEffect(() => {
  //   if (loading) {
  //     setLoadingAnimation(true);
  //   } else {
  //     setTimeout(() => {
  //       setLoadingAnimation(false);
  //     }, 500);
  //   }
  // }, [loading]);

  return (
    <>
      {/* {loadingAnimation && <LoadingOvercast />} */}
      {modalOpen && (
        <Modal
          setModal={setModalOpen}
          title={modalTitle}
          endTitle={t("pages.groups.end-title")}
        >
          <CreateGroup
            setError={setComponentError}
            changeTitle={setModalTitle}
            close={setModalOpen}
            refetch={refetch}
          />
        </Modal>
      )}
      <Layout
        section={sections[0].title}
        label={sections[0].links[2].label}
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
                {t("general.sections.links.groups")}
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
      >
        <ContentDiv>
          <Table<Partial<Group> & { id: string }>
            data={tableData}
            order={order}
            onSetOrder={(order) =>
              setOrder(order as { key: OrderFilterGroup; direction: number })
            }
            columns={[
              {
                label: t("components.table.id"),
                key: OrderFilterGroup.IdGroup,
                content: (item) => <div>{item.id_group}</div>,
              },
              {
                label: t("components.table.center"),
                key: OrderFilterGroup.Center,
                content: (item) => <div>{item.center?.name}</div>,
              },
              {
                label: t("components.table.instructor"),
                key: OrderFilterGroup.Instructors,
                content: (item) => (
                  <div>
                    {item.instructors?.map((elem) => elem.name).join(", ")}
                    {(item.instructors === undefined ||
                      item.instructors?.length === 0) &&
                      "-"}
                  </div>
                ),
              },
              {
                label: t("components.table.days"),
                key: OrderFilterGroup.IdDay,
                content: (item) => (
                  <div>
                    {item.timetable
                      ?.map((elem) =>
                        t(
                          `components.table.time-table.${elem.day.toLowerCase()}`
                        )
                      )
                      .join(" - ")}
                    {(item.timetable === undefined ||
                      item.timetable?.length === 0) &&
                      "-"}
                  </div>
                ),
              },
              {
                label: t("components.table.start-time"),
                key: OrderFilterGroup.Start,
                content: (item) => (
                  <div>
                    {item.timetable?.every((elem) => elem.start !== "") &&
                      item.timetable?.map((elem) => elem.start).join(", ")}
                    {(item.timetable?.every((elem) => elem.start == "") ||
                      item.timetable === undefined ||
                      item.timetable?.length === 0) &&
                      "-"}
                  </div>
                ),
              },
              {
                label: t("components.table.end-time"),
                key: OrderFilterGroup.End,
                content: (item) => (
                  <div>
                    {item.timetable?.every((elem) => elem.end !== "") &&
                      item.timetable?.map((elem) => elem.end).join(", ")}
                    {(item.timetable?.every((elem) => elem.start == "") ||
                      item.timetable === undefined ||
                      item.timetable?.length === 0) &&
                      "-"}
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
          {!loading && tableData.length === 0 && searchText === "" && (
            <ErrorContainer>
              <styles.P4>{t("pages.centers.data-error")}</styles.P4>
              <styles.P4>
                <a onClick={() => setModalOpen(true)}>
                  {t("pages.groups.data-error.0")}
                </a>
                {/*{" "}
                {t("pages.centers.data-error-options.1")}{" "}
          <a>{t("pages.groups.data-error.1")}</a>*/}
              </styles.P4>
            </ErrorContainer>
          )}
        </ContentDiv>
      </Layout>
    </>
  );
};

export default withApollo(GroupsPage, { requiresAccess: false });

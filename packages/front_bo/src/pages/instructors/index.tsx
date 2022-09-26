import { NextPage } from "next";
import { CreateInstructor, Layout, Modal, Table } from "../../components";
import { sections } from "../../config";
import withApollo from "../../apollo/withApollo";
import {
  Instructor,
  OrderFilterInstructor,
  useGetInstructorsQuery,
} from "../../generated/graphql";
import { FirstActionButton, styles, useTranslate } from "@academy-manager/ui";
import { useEffect, useState } from "react";
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
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";

const InstructorsPage: NextPage = () => {
  const router = useRouter();
  const t = useTranslate();

  const isBrowser = typeof window !== "undefined";
  useEffect(() => {
    if (window.document.cookie) {
      if (window.document.cookie.split("=")[2].length === 2) {
        window.location.href = "/login";
      }
    }
  }, [isBrowser]);

  const [inputText, setInputText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>(
    t("pages.instructors.modal-create.title")
  );
  const [tableData, setTableData] = useState<
    Array<Partial<Instructor> & { id: string }>
  >([]);
  const [inactiveIndexes, setInactiveIndexes] = useState<number[]>([]);
  useEffect(() => {
    setInactiveIndexes(
      tableData
        .map((item, index) => (item.active ? -1 : index))
        .filter((item) => item !== -1)
    );
  }, [tableData]);
  const [order, setOrder] = useState<{
    key: OrderFilterInstructor;
    direction: number;
  }>({
    key: OrderFilterInstructor.Name,
    direction: 1,
  });
  const [pageData, setPageData] = useState<{
    page: number;
    pageSize: number;
    total: number;
  }>({ page: 1, pageSize: 0, total: 0 });

  const { data, error, refetch, loading } = useGetInstructorsQuery({
    variables: {
      instructors: {
        searchText,
        orderFilter: order.key,
        order: order.direction,
        page: 1,
        pageSize: 20,
      },
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setPageData({
        page: data.getInstructors.page,
        pageSize: data.getInstructors.pageSize,
        total: data.getInstructors.totalNumber,
      });
      setTableData(
        data.getInstructors.data as Array<Partial<Instructor> & { id: string }>
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
          endTitle={t("pages.instructors.end-title")}
        >
          <CreateInstructor
            setError={setComponentError}
            changeTitle={setModalTitle}
            close={setModalOpen}
            refetch={refetch}
          />
        </Modal>
      )}
      <Layout
        title={sections[0].bigTitle}
        section={sections[0].title}
        label={sections[0].links[4].label}
        childrenHeader={
          <>
            <DivHeader1>
              <FirstActionButton
                onClick={() => {
                  setModalOpen(true);
                }}
              />
              <styles.BoldP2>
                {t("general.sections.links.instructors")}
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
          <Table<Partial<Instructor> & { id: string }>
            onClickRow={(id) => router.push(`/instructors/${id}`)}
            inactiveIndexes={inactiveIndexes}
            yellow
            data={tableData}
            order={order}
            onSetOrder={(order) =>
              setOrder(
                order as { key: OrderFilterInstructor; direction: number }
              )
            }
            columns={[
              {
                label: t("components.table.name"),
                key: OrderFilterInstructor.Name,
                content: (item) => <div>{item.name}</div>,
              },
              {
                label: t("components.table.zone"),
                key: OrderFilterInstructor.Areas,
                content: (item) => <div>{item.areas?.join(", ")}</div>,
              },
              {
                label: t("components.table.active.active"),
                key: OrderFilterInstructor.State,
                content: (item) => (
                  <div>
                    {t(
                      `components.table.state.${
                        item.enrolled ? "active" : "withdrawn"
                      }`
                    )}
                  </div>
                ),
              },
              {
                label: t("components.table.time"),
                key: OrderFilterInstructor.IdDay,
                content: (item) => (
                  <div>
                    {item.availability
                      ?.map((elem) =>
                        t(
                          `components.table.time-table.${elem.day.toLowerCase()}`
                        )
                      )
                      .join(" - ")}
                  </div>
                ),
              },
              {
                label: t("components.table.groups"),
                key: OrderFilterInstructor.IdGroup,
                content: (item) => <div>{item.groups?.length}</div>,
              },
              {
                label: t("components.table.vehicle.title"),
                key: OrderFilterInstructor.Vehicle,
                content: (item) => (
                  <div>
                    {t(
                      `components.table.vehicle.${item.vehicle?.toLowerCase()}`
                    )}
                  </div>
                ),
              },
              {
                label: t("components.table.languages"),
                key: OrderFilterInstructor.Languages,
                content: (item) => (
                  <div>
                    {item.languages
                      ?.map((elem) =>
                        t(`pages.centers.languages.${elem.toLowerCase()}`)
                      )
                      .join(", ")}
                  </div>
                ),
              },
              {
                label: t("components.table.summer.title"),
                key: OrderFilterInstructor.SummerAvailability,
                content: (item) => (
                  <div>
                    {t(
                      `components.table.summer.${item.summerAvailability?.toLowerCase()}`
                    )}
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
                  {t("pages.instructors.data-error.0")}
                </a>
                {/*{" "}
                {t("pages.centers.data-error-options.1")}{" "}
          <a>{t("pages.instructors.data-error.1")}</a>*/}
              </styles.P4>
            </ErrorContainer>
          )}
        </ContentDiv>
      </Layout>
    </>
  );
};

export default withApollo(InstructorsPage, { requiresAccess: true });

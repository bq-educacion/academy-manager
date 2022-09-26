import { NextPage } from "next";
import { Layout, Modal, Table } from "../../components";
import { sections } from "../../config";
import withApollo from "../../apollo/withApollo";
import { FirstActionButton, styles, useTranslate } from "@academy-manager/ui";
import { useEffect, useState } from "react";
import {
  OrderFilterStudent,
  Student,
  useGetStudentsQuery,
} from "../../generated/graphql";
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
import CreateStudent from "../../components/CreateStudent";
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";

const StudentsPage: NextPage = () => {
  const t = useTranslate();
  const [inputText, setInputText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>(
    t("pages.students.modal-create.title")
  );

  const [tableData, setTableData] = useState<
    Array<Partial<Student> & { id: string }>
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
    key: OrderFilterStudent;
    direction: number;
  }>({
    key: OrderFilterStudent.Name,
    direction: 1,
  });

  const [pageData, setPageData] = useState<{
    page: number;
    pageSize: number;
    total: number;
  }>({ page: 1, pageSize: 0, total: 0 });

  const { data, error, refetch, loading } = useGetStudentsQuery({
    variables: {
      students: {
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
        page: data.getStudents.page,
        pageSize: data.getStudents.pageSize,
        total: data.getStudents.totalNumber,
      });
      setTableData(
        data.getStudents.data as Array<Partial<Student> & { id: string }>
      );
    }
  }, [data]);

  const router = useRouter();

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
          endTitle={t("pages.students.end-title")}
        >
          <CreateStudent
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
        label={sections[0].links[3].label}
        childrenHeader={
          <>
            <DivHeader1>
              <FirstActionButton
                onClick={() => {
                  setModalOpen(true);
                }}
              />
              <styles.BoldP2>
                {t("general.sections.links.students")}
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
          <Table<Partial<Student> & { id: string }>
            yellow
            onClickRow={(id) => {
              router.push(`/students/${id}`);
            }}
            inactiveIndexes={inactiveIndexes}
            data={tableData}
            order={order}
            onSetOrder={(order) =>
              setOrder(order as { key: OrderFilterStudent; direction: number })
            }
            columns={[
              {
                label: t("components.table.name"),
                key: OrderFilterStudent.Name,
                content: (item) => <div>{item.name}</div>,
              },
              {
                label: t("components.table.group"),
                key: OrderFilterStudent.Group,
                content: (item) => (
                  <div>{item.groups?.map((elem) => elem.name).join(", ")}</div>
                ),
              },
              {
                label: t("components.table.course-student"),
                key: OrderFilterStudent.Course,
                content: (item) => (
                  <div>{t(`general.courses.${item.course}`)}</div>
                ),
              },
              {
                label: t("components.table.state.title"),
                key: OrderFilterStudent.State,
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
                  {t("pages.students.data-error-options.0")}
                </a>
                {/*{" "}
                {t("pages.students.data-error-options.1")}{" "}
          <a>{t("pages.students.data-error-options.2")}</a>*/}
              </styles.P4>
            </ErrorContainer>
          )}
        </ContentDiv>
      </Layout>
    </>
  );
};

export default withApollo(StudentsPage, { requiresAccess: true });

import { NextPage } from "next";
import { Layout, Modal, Table } from "../../components";
import { sections } from "../../config";
import withApollo from "../../apollo/withApollo";
import {
  Instructor,
  OrderFilterInstructor,
  useGetInstructorsQuery,
} from "../../generated/graphql";
import { FirstActionButton, styles, useTranslate } from "@academy-manager/ui";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

const InstructorsPage: NextPage = () => {
  const t = useTranslate();
  const [inputText, setInputText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle] = useState<string>(t("pages.groups.modal-create.title"));
  const [tableData, setTableData] = useState<
    Array<Partial<Instructor> & { id: string }>
  >([]);
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

  const { data, error } = useGetInstructorsQuery({
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
        page: data.getInstructors.page,
        pageSize: data.getInstructors.pageSize,
        total: data.getInstructors.totalNumber,
      });
      setTableData(
        data.getInstructors.data as Array<Partial<Instructor> & { id: string }>
      );
    }
  }, [data]);

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
          endTitle={t("pages.instructors.end-title")}
        >
          <p>Test modal</p>
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
                label: t("components.table.center"),
                key: OrderFilterInstructor.Center,
                content: (item) => <div>{item.center?.name}</div>,
              },
              {
                label: t("components.table.zone"),
                key: OrderFilterInstructor.Areas,
                content: (item) => <div>{item.areas?.join(", ")}</div>,
              },
              {
                label: t("components.table.active.ACTIVE"),
                key: OrderFilterInstructor.State,
                content: (item) => (
                  <div>{t(`components.table.active.${item.state}`)}</div>
                ),
              },
              {
                label: t("components.table.time"),
                key: OrderFilterInstructor.IdDay,
                content: (item) => (
                  <div>
                    {item.availability
                      ?.map((elem) =>
                        t(`components.table.time-table.${elem.day}`)
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
                  <div>{t(`components.table.vehicle.${item.vehicle}`)}</div>
                ),
              },
              {
                label: t("components.table.languages"),
                key: OrderFilterInstructor.Languages,
                content: (item) => (
                  <div>
                    {item.languages
                      ?.map((elem) => t(`pages.centers.languages.${elem}`))
                      .join(", ")}
                  </div>
                ),
              },
              {
                label: t("components.table.summer.title"),
                key: OrderFilterInstructor.SummerAvailability,
                content: (item) => (
                  <div>
                    {t(`components.table.summer.${item.summerAvailability}`)}
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

export default withApollo(InstructorsPage, { requiresAccess: false });

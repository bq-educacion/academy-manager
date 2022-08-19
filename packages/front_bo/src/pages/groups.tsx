import { NextPage } from "next";
import { Layout } from "../components";
import { sections } from "../config";
import withApollo from "../apollo/withApollo";
import { FirstActionButton, styles, useTranslate } from "@academy-manager/ui";
// import { useState } from "react";
import {
  AdvanceSearch,
  DivHeader1,
  DivHeader2,
  GreyDivider,
  Input,
  LensSearch,
  RelativeDiv,
  SubHeaderDiv,
  SubHeaderP4,
} from "./centers";

const GroupsPage: NextPage = () => {
  const t = useTranslate();
  // const [inputText, setInputText] = useState<string>("");
  // const [searchText, setSearchText] = useState<string>("");
  // const [modalOpen, setModalOpen] = useState<boolean>(false);
  // const [tableData, setTableData] = useState<
  //   Array<Partial<Group> & { id: string }>
  // >([]);

  // const [pageData, setPageData] = useState<{
  //   page: number;
  //   pageSize: number;
  //   total: number;
  // }>({ page: 1, pageSize: 0, total: 0 });

  return (
    <Layout
      section={sections[0].title}
      label={sections[0].links[2].label}
      title={sections[0].bigTitle}
      childrenHeader={
        <>
          <DivHeader1>
            <FirstActionButton
              onClick={() => {
                // setModalOpen(true);
              }}
            />
            <styles.BoldP2>{t("general.sections.links.groups")}</styles.BoldP2>
          </DivHeader1>

          <DivHeader2>
            <RelativeDiv
              onClick={() => {
                // setSearchText(inputText);
              }}
            >
              <Input
                placeholder={t("components.content-start.search-placeholder")}
                // onChange={(e) => {
                //   // setInputText(e.target.value);
                // }}
                // onKeyDownCapture={(e) => {
                //   {
                //     e.key === "Enter" && setSearchText(inputText);
                //   }
                // }}
              />
              <LensSearch name="lens" />
            </RelativeDiv>
            <AdvanceSearch>
              <styles.BoldP4>{t("pages.centers.advance-search")}</styles.BoldP4>
            </AdvanceSearch>
          </DivHeader2>
        </>
      }
      childrenSubHeader={
        <SubHeaderDiv>
          <>
            <SubHeaderP4>
              {/* {t("pages.paginate.first")} {tableData.length}{" "}
              {t("pages.paginate.middle")} {pageData.total}
              {" "} */}
            </SubHeaderP4>
            <GreyDivider />
          </>
        </SubHeaderDiv>
      }
    >
      <h1>Test</h1>
    </Layout>
  );
};

export default withApollo(GroupsPage, { requiresAccess: false });

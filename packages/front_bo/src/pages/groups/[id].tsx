import {
  Button,
  colors,
  Icon,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import withApollo from "../../apollo/withApollo";
import { Layout } from "../../components";
import { sections } from "../../config";
import { useGetGroupQuery } from "../../generated/graphql";

const EditGroup: NextPage = () => {
  const router = useRouter();
  const t = useTranslate();

  const { data } = useGetGroupQuery({
    variables: {
      getGroupId: router.query.id as string,
    },
  });

  const [showFolder, setShowFolder] = useState<boolean>(true);
  const [showFolder2, setShowFolder2] = useState<boolean>(true);

  return (
    <>
      <Layout
        title={sections[0].bigTitle}
        childrenHeader={
          <HeaderDiv>
            <styles.BoldP2>
              {t("general.sections.links.groups")} / {data?.getGroup.group.name}
            </styles.BoldP2>
          </HeaderDiv>
        }
        section={sections[0].title}
        label={sections[0].links[2].label}
        childrenSubHeader={
          <SubHeaderDiv>
            <Button
              text={t("pages.edit-group.delete")}
              onClick={() => {
                // setOpenModalDelete(true);
              }}
              deleteRed
            />
            <GreyDivider loading={false} />
            {/* {loading2 && (
              <LoadingAnimation>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </LoadingAnimation>
            )} */}
            <Button
              text={t("pages.edit-center.save")}
              onClick={() => {
                // updateCenter();
              }}
              create
              disabled={true}
            />
          </SubHeaderDiv>
        }
        children2={
          data && (
            <BodyDiv>
              <GateFolder>
                <GateFolderButton onClick={() => setShowFolder2(!showFolder2)}>
                  <GateFolderArrow name="direction" open={showFolder2} />
                </GateFolderButton>
                <GateFolderTitle>
                  <styles.BoldP4>{t("pages.edit-group.time")}</styles.BoldP4>
                </GateFolderTitle>
              </GateFolder>
            </BodyDiv>
          )
        }
      >
        {data && (
          <BodyDiv>
            <GateFolder>
              <GateFolderButton onClick={() => setShowFolder(!showFolder)}>
                <GateFolderArrow name="direction" open={showFolder} />
              </GateFolderButton>
              <GateFolderTitle>
                <styles.BoldP4>{t("pages.edit-group.info")}</styles.BoldP4>
              </GateFolderTitle>
            </GateFolder>
            {showFolder && (
              <>
                <BodySubHeader>
                  <styles.P4>
                    {t("pages.edit-center.date")}
                    {data?.getGroup.group.createdAt}
                  </styles.P4>
                  <styles.P4></styles.P4>
                  <a>
                    <styles.P4>
                      {t("pages.edit-center.students")}
                      {data?.getGroup.totalStudents}
                    </styles.P4>
                  </a>
                </BodySubHeader>
              </>
            )}
          </BodyDiv>
        )}
      </Layout>
    </>
  );
};

export default withApollo(EditGroup, { requiresAccess: false });

const BodySubHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin: 25px 0 25px 30px;
  justify-content: flex-start;
  align-items: center;
  & > * {
    margin-right: 20px;
  }
`;

const BodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`;

const GateFolder = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid ${colors.colors.gray40};
`;

const GateFolderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border-right: 1px solid ${colors.colors.gray40};
`;

const GateFolderArrow = styled(Icon)<{ open: boolean }>`
  transform: rotate(${(props) => (props.open ? "-90deg" : "-180deg")});
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
`;

const GateFolderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  width: 100%;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const SubHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 40px 0 40px;
`;

const GreyDivider = styled.div<{ loading: boolean }>`
  width: ${(props) => (props.loading ? "61%" : "75%")};
  margin: 0 20px;
  background-color: ${colors.colors.gray40};
  height: 1px;
`;

import { NextPage } from "next";
import { Layout } from "../components";
import { sections } from "../config";
import withApollo from "../apollo/withApollo";
import {
  colors,
  Icon,
  Popover,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import {
  BlueYellowDivider,
  OrangeDivider,
  RedDivider,
  RedPinkDivider,
} from "@academy-manager/ui/src/theme/styles";
import { useDashboardQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";

const DashboardPage: NextPage = () => {
  const t = useTranslate();

  const { data } = useDashboardQuery();
  const router = useRouter();
  const date = new Date();

  const [hoverCenters, setHoverCenters] = useState<boolean>(false);
  const [hoverGroups, setHoverGroups] = useState<boolean>(false);
  const [hoverStudents, setHoverStudents] = useState<boolean>(false);
  const [hoverTeachers, setHoverTeachers] = useState<boolean>(false);

  return (
    <Layout
      title={sections[0].bigTitle}
      section={sections[0].title}
      label={sections[0].links[0].label}
      childrenHeader={
        <HeaderDiv>
          <styles.BoldP2>{t("general.sections.links.dashboard")}</styles.BoldP2>
        </HeaderDiv>
      }
      childrenSubHeader={
        <>
          <SubHeaderDiv>
            {date.getHours() < 14 && (
              <styles.BoldP1>
                {t("pages.dashboard.sub-header-morning") +
                  data?.dashboard.userName.split(" ")[0]}
              </styles.BoldP1>
            )}
            {date.getHours() >= 14 && date.getHours() < 20 && (
              <styles.BoldP1>
                {t("pages.dashboard.sub-header-afternoon") +
                  data?.dashboard.userName.split(" ")[0]}
              </styles.BoldP1>
            )}
            {date.getHours() > 20 && (
              <styles.BoldP1>
                {t("pages.dashboard.sub-header-evening") +
                  data?.dashboard.userName.split(" ")[0]}
              </styles.BoldP1>
            )}
            <styles.BoldP4>{t("pages.dashboard.sub-header2")}</styles.BoldP4>
          </SubHeaderDiv>
          <BoxesContainer>
            <Box>
              <BlueYellowDivider />
              <InnerBox>
                <styles.PG
                  onClick={() => {
                    router.push("/centers");
                  }}
                >
                  {data?.dashboard.activeCenters}
                </styles.PG>
                <Popover
                  title={
                    <styles.P3
                      onMouseEnter={() => {
                        setHoverCenters(true);
                      }}
                      onMouseLeave={() => {
                        setHoverCenters(false);
                      }}
                    >
                      {t("pages.dashboard.centers")}
                    </styles.P3>
                  }
                  content={
                    <HoverDiv>
                      <Icon name="interrogation" />
                      <HoverP4>{t("pages.dashboard.hover-centers")}</HoverP4>
                    </HoverDiv>
                  }
                  isOpenEx={hoverCenters}
                  setIsOpenEx={setHoverCenters}
                />
              </InnerBox>
            </Box>
            <Box>
              <OrangeDivider />
              <InnerBox>
                <styles.PG
                  onClick={() => {
                    router.push("/groups");
                  }}
                >
                  {data?.dashboard.groups}
                </styles.PG>
                <Popover
                  title={
                    <styles.P3
                      onMouseEnter={() => {
                        setHoverGroups(true);
                      }}
                      onMouseLeave={() => {
                        setHoverGroups(false);
                      }}
                    >
                      {t("pages.dashboard.groups")}
                    </styles.P3>
                  }
                  content={
                    <HoverDiv>
                      <Icon name="interrogation" />
                      <HoverP4>{t("pages.dashboard.hover-groups")}</HoverP4>
                    </HoverDiv>
                  }
                  isOpenEx={hoverGroups}
                  setIsOpenEx={setHoverGroups}
                />
              </InnerBox>
            </Box>
            <Box>
              <RedDivider />
              <InnerBox>
                <styles.PG
                  onClick={() => {
                    router.push("/instructors");
                  }}
                >
                  {data?.dashboard.activeInstructors}
                </styles.PG>
                <Popover
                  title={
                    <styles.P3
                      onMouseEnter={() => {
                        setHoverTeachers(true);
                      }}
                      onMouseLeave={() => {
                        setHoverTeachers(false);
                      }}
                    >
                      {t("pages.dashboard.instructors")}
                    </styles.P3>
                  }
                  content={
                    <HoverDiv>
                      <Icon name="interrogation" />
                      <HoverP4>
                        {t("pages.dashboard.hover-instructors")}
                      </HoverP4>
                    </HoverDiv>
                  }
                  isOpenEx={hoverTeachers}
                  setIsOpenEx={setHoverTeachers}
                />
              </InnerBox>
            </Box>
            <Box>
              <RedPinkDivider />
              <InnerBox>
                <styles.PG
                  onClick={() => {
                    router.push("/students");
                  }}
                >
                  {data?.dashboard.activeStudents}
                </styles.PG>
                <Popover
                  title={
                    <styles.P3
                      onMouseEnter={() => {
                        setHoverStudents(true);
                      }}
                      onMouseLeave={() => {
                        setHoverStudents(false);
                      }}
                    >
                      {t("pages.dashboard.students")}
                    </styles.P3>
                  }
                  content={
                    <HoverDiv>
                      <Icon name="interrogation" />
                      <HoverP4>{t("pages.dashboard.hover-students")}</HoverP4>
                    </HoverDiv>
                  }
                  isOpenEx={hoverStudents}
                  setIsOpenEx={setHoverStudents}
                />
              </InnerBox>
            </Box>
          </BoxesContainer>
        </>
      }
    />
  );
};

export default withApollo(DashboardPage, { requiresAccess: true });

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const SubHeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 20px 40px 0 40px;
  & > :first-child {
    margin-bottom: 15px;
  }
  & > :nth-child(2) {
    margin-bottom: 10px;
  }
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 40px;
  & > * {
    margin-right: 10px;
  }
  & > :nth-child(4) {
    margin-right: 0;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 140px;
  background-color: ${colors.colors.white};
  border-radius: 3px;
  border: solid 1px ${colors.colors.grayBlue};
`;
const InnerBox = styled.div`
  width: 100%;
  height: auto;
  padding-top: 45px;
  margin: 0 0 20px 20px;
  & > * {
    cursor: pointer;
  }
  & > :nth-child(2) {
    padding-top: 15px;
    align-items: flex-start;
  }
`;

const HoverDiv = styled.div`
  display: flex;
  width: 173px;
  height: 60px;
  flex-direction: row;
  border-radius: 3px;
  box-shadow: 0 10px 20px 0 ${colors.colors.shadow2};
  background-color: ${colors.colors.gray100};
  align-items: center;
  justify-content: center;
  padding: 12px;
  & > :first-child {
    margin-right: 10px;
  }
`;

const HoverP4 = styled(styles.P4)`
  color: ${colors.colors.white};
`;

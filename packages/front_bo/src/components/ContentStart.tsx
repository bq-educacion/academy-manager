import { colors, styles, useTranslate } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { UserStuff } from "./UserStuff";

export const ContentStart: FC<{
  section: string;
  children: ReactNode;
  childrenHeader: ReactNode;
}> = ({ section, children, childrenHeader }) => {
  const t = useTranslate();

  return (
    <ContentLayout>
      <ContentHeader>
        <BoldP1>{t(section)}</BoldP1>
        <UserStuff token="token" />
      </ContentHeader>
      <styles.RainbowDivider />
      <ContentSubHeader>{childrenHeader}</ContentSubHeader>
      <ContentBody>{children}</ContentBody>
    </ContentLayout>
  );
};

export default ContentStart;

const BoldP1 = styled(styles.P1)`
  font-weight: bold;
`;

const ContentLayout = styled.div`
  background-color: ${colors.colors.grayBlueTransparent};
  width: calc(100% - 250px);
  height: 100vh;
  padding-left: 250px;
  display: flex;
  flex-direction: column;
`;

const ContentHeader = styled.div`
  background-color: ${colors.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  min-height: 80px;

  & > p {
    margin-left: 40px;
  }
`;

const ContentSubHeader = styled.div`
  background-color: ${colors.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 64px;
  height: 64px;

  & > p {
    margin-left: 41px;
  }
`;

const ContentBody = styled.div`
  background-color: ${colors.colors.white};
  width: calc(100% - 41px - 39px);
  height: calc(100% - 24px - 30px);
  margin: 24px 41px 30px 39px;
`;

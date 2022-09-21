import { colors, styles, useTranslate } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { UserStuff } from "./UserStuff";

export const ContentStart: FC<{
  section: string;
  children: ReactNode;
  childrenHeader: ReactNode;
  childrenSubHeader?: ReactNode;
  children2?: ReactNode;
  children3?: ReactNode;
  children4?: ReactNode;
  children5?: ReactNode;
}> = ({
  section,
  children,
  childrenHeader,
  childrenSubHeader,
  children2,
  children3,
  children4,
  children5,
}) => {
  const t = useTranslate();

  return (
    <ContentLayout>
      <ContentHeader>
        <styles.BoldP1>{t(section)}</styles.BoldP1>
        <UserStuff />
      </ContentHeader>
      <styles.RainbowDivider />
      <ContentSubHeader>{childrenHeader}</ContentSubHeader>
      {childrenSubHeader && <>{childrenSubHeader}</>}
      <ContentBody className="scrollbar">{children}</ContentBody>
      {children2 && (
        <ContentBody className="scrollbar">{children2}</ContentBody>
      )}
      {children3 && (
        <ContentBody className="scrollbar">{children3}</ContentBody>
      )}
      {children4 && (
        <ContentBody className="scrollbar">{children4}</ContentBody>
      )}
      {children5 && (
        <ContentBody className="scrollbar">{children5}</ContentBody>
      )}
    </ContentLayout>
  );
};

export default ContentStart;

const ContentLayout = styled.div`
  background-color: ${colors.colors.grayBlueTransparent};
  width: calc(100% - 250px);
  height: 100%;
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
  height: auto;
  margin: 24px 41px 30px 39px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow: scroll;
  overflow-x: scroll;
  overflow-y: overlay;
  ::-webkit-scrollbar-track {
    margin-top: 40px;
  }
`;

import { Button, colors, styles, useTranslate } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
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
      ></Layout>
    </>
  );
};

export default withApollo(EditGroup, { requiresAccess: false });

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

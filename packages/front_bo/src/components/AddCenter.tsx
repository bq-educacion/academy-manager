import {
  colors,
  DropDown,
  DropDownUnique,
  FillIn,
  Icon,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import {
  Group,
  useSimpleCentersNameQuery,
  useSimpleGroupsNameQuery,
} from "../generated/graphql";

const AddCenter: FC<{
  setCenter: (center: string) => void;
  setCenters: (centers: string[]) => void;
  center: string;
  centers: string[];
  setGroups: (groups: string[]) => void;
  groups: string[];
  errorCenter?: boolean;
  setErrorCenter?: (error: boolean) => void;
  errorGroups?: boolean;
  setErrorGroups?: (error: boolean) => void;
}> = ({
  setCenter,
  setCenters,
  center,
  centers,
  setGroups,
  groups,
  errorCenter,
  setErrorCenter,
  errorGroups,
  setErrorGroups,
}) => {
  const t = useTranslate();

  const [LocalGroups, setLocalGroups] = useState<string[]>([]);

  const { data: CentersData } = useSimpleCentersNameQuery({
    fetchPolicy: "network-only",
  });
  const { data: StraightGroupsData } = useSimpleGroupsNameQuery({
    variables: {},
  });
  const [GroupsData, setGroupsData] = useState<Partial<Group[]>>([]);
  useEffect(() => {
    if (StraightGroupsData) {
      setGroupsData(
        StraightGroupsData.getGroups.data.filter(
          (elem) => elem.center?.id === center
        ) as Group[]
      );
    }
  }, [StraightGroupsData, center]);

  useEffect(() => {
    setGroups(
      groups.concat(LocalGroups.filter((elem) => !groups.includes(elem)))
    );
  }, [LocalGroups]);

  return (
    <ContactDiv quantity={centers.length}>
      <FillIn>
        <Header>
          <styles.BoldP4>
            {t(`components.create-group.1.subtitle.center`)}
          </styles.BoldP4>
          {centers.length > 1 && (
            <Eliminate
              onClick={() => {
                setCenters(centers.filter((c) => c !== center));
              }}
            >
              <Icon name="eliminate" />
            </Eliminate>
          )}
        </Header>
        <DropDownUnique
          error={errorCenter}
          setError={setErrorCenter}
          options={
            CentersData?.getCenters.data.map((elem) => {
              return {
                key: elem.id,
                label: elem.name,
              };
            }) || []
          }
          width="387px"
          selected={center}
          setSelected={(center) => setCenter(center)}
        />
        {errorCenter && <styles.P0Error>{t(`general.empty`)}</styles.P0Error>}
      </FillIn>
      <FillIn>
        <styles.BoldP4>
          {t(`components.create-student.1.subtitle.group`)}
        </styles.BoldP4>
        <DropDown
          error={errorGroups}
          setError={setErrorGroups}
          disabled={center === ""}
          options={
            (GroupsData.every !== undefined &&
              (GroupsData as Group[]).map((elem) => {
                return {
                  key: elem.id,
                  label: elem.name,
                };
              })) ||
            []
          }
          width="387px"
          selected={LocalGroups}
          setSelected={setLocalGroups}
        />
        {errorGroups && <styles.P0Error>{t(`general.empty`)}</styles.P0Error>}
      </FillIn>
    </ContactDiv>
  );
};

export default AddCenter;

const ContactDiv = styled.div<{ quantity: number }>`
  margin: 0;
  ${({ quantity }) =>
    quantity > 1 &&
    `
    border-bottom: 1px solid ${colors.colors.grayBlue};
    margin-bottom: 20px;
    `};
`;

const Header = styled.div`
  margin: 0 0 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Eliminate = styled.div`
  margin: 0;
  cursor: pointer;
`;

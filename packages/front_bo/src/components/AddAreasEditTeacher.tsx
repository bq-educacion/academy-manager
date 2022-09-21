import {
  CheckBox,
  colors,
  Icon,
  InputSuper,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import {
  Area,
  Region,
  useCreateAreaMutation,
  useDeleteAreaMutation,
  useQueryQuery,
} from "../generated/graphql";

const AddAreasEditTeacher: FC<{
  Region: Region;
  areas: string[];
  setAreas: (areas: string[]) => void;
}> = ({ areas, setAreas, Region }) => {
  const t = useTranslate();
  const [addArea, setAddArea] = useState(false);
  const { data, refetch } = useQueryQuery({
    variables: {
      regions: [Region],
    },
  });
  const [localAreas, setLocalAreas] = useState<Area[]>([]);
  useEffect(() => {
    if (data) {
      setLocalAreas(data.getAreas);
    }
  }, [data]);
  const [direction /*setDirection*/] = useState<boolean>(false);
  const [inputArea, setInputArea] = useState<string>("");

  const [createAreaMutation] = useCreateAreaMutation({
    variables: {
      name: inputArea,
      region: Region,
    },
  });

  const [deleteAreaMutation] = useDeleteAreaMutation();

  return (
    <Content>
      <Row className="Top">
        <LeftCell>
          <Icon name={direction ? "order-down" : "order-up"} />
        </LeftCell>
        <Cell>
          {t("pages.edit-teacher.zones-1")}
          <AddContactButton
            onClick={() => {
              setAddArea(true);
            }}
          >
            <Icon name="add" />
            <Icon name="map" />
            <styles.BoldP4>{t("pages.edit-teacher.zones-2")}</styles.BoldP4>
          </AddContactButton>
        </Cell>
      </Row>
      {localAreas.map((area) => (
        <Row key={area.id}>
          <LeftCell>
            <CheckBox
              option={areas.includes(area.name)}
              setOption={(option) => {
                if (option) {
                  {
                    areas.includes(area.name)
                      ? null
                      : setAreas([...areas, area.name]);
                  }
                } else {
                  {
                    areas.includes(area.name)
                      ? setAreas(areas.filter((elem) => elem !== area.name))
                      : null;
                  }
                }
              }}
            />
          </LeftCell>
          <Cell>
            <styles.P4>{area.name}</styles.P4>
            <div
              className="click"
              onClick={() =>
                deleteAreaMutation({
                  variables: {
                    deleteAreaId: area.id,
                  },
                }).then(() => {
                  refetch();
                })
              }
            >
              <Icon name="eliminate" />
            </div>
          </Cell>
        </Row>
      ))}
      {addArea && (
        <Row>
          <LeftCell />
          <Cell>
            <InputSuper
              input={inputArea}
              setInput={setInputArea}
              placeholder={t("pages.edit-teacher.zones-3")}
              width="100%"
              onEnter={() => {
                createAreaMutation().then(() => {
                  setAddArea(false);
                  setInputArea("");
                  refetch();
                });
              }}
            />
            <div className="click" onClick={() => setAddArea(false)}>
              <Icon name="eliminate" />
            </div>
          </Cell>
        </Row>
      )}
    </Content>
  );
};

export default AddAreasEditTeacher;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${colors.colors.grayBlue};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${colors.colors.grayBlue};
  &.Top {
    border-bottom: 1px solid ${colors.colors.grayBlue2};
  }
  width: 100%;
`;

const LeftCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 36px;
  width: 78px;

  border-right: 1px solid ${colors.colors.grayBlue};
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 36px 10px 20px;
  width: 100%;
  & > * {
    margin: 10px;
  }
  & > div > svg {
    margin-right: -10px;
  }
  .click {
    cursor: pointer;
  }
`;

const AddContactButton = styled.button`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: ${colors.colors.white};
  color: ${colors.colors.blue80};
  & > p {
    margin-left: 5px;
  }
  width: max-content;
`;

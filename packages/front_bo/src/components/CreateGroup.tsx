import {
  colors,
  DropDown,
  DropDownUnique,
  InputSuper,
  MButton,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import {
  GroupModality,
  GroupType,
  TimetableInput,
  useCreateGroupMutation,
  useSimpleCentersNameQuery,
  useSimpleInstructorsNameQuery,
} from "../generated/graphql";
import AddTimeTable from "./AddTimeTable";

const CreateGroup: FC<{
  changeTitle: (title: string) => void;
  close: (action: boolean) => void;
  refetch: () => void;
}> = ({ close, changeTitle, refetch }) => {
  const t = useTranslate();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  //Hooks to save stuff
  const [timeTableOnChange, setTimeTableOnChange] = useState<TimetableInput[]>(
    []
  );
  const [timeTable, setTimeTable] = useState<TimetableInput[]>([]);
  const [instructors, setInstructor] = useState<string[]>([]);
  const [center, setCenter] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [modality, setModality] = useState<GroupModality>();
  const [type, setType] = useState<GroupType>();
  const [finished, setFinished] = useState<boolean>(false);

  //Mutations
  const { data: CentersData } = useSimpleCentersNameQuery({
    fetchPolicy: "network-only",
  });
  const { data: InstructorsData } = useSimpleInstructorsNameQuery({
    fetchPolicy: "network-only",
  });
  const [createGroupMutation, { error }] = useCreateGroupMutation();

  useEffect(() => {
    {
      step === 3 &&
        modality &&
        type &&
        timeTable &&
        createGroupMutation({
          variables: {
            idCenter: center,
            name,
            modality,
            type,
            course: "to be designed",
            timetable: timeTable,
            instructors,
          },
        });
    }
  }, [finished]);

  //TODO: add contacts to query when available

  const route = useRouter();
  useEffect(() => {
    if (error) {
      route.push("/500");
    }
  }, [error]);

  return (
    <Form>
      <styles.P4>{t(`components.create-group.${step}.title`)}</styles.P4>
      {step === 1 && (
        <>
          <FillIn>
            <styles.BoldP4>
              {t(`components.create-group.1.subtitle.center`)}
            </styles.BoldP4>
            <DropDownUnique
              options={
                (CentersData &&
                  CentersData.getCenters.data.map((center) => ({
                    key: center.id,
                    label: center.name,
                  }))) ||
                []
              }
              width="390px"
              setSelected={setCenter}
              selected={center}
            />
          </FillIn>
          <FillIn>
            <styles.BoldP4>
              {t(`components.create-group.1.subtitle.name`)}
            </styles.BoldP4>
            <InputSuper
              placeholder={t(
                `components.create-group.1.subtitle.name-placeholder`
              )}
              input={name}
              setInput={setName}
            />
          </FillIn>
          <FillInSectioned>
            <FillIn>
              <styles.BoldP4>
                {t(`components.create-group.1.subtitle.modality`)}
              </styles.BoldP4>
              <DropDownUnique
                options={Object.values(GroupModality).map((modality) => ({
                  key: modality,
                  label: t(
                    `components.create-group.1.subtitle.modality-${modality}`
                  ),
                }))}
                width="190px"
                setSelected={(modality) =>
                  setModality(modality as GroupModality)
                }
                selected={modality}
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t(`components.create-group.1.subtitle.type`)}
              </styles.BoldP4>
              <DropDownUnique
                options={Object.values(GroupType).map((type) => ({
                  key: type,
                  label: t(`components.create-group.1.subtitle.type-${type}`),
                }))}
                width="190px"
                setSelected={(type) => setType(type as GroupType)}
                selected={type}
              />
            </FillIn>
          </FillInSectioned>
          <FillIn>
            <styles.BoldP4>
              {t(`components.create-group.1.subtitle.instructor`)}
            </styles.BoldP4>
            <DropDown
              options={
                (InstructorsData &&
                  InstructorsData.getInstructors.data.map((instructor) => ({
                    key: instructor.id,
                    label: instructor.name,
                  }))) ||
                []
              }
              width="390px"
              setSelected={setInstructor}
              selected={instructors}
            />
          </FillIn>
          <NavDiv>
            <MButton
              Click={() => close(false)}
              text={t("general.actions.cancel")}
              color={colors.colors.blackBackground}
              backColor={colors.colors.gray60}
            />
            <MButton
              Click={() => setStep(2)}
              text={t("general.actions.next")}
              color={colors.colors.white}
              backColor={colors.colors.blackBackground}
            />
          </NavDiv>
        </>
      )}
      {step === 2 && (
        <>
          <AddTimeTable setTimeTable={setTimeTableOnChange} />
          <NavDiv>
            <MButton
              Click={() => setStep(1)}
              text={t("general.actions.back")}
              color={colors.colors.blackBackground}
              backColor={colors.colors.gray60}
            />
            <MButton
              Click={() => {
                setTimeTable(timeTableOnChange);

                setTimeout(() => {
                  if (
                    name != "" &&
                    center != "" &&
                    modality &&
                    type &&
                    timeTable
                  ) {
                    setFinished(true);
                    changeTitle("");
                    setStep(3);
                  } else {
                    alert("Please fill all the fields");
                  }
                }, 100);
              }}
              text={t("general.actions.create")}
              color={colors.colors.white}
              backColor={colors.colors.green80}
            />
          </NavDiv>
        </>
      )}
      {step === 3 && (
        <EndButton>
          <MButton
            Click={() => {
              refetch();
              close(false);
            }}
            text={t("general.actions.consent")}
          />
        </EndButton>
      )}
    </Form>
  );
};

export default CreateGroup;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  & > p {
    align-self: flex-start;
    margin-bottom: 30px;
  }
`;

export const FillInSectioned = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  & > :not(div:first-child) {
    margin-left: 10px;
  }
`;
export const FillIn = styled.div<{ width?: string }>`
  display: flex;
  ${({ width }) => (width ? `width: ${width}` : "width: 100%")};
  flex-direction: column;
  margin-bottom: 20px;
  & > p {
    margin-bottom: 5px;
  }
  & > div {
    align-items: flex-start;
  }
`;

const NavDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const EndButton = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

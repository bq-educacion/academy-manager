import {
  Button,
  DropDown,
  DropDownUnique,
  FillIn,
  FillInSectioned,
  InputSuper,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import { ApolloError } from "@apollo/client";
import styled from "@emotion/styled";
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
  setError: (error: ApolloError) => void;
}> = ({ close, changeTitle, refetch, setError }) => {
  const t = useTranslate();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  //Hooks to save stuff
  const [timeTableOnChange, setTimeTableOnChange] = useState<TimetableInput[]>(
    []
  );
  const [instructors, setInstructor] = useState<string[]>([]);
  const [center, setCenter] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [modality, setModality] = useState<GroupModality>();
  const [type, setType] = useState<GroupType>();
  const [finished, setFinished] = useState<boolean>(false);

  //Mutations
  const { data: CentersData } = useSimpleCentersNameQuery({
    variables: {
      centers: {},
    },
    fetchPolicy: "network-only",
  });
  const { data: InstructorsData } = useSimpleInstructorsNameQuery({
    variables: {
      instructors: {},
    },
    fetchPolicy: "network-only",
  });
  const [createGroupMutation, { error }] = useCreateGroupMutation();

  useEffect(() => {
    {
      step === 3 &&
        modality &&
        type &&
        timeTableOnChange &&
        createGroupMutation({
          variables: {
            idCenter: center,
            group: {
              name,
              modality,
              type,
              timetable: timeTableOnChange,
              instructors,
            },
          },
        }).then(() => {
          refetch();
        });
    }
  }, [finished]);

  //TODO: add contacts to query when available

  if (error) {
    setError(error);
  }

  if (step === 1) {
    changeTitle(t("pages.groups.modal-create.title"));
  }

  const [centerError, setCenterError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [modalityError, setModalityError] = useState<boolean>(false);
  const [typeError, setTypeError] = useState<boolean>(false);
  const [timeTableError, setTimeTableError] = useState<boolean>(false);

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
              error={centerError}
              setError={setCenterError}
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
            {centerError && (
              <styles.P0Error>{t(`general.empty`)}</styles.P0Error>
            )}
          </FillIn>
          <FillIn>
            <styles.BoldP4>
              {t(`components.create-group.1.subtitle.name`)}
            </styles.BoldP4>
            <InputSuper
              error={nameError}
              setError={setNameError}
              placeholder={t(
                `components.create-group.1.subtitle.name-placeholder`
              )}
              input={name}
              setInput={setName}
            />
            {nameError && <styles.P0Error>{t(`general.empty`)}</styles.P0Error>}
          </FillIn>
          <FillInSectioned>
            <FillIn>
              <styles.BoldP4>
                {t(`components.create-group.1.subtitle.modality`)}
              </styles.BoldP4>
              <DropDownUnique
                error={modalityError}
                setError={setModalityError}
                options={Object.values(GroupModality).map((modality) => ({
                  key: modality,
                  label: t(
                    `components.create-group.1.subtitle.modality-${modality.toLowerCase()}`
                  ),
                }))}
                width="190px"
                setSelected={(modality) =>
                  setModality(modality as GroupModality)
                }
                selected={modality}
              />
              {modalityError && (
                <styles.P0Error>{t(`general.empty`)}</styles.P0Error>
              )}
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t(`components.create-group.1.subtitle.type`)}
              </styles.BoldP4>
              <DropDownUnique
                error={typeError}
                setError={setTypeError}
                options={Object.values(GroupType).map((type) => ({
                  key: type,
                  label: t(
                    `components.create-group.1.subtitle.type-${type.toLowerCase()}`
                  ),
                }))}
                width="190px"
                setSelected={(type) => setType(type as GroupType)}
                selected={type}
              />
              {typeError && (
                <styles.P0Error>{t(`general.empty`)}</styles.P0Error>
              )}
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
            <Button
              secondary
              onClick={() => close(false)}
              text={t("general.actions.cancel")}
            />
            <Button
              main
              onClick={() => {
                if (center && name && modality && type) {
                  setStep(2);
                } else {
                  if (!center) {
                    setCenterError(true);
                  }
                  if (!name) {
                    setNameError(true);
                  }
                  if (!modality) {
                    setModalityError(true);
                  }
                  if (!type) {
                    setTypeError(true);
                  }
                }
              }}
              text={t("general.actions.next")}
            />
          </NavDiv>
        </>
      )}
      {step === 2 && (
        <>
          <AddTimeTable
            checkErrors={setTimeTableError}
            setTimeTable={setTimeTableOnChange}
          />
          {timeTableError && (
            <styles.P0Error>{t(`general.empty`)}</styles.P0Error>
          )}
          <NavDiv>
            <Button
              secondary
              onClick={() => setStep(1)}
              text={t("general.actions.back")}
            />
            <Button
              create
              onClick={() => {
                if (!timeTableError) {
                  if (
                    timeTableOnChange.every((elem) => {
                      return elem.end.length > 0 && elem.start.length > 0;
                    })
                  ) {
                    setFinished(true);
                    changeTitle("");
                    setStep(3);
                  } else {
                    setTimeTableError(true);
                  }
                }
              }}
              text={t("general.actions.create")}
            />
          </NavDiv>
        </>
      )}
      {step === 3 && (
        <EndButton>
          <Button
            main
            onClick={() => {
              changeTitle(t("pages.groups.modal-create.title"));
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

const NavDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const EndButton = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

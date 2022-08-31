import {
  Button,
  CheckBox,
  colors,
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
import { courses } from "../config";
import {
  Group,
  StudentContactInput,
  useCreateStudentMutation,
  useSimpleCentersNameQuery,
  useSimpleGroupsNameQuery,
} from "../generated/graphql";

const CreateStudent: FC<{
  changeTitle: (title: string) => void;
  close: (action: boolean) => void;
  refetch: () => void;
  setError: (error: ApolloError) => void;
}> = ({ close, changeTitle, refetch, setError }) => {
  const t = useTranslate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  //Hooks to save stuff
  const [center, setCenter] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [inscriptionDay, setInscriptionDay] = useState<string>("");
  const [birthDate, setbirthDate] = useState<string>("");
  const [allergies, setAllergies] = useState<boolean>(false);
  const [descriptionAllergy, setdescriptionAllergy] = useState<string>("");
  const [oldStudent, setOldStudent] = useState<boolean>(false);
  const [signedMandate, setSignedMandate] = useState<boolean>(false);
  const [imageAuthorisation, setImageAuthorisation] = useState<boolean>(false);
  const [goesAlone, setGoesAlone] = useState<boolean>(false);
  const [collectionPermit, setCollectionPermit] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [sendInfoToContact, setSendInfoToContact] = useState<boolean>(false);

  //Mutations
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
          (elem) => elem.center.id === center
        ) as Group[]
      );
    }
  }, [StraightGroupsData, center]);

  const [createStudentMutation, { error }] = useCreateStudentMutation({
    variables: {
      registrationDate: inscriptionDay,
      idGroups: [group],
      name,
      birthDate,
      course: course,
      allergies,
      oldStudent,
      signedMandate,
      imageAuthorisation,
      collectionPermit,
      goesAlone,
      contacts: [
        {
          name: contactName,
          phone: contactPhone,
          email: contactEmail,
          send_info: sendInfoToContact,
        } as StudentContactInput,
      ],
      descriptionAllergy: descriptionAllergy,
    },
  });

  if (error) {
    setError(error);
  }

  if (step === 1) {
    changeTitle(t("pages.students.modal-create.title"));
  }

  return (
    <Form>
      {step !== 1 && (
        <styles.P4>{t(`components.create-student.${step}.title`)}</styles.P4>
      )}
      {step === 1 && (
        <>
          <ScrollDiv>
            <styles.P4>
              {t(`components.create-student.${step}.title`)}
            </styles.P4>
            <FillIn>
              <styles.BoldP4>
                {t(`components.create-group.1.subtitle.center`)}
              </styles.BoldP4>
              <DropDownUnique
                options={
                  CentersData?.getCenters.data.map((elem) => {
                    return {
                      key: elem.id,
                      label: elem.name,
                    };
                  }) || []
                }
                width="388px"
                setSelected={setCenter}
                selected={center}
              />
            </FillIn>
            <FillInSectioned>
              <FillIn>
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.group`)}
                </styles.BoldP4>
                <DropDownUnique
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
                  width="278px"
                  setSelected={setGroup}
                  selected={group}
                />
              </FillIn>
              <FillIn>
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.course`)}
                </styles.BoldP4>
                <DropDownUnique
                  options={courses.map((elem) => {
                    return {
                      key: elem.key,
                      label: t(elem.label),
                    };
                  })}
                  width="98px"
                  setSelected={setCourse}
                  selected={course}
                />
              </FillIn>
            </FillInSectioned>
            <FillInSectioned>
              <FillIn width="250px">
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.name`)}
                </styles.BoldP4>
                <InputSuper
                  input={name}
                  setInput={setName}
                  placeholder={t(
                    `components.create-student.1.subtitle.name-placeholder`
                  )}
                />
              </FillIn>
              <FillIn width="130px">
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.inscription-date`)}
                </styles.BoldP4>
                <InputSuper
                  datePattern
                  input={inscriptionDay}
                  setInput={setInscriptionDay}
                  placeholder={t(
                    `components.create-student.1.subtitle.inscription-date-placeholder`
                  )}
                />
              </FillIn>
            </FillInSectioned>
            <FillInSectioned>
              <FillIn width="135px">
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.birth-date`)}
                </styles.BoldP4>
                <InputSuper
                  datePattern
                  input={birthDate}
                  setInput={setbirthDate}
                  placeholder={t(
                    `components.create-student.1.subtitle.birth-date-placeholder`
                  )}
                />
              </FillIn>
              <FillIn width="250px" />
            </FillInSectioned>
            <CheckOption>
              <CheckBox option={allergies} setOption={setAllergies} />
              <styles.P4>
                {t(`components.create-student.1.subtitle.allergies`)}
              </styles.P4>
            </CheckOption>
            <FillIn>
              {allergies ? (
                <styles.BoldP4>
                  {t(
                    `components.create-student.1.subtitle.allergies-description`
                  )}
                </styles.BoldP4>
              ) : (
                <DisabledText>
                  {t(
                    `components.create-student.1.subtitle.allergies-description`
                  )}
                </DisabledText>
              )}
              <InputSuper
                disabled={!allergies}
                input={descriptionAllergy}
                setInput={setdescriptionAllergy}
                placeholder={t(
                  `components.create-student.1.subtitle.allergies-description-placeholder`
                )}
              />
            </FillIn>
            <CheckOption>
              <CheckBox option={oldStudent} setOption={setOldStudent} />
              <styles.P4>
                {t(`components.create-student.1.subtitle.old-student`)}
              </styles.P4>
            </CheckOption>
            <CheckOption>
              <CheckBox option={signedMandate} setOption={setSignedMandate} />
              <styles.P4>
                {t(`components.create-student.1.subtitle.mandate`)}
              </styles.P4>
            </CheckOption>
            <CheckOption>
              <CheckBox
                option={imageAuthorisation}
                setOption={setImageAuthorisation}
              />
              <styles.P4>
                {t(`components.create-student.1.subtitle.images`)}
              </styles.P4>
            </CheckOption>
            <CheckOption>
              <CheckBox option={goesAlone} setOption={setGoesAlone} />
              <styles.P4>
                {t(`components.create-student.1.subtitle.alone`)}
              </styles.P4>
            </CheckOption>
            <FillIn>
              <styles.BoldP4>
                {t(`components.create-student.1.subtitle.collectionPermit`)}
              </styles.BoldP4>
              <InputSuper
                input={collectionPermit}
                setInput={setCollectionPermit}
                placeholder={t(
                  `components.create-student.1.subtitle.collectionPermit-placeholder`
                )}
              />
            </FillIn>
          </ScrollDiv>
          <NavDivStep1>
            <Button
              secondary
              onClick={() => close(false)}
              text={t("general.actions.cancel")}
            />
            <Button
              main
              onClick={() => setStep(2)}
              text={t("general.actions.next")}
            />
          </NavDivStep1>
        </>
      )}
      {step === 2 && (
        <>
          <FillIn>
            <styles.BoldP4>
              {t(`components.create-student.2.subtitle.name`)}
            </styles.BoldP4>
            <InputSuper
              input={contactName}
              setInput={setContactName}
              placeholder={t(
                `components.create-student.2.subtitle.name-placeholder`
              )}
            />
          </FillIn>
          <FillInSectioned>
            <FillIn width="260px">
              <styles.BoldP4>
                {t(`components.create-student.2.subtitle.email`)}
              </styles.BoldP4>
              <InputSuper
                type="email"
                input={contactEmail}
                setInput={setContactEmail}
                placeholder={t(
                  `components.create-student.2.subtitle.email-placeholder`
                )}
              />
            </FillIn>
            <FillIn width="115px">
              <styles.BoldP4>
                {t(`components.create-student.2.subtitle.phone`)}
              </styles.BoldP4>
              <InputSuper
                telPattern
                input={contactPhone}
                setInput={setContactPhone}
                placeholder={t(`components.create-student.2.subtitle.phone`)}
              />
            </FillIn>
          </FillInSectioned>
          <CheckOption>
            <CheckBox
              option={sendInfoToContact}
              setOption={setSendInfoToContact}
            />
            <styles.P4>
              {t(`components.create-student.2.subtitle.send`)}
            </styles.P4>
          </CheckOption>
          <NavDiv>
            <Button
              secondary
              onClick={() => setStep(1)}
              text={t("general.actions.back")}
            />
            <Button
              create
              onClick={() => {
                if (
                  name !== "" &&
                  group !== "" &&
                  birthDate !== "" &&
                  course !== "" &&
                  inscriptionDay !== "" &&
                  collectionPermit !== "" &&
                  contactName !== "" &&
                  contactEmail !== "" &&
                  contactPhone !== ""
                ) {
                  createStudentMutation().then(() => {
                    refetch();
                    changeTitle("");
                    setStep(3);
                  });
                } else {
                  alert("Please fill in all fields");
                }
              }}
              text={t("general.actions.create")}
            />
          </NavDiv>
        </>
      )}
      {step === 3 && (
        <FillIn>
          <EndButton
            main
            onClick={() => {
              changeTitle(t("pages.students.modal-create.title"));
              close(false);
            }}
            text={t("general.actions.consent")}
          />
        </FillIn>
      )}
    </Form>
  );
};

export default CreateStudent;

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
  margin-top: 10px;
  width: 100%;
`;

const NavDivStep1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid ${colors.colors.gray60};
  padding: 20px 45px 39px 45px;
  margin: -30px -45px;
  background-color: ${colors.colors.white};
`;

const EndButton = styled(Button)`
  align-self: flex-start;
`;

const CheckOption = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
  & > p {
    margin-left: 10px;
  }
`;

const ScrollDiv = styled.div`
  margin: 0;
  width: 100%;
  max-height: 499px;
  margin-top: -30px;
  overflow-y: scroll;
  padding-bottom: 30px;
  & > p {
    margin: 30px 0;
  }
`;

const DisabledText = styled(styles.BoldP4)`
  color: ${colors.colors.gray2};
`;

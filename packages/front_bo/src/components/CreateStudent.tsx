import {
  Button,
  CheckBox,
  colors,
  DropDownUnique,
  FillIn,
  FillInSectioned,
  Icon,
  InputSuper,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import { ApolloError } from "@apollo/client";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import { AddCenter, AddContactStudent } from ".";
import { courses } from "../config";
import {
  StudentContactInput,
  useCreateStudentMutation,
} from "../generated/graphql";

const CreateStudent: FC<{
  changeTitle: (title: string) => void;
  close: (action: boolean) => void;
  refetch: () => void;
  setError: (error: ApolloError) => void;
}> = ({ close, changeTitle, refetch, setError }) => {
  const t = useTranslate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  //Hooks to save stuff
  const [centers, setCenters] = useState<string[]>([""]);
  const [groups, setGroups] = useState<string[]>([]);
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
  const [contacts, setContacts] = useState<StudentContactInput[]>([
    {
      name: "",
      phone: "",
      email: "",
      send_info: false,
    },
  ]);

  //Mutations
  const [createStudentMutation, { error }] = useCreateStudentMutation({
    variables: {
      student: {
        registrationDate: inscriptionDay,
        name,
        birthDate,
        course: course,
        allergies,
        oldStudent,
        signedMandate,
        imageAuthorisation,
        collectionPermit,
        goesAlone,
        contacts,
        descriptionAllergy: descriptionAllergy,
      },
      idGroups: groups,
    },
  });

  if (error) {
    setError(error);
  }

  if (step === 1) {
    changeTitle(t("pages.students.modal-create.title"));
  }

  const [courseError, setCourseError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [inscriptionDayError, setInscriptionDayError] =
    useState<boolean>(false);
  const [birthDateError, setBirthDateError] = useState<boolean>(false);

  if (step === 1) {
    changeTitle(t("pages.students.modal-create.title"));
  }

  return (
    <Form>
      {step === 1 && (
        <>
          <ScrollDiv>
            <styles.P4>
              {t(`components.create-student.${step}.title`)}
            </styles.P4>
            {/* <FillIn>
              <styles.BoldP4>
                {t(`components.create-group.1.subtitle.center`)}
              </styles.BoldP4>
              <DropDownUnique
                error={centerError}
                setError={setCenterError}
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
              {centerError && (
                <styles.P0Error>{t("general.empty")}</styles.P0Error>
              )}
            </FillIn> */}
            <FillInSectioned>
              <FillIn width="250px">
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.name`)}
                </styles.BoldP4>
                <InputSuper
                  error={nameError}
                  setError={setNameError}
                  input={name}
                  setInput={setName}
                  placeholder={t(
                    `components.create-student.1.subtitle.name-placeholder`
                  )}
                />
                {nameError && (
                  <styles.P0Error>{t("general.empty")}</styles.P0Error>
                )}
              </FillIn>
              {/* <FillIn>
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.group`)}
                </styles.BoldP4>
                <DropDownUnique
                  options={(GroupsData.every !== undefined &&
                    (GroupsData as Group[]).map((elem) => {
                      return {
                        key: elem.id,
                        label: elem.name,
                      };
                    })) ||
                    []}
                  width="278px"
                  setSelected={setGroup}
                  selected={group}
                />
              </FillIn> */}
              <FillIn width="98px">
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.course`)}
                </styles.BoldP4>
                <DropDownUnique
                  error={courseError}
                  setError={setCourseError}
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
                {courseError && (
                  <styles.P0Error>{t("general.empty")}</styles.P0Error>
                )}
              </FillIn>
            </FillInSectioned>
            <FillInSectioned>
              <FillIn width="135px">
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.birth-date`)}
                </styles.BoldP4>
                <InputSuper
                  error={birthDateError}
                  setError={setBirthDateError}
                  datePattern
                  input={birthDate}
                  setInput={setbirthDate}
                  placeholder={t(
                    `components.create-student.1.subtitle.birth-date-placeholder`
                  )}
                />
                {birthDateError && (
                  <styles.P0Error>{t("general.decline-date")}</styles.P0Error>
                )}
              </FillIn>
              <FillIn width="135px">
                <styles.BoldP4>
                  {t(`components.create-student.1.subtitle.inscription-date`)}
                </styles.BoldP4>
                <InputSuper
                  error={inscriptionDayError}
                  setError={setInscriptionDayError}
                  datePattern
                  input={inscriptionDay}
                  setInput={setInscriptionDay}
                  placeholder={t(
                    `components.create-student.1.subtitle.inscription-date-placeholder`
                  )}
                />
                {inscriptionDayError && (
                  <styles.P0Error>{t("general.decline-date")}</styles.P0Error>
                )}
              </FillIn>
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
              onClick={() => {
                if (inscriptionDay !== "") {
                  if (
                    !inscriptionDay.match(
                      /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/
                    )
                  ) {
                    setInscriptionDayError(true);
                  }
                }
                if (birthDate !== "") {
                  if (
                    !birthDate.match(
                      /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/
                    )
                  ) {
                    setBirthDateError(true);
                  }
                }
                {
                  course === "" && setCourseError(true);
                }
                {
                  name === "" && setNameError(true);
                }

                if (
                  course !== "" &&
                  name !== "" &&
                  (inscriptionDay === "" ||
                    (inscriptionDay !== "" &&
                      inscriptionDay.match(
                        /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/
                      ))) &&
                  (birthDate === "" ||
                    (birthDate !== "" &&
                      birthDate.match(
                        /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/
                      )))
                ) {
                  setStep(2);
                }
              }}
              text={t("general.actions.next")}
            />
          </NavDivStep1>
        </>
      )}
      {step === 2 && (
        <>
          <ContactsDiv>
            <TitleStep3>
              {t(`components.create-student.${step}.title`)}
            </TitleStep3>
            {contacts.map((contact, index) => {
              return (
                <AddContactStudent
                  key={index}
                  contact={contact}
                  contacts={contacts}
                  setContacts={setContacts}
                  setContact={(NewContact) => {
                    const newContacts = [...contacts];
                    newContacts[index] = NewContact;
                    setContacts(newContacts);
                  }}
                />
              );
            })}
            <AddContactButton
              onClick={() => {
                setContacts([
                  ...contacts,
                  {
                    name: "",
                    phone: "",
                    email: "",
                    send_info: false,
                  },
                ]);
              }}
            >
              <Icon name="add" />
              <Icon name="user" />
              <styles.BoldP4>
                {t("components.create-center.3.add-contact")}
              </styles.BoldP4>
            </AddContactButton>
          </ContactsDiv>
          {contacts.length > 1 && (
            <NavDivStep3>
              <Button
                secondary
                onClick={() => setStep(1)}
                text={t("general.actions.back")}
              />
              <Button
                main
                // onClick={() => {
                //   if (
                //     name !== "" &&
                //     group !== "" &&
                //     birthDate !== "" &&
                //     course !== "" &&
                //     inscriptionDay !== "" &&
                //     collectionPermit !== "" &&
                //     contactName !== "" &&
                //     contactEmail !== "" &&
                //     contactPhone !== ""
                //   ) {
                //     createStudentMutation().then(() => {
                //       refetch();
                //       changeTitle("");
                //       setStep(3);
                //     });
                //   } else {
                //     alert("Please fill in all fields");
                //   }
                // }}
                onClick={() => {
                  setStep(3);
                }}
                text={t("general.actions.next")}
              />
            </NavDivStep3>
          )}
          {contacts.length === 1 && (
            <NavDiv>
              <Button
                secondary
                onClick={() => setStep(1)}
                text={t("general.actions.back")}
              />
              <Button
                main
                // onClick={() => {
                //   if (
                //     name !== "" &&
                //     group !== "" &&
                //     birthDate !== "" &&
                //     course !== "" &&
                //     inscriptionDay !== "" &&
                //     collectionPermit !== "" &&
                //     contactName !== "" &&
                //     contactEmail !== "" &&
                //     contactPhone !== ""
                //   ) {
                //     createStudentMutation().then(() => {
                //       refetch();
                //       changeTitle("");
                //       setStep(3);
                //     });
                //   } else {
                //     alert("Please fill in all fields");
                //   }
                // }}
                onClick={() => {
                  setStep(3);
                }}
                text={t("general.actions.next")}
              />
            </NavDiv>
          )}
        </>
      )}
      {step === 3 && (
        <>
          <ContactsDiv>
            <TitleStep3>
              {t(`components.create-student.${step}.title`)}
            </TitleStep3>
            {centers.map((center, index) => {
              return (
                <AddCenter
                  key={index}
                  center={center}
                  centers={centers}
                  setCenters={setCenters}
                  groups={groups}
                  setGroups={setGroups}
                  setCenter={(NewCenter) => {
                    const newCenters = [...centers];
                    newCenters[index] = NewCenter;
                    setCenters(newCenters);
                  }}
                />
              );
            })}
            <AddContactButton
              onClick={() => {
                setCenters([...centers, ""]);
              }}
            >
              <Icon name="add" />
              <Icon name="user" />
              <styles.BoldP4>
                {t("components.create-student.3.add-center")}
              </styles.BoldP4>
            </AddContactButton>
          </ContactsDiv>
          {centers.length > 1 && (
            <NavDivStep3>
              <Button
                secondary
                onClick={() => setStep(2)}
                text={t("general.actions.back")}
              />
              <Button
                create
                onClick={() => {
                  if (name !== "" && course !== "") {
                    createStudentMutation().then(() => {
                      refetch();
                      changeTitle("");
                      setStep(4);
                    });
                  }
                }}
                text={t("components.create-center.3.create")}
              />
            </NavDivStep3>
          )}
          {centers.length === 1 && (
            <NavDiv>
              <Button
                secondary
                onClick={() => setStep(2)}
                text={t("general.actions.back")}
              />
              <Button
                create
                onClick={() => {
                  if (name !== "" && course !== "") {
                    createStudentMutation().then(() => {
                      refetch();
                      changeTitle("");
                      setStep(4);
                    });
                  }
                }}
                text={t("components.create-center.3.create")}
              />
            </NavDiv>
          )}
        </>
      )}
      {step === 4 && (
        <>
          <styles.P4>{t(`components.create-student.${step}.title`)}</styles.P4>

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
        </>
      )}
    </Form>
  );
};

export default CreateStudent;

const TitleStep3 = styled(styles.P4)`
  margin: 30px 0;
`;

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

const AddContactButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: ${colors.colors.white};
  color: ${colors.colors.blue80};
  & > p {
    margin-left: 5px;
  }
`;

const DisabledText = styled(styles.BoldP4)`
  color: ${colors.colors.gray2};
`;

const ContactsDiv = styled.div`
  margin: 0;
  width: 100%;
  max-height: 499px;
  margin-top: -30px;
  overflow-y: scroll;
  padding-bottom: 20px;
`;

const NavDivStep3 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid ${colors.colors.gray60};
  padding: 20px 45px 39px 45px;
  margin: 0 -45px -30px -45px;
  background-color: ${colors.colors.white};
`;

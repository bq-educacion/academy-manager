import {
  CheckBox,
  colors,
  DropDownUnique,
  InputSuper,
  MButton,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
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
}> = ({ close, changeTitle, refetch }) => {
  const t = useTranslate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  //Hooks to save stuff
  const [center, setCenter] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [inscriptionDay, setInscriptionDay] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [allergies, setAllergies] = useState<boolean>(false);
  const [descriptionAllergies, setDescriptionAllergies] = useState<string>("");
  const [oldStudent, setOldStudent] = useState<boolean>(false);
  const [signedMandate, setSignedMandate] = useState<boolean>(false);
  const [imageAuthorization, setImageAuthorization] = useState<boolean>(false);
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
      idCenter: center,
      idGroup: group,
      name,
      birthDate: birthday,
      course: course,
      alergies: allergies,
      oldStudent,
      signedMandate,
      imageAuthorisation: imageAuthorization,
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
      descriptionAllergy: descriptionAllergies,
    },
  });

  const route = useRouter();
  useEffect(() => {
    if (error) {
      route.push("/500");
    }
  }, [error]);

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
                  input={birthday}
                  setInput={setBirthday}
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
              <styles.BoldP4>
                {t(
                  `components.create-student.1.subtitle.allergies-description`
                )}
              </styles.BoldP4>
              <InputSuper
                input={descriptionAllergies}
                setInput={setDescriptionAllergies}
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
                option={imageAuthorization}
                setOption={setImageAuthorization}
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
            <MButton
              Click={() => setStep(1)}
              text={t("general.actions.cancel")}
              color={colors.colors.blackBackground}
              backColor={colors.colors.gray60}
            />
            <MButton
              Click={() => {
                if (
                  name !== "" &&
                  contactName !== "" &&
                  contactEmail !== "" &&
                  contactPhone !== ""
                ) {
                  createStudentMutation().then(() => {
                    changeTitle("");
                    setStep(3);
                  });
                } else {
                  alert("Please fill in all fields");
                }
              }}
              text={t("general.actions.create")}
              color={colors.colors.white}
              backColor={colors.colors.green80}
            />
          </NavDiv>
        </>
      )}
      {step === 3 && (
        <FillIn>
          <EndButton
            Click={() => {
              refetch();
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

const EndButton = styled(MButton)`
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
  overflow-x: visible;
  overflow-y: scroll;
  margin-bottom: 40px;
  & > p {
    margin-bottom: 30px;
  }
`;

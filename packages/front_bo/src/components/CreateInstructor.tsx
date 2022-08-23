import {
  CheckBox,
  colors,
  DropDown,
  DropDownUnique,
  FillIn,
  FillInSectioned,
  InputSuper,
  MButton,
  OptionsBox,
  RadioButton,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import { ApolloError } from "@apollo/client";
import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { centerLanguages, Platforms, schedule, Tools } from "../config";
import {
  AvailabilityInput,
  Days,
  PreviousExperienceInstructor,
  StateInstructor,
  TrainingInstructor,
} from "../generated/graphql";

const CreateInstructor: FC<{
  changeTitle: (title: string) => void;
  close: (action: boolean) => void;
  refetch: () => void;
  setError: (error: ApolloError) => void;
}> = ({ close /*changeTitle, refetch, setError*/ }) => {
  const t = useTranslate();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  //Hooks to save stuff
  const [name, setName] = useState<string>("");
  const [emailPro, setEmailPro] = useState<string>("");
  const [emailPersonal, setEmailPersonal] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [state, setState] = useState<StateInstructor>();
  const [education, setEducation] = useState<TrainingInstructor>();
  const [experience, setExperience] = useState<PreviousExperienceInstructor>();
  const [programming, setProgramming] = useState<boolean>();
  const [knowledge, setKnowledge] = useState<string>("");
  const [cvUrl, setCvUrl] = useState<string>("");
  const [tools, setTools] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [aviability, setAviability] = useState<AvailabilityInput[]>([]);
  const [monday, setMonday] = useState<string[]>([]);
  const [tuesday, setTuesday] = useState<string[]>([]);
  const [wednesday, setWednesday] = useState<string[]>([]);
  const [thursday, setThursday] = useState<string[]>([]);
  const [friday, setFriday] = useState<string[]>([]);
  const [saturday, setSaturday] = useState<string[]>([]);
  const [sunday, setSunday] = useState<string[]>([]);

  //Mutations

  // if (error) {
  //   setError(error);
  // }
  useEffect(() => {
    const LocalAviability: AvailabilityInput[] = [];
    if (monday.length > 0) {
      LocalAviability.push({
        day: Days.Monday,
        hours: monday,
      });
    }
    if (tuesday.length > 0) {
      LocalAviability.push({
        day: Days.Tuesday,
        hours: tuesday,
      });
    }
    if (wednesday.length > 0) {
      LocalAviability.push({
        day: Days.Wednesday,
        hours: wednesday,
      });
    }
    if (thursday.length > 0) {
      LocalAviability.push({
        day: Days.Thursday,
        hours: thursday,
      });
    }
    if (friday.length > 0) {
      LocalAviability.push({
        day: Days.Friday,
        hours: friday,
      });
    }
    if (saturday.length > 0) {
      LocalAviability.push({
        day: Days.Saturday,
        hours: saturday,
      });
    }
    if (sunday.length > 0) {
      LocalAviability.push({
        day: Days.Sunday,
        hours: sunday,
      });
    }
    setAviability(LocalAviability);
    alert(aviability);
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  return (
    <Form>
      {step !== 2 && (
        <styles.P4>{t(`components.create-instructor.${step}.title`)}</styles.P4>
      )}

      {step === 1 && (
        <>
          <FillIn>
            <styles.BoldP4>
              {t("components.create-instructor.1.name")}
            </styles.BoldP4>
            <InputSuper
              input={name}
              setInput={setName}
              placeholder={t("components.create-instructor.1.name-placeholder")}
            />
          </FillIn>
          <FillIn>
            <styles.BoldP4>
              {t("components.create-instructor.1.email-pro")}
            </styles.BoldP4>
            <InputSuper
              input={emailPro}
              setInput={setEmailPro}
              placeholder={t(
                "components.create-instructor.1.email-pro-placeholder"
              )}
            />
          </FillIn>
          <FillIn>
            <styles.BoldP4>
              {t("components.create-instructor.1.email-personal")}
            </styles.BoldP4>
            <InputSuper
              input={emailPersonal}
              setInput={setEmailPersonal}
              placeholder={t(
                "components.create-instructor.1.email-personal-placeholder"
              )}
            />
          </FillIn>
          <FillInSectioned>
            <FillIn width="120px">
              <styles.BoldP4>
                {t("components.create-instructor.1.phone")}
              </styles.BoldP4>
              <InputSuper
                input={phone}
                setInput={setPhone}
                placeholder={t("components.create-instructor.1.phone")}
              />
            </FillIn>
            <FillIn width="254px">
              <styles.BoldP4>
                {t("components.create-instructor.1.state")}
              </styles.BoldP4>
              <DropDownUnique
                options={Object.values(StateInstructor).map((elem) => {
                  return {
                    key: elem,
                    label: t(
                      `components.create-instructor.1.state-${elem.toLowerCase()}`
                    ),
                  };
                })}
                setSelected={(elem) => {
                  setState(elem as StateInstructor);
                }}
                selected={state}
                width="254px"
              />
            </FillIn>
          </FillInSectioned>
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
          <ScrollDiv>
            <styles.P4>
              {t(`components.create-instructor.${step}.title`)}
            </styles.P4>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.2.education")}
              </styles.BoldP4>
              <CheckOption>
                <CheckBox
                  option={education === TrainingInstructor.CareerInEducation}
                  setOption={() => {
                    {
                      education !== TrainingInstructor.CareerInEducation
                        ? setEducation(TrainingInstructor.CareerInEducation)
                        : setEducation(undefined);
                    }
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.2.education-1`)}
                </styles.P4>
              </CheckOption>
              <CheckOption>
                <CheckBox
                  option={education === TrainingInstructor.TechnicalCareer}
                  setOption={() => {
                    {
                      education !== TrainingInstructor.TechnicalCareer
                        ? setEducation(TrainingInstructor.TechnicalCareer)
                        : setEducation(undefined);
                    }
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.2.education-2`)}
                </styles.P4>
              </CheckOption>
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.2.experience")}
              </styles.BoldP4>
              <CheckOption>
                <RadioButton
                  option={experience === PreviousExperienceInstructor.Yes}
                  setOption={() => {
                    {
                      experience !== PreviousExperienceInstructor.Yes
                        ? setExperience(PreviousExperienceInstructor.Yes)
                        : setExperience(undefined);
                    }
                  }}
                />
                <styles.P4>{t(`components.create-instructor.2.si`)}</styles.P4>
              </CheckOption>
              <CheckOption>
                <RadioButton
                  option={experience === PreviousExperienceInstructor.No}
                  setOption={() => {
                    {
                      experience !== PreviousExperienceInstructor.No
                        ? setExperience(PreviousExperienceInstructor.No)
                        : setExperience(undefined);
                    }
                  }}
                />
                <styles.P4>{t(`components.create-instructor.2.no`)}</styles.P4>
              </CheckOption>
              <CheckOption>
                <RadioButton
                  option={
                    experience === PreviousExperienceInstructor.NoButInterested
                  }
                  setOption={() => {
                    {
                      experience !==
                      PreviousExperienceInstructor.NoButInterested
                        ? setExperience(
                            PreviousExperienceInstructor.NoButInterested
                          )
                        : setExperience(undefined);
                    }
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.2.experience-noBut`)}
                </styles.P4>
              </CheckOption>
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.2.programming")}
              </styles.BoldP4>
              <CheckOption>
                <RadioButton
                  option={programming ? true : false}
                  setOption={() => {
                    {
                      programming !== true
                        ? setProgramming(true)
                        : setProgramming(undefined);
                    }
                  }}
                />
                <styles.P4>{t(`components.create-instructor.2.si`)}</styles.P4>
              </CheckOption>
              <CheckOption>
                <RadioButton
                  option={
                    programming === undefined
                      ? false
                      : programming
                      ? false
                      : true
                  }
                  setOption={() => {
                    {
                      programming !== false
                        ? setProgramming(false)
                        : setProgramming(undefined);
                    }
                  }}
                />
                <styles.P4>{t(`components.create-instructor.2.no`)}</styles.P4>
              </CheckOption>
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.2.knowledge")}
              </styles.BoldP4>
              <InputSuper
                height="60px"
                placeholder={t(
                  "components.create-instructor.2.knowledge-placeholder"
                )}
                input={knowledge}
                setInput={setKnowledge}
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.2.cv-link")}
              </styles.BoldP4>
              <InputSuper
                placeholder={t(
                  "components.create-instructor.2.cv-link-placeholder"
                )}
                input={cvUrl}
                setInput={setCvUrl}
              />
            </FillIn>
            <FillIn>
              <OptionsBox
                options={Tools}
                title={t("components.create-instructor.2.tools")}
                results={tools}
                setResults={setTools}
              />
            </FillIn>
            <FillIn>
              <OptionsBox
                options={Platforms}
                title={t("components.create-instructor.2.platforms")}
                results={platforms}
                setResults={setPlatforms}
              />
            </FillIn>
            <FillIn>
              <OptionsBox
                options={centerLanguages.map((elem) => {
                  return {
                    key: elem,
                    label: t(`pages.centers.languages.${elem.toLowerCase()}`),
                  };
                })}
                title={t("components.create-instructor.2.languages")}
                results={languages}
                setResults={setLanguages}
              />
            </FillIn>
          </ScrollDiv>
          <NavDivScroll>
            <MButton
              Click={() => setStep(1)}
              text={t("general.actions.back")}
              color={colors.colors.blackBackground}
              backColor={colors.colors.gray60}
            />
            <MButton
              Click={() => setStep(3)}
              text={t("general.actions.next")}
              color={colors.colors.white}
              backColor={colors.colors.blackBackground}
            />
          </NavDivScroll>
        </>
      )}
      {step === 3 && (
        <>
          <ScrollDiv>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-group.2.subtitle.monday")}
              </styles.BoldP4>
              <DropDown
                options={schedule.map((elem) => {
                  return {
                    key: elem,
                    label: elem,
                  };
                })}
                width="388px"
                setSelected={setMonday}
                selected={monday}
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-group.2.subtitle.tuesday")}
              </styles.BoldP4>
              <DropDown
                options={schedule.map((elem) => {
                  return {
                    key: elem,
                    label: elem,
                  };
                })}
                width="388px"
                setSelected={setTuesday}
                selected={tuesday}
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-group.2.subtitle.wednesday")}
              </styles.BoldP4>
              <DropDown
                options={schedule.map((elem) => {
                  return {
                    key: elem,
                    label: elem,
                  };
                })}
                width="388px"
                setSelected={setWednesday}
                selected={wednesday}
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-group.2.subtitle.thursday")}
              </styles.BoldP4>
              <DropDown
                options={schedule.map((elem) => {
                  return {
                    key: elem,
                    label: elem,
                  };
                })}
                width="388px"
                setSelected={setThursday}
                selected={thursday}
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-group.2.subtitle.friday")}
              </styles.BoldP4>
              <DropDown
                options={schedule.map((elem) => {
                  return {
                    key: elem,
                    label: elem,
                  };
                })}
                width="388px"
                setSelected={setFriday}
                selected={friday}
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-group.2.subtitle.saturday")}
              </styles.BoldP4>
              <DropDown
                options={schedule.map((elem) => {
                  return {
                    key: elem,
                    label: elem,
                  };
                })}
                width="388px"
                setSelected={setSaturday}
                selected={saturday}
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-group.2.subtitle.sunday")}
              </styles.BoldP4>
              <DropDown
                options={schedule.map((elem) => {
                  return {
                    key: elem,
                    label: elem,
                  };
                })}
                width="388px"
                setSelected={setSunday}
                selected={sunday}
              />
            </FillIn>
          </ScrollDiv>
          <NavDivScroll>
            <MButton
              Click={() => setStep(2)}
              text={t("general.actions.back")}
              color={colors.colors.blackBackground}
              backColor={colors.colors.gray60}
            />
            <MButton
              Click={() => setStep(4)}
              text={t("general.actions.next")}
              color={colors.colors.white}
              backColor={colors.colors.blackBackground}
            />
          </NavDivScroll>
        </>
      )}
    </Form>
  );
};

export default CreateInstructor;

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
`;

const NavDivScroll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid ${colors.colors.gray60};
  padding: 20px 45px 39px 45px;
  margin: -30px -45px;
  background-color: ${colors.colors.white};
`;

const CheckOption = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 5px 0;
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

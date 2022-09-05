import {
  Button,
  CheckBox,
  colors,
  DropDown,
  DropDownUnique,
  FillIn,
  FillInSectioned,
  InputSuper,
  OptionsBox,
  OptionsBoxOrdered,
  RadioButton,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import { ApolloError } from "@apollo/client";
import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { Platforms, schedule, Tools, zones } from "../config";
import {
  AvailabilityInput,
  Days,
  InstructorStatus,
  Languages,
  OrderFilterGroup,
  PreviousExperienceInstructor,
  SummerAvailabilityInstructor,
  TrainingInstructorInput,
  TypeVehicleInstructor,
  useCreateInstructorMutation,
  useGetGroupsQuery,
  useSimpleCentersNameQuery,
} from "../generated/graphql";

const CreateInstructor: FC<{
  changeTitle: (title: string) => void;
  close: (action: boolean) => void;
  refetch: () => void;
  setError: (error: ApolloError) => void;
}> = ({ close, changeTitle, refetch, setError }) => {
  const t = useTranslate();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  //Hooks to save stuff
  const [name, setName] = useState<string>("");
  const [emailPro, setEmailPro] = useState<string>("");
  const [emailPersonal, setEmailPersonal] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [state, setState] = useState<InstructorStatus>();
  const [education, setEducation] = useState<TrainingInstructorInput>();
  const [experience, setExperience] = useState<PreviousExperienceInstructor>();
  const [programming, setProgramming] = useState<boolean>();
  const [knowledge, setKnowledge] = useState<string>("");
  const [cvUrl, setCvUrl] = useState<string>("");
  const [tools, setTools] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [languages, setLanguages] = useState<Languages[]>([]);
  const [availability, setavailability] = useState<AvailabilityInput[]>([]);
  const [monday, setMonday] = useState<string[]>([]);
  const [tuesday, setTuesday] = useState<string[]>([]);
  const [wednesday, setWednesday] = useState<string[]>([]);
  const [thursday, setThursday] = useState<string[]>([]);
  const [friday, setFriday] = useState<string[]>([]);
  const [saturday, setSaturday] = useState<string[]>([]);
  const [sunday, setSunday] = useState<string[]>([]);
  const week: {
    day: string;
    key: string[];
    function: (txt: string[]) => void;
  }[] = [
    { day: "monday", key: monday, function: setMonday },
    { day: "tuesday", key: tuesday, function: setTuesday },
    { day: "wednesday", key: wednesday, function: setWednesday },
    { day: "thursday", key: thursday, function: setThursday },
    { day: "friday", key: friday, function: setFriday },
    { day: "saturday", key: saturday, function: setSaturday },
    { day: "sunday", key: sunday, function: setSunday },
  ];
  const [vehicle, setVehicle] = useState<TypeVehicleInstructor>();
  const [LocalZones, setLocalZones] = useState<string[]>([]);
  const [orderName, setOrderName] = useState<boolean>(false);
  const [especifyZones, setEspecifyZones] = useState<string[]>([]);
  const [center, setCenter] = useState<string>("");
  const [groups, setGroups] = useState<string[]>([]);
  const [summer, setSummer] = useState<SummerAvailabilityInstructor>();

  //Mutations
  const { data: CentersData } = useSimpleCentersNameQuery({
    variables: {},
    fetchPolicy: "network-only",
  });
  const { data: GroupsData } = useGetGroupsQuery({
    variables: {
      searchText: center,
      orderFilter: OrderFilterGroup.IdGroup,
      order: 1,
      page: 1,
      pageSize: 20,
    },
  });

  const [createInstructorMutation, { error }] = useCreateInstructorMutation();

  if (error) {
    setError(error);
  }
  useEffect(() => {
    const Localavailability: AvailabilityInput[] = [];
    if (monday.length > 0) {
      Localavailability.push({
        day: Days.Monday,
        hours: monday,
      });
    }
    if (tuesday.length > 0) {
      Localavailability.push({
        day: Days.Tuesday,
        hours: tuesday,
      });
    }
    if (wednesday.length > 0) {
      Localavailability.push({
        day: Days.Wednesday,
        hours: wednesday,
      });
    }
    if (thursday.length > 0) {
      Localavailability.push({
        day: Days.Thursday,
        hours: thursday,
      });
    }
    if (friday.length > 0) {
      Localavailability.push({
        day: Days.Friday,
        hours: friday,
      });
    }
    if (saturday.length > 0) {
      Localavailability.push({
        day: Days.Saturday,
        hours: saturday,
      });
    }
    if (sunday.length > 0) {
      Localavailability.push({
        day: Days.Sunday,
        hours: sunday,
      });
    }
    setavailability(Localavailability);
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  if (step === 1) {
    changeTitle(t("pages.instructors.modal-create.title"));
  }

  const [nameError, setNameError] = useState<boolean>(false);
  const [validEmail, setvalidEmail] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [ValidProEmail, setValidProEmail] = useState<boolean>(false);
  const [errorProEmail, setErrorProEmail] = useState<boolean>(false);
  const [errorPhone, setErrorPhone] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);

  const [errorEducation, setErrorEducation] = useState<boolean>(false);
  const [errorExperience, setErrorExperience] = useState<boolean>(false);
  const [errorProgramming, setErrorProgramming] = useState<boolean>(false);
  const [errorCV, setErrorCV] = useState<boolean>(false);

  return (
    <Form>
      {step !== 2 && step !== 4 && step !== 5 && step !== 3 && (
        <styles.P4>{t(`components.create-instructor.${step}.title`)}</styles.P4>
      )}

      {step === 1 && (
        <>
          <FillIn>
            <styles.BoldP4>
              {t("components.create-instructor.1.name")}
            </styles.BoldP4>
            <InputSuper
              namePattern
              error={nameError}
              setError={setNameError}
              input={name}
              setInput={setName}
              placeholder={t("components.create-instructor.1.name-placeholder")}
            />
            {nameError && <styles.P0Error>{t("general.empty")}</styles.P0Error>}
          </FillIn>
          <FillInSectioned>
            <FillIn width="254px">
              <styles.BoldP4>
                {t("components.create-instructor.1.state")}
              </styles.BoldP4>
              <DropDownUnique
                error={errorState}
                setError={setErrorState}
                options={Object.values(InstructorStatus).map((elem) => {
                  return {
                    key: elem,
                    label: t(
                      `components.create-instructor.1.state-${elem.toLowerCase()}`
                    ),
                  };
                })}
                setSelected={(elem) => {
                  setState(elem as InstructorStatus);
                }}
                selected={state}
                width="254px"
              />
              {errorState && (
                <styles.P0Error>{t("general.empty")}</styles.P0Error>
              )}
            </FillIn>
            <FillIn width="120px">
              <styles.BoldP4>
                {t("components.create-instructor.1.phone")}
              </styles.BoldP4>
              <InputSuper
                error={errorPhone}
                setError={setErrorPhone}
                telPattern
                input={phone}
                setInput={setPhone}
                placeholder={t("components.create-instructor.1.phone")}
              />
              {errorPhone && (
                <styles.P0Error>{t("general.decline-phone")}</styles.P0Error>
              )}
            </FillIn>
          </FillInSectioned>
          {state === InstructorStatus.Active && (
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.1.email-personal")}
              </styles.BoldP4>
              <InputSuper
                type="email"
                error={errorEmail}
                setError={setErrorEmail}
                setValid={setvalidEmail}
                input={emailPersonal}
                setInput={setEmailPersonal}
                placeholder={t(
                  "components.create-instructor.1.email-personal-placeholder"
                )}
              />
              {errorEmail && (
                <styles.P0Error>{t(`general.decline-email`)}</styles.P0Error>
              )}
            </FillIn>
          )}
          <FillIn>
            <styles.BoldP4>
              {t("components.create-instructor.1.email-pro")}
            </styles.BoldP4>
            <InputSuper
              error={errorProEmail}
              setError={setErrorProEmail}
              setValid={setValidProEmail}
              type="email"
              input={emailPro}
              setInput={setEmailPro}
              placeholder={t(
                "components.create-instructor.1.email-pro-placeholder"
              )}
            />
            {errorProEmail && (
              <styles.P0Error>{t(`general.decline-email`)}</styles.P0Error>
            )}
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
                if (emailPersonal.length > 0 && !validEmail) {
                  setErrorEmail(true);
                }
                if (emailPro.length > 0 && !ValidProEmail) {
                  setErrorProEmail(true);
                }
                if (name.length === 0) {
                  setNameError(true);
                }
                if (phone.length > 0 && !phone.includes("+")) {
                  {
                    phone.length !== 9 && setErrorPhone(true);
                  }
                }
                if (phone.length > 0 && phone.includes("+")) {
                  {
                    phone.length !== 12 && setErrorPhone(true);
                  }
                }
                if (state === undefined) {
                  setErrorState(true);
                }
                if (name.length > 0 && state !== undefined) {
                  if (
                    (emailPersonal.length === 0 || validEmail) &&
                    (emailPro.length === 0 || ValidProEmail) &&
                    (phone.length === 0 ||
                      phone.length === 9 ||
                      phone.length === 12)
                  ) {
                    setStep(2);
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
                  error={errorEducation}
                  setError={setErrorEducation}
                  option={education?.careerInEducation ? true : false}
                  setOption={() => {
                    setEducation({
                      ...education,
                      careerInEducation: !education?.careerInEducation,
                    });
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.2.education-1`)}
                </styles.P4>
              </CheckOption>
              <CheckOption>
                <CheckBox
                  error={errorEducation}
                  setError={setErrorEducation}
                  option={education?.technicalCareer ? true : false}
                  setOption={() => {
                    setEducation({
                      ...education,
                      technicalCareer: !education?.technicalCareer,
                    });
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.2.education-2`)}
                </styles.P4>
              </CheckOption>
              {errorEducation && (
                <styles.P0Error>{t("general.decline-checkbox")}</styles.P0Error>
              )}
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.2.experience")}
              </styles.BoldP4>
              <CheckOption>
                <RadioButton
                  error={errorExperience}
                  setError={setErrorExperience}
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
                  error={errorExperience}
                  setError={setErrorExperience}
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
                  error={errorExperience}
                  setError={setErrorExperience}
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
              {errorExperience && (
                <styles.P0Error>{t("general.decline-radio")}</styles.P0Error>
              )}
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.2.programming")}
              </styles.BoldP4>
              <CheckOption>
                <RadioButton
                  error={errorProgramming}
                  setError={setErrorProgramming}
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
                  error={errorProgramming}
                  setError={setErrorProgramming}
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
              {errorProgramming && (
                <styles.P0Error>{t("general.decline-radio")}</styles.P0Error>
              )}
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.2.knowledge")}
              </styles.BoldP4>
              <InputSuper
                textArea
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
                error={errorCV}
                setError={setErrorCV}
                placeholder={t(
                  "components.create-instructor.2.cv-link-placeholder"
                )}
                input={cvUrl}
                setInput={setCvUrl}
              />
              {errorCV && (
                <styles.P0Error>{t("general.decline-link")}</styles.P0Error>
              )}
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
                options={Object.values(Languages).map((language) => ({
                  key: language,
                  label: t(`pages.centers.languages.${language.toLowerCase()}`),
                }))}
                title={t("components.create-instructor.2.languages")}
                results={languages}
                setResults={setLanguages as (languages: string[]) => void}
              />
            </FillIn>
          </ScrollDiv>
          <NavDivScroll>
            <Button
              secondary
              onClick={() => setStep(1)}
              text={t("general.actions.back")}
            />
            <Button
              main
              onClick={() => {
                if (
                  education === undefined ||
                  (education.careerInEducation === false &&
                    education.technicalCareer === false)
                ) {
                  setErrorEducation(true);
                }
                if (experience === undefined) {
                  setErrorExperience(true);
                }
                if (programming === undefined) {
                  setErrorProgramming(true);
                }
                if (cvUrl.length > 0) {
                  const urlRegex =
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                  if (!urlRegex.test(cvUrl)) {
                    setErrorCV(true);
                  }
                }
                if (
                  education !== undefined &&
                  experience !== undefined &&
                  programming !== undefined
                ) {
                  if (cvUrl.length > 0) {
                    const urlRegex =
                      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                    if (!urlRegex.test(cvUrl)) {
                      setErrorCV(true);
                    } else {
                      setStep(3);
                    }
                  } else {
                    setStep(3);
                  }
                }
              }}
              text={t("general.actions.next")}
            />
          </NavDivScroll>
        </>
      )}
      {step === 3 && (
        <>
          <ScrollDiv>
            <styles.P4>
              {t(`components.create-instructor.${step}.title`)}
            </styles.P4>
            <>
              {week.map((elem) => {
                return (
                  <FillIn>
                    <styles.BoldP4>
                      {t(`components.create-group.2.subtitle.${elem.day}`)}
                    </styles.BoldP4>
                    <DropDown
                      options={schedule.map((elem) => {
                        return {
                          key: elem,
                          label: t(`general.times.${elem}`),
                        };
                      })}
                      width="388px"
                      setSelected={elem.function}
                      selected={elem.key}
                    />
                  </FillIn>
                );
              })}
            </>
            <FillIn width="306px">
              <styles.BoldP4>
                {t("components.create-instructor.3.subtitles.summer")}
              </styles.BoldP4>
              <CheckOption>
                <RadioButton
                  option={summer === SummerAvailabilityInstructor.Yes}
                  setOption={() => {
                    {
                      summer !== SummerAvailabilityInstructor.Yes
                        ? setSummer(SummerAvailabilityInstructor.Yes)
                        : setSummer(undefined);
                    }
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.3.subtitles.si`)}
                </styles.P4>
              </CheckOption>
              <CheckOption>
                <RadioButton
                  option={summer === SummerAvailabilityInstructor.No}
                  setOption={() => {
                    {
                      summer !== SummerAvailabilityInstructor.No
                        ? setSummer(SummerAvailabilityInstructor.No)
                        : setSummer(undefined);
                    }
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.3.subtitles.no`)}
                </styles.P4>
              </CheckOption>
              <CheckOption>
                <RadioButton
                  option={
                    summer === SummerAvailabilityInstructor.ExtracurricularsOnly
                  }
                  setOption={() => {
                    {
                      summer !==
                      SummerAvailabilityInstructor.ExtracurricularsOnly
                        ? setSummer(
                            SummerAvailabilityInstructor.ExtracurricularsOnly
                          )
                        : setSummer(undefined);
                    }
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.3.subtitles.ex`)}
                </styles.P4>
              </CheckOption>
            </FillIn>
          </ScrollDiv>
          <NavDivScroll>
            <Button
              secondary
              onClick={() => setStep(2)}
              text={t("general.actions.back")}
            />
            <Button
              main
              onClick={() => setStep(4)}
              text={t("general.actions.next")}
            />
          </NavDivScroll>
        </>
      )}
      {step === 4 && (
        <>
          <ScrollDiv>
            <styles.P4>
              {t(`components.create-instructor.${step}.title`)}
            </styles.P4>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.4.subtitle.vehicle")}
              </styles.BoldP4>
              <CheckOption>
                <RadioButton
                  option={vehicle === TypeVehicleInstructor.Own ? true : false}
                  setOption={() => {
                    {
                      !(vehicle === TypeVehicleInstructor.Own)
                        ? setVehicle(TypeVehicleInstructor.Own)
                        : setVehicle(undefined);
                    }
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.4.subtitle.vehicle-own`)}
                </styles.P4>
              </CheckOption>
              <CheckOption>
                <RadioButton
                  option={
                    vehicle === TypeVehicleInstructor.PublicTransport
                      ? true
                      : false
                  }
                  setOption={() => {
                    {
                      !(vehicle === TypeVehicleInstructor.PublicTransport)
                        ? setVehicle(TypeVehicleInstructor.PublicTransport)
                        : setVehicle(undefined);
                    }
                  }}
                />
                <styles.P4>
                  {t(`components.create-instructor.4.subtitle.vehicle-public`)}
                </styles.P4>
              </CheckOption>
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.4.subtitle.zones")}
              </styles.BoldP4>
              <DropDown
                options={zones.map((elem) => {
                  return {
                    key: elem.name,
                    label: elem.name,
                  };
                })}
                width="296px"
                setSelected={setLocalZones}
                selected={LocalZones}
              />
            </FillIn>
            {LocalZones.length > 0 && (
              <FillIn>
                <OptionsBoxOrdered
                  options={[
                    ...zones.map((elem) => {
                      if (LocalZones.find((e) => e === elem.name)) {
                        return elem.zones;
                      } else {
                        return [];
                      }
                    }),
                  ]
                    .flat()
                    .map((elem) => {
                      return {
                        key: elem,
                        label: elem,
                      };
                    })}
                  orderName={orderName}
                  setOrderName={setOrderName}
                  results={especifyZones}
                  setResults={setEspecifyZones}
                  title={t("components.create-instructor.4.subtitle.zones-1")}
                />
              </FillIn>
            )}
          </ScrollDiv>
          <NavDivScroll>
            <Button
              secondary
              onClick={() => setStep(3)}
              text={t("general.actions.back")}
            />
            <Button
              main
              onClick={() => setStep(5)}
              text={t("general.actions.next")}
            />
          </NavDivScroll>
        </>
      )}
      {step === 5 && (
        <>
          <ScrollDiv>
            <styles.P4>
              {t(`components.create-instructor.${step}.title`)}
            </styles.P4>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.5.subtitle.center")}
              </styles.BoldP4>
              <DropDownUnique
                options={
                  CentersData?.getCenters.data.map((elem) => {
                    return {
                      key: elem.name,
                      label: elem.name,
                    };
                  }) || []
                }
                width="385px"
                setSelected={setCenter}
                selected={center}
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t("components.create-instructor.5.subtitle.group")}
              </styles.BoldP4>
              <DropDown
                disabled={center === ""}
                options={
                  center === undefined
                    ? []
                    : GroupsData?.getGroups.data.map((elem) => {
                        return {
                          key: elem.id,
                          label: elem.name,
                        };
                      }) || []
                }
                width="385px"
                selected={groups}
                setSelected={setGroups}
              />
            </FillIn>
          </ScrollDiv>
          <NavDivScroll>
            <Button
              secondary
              onClick={() => setStep(4)}
              text={t("general.actions.back")}
            />
            <Button
              create
              onClick={() => {
                if (
                  name !== "" &&
                  emailPro !== "" &&
                  emailPersonal !== "" &&
                  phone !== "" &&
                  state !== undefined &&
                  education !== undefined &&
                  experience !== undefined &&
                  programming !== undefined &&
                  cvUrl !== "" &&
                  // availability !== [] &&
                  vehicle !== undefined &&
                  // LocalZones !== [] &&
                  // especifyZones !== [] &&
                  center !== "" &&
                  // groups !== [] &&
                  summer !== undefined
                ) {
                  createInstructorMutation({
                    variables: {
                      name,
                      corporateEmail: emailPro,
                      personalEmail: emailPersonal,
                      phone,
                      status: state,
                      training: education,
                      previousExperience: experience,
                      programmingExperience: programming,
                      knowledge,
                      urlCv: cvUrl,
                      materialsExperience: tools,
                      platformEducationExperience: platforms,
                      languages,
                      availability,
                      summerAvailability: summer,
                      vehicle,
                      geographicalAvailability: LocalZones.join(", "),
                      areas: especifyZones,
                      groups,
                    },
                  }).then(() => {
                    changeTitle("");
                    refetch();
                    setStep(6);
                  });
                } else {
                  alert("Please fill in all fields");
                }
              }}
              text={t("general.actions.create")}
            />
          </NavDivScroll>
        </>
      )}
      {step === 6 && (
        <FillIn>
          <EndButton
            main
            onClick={() => {
              changeTitle(t("pages.instructors.modal-create.title"));
              close(false);
            }}
            text={t("general.actions.consent")}
          />
        </FillIn>
      )}
    </Form>
  );
};

export default CreateInstructor;

const EndButton = styled(Button)`
  align-self: flex-start;
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

const NavDivScroll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid ${colors.colors.gray60};
  padding: 30px 45px 40px 45px;
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
  margin-top: -30px;
  overflow-y: scroll;
  padding-bottom: 30px;
  & > p {
    margin: 30px 0;
  }
`;

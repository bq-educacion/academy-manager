import {
  Button,
  CheckBox,
  colors,
  EditTeacherTimeTable,
  FillIn,
  Icon,
  InputSuper,
  OptionsBoxFilter,
  RadioButton,
  styles,
  Switch,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import withApollo from "../../apollo/withApollo";
import { Layout, Modal } from "../../components";
import { Platforms, sections, Tools } from "../../config";
import {
  AvailabilityInput,
  Languages,
  PreviousExperienceInstructor,
  SummerAvailabilityInstructor,
  TrainingInstructor,
  useGetInstructorQuery,
  useSetStatusInstructorMutation,
} from "../../generated/graphql";

const EditInstructor: NextPage = () => {
  const router = useRouter();
  const t = useTranslate();

  //Queries
  const { data } = useGetInstructorQuery({
    variables: {
      getInstructorId: router.query.id as string,
    },
  });

  //Mutations
  const [setStatusInstructorMutation] = useSetStatusInstructorMutation();

  //hooks
  const [showFolder, setShowFolder] = useState<boolean>(true);
  const [showFolder1, setShowFolder1] = useState<boolean>(true);
  const [showFolder2, setShowFolder2] = useState<boolean>(true);
  const [showFolder3, setShowFolder3] = useState<boolean>(true);
  const [showFolder4, setShowFolder4] = useState<boolean>(true);

  const [modalEnrolled, setModalEnrolled] = useState<boolean>(false);

  const [enrolled, setEnrolled] = useState<boolean>(
    data?.getInstructor.enrolled || false
  );
  const [name, setName] = useState<string>(data?.getInstructor.name || "");
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailpro, setEmailpro] = useState<string>(
    data?.getInstructor.corporateEmail || ""
  );
  const [emailproError, setEmailproError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(
    data?.getInstructor.personalEmail || ""
  );
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>(data?.getInstructor.phone || "");
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>(data?.getInstructor.notes || "");
  const [education, setEducation] = useState<TrainingInstructor>(
    data?.getInstructor.training || {}
  );
  const [experience, setExperience] = useState<
    PreviousExperienceInstructor | undefined
  >(data?.getInstructor.previousExperience || undefined);
  const [progra, setProgra] = useState<boolean | undefined>(
    data?.getInstructor.programmingExperience
  );
  const [knowledge, setKnowledge] = useState<string>(
    data?.getInstructor.knowledge || ""
  );
  const [cv, setCV] = useState<string>(data?.getInstructor.urlCV || "");
  const [CVError, setCVError] = useState<boolean>(false);
  const [tools, setTools] = useState<string[]>(
    data?.getInstructor.materialsExperience || []
  );
  const [platforms, setPlatforms] = useState<string[]>(
    data?.getInstructor.platformEducationExperience || []
  );
  const [languages, setLanguages] = useState<string[]>(
    data?.getInstructor.languages || []
  );
  const [summer, setSummer] = useState<
    SummerAvailabilityInstructor | undefined
  >(data?.getInstructor.summerAvailability || undefined);
  const [timeTable, setTimeTable] = useState<AvailabilityInput[]>(
    data?.getInstructor.availability || []
  );

  return (
    <>
      {modalEnrolled && (
        <Modal
          setModal={setModalEnrolled}
          title=""
          children={
            <ModalDiv>
              <styles.BoldP2>
                {t("pages.edit-teacher.state-modal.title")}
              </styles.BoldP2>
              <styles.P4>{t("pages.edit-teacher.state-modal.text")}</styles.P4>
              <DelteModalDiv>
                <Icon name="alert" />
                <styles.P4>
                  {t("pages.edit-teacher.state-modal.text1")}
                </styles.P4>
              </DelteModalDiv>
              <DelteModalDiv2>
                <Icon name="alert" />
                <styles.P4>
                  {t("pages.edit-teacher.state-modal.text2")}
                </styles.P4>
              </DelteModalDiv2>
              <ButtonsModalDiv>
                <Button
                  text={t("pages.edit-center.state-modal.button1")}
                  deleteRed
                  onClick={() => {
                    setStatusInstructorMutation({
                      variables: {
                        setStatusInstructorId: router.query.id as string,
                        enrolled: false,
                      },
                    }).then(() => {
                      setEnrolled(false);
                      setModalEnrolled(false);
                    });
                  }}
                />
                <Button
                  text={t("pages.edit-center.state-modal.button2")}
                  secondary
                  onClick={() => {
                    setModalEnrolled(false);
                  }}
                />
              </ButtonsModalDiv>
            </ModalDiv>
          }
        />
      )}
      {data && (
        <Layout
          title={sections[0].bigTitle}
          section={sections[0].title}
          label={sections[0].links[4].label}
          childrenHeader={
            <HeaderDiv>
              <styles.BoldP2>
                {t("general.sections.links.students")} /{" "}
                {data?.getInstructor.name}
              </styles.BoldP2>
            </HeaderDiv>
          }
          childrenSubHeader={
            <SubHeaderDiv>
              <Button
                text={t("pages.edit-teacher.delete")}
                onClick={() => {
                  //setOpenModalDelete(true);
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
                  //updateCenter();
                }}
                create
                disabled={false}
              />
            </SubHeaderDiv>
          }
          children2={
            <BodyDiv>
              <GateFolder>
                <GateFolderButton onClick={() => setShowFolder1(!showFolder1)}>
                  <GateFolderArrow name="direction" open={showFolder1} />
                </GateFolderButton>
                <GateFolderTitle>
                  <styles.BoldP4>
                    {t("pages.edit-teacher.education")}
                  </styles.BoldP4>
                </GateFolderTitle>
              </GateFolder>
              {showFolder1 && (
                <>
                  <MarginDiv />
                  <BodyContent>
                    <FillIn>
                      <styles.P4>
                        {t("pages.edit-teacher.education1")}
                      </styles.P4>
                      <CheckDiv>
                        <CheckBox
                          option={education.careerInEducation ? true : false}
                          setOption={() =>
                            setEducation({
                              ...education,
                              careerInEducation: !education.careerInEducation,
                            })
                          }
                        />
                        <styles.P4>{t("pages.edit-teacher.edu11")}</styles.P4>
                      </CheckDiv>
                    </FillIn>
                    <FillIn>
                      <CheckDiv1>
                        <CheckBox
                          option={education.technicalCareer ? true : false}
                          setOption={() =>
                            setEducation({
                              ...education,
                              technicalCareer: !education.technicalCareer,
                            })
                          }
                        />
                        <styles.P4>{t("pages.edit-teacher.edu12")}</styles.P4>
                      </CheckDiv1>
                    </FillIn>
                  </BodyContent>
                  <BodyContent>
                    <FillIn>
                      <styles.P4>{t("pages.edit-teacher.xp")}</styles.P4>
                      <RowDiv>
                        <CheckDiv>
                          <RadioButton
                            option={
                              experience === PreviousExperienceInstructor.Yes
                                ? true
                                : false
                            }
                            setOption={() =>
                              setExperience(PreviousExperienceInstructor.Yes)
                            }
                          />
                          <styles.P4>{t("pages.edit-teacher.xp1")}</styles.P4>
                        </CheckDiv>
                        <CheckDiv>
                          <RadioButton
                            option={
                              experience === PreviousExperienceInstructor.No
                                ? true
                                : false
                            }
                            setOption={() =>
                              setExperience(PreviousExperienceInstructor.No)
                            }
                          />
                          <styles.P4>{t("pages.edit-teacher.xp2")}</styles.P4>
                        </CheckDiv>
                        <CheckDiv>
                          <RadioButton
                            option={
                              experience ===
                              PreviousExperienceInstructor.NoButInterested
                                ? true
                                : false
                            }
                            setOption={() =>
                              setExperience(
                                PreviousExperienceInstructor.NoButInterested
                              )
                            }
                          />
                          <styles.P4>{t("pages.edit-teacher.xp3")}</styles.P4>
                        </CheckDiv>
                      </RowDiv>
                    </FillIn>
                  </BodyContent>
                  <BodyContent>
                    <FillIn>
                      <styles.P4>{t("pages.edit-teacher.xpProgra")}</styles.P4>
                      <RowDiv>
                        <CheckDiv>
                          <RadioButton
                            option={progra ? true : false}
                            setOption={() => setProgra(true)}
                          />
                          <styles.P4>{t("pages.edit-teacher.xp1")}</styles.P4>
                        </CheckDiv>
                        <CheckDiv>
                          <RadioButton
                            option={progra ? false : true}
                            setOption={() => setProgra(false)}
                          />
                          <styles.P4>{t("pages.edit-teacher.xp2")}</styles.P4>
                        </CheckDiv>
                      </RowDiv>
                    </FillIn>
                  </BodyContent>
                  <BodyContent>
                    <FillIn>
                      <styles.P4>{t("pages.edit-teacher.knowledge")}</styles.P4>
                      <InputSuper
                        textArea
                        input={knowledge}
                        setInput={setKnowledge}
                        width="69.609vw"
                        height="60px"
                      />
                    </FillIn>
                  </BodyContent>
                  <BodyContent>
                    <FillIn>
                      <SplitTextDiv>
                        <styles.P4>{t("pages.edit-teacher.cv")}</styles.P4>
                        <LinkDiv target="_blank" href={cv}>
                          <Icon name="external" />
                          <styles.P4>
                            {t("pages.edit-teacher.cv-url")}
                          </styles.P4>
                        </LinkDiv>
                      </SplitTextDiv>
                      <InputSuper
                        input={cv}
                        setInput={setCV}
                        error={CVError}
                        setError={setCVError}
                        width="69.609vw"
                      />
                      {CVError && (
                        <styles.P0Error>
                          {t("general.decline-link")}
                        </styles.P0Error>
                      )}
                    </FillIn>
                  </BodyContent>
                  <BodyContent>
                    <RowDiv2>
                      <OptionsBoxFilter
                        options={[
                          ...Tools,
                          ...tools
                            .filter((elem1) => {
                              return !Tools.find((elem) => {
                                return elem.key === elem1;
                              });
                            })
                            .map((tool) => {
                              return {
                                label: tool,
                                key: tool,
                              };
                            }),
                        ]}
                        title={t("components.create-instructor.2.tools")}
                        results={tools}
                        setResults={setTools}
                      />
                      <OptionsBoxFilter
                        options={[
                          ...Platforms,
                          ...platforms
                            .filter((elem1) => {
                              return !Platforms.find((elem) => {
                                return elem.key === elem1;
                              });
                            })
                            .map((platform) => {
                              return {
                                label: platform,
                                key: platform,
                              };
                            }),
                        ]}
                        title={t("components.create-instructor.2.platforms")}
                        results={platforms}
                        setResults={setPlatforms}
                      />
                      <OptionsBoxFilter
                        notOther
                        options={Object.values(Languages).map((language) => ({
                          key: language,
                          label: t(
                            `pages.centers.languages.${language.toLowerCase()}-label`
                          ),
                        }))}
                        title={t("components.create-instructor.2.languages")}
                        results={languages}
                        setResults={
                          setLanguages as (languages: string[]) => void
                        }
                      />
                    </RowDiv2>
                  </BodyContent>
                </>
              )}
            </BodyDiv>
          }
          children3={
            <BodyDiv>
              <GateFolder>
                <GateFolderButton onClick={() => setShowFolder2(!showFolder2)}>
                  <GateFolderArrow name="direction" open={showFolder2} />
                </GateFolderButton>
                <GateFolderTitle>
                  <styles.BoldP4>{t("pages.edit-teacher.time")}</styles.BoldP4>
                </GateFolderTitle>
              </GateFolder>
              {showFolder2 && (
                <>
                  <MarginDiv />
                  <BodyContent>
                    <FillIn>
                      <styles.P4>{t("pages.edit-teacher.summer")}</styles.P4>
                      <RowDiv>
                        <CheckDiv>
                          <RadioButton
                            option={summer === SummerAvailabilityInstructor.Yes}
                            setOption={() =>
                              setSummer(SummerAvailabilityInstructor.Yes)
                            }
                          />
                          <styles.P4>{t("pages.edit-teacher.xp1")}</styles.P4>
                        </CheckDiv>
                        <CheckDiv>
                          <RadioButton
                            option={summer === SummerAvailabilityInstructor.No}
                            setOption={() =>
                              setSummer(SummerAvailabilityInstructor.No)
                            }
                          />
                          <styles.P4>{t("pages.edit-teacher.xp2")}</styles.P4>
                        </CheckDiv>
                        <CheckDiv>
                          <RadioButton
                            option={
                              summer ===
                              SummerAvailabilityInstructor.ExtracurricularsOnly
                            }
                            setOption={() =>
                              setSummer(
                                SummerAvailabilityInstructor.ExtracurricularsOnly
                              )
                            }
                          />
                          <styles.P4>
                            {t("pages.edit-teacher.summer1")}
                          </styles.P4>
                        </CheckDiv>
                      </RowDiv>
                    </FillIn>
                  </BodyContent>
                  <BodyContent>
                    <FillIn width="100%">
                      <styles.P4>
                        {t("pages.edit-teacher.availability")}
                      </styles.P4>
                      <EditTeacherTimeTable
                        time={timeTable}
                        setTime={setTimeTable}
                      />
                    </FillIn>
                  </BodyContent>
                </>
              )}
            </BodyDiv>
          }
          children4={
            <BodyDiv>
              <GateFolder>
                <GateFolderButton onClick={() => setShowFolder3(!showFolder3)}>
                  <GateFolderArrow name="direction" open={showFolder3} />
                </GateFolderButton>
                <GateFolderTitle>
                  <styles.BoldP4>
                    {t("pages.edit-teacher.movility")}
                  </styles.BoldP4>
                </GateFolderTitle>
              </GateFolder>
              {showFolder3 && <></>}
            </BodyDiv>
          }
          children5={
            <BodyDiv>
              <GateFolder>
                <GateFolderButton onClick={() => setShowFolder4(!showFolder4)}>
                  <GateFolderArrow name="direction" open={showFolder4} />
                </GateFolderButton>
                <GateFolderTitle>
                  <styles.BoldP4>
                    {t("pages.edit-teacher.groups")}
                  </styles.BoldP4>
                </GateFolderTitle>
              </GateFolder>
              {showFolder4 && <></>}
            </BodyDiv>
          }
        >
          <BodyDiv>
            <GateFolder>
              <GateFolderButton onClick={() => setShowFolder(!showFolder)}>
                <GateFolderArrow name="direction" open={showFolder} />
              </GateFolderButton>
              <GateFolderTitle>
                <styles.BoldP4>{t("pages.edit-teacher.info")}</styles.BoldP4>
                <CenterStateDiv>
                  {enrolled ? (
                    <styles.P4>{t("pages.edit-student.no-state")}</styles.P4>
                  ) : (
                    <styles.P4>{t("pages.edit-student.state")}</styles.P4>
                  )}
                  <Switch
                    option={enrolled}
                    setOption={() => {
                      if (enrolled) {
                        setModalEnrolled(true);
                      } else {
                        setStatusInstructorMutation({
                          variables: {
                            setStatusInstructorId: router.query.id as string,
                            enrolled: true,
                          },
                        }).then(() => {
                          setEnrolled(true);
                        });
                      }
                    }}
                  />
                </CenterStateDiv>
              </GateFolderTitle>
            </GateFolder>
            {showFolder && (
              <>
                <MarginDiv />
                <BodyContent>
                  <FillIn>
                    <styles.P4>{t("pages.edit-teacher.name")}</styles.P4>
                    <InputSuper
                      input={name}
                      setInput={setName}
                      placeholder={t("pages.edit-teacher.name")}
                      error={nameError}
                      setError={setNameError}
                      width="28.906vw"
                    />
                    {nameError && (
                      <styles.P0Error>{t("general.empty")}</styles.P0Error>
                    )}
                  </FillIn>
                  <FillIn>
                    <styles.P4>{t("pages.edit-teacher.emailpro")}</styles.P4>
                    <InputSuper
                      input={emailpro}
                      setInput={setEmailpro}
                      placeholder={t("pages.edit-teacher.emailpro")}
                      error={emailproError}
                      setError={setEmailproError}
                      width="28.906vw"
                    />
                    {emailproError && (
                      <styles.P0Error>
                        {t("general.decline-email")}
                      </styles.P0Error>
                    )}
                  </FillIn>
                  <FillIn>
                    <styles.P4>{t("pages.edit-teacher.phone")}</styles.P4>
                    <InputSuper
                      input={phone}
                      setInput={setPhone}
                      placeholder={t("pages.edit-teacher.phone")}
                      error={phoneError}
                      setError={setPhoneError}
                      telPattern
                      width="9.531vw"
                    />
                    {phoneError && (
                      <styles.P0Error>
                        {t("general.decline-phone")}
                      </styles.P0Error>
                    )}
                  </FillIn>
                </BodyContent>
                <BodyContent>
                  <FillIn>
                    <styles.P4>{t("pages.edit-teacher.email")}</styles.P4>
                    <InputSuper
                      input={email}
                      setInput={setEmail}
                      placeholder={t("pages.edit-teacher.email")}
                      error={emailError}
                      setError={setEmailError}
                      width="28.906vw"
                    />
                    {emailError && (
                      <styles.P0Error>
                        {t("general.decline-email")}
                      </styles.P0Error>
                    )}
                  </FillIn>
                </BodyContent>
                <BodyContent>
                  <FillIn>
                    <styles.P4>{t("pages.edit-teacher.notes")}</styles.P4>
                    <InputSuper
                      input={notes}
                      setInput={setNotes}
                      textArea
                      width="69.609vw"
                      height="60px"
                      placeholder={t("pages.edit-teacher.notes-placeholder")}
                    />
                  </FillIn>
                </BodyContent>
              </>
            )}
          </BodyDiv>
        </Layout>
      )}
    </>
  );
};

export default withApollo(EditInstructor, { requiresAccess: false });

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

const BodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`;

const GateFolder = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid ${colors.colors.gray40};
`;

const GateFolderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border-right: 1px solid ${colors.colors.gray40};
`;

const GateFolderArrow = styled(Icon)<{ open: boolean }>`
  transform: rotate(${(props) => (props.open ? "-90deg" : "-180deg")});
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
`;

const GateFolderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  width: 100%;
`;

const BodyContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 45px 0 30px;
  width: max-content;
  justify-content: flex-start;
  & > :not(div:first-child) {
    margin-left: 10px;
  }
`;

const MarginDiv = styled.div`
  margin-top: 20px;
`;

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > p:nth-child(1) {
    margin-top: -40px;
    margin-bottom: 25px;
  }
  & > p:nth-child(2) {
    margin-bottom: 30px;
  }
`;

const ButtonsModalDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: max-content;
  & > * {
    margin-right: 10px;
  }
`;

const DelteModalDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
  & > svg {
    margin-right: 5px;
    overflow: visible;
    color: ${colors.colors.yellow60};
  }
`;

const DelteModalDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 30px;
  & > svg {
    margin-right: 5px;
    overflow: visible;
    color: ${colors.colors.yellow60};
  }
`;

const CenterStateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > p {
    margin-right: 10px;
  }
`;

const CheckDiv = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  margin: 10px 0px 0px 0px;
  & > * {
    margin-right: 10px;
    align-self: center;
  }
`;

const CheckDiv1 = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  margin: 35px 0px 0px 0px;
  & > * {
    margin-right: 10px;
    align-self: center;
  }
`;

const RowDiv = styled.div`
  display: flex;
  width: 50vw;
  flex-direction: row;
  & > * {
    margin-right: 20px;
  }
`;
const RowDiv2 = styled.div`
  display: flex;
  margin-left: -30px;
  width: 82.75vw;
  justify-content: space-around;
  border-top: 1px solid ${colors.colors.gray40};
  flex-direction: row;
  & > :not(:last-child) {
    margin-right: 10px;
  }
`;

const SplitTextDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LinkDiv = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & > svg {
    margin-right: 5px;
  }
  color: ${colors.colors.blue80};
`;

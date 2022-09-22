import {
  Button,
  CheckBox,
  colors,
  DropDownUnique,
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
import React, { useEffect } from "react";
import { useState } from "react";
import withApollo from "../../apollo/withApollo";
import { AddAreasEditTeacher, Layout, Modal, Table } from "../../components";
import { Platforms, sections, Tools } from "../../config";
import {
  AvailabilityInput,
  Group,
  Languages,
  OrderFilterGroup,
  PreviousExperienceInstructor,
  Region,
  SummerAvailabilityInstructor,
  TrainingInstructor,
  TypeVehicleInstructor,
  useDeleteInstructorMutation,
  useEditInstructorMutation,
  useGetCenterGroupsQuery,
  useGetGroupQuery,
  useGetInstructorQuery,
  useSetStatusInstructorMutation,
  useSimpleCentersNameQuery,
} from "../../generated/graphql";

const EditInstructor: NextPage = () => {
  const router = useRouter();
  const t = useTranslate();

  //Queries
  const { data, refetch } = useGetInstructorQuery({
    variables: {
      getInstructorId: router.query.id as string,
    },
    fetchPolicy: "network-only",
  });
  const { data: dataCenters } = useSimpleCentersNameQuery({
    variables: {
      centers: {},
    },
  });
  const [newCenter, setNewCenter] = useState<string>("");
  const [newGroup, setNewGroup] = useState<string>("");
  const { data: dataGroups } = useGetCenterGroupsQuery({
    variables: {
      getCenterId: newCenter,
    },
  });
  const { data: newGroupData, refetch: refetchGroups } = useGetGroupQuery({
    variables: {
      getGroupId: newGroup,
    },
    fetchPolicy: "network-only",
  });

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
    {
      careerInEducation: data?.getInstructor.training.careerInEducation,
      technicalCareer: data?.getInstructor.training.technicalCareer,
    } || {}
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
  const [languages, setLanguages] = useState<Languages[]>(
    data?.getInstructor.languages || []
  );
  const [summer, setSummer] = useState<
    SummerAvailabilityInstructor | undefined
  >(data?.getInstructor.summerAvailability || undefined);
  const [timeTable, setTimeTable] = useState<AvailabilityInput[]>(
    data?.getInstructor.availability || []
  );
  const [groups, setGroups] = useState<Group[]>(
    (data?.getInstructor.groups as Group[]) || []
  );
  const [groupsId, setGroupsId] = useState<string[]>(
    (data?.getInstructor.groups.map((elem) => {
      return elem.id;
    }) as string[]) || []
  );
  const [order, setOrder] = useState<{
    key: OrderFilterGroup;
    direction: number;
  }>({
    key: OrderFilterGroup.IdGroup,
    direction: 1,
  });
  const [changes, setChanges] = useState<boolean>(false);
  const [addGroup, setAddGroup] = useState<boolean>(false);
  const [vehicle, setVehicle] = useState<TypeVehicleInstructor | undefined>(
    data?.getInstructor.vehicle || undefined
  );
  const [geographicalAvailability, setGeographicalAvailability] =
    useState<Region>(
      (data?.getInstructor.geographicalAvailability.at(0) as Region) || [
        Region.Madrid,
      ]
    );
  const [areas, setAreas] = useState<string[]>(data?.getInstructor.areas || []);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [modalDeleteGroup, setModalDeleteGroup] = useState<boolean>(false);
  const [deleteGroupID, setDeleteGroupID] = useState<string>("");
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  //Mutations
  const [deleteInstructorMutation] = useDeleteInstructorMutation({
    variables: {
      deleteInstructorId: router.query.id as string,
    },
  });

  const [setStatusInstructorMutation] = useSetStatusInstructorMutation();

  const [editInstructorMutation, { loading }] = useEditInstructorMutation({
    variables: {
      editInstructorId: router.query.id as string,
      idGroups: groupsId,
      instructor: {
        name,
        corporateEmail: emailpro,
        personalEmail: email,
        phone,
        notes,
        areas,
        availability: timeTable,
        geographicalAvailability: [geographicalAvailability],
        previousExperience: experience,
        knowledge,
        languages,
        materialsExperience: tools,
        platformEducationExperience: platforms,
        programmingExperience: progra,
        summerAvailability: summer,
        training: education,
        vehicle,
      },
    },
  });

  useEffect(() => {
    setGroupsId([
      ...groups.map((elem) => {
        return elem.id;
      }),
    ]);
  }, [groups, newGroup]);

  useEffect(() => {
    if (loading) {
      setLoading2(true);
    }
    const timer = setTimeout(() => {
      setLoading2(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    {
      name !== data?.getInstructor.name && setChanges(true);
    }
    {
      emailpro !== "" &&
        emailpro !== data?.getInstructor.corporateEmail &&
        setChanges(true);
    }

    {
      email !== "" &&
        email !== data?.getInstructor.personalEmail &&
        setChanges(true);
    }

    {
      phone !== "" && phone !== data?.getInstructor.phone && setChanges(true);
    }
    {
      notes !== "" && notes !== data?.getInstructor.notes && setChanges(true);
    }

    {
      knowledge !== "" &&
        knowledge !== data?.getInstructor.knowledge &&
        setChanges(true);
    }

    {
      cv !== "" && cv !== data?.getInstructor.urlCV && setChanges(true);
    }

    {
      tools !== data?.getInstructor.materialsExperience && setChanges(true);
    }
    {
      platforms !== data?.getInstructor.platformEducationExperience &&
        setChanges(true);
    }
    {
      languages !== data?.getInstructor.languages && setChanges(true);
    }
    {
      summer !== data?.getInstructor.summerAvailability && setChanges(true);
    }
    {
      groups !== data?.getInstructor.groups && setChanges(true);
    }
    {
      areas !== data?.getInstructor.areas && setChanges(true);
    }
  }, [
    name,
    emailpro,
    email,
    phone,
    notes,
    education,
    experience,
    progra,
    knowledge,
    cv,
    tools,
    platforms,
    languages,
    summer,
    timeTable,
    groups,
    vehicle,
    geographicalAvailability,
    areas,
  ]);

  useEffect(() => {
    if (data?.getInstructor) {
      setName(data.getInstructor.name);
      setEmailpro(data.getInstructor.corporateEmail || "");
      setEmail(data.getInstructor.personalEmail || "");
      setPhone(data.getInstructor.phone || "");
      setNotes(data.getInstructor.notes || "");
      setEducation(data.getInstructor.training);
      setExperience(data.getInstructor.previousExperience);
      setProgra(data.getInstructor.programmingExperience);
      setKnowledge(data.getInstructor.knowledge || "");
      setCV(data.getInstructor.urlCV || "");
      setTools(data.getInstructor.materialsExperience || []);
      setPlatforms(data.getInstructor.platformEducationExperience || []);
      setLanguages(data.getInstructor.languages || []);
      setSummer(data.getInstructor.summerAvailability || undefined);
      setTimeTable(data.getInstructor.availability || []);
      setGroups(data.getInstructor.groups as Group[]);
    }
  }, [data]);

  return (
    <>
      {openModalDelete && (
        <Modal
          setModal={setOpenModalDelete}
          title=""
          children={
            <ModalDiv>
              <styles.BoldP2>
                {t("pages.edit-student.delete-modal.title")}
              </styles.BoldP2>
              <styles.P4>{t("pages.edit-student.delete-modal.text")}</styles.P4>

              <ButtonsModalDiv>
                <Button
                  text={t("pages.edit-center.delete-modal.button1")}
                  deleteRed
                  onClick={() => {
                    deleteInstructorMutation().then(() => {
                      router.push("/instructors");
                    });
                  }}
                />
                <Button
                  text={t("pages.edit-center.delete-modal.button2")}
                  secondary
                  onClick={() => {
                    setOpenModalDelete(false);
                  }}
                />
              </ButtonsModalDiv>
            </ModalDiv>
          }
        />
      )}
      {modalDeleteGroup && (
        <Modal
          setModal={setModalDeleteGroup}
          title=""
          children={
            <ModalDiv>
              <styles.BoldP2>
                {t("pages.edit-teacher.delete-group-modal.title")}
              </styles.BoldP2>
              <styles.P4>
                {t("pages.edit-teacher.delete-group-modal.text1")}
              </styles.P4>
              <DelteModalDiv2>
                <Icon name="alert" />
                <styles.P4>
                  {t("pages.edit-teacher.delete-group-modal.text2")}
                </styles.P4>
              </DelteModalDiv2>
              <ButtonsModalDiv>
                <Button
                  text={t("pages.edit-teacher.delete-group-modal.red")}
                  deleteRed
                  onClick={() => {
                    setGroups(
                      groups.filter((elem) => {
                        return elem.id !== deleteGroupID;
                      })
                    );
                    setModalDeleteGroup(false);
                  }}
                />
                <Button
                  text={t("pages.edit-center.state-modal.button2")}
                  secondary
                  onClick={() => {
                    setModalDeleteGroup(false);
                  }}
                />
              </ButtonsModalDiv>
            </ModalDiv>
          }
        />
      )}
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
                  setOpenModalDelete(true);
                }}
                deleteRed
              />
              <GreyDivider loading={false} />

              {loading2 && (
                <LoadingAnimation>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </LoadingAnimation>
              )}

              <Button
                text={t("pages.edit-center.save")}
                onClick={() => {
                  {
                    name === "" && setNameError(true);
                  }
                  {
                    emailpro !== "" &&
                      emailpro.includes("@") === false &&
                      setEmailproError(true);
                  }
                  {
                    email !== "" &&
                      email.includes("@") === false &&
                      setEmailError(true);
                  }
                  {
                    phone !== "" &&
                      phone.length !== 9 &&
                      phone.length !== 12 &&
                      setPhoneError(true);
                  }
                  {
                    cv !== "" &&
                      cv.match(/^(ftp|http|https):\/\/[^ "]+$/) === null &&
                      setCVError(true);
                  }

                  if (
                    name !== "" &&
                    (emailpro === "" ||
                      (emailpro !== "" && emailpro.includes("@") === true)) &&
                    (email === "" ||
                      (email !== "" && email.includes("@") === true)) &&
                    (phone === "" ||
                      (phone !== "" && phone.length === 9) ||
                      (phone !== "" && phone.length === 12)) &&
                    (cv === "" ||
                      (cv !== "" &&
                        cv.match(/^(ftp|http|https):\/\/[^ "]+$/) !== null))
                  ) {
                    editInstructorMutation().then(() => {
                      setChanges(false);
                      refetch();
                      refetchGroups();
                    });
                  }
                }}
                create
                disabled={!changes}
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
                          setOption={() => {
                            setChanges(true);
                            setEducation({
                              technicalCareer: education.technicalCareer
                                ? true
                                : false,
                              careerInEducation: !education.careerInEducation,
                            });
                          }}
                        />
                        <styles.P4>{t("pages.edit-teacher.edu11")}</styles.P4>
                      </CheckDiv>
                    </FillIn>
                    <FillIn>
                      <CheckDiv1>
                        <CheckBox
                          option={education.technicalCareer ? true : false}
                          setOption={() => {
                            setChanges(true);
                            setEducation({
                              careerInEducation: education.careerInEducation
                                ? true
                                : false,
                              technicalCareer: !education.technicalCareer,
                            });
                          }}
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
                            setOption={() => {
                              setChanges(true);
                              setExperience(PreviousExperienceInstructor.Yes);
                            }}
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
                            setOption={() => {
                              setChanges(true);
                              setExperience(PreviousExperienceInstructor.No);
                            }}
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
                            setOption={() => {
                              setChanges(true);
                              setExperience(
                                PreviousExperienceInstructor.NoButInterested
                              );
                            }}
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
                            setOption={() => {
                              setChanges(true);
                              setProgra(true);
                            }}
                          />
                          <styles.P4>{t("pages.edit-teacher.xp1")}</styles.P4>
                        </CheckDiv>
                        <CheckDiv>
                          <RadioButton
                            option={progra ? false : true}
                            setOption={() => {
                              setChanges(true);
                              setProgra(false);
                            }}
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
                      setResults={setLanguages as (languages: string[]) => void}
                    />
                  </RowDiv2>
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
                    </FillIn>
                  </BodyContent>
                  <EditTeacherTimeTable
                    setChanges={setChanges}
                    time={timeTable}
                    setTime={setTimeTable}
                  />
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
              {showFolder3 && (
                <>
                  <MarginDiv />
                  <BodyContent>
                    <FillIn>
                      <styles.P4>{t("pages.edit-teacher.movtype")}</styles.P4>
                      <RowDiv>
                        <CheckDiv>
                          <RadioButton
                            option={
                              vehicle === TypeVehicleInstructor.Own
                                ? true
                                : false
                            }
                            setOption={() =>
                              setVehicle(TypeVehicleInstructor.Own)
                            }
                          />
                          <styles.P4>{t("pages.edit-teacher.own")}</styles.P4>
                        </CheckDiv>
                        <CheckDiv>
                          <RadioButton
                            option={
                              vehicle === TypeVehicleInstructor.PublicTransport
                                ? true
                                : false
                            }
                            setOption={() =>
                              setVehicle(TypeVehicleInstructor.PublicTransport)
                            }
                          />
                          <styles.P4>
                            {t("pages.edit-teacher.public")}
                          </styles.P4>
                        </CheckDiv>
                      </RowDiv>
                    </FillIn>
                  </BodyContent>
                  <BodyContent>
                    <FillIn>
                      <styles.P4>{t("pages.edit-teacher.zones")}</styles.P4>
                      <DropDownUnique
                        options={Object.values(Region).map((region) => ({
                          key: region,
                          label: region,
                        }))}
                        selected={geographicalAvailability}
                        setSelected={(region) => {
                          setGeographicalAvailability(region as Region);
                        }}
                        width="22.031vw"
                      />
                    </FillIn>
                  </BodyContent>
                  <AddAreasEditTeacher
                    Region={geographicalAvailability}
                    areas={areas}
                    setAreas={setAreas}
                  />
                </>
              )}
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
                  <AddContactButton
                    onClick={() => {
                      setAddGroup(true);
                    }}
                  >
                    <Icon name="add" />
                    <Icon name="user" />
                    <styles.BoldP4>
                      {t("pages.edit-student.add-group")}
                    </styles.BoldP4>
                  </AddContactButton>
                </GateFolderTitle>
              </GateFolder>
              {showFolder4 && (
                <>
                  <Table
                    inactiveIndexes={[]}
                    data={groups}
                    order={order}
                    onSetOrder={(order) => {
                      setOrder(
                        order as { key: OrderFilterGroup; direction: number }
                      );
                    }}
                    columns={[
                      {
                        label: t("components.table.id"),
                        key: OrderFilterGroup.IdGroup,
                        content: (item) => <div>{item.id_group}</div>,
                      },
                      {
                        label: t("components.table.center"),
                        key: OrderFilterGroup.Center,
                        content: (item) => <div>{item.center?.name}</div>,
                      },
                      {
                        label: t("pages.edit-student.group-name"),
                        key: OrderFilterGroup.IdGroup,
                        content: (item) => <div>{item.name}</div>,
                      },
                      {
                        label: t("components.table.start-time"),
                        key: OrderFilterGroup.Start,
                        content: (item) => (
                          <div>
                            {item.timetable?.every(
                              (elem) => elem.start !== ""
                            ) &&
                              item.timetable
                                ?.map((elem) => elem.start)
                                .join(", ")}
                            {(item.timetable?.every(
                              (elem) => elem.start == ""
                            ) ||
                              item.timetable === undefined ||
                              item.timetable?.length === 0) &&
                              "-"}
                          </div>
                        ),
                      },
                      {
                        label: t("components.table.end-time"),
                        key: OrderFilterGroup.End,
                        content: (item) => (
                          <div>
                            {item.timetable?.every((elem) => elem.end !== "") &&
                              item.timetable
                                ?.map((elem) => elem.end)
                                .join(", ")}
                            {(item.timetable?.every(
                              (elem) => elem.start == ""
                            ) ||
                              item.timetable === undefined ||
                              item.timetable?.length === 0) &&
                              "-"}
                          </div>
                        ),
                      },
                      {
                        label: t("components.table.days"),
                        key: OrderFilterGroup.IdDay,
                        content: (item) => (
                          <div>
                            {item.timetable
                              ?.map((elem) =>
                                t(
                                  `components.table.time-table.${elem.day.toLowerCase()}`
                                )
                              )
                              .join(" - ")}
                            {(item.timetable === undefined ||
                              item.timetable?.length === 0) &&
                              "-"}
                          </div>
                        ),
                      },
                      {
                        label: t("pages.edit-student.group-course"),
                        key: OrderFilterGroup.Course,
                        content: (item) =>
                          (item.course.EPO.length > 0 ||
                            item.course.ESO.length > 0) && (
                            <>
                              <styles.P4>
                                {t("pages.edit-group.course")}
                                {item.course.ESO &&
                                  item.course.EPO &&
                                  t(
                                    `general.courses.${
                                      [...item.course.EPO].sort((a, b) =>
                                        a.localeCompare(b)
                                      )[0]
                                    }`
                                  ) +
                                    t("general.to") +
                                    t(
                                      `general.courses.${[...item.course.ESO]
                                        .sort((a, b) => a.localeCompare(b))
                                        .at(-1)}`
                                    )}
                              </styles.P4>
                              <div
                                onClick={() => {
                                  setModalDeleteGroup(true);
                                  setDeleteGroupID(item.id);
                                }}
                              >
                                <BinButton name="eliminate" />
                              </div>
                            </>
                          ),
                      },
                    ]}
                  />
                  {addGroup && dataCenters && (
                    <AddGroup>
                      <React.Fragment>
                        <Cell>
                          {newGroupData?.getGroup.group.id_group && (
                            <div>{newGroupData.getGroup.group.id_group}</div>
                          )}
                        </Cell>
                        <Cell>
                          <DropDownUnique
                            options={dataCenters.getCenters.data.map(
                              (elem) => ({
                                key: elem.id,
                                label: elem.name,
                              })
                            )}
                            setSelected={setNewCenter}
                            selected={newCenter}
                            width="7vw"
                          />
                        </Cell>
                        <Cell>
                          <DropDownUnique
                            disabled={newCenter === ""}
                            options={
                              dataGroups?.getCenter.center.groups.map(
                                (elem) => ({
                                  key: elem.id,
                                  label: elem.name,
                                })
                              ) || []
                            }
                            setSelected={(elem) => {
                              if (!groupsId.includes(elem)) {
                                setNewGroup(elem);
                                setGroups([
                                  ...groups,
                                  dataGroups?.getCenter.center.groups.find(
                                    (elem2) => elem2.id === elem
                                  ) as Group,
                                ]);
                              }
                            }}
                            selected={newGroup}
                            width="7vw"
                          />
                        </Cell>
                        <Cell>
                          {newGroupData?.getGroup.group.timetable && (
                            <div>
                              {newGroupData.getGroup.group.timetable?.every(
                                (elem) => elem.start !== ""
                              ) &&
                                newGroupData.getGroup.group.timetable
                                  ?.map((elem) => elem.start)
                                  .join(", ")}
                              {(newGroupData.getGroup.group.timetable?.every(
                                (elem) => elem.start == ""
                              ) ||
                                newGroupData.getGroup.group.timetable ===
                                  undefined ||
                                newGroupData.getGroup.group.timetable
                                  ?.length === 0) &&
                                "-"}
                            </div>
                          )}
                        </Cell>
                        <Cell>
                          {newGroupData?.getGroup.group.timetable && (
                            <div>
                              {newGroupData.getGroup.group.timetable?.every(
                                (elem) => elem.end !== ""
                              ) &&
                                newGroupData.getGroup.group.timetable
                                  ?.map((elem) => elem.end)
                                  .join(", ")}
                              {(newGroupData.getGroup.group.timetable?.every(
                                (elem) => elem.start == ""
                              ) ||
                                newGroupData.getGroup.group.timetable ===
                                  undefined ||
                                newGroupData.getGroup.group.timetable
                                  ?.length === 0) &&
                                "-"}
                            </div>
                          )}
                        </Cell>
                        <Cell>
                          {newGroupData?.getGroup.group.timetable && (
                            <div>
                              {newGroupData.getGroup.group.timetable
                                ?.map((elem) =>
                                  t(
                                    `components.table.time-table.${elem.day.toLowerCase()}`
                                  )
                                )
                                .join(" - ")}
                              {(newGroupData.getGroup.group.timetable ===
                                undefined ||
                                newGroupData.getGroup.group.timetable
                                  ?.length === 0) &&
                                "-"}
                            </div>
                          )}
                        </Cell>
                        <Cell>
                          {newGroupData &&
                            (newGroupData.getGroup.group.course.EPO.length >
                              0 ||
                              newGroupData.getGroup.group.course.ESO.length >
                                0) &&
                            (newGroupData.getGroup.group.course.EPO.length >
                              0 ||
                              newGroupData.getGroup.group.course.ESO.length >
                                0) && (
                              <styles.P4>
                                {t("pages.edit-group.course")}
                                {newGroupData.getGroup.group.course.ESO &&
                                  newGroupData.getGroup.group.course.EPO &&
                                  t(
                                    `general.courses.${
                                      [
                                        ...newGroupData.getGroup.group.course
                                          .EPO,
                                      ].sort((a, b) => a.localeCompare(b))[0]
                                    }`
                                  ) +
                                    t("general.to") +
                                    t(
                                      `general.courses.${[
                                        ...newGroupData.getGroup.group.course
                                          .ESO,
                                      ]
                                        .sort((a, b) => a.localeCompare(b))
                                        .at(-1)}`
                                    )}
                              </styles.P4>
                            )}
                        </Cell>
                      </React.Fragment>
                    </AddGroup>
                  )}
                </>
              )}
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
  width: 100%;
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

const BinButton = styled(Icon)`
  margin-left: 10px;
  cursor: pointer;
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

const AddGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Cell = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  align-items: center;
  border-bottom: solid 1px ${colors.colors.grayBlue};
  border-left: solid 1px ${colors.colors.grayBlue};
  justify-content: flex-start;
  padding: 0 2em;
  overflow: hidden;
  white-space: nowrap;
`;

const LoadingAnimation = styled.div`
  @keyframes wave {
    0%,
    60%,
    100% {
      transform: initial;
    }

    30% {
      transform: translateY(-15px);
    }
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  z-index: 99999;
  .dot {
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-right: 7px;
    animation: wave 1.3s linear infinite;

    &:nth-child(1) {
      background-color: ${colors.colors.orange80};
    }

    &:nth-child(2) {
      animation-delay: -1.1s;
      background-color: ${colors.colors.red80};
    }

    &:nth-child(3) {
      animation-delay: -0.9s;
      background-color: ${colors.colors.purple80};
    }
  }
`;

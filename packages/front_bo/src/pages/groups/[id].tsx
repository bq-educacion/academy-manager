import {
  Alert,
  Button,
  colors,
  DropDownUnique,
  FillIn,
  Icon,
  InputSuper,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import withApollo from "../../apollo/withApollo";
import { AddTimeTableV2, Layout } from "../../components";
import { sections } from "../../config";
import {
  GroupModality,
  GroupType,
  TimetableInput,
  useEditGroupMutation,
  useGetGroupQuery,
  useSimpleCentersNameQuery,
  useSimpleInstructorsNameQuery,
} from "../../generated/graphql";

const EditGroup: NextPage = () => {
  const router = useRouter();
  const t = useTranslate();

  const { data } = useGetGroupQuery({
    variables: {
      getGroupId: router.query.id as string,
    },
  });
  const { data: TeachersData } = useSimpleInstructorsNameQuery();

  const { data: CentersData } = useSimpleCentersNameQuery();

  const [showFolder, setShowFolder] = useState<boolean>(true);
  const [showFolder2, setShowFolder2] = useState<boolean>(true);

  const [center, setCenter] = useState<string>(
    data?.getGroup?.group.center?.id || ""
  );
  const [name, setName] = useState<string>(data?.getGroup?.group.name || "");
  const [nameError, setNameError] = useState<boolean>(false);
  const [modality, setModality] = useState<GroupModality | undefined>(
    data?.getGroup?.group.modality
  );
  const [type, setType] = useState<GroupType | undefined>(
    data?.getGroup?.group.type
  );
  const [teachers, setTeachers] = useState<string[]>(
    data?.getGroup?.group.instructors.map((t) => t.id) || []
  );
  const [notes, setNotes] = useState<string | null>(
    data?.getGroup?.group.notes || null
  );
  const [timeTableOnChange, setTimeTableOnChange] = useState<TimetableInput[]>(
    data?.getGroup.group.timetable || []
  );
  const [timeTableError, setTimeTableError] = useState<boolean>(false);
  const [changes, setChanges] = useState<boolean>(false);

  const [editGroupMutation, { loading }] = useEditGroupMutation({
    variables: {
      editGroupId: router.query.id as string,
      instructors: teachers,
      center: center,
      notes: notes,
      timetable: timeTableOnChange.map((t) => {
        return {
          day: t.day,
          start: t.start,
          end: t.end,
        };
      }),
      type: type,
      modality: modality,
      name: name,
    },
  });

  useLayoutEffect(() => {
    if (
      name !== data?.getGroup.group.name ||
      center !== data?.getGroup.group.center?.id ||
      modality !== data?.getGroup.group.modality ||
      type !== data?.getGroup.group.type ||
      !data?.getGroup.group.instructors
        .map((t) => t.id)
        .every((t) => teachers.includes(t)) ||
      notes !== data?.getGroup.group.notes ||
      !data?.getGroup.group.timetable.every((t) =>
        timeTableOnChange.includes(t)
      ) ||
      data.getGroup.group.timetable.length !== timeTableOnChange.length
    ) {
      setChanges(true);
      window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        e.returnValue = "";
      });
    }
    if (
      name === data?.getGroup.group.name &&
      center === data?.getGroup.group.center?.id &&
      modality === data?.getGroup.group.modality &&
      type === data?.getGroup.group.type &&
      data?.getGroup.group.instructors
        .map((t) => t.id)
        .every((t) => teachers.includes(t)) &&
      notes === data?.getGroup.group.notes &&
      data?.getGroup.group.timetable.every((t) =>
        timeTableOnChange.includes(t)
      ) &&
      data.getGroup.group.timetable.length === timeTableOnChange.length
    ) {
      setChanges(false);
      window.removeEventListener("beforeunload", function (e) {
        e.preventDefault();
        e.returnValue = "";
      });
    }
  }, [name, center, modality, type, teachers, notes, timeTableOnChange, data]);

  const [openAlertBad, setOpenAlertBad] = useState<boolean>(false);
  const [openAlertGood, setOpenAlertGood] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
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
    if (data) {
      setName(data.getGroup.group.name);
      {
        data.getGroup.group.center && setCenter(data.getGroup.group.center.id);
      }
      setModality(data.getGroup.group.modality);
      setType(data.getGroup.group.type);
      setTeachers(data.getGroup.group.instructors.map((t) => t.id));
      {
        (data.getGroup.group.notes && setNotes(data.getGroup.group.notes)) ||
          setNotes("");
      }
      setTimeTableOnChange(data.getGroup.group.timetable);
    }
  }, [data]);

  useEffect(() => {
    if (openAlertBad) {
      const timer = setTimeout(() => {
        setOpenAlertBad(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    if (openAlertGood) {
      const timer = setTimeout(() => {
        setOpenAlertGood(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [openAlertBad, openAlertGood]);

  return (
    <>
      {openAlertBad && (
        <Alert setOpen={setOpenAlertBad} bad title={t("general.error")} />
      )}
      {openAlertGood && (
        <Alert setOpen={setOpenAlertGood} ok title={t("general.saved")} />
      )}
      <Layout
        title={sections[0].bigTitle}
        childrenHeader={
          <HeaderDiv>
            <styles.BoldP2>
              {t("general.sections.links.groups")} / {data?.getGroup.group.name}
            </styles.BoldP2>
          </HeaderDiv>
        }
        section={sections[0].title}
        label={sections[0].links[2].label}
        childrenSubHeader={
          <SubHeaderDiv>
            <Button
              text={t("pages.edit-group.delete")}
              onClick={() => {
                // setOpenModalDelete(true);
              }}
              deleteRed
            />
            <GreyDivider loading={loading2} />

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
                if (name === "") {
                  setNameError(true);
                }
                if (!timeTableError && name !== "") {
                  editGroupMutation()
                    .then(() => {
                      setChanges(false);
                      setTimeout(() => {
                        setOpenAlertGood(true);
                      }, 1000);
                    })
                    .catch(() => {
                      setOpenAlertBad(true);
                    });
                }
              }}
              create
              disabled={!changes}
            />
          </SubHeaderDiv>
        }
        children2={
          data && (
            <BodyDiv>
              <GateFolder>
                <GateFolderButton onClick={() => setShowFolder2(!showFolder2)}>
                  <GateFolderArrow name="direction" open={showFolder2} />
                </GateFolderButton>
                <GateFolderTitle>
                  <styles.BoldP4>{t("pages.edit-group.time")}</styles.BoldP4>
                </GateFolderTitle>
              </GateFolder>
              {showFolder2 && (
                <AddTimeTableV2
                  timeTableOnChange={timeTableOnChange}
                  setTimeTable={setTimeTableOnChange}
                  checkErrors={setTimeTableError}
                />
              )}
            </BodyDiv>
          )
        }
      >
        {data && (
          <BodyDiv>
            <GateFolder>
              <GateFolderButton onClick={() => setShowFolder(!showFolder)}>
                <GateFolderArrow name="direction" open={showFolder} />
              </GateFolderButton>
              <GateFolderTitle>
                <styles.BoldP4>{t("pages.edit-group.info")}</styles.BoldP4>
              </GateFolderTitle>
            </GateFolder>
            {showFolder && (
              <>
                <BodySubHeader>
                  <styles.P4>
                    {t("pages.edit-center.date")}
                    {data?.getGroup.group.createdAt}
                  </styles.P4>
                  {(data.getGroup.group.course.EPO.length > 0 ||
                    data.getGroup.group.course.ESO.length > 0) && (
                    <styles.P4>
                      {t("pages.edit-group.course")}
                      {data.getGroup.group.course.ESO &&
                        data.getGroup.group.course.EPO &&
                        t(
                          `general.courses.${
                            [...data.getGroup.group.course.EPO].sort((a, b) =>
                              a.localeCompare(b)
                            )[0]
                          }`
                        ) +
                          t("general.to") +
                          t(
                            `general.courses.${[
                              ...data.getGroup.group.course.ESO,
                            ]
                              .sort((a, b) => a.localeCompare(b))
                              .at(-1)}`
                          )}
                    </styles.P4>
                  )}
                  <a>
                    <styles.P4>
                      {t("pages.edit-center.students")}
                      {data?.getGroup.totalStudents}
                    </styles.P4>
                  </a>
                </BodySubHeader>
                <BodyContent>
                  <FillIn>
                    <styles.BoldP4>
                      {t("pages.edit-group.center")}
                    </styles.BoldP4>
                    <DropDownUnique
                      options={
                        CentersData?.getCenters.data.map((center) => ({
                          key: center.id,
                          label: center.name,
                        })) || []
                      }
                      selected={center}
                      setSelected={setCenter}
                      width="25vw"
                    />
                  </FillIn>
                  <FillIn>
                    <styles.BoldP4>{t("pages.edit-group.name")}</styles.BoldP4>
                    <InputSuper
                      error={nameError}
                      setError={setNameError}
                      width="25vw"
                      placeholder={t(
                        "components.create-center.2.subtitle.name-placeholder"
                      )}
                      input={name}
                      setInput={setName}
                    />
                    {nameError && (
                      <styles.P0Error>{t("general.empty")}</styles.P0Error>
                    )}
                  </FillIn>
                  <FillIn>
                    <styles.BoldP4>
                      {t("pages.edit-group.nature")}
                    </styles.BoldP4>
                    <DropDownUnique
                      options={Object.values(GroupModality).map((modality) => ({
                        key: modality,
                        label: t(
                          `components.create-group.1.subtitle.modality-${modality.toLowerCase()}`
                        ),
                      }))}
                      selected={modality}
                      setSelected={setModality as (value: string) => void}
                      width="9.141vw"
                    />
                  </FillIn>
                  <FillIn>
                    <styles.BoldP4>{t("pages.edit-group.type")}</styles.BoldP4>
                    <DropDownUnique
                      options={Object.values(GroupType).map((type) => ({
                        key: type,
                        label: t(
                          `components.create-group.1.subtitle.type-${type.toLowerCase()}`
                        ),
                      }))}
                      selected={type}
                      setSelected={setType as (value: string) => void}
                      width="7.5vw"
                    />
                  </FillIn>
                </BodyContent>
                <BodyContent>
                  <FillIn>
                    <styles.BoldP4>
                      {t("pages.edit-group.teacher")}
                    </styles.BoldP4>
                    {teachers.length === 0 && teachers.push("")}
                    {teachers.map((teacher, index) => (
                      <ContactDiv
                        onClick={() => {
                          setChanges(true);
                        }}
                      >
                        <DropDownUnique
                          key={index}
                          options={
                            TeachersData?.getInstructors.data.map(
                              (teacher) => ({
                                key: teacher.id,
                                label: teacher.name,
                              })
                            ) || []
                          }
                          selected={teacher}
                          setSelected={(value) => {
                            const newTeachers = [...teachers];
                            newTeachers[index] = value;
                            setTeachers(newTeachers);
                          }}
                          width="215px"
                        />
                        <Bin
                          onClick={() => {
                            const newTeachers = [...teachers];
                            newTeachers.splice(index, 1);
                            setTeachers(newTeachers);
                          }}
                        >
                          {teachers.length > 1 && <Icon name="eliminate" />}
                        </Bin>
                        <Bin
                          onClick={() => {
                            setTeachers([...teachers, ""]);
                          }}
                        >
                          {index === teachers.length - 1 && <Icon name="add" />}
                          {index === teachers.length - 1 && (
                            <Icon name="user" />
                          )}
                        </Bin>
                      </ContactDiv>
                    ))}
                  </FillIn>
                </BodyContent>
                <BodyContent>
                  <FillIn>
                    <styles.BoldP4>
                      {t(`pages.edit-center.notes`)}
                    </styles.BoldP4>
                    <InputSuper
                      width="69.5vw"
                      height="8.33vw"
                      placeholder={t("pages.edit-center.notes-placeholder")}
                      input={notes || ""}
                      setInput={setNotes}
                      textArea
                    />
                  </FillIn>
                </BodyContent>
              </>
            )}
          </BodyDiv>
        )}
      </Layout>
    </>
  );
};

export default withApollo(EditGroup, { requiresAccess: false });

const Bin = styled.div`
  color: ${colors.colors.blue80};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 40px;
`;

const ContactDiv = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    margin: 0 10px 10px 0;
  }
`;

const BodyContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 45px 0 30px;
  width: min-content;
  justify-content: flex-start;
  & > :not(div:first-child) {
    margin-left: 10px;
  }
`;

const BodySubHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin: 25px 0 25px 30px;
  justify-content: flex-start;
  align-items: center;
  & > * {
    margin-right: 20px;
  }
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

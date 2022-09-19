import {
  Alert,
  Button,
  CheckBox,
  colors,
  DropDownUnique,
  FillIn,
  Icon,
  InputSuper,
  styles,
  Switch,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import withApollo from "../../apollo/withApollo";
import { AddContactEditStudent, Layout, Modal, Table } from "../../components";
import { courses, sections } from "../../config";
import {
  Group,
  OrderFilterGroup,
  StudentContact,
  useEditStudentMutation,
  useGetCenterGroupsQuery,
  useGetGroupQuery,
  useGetStudentQuery,
  useSetStatusStudentMutation,
  useSimpleCentersNameQuery,
} from "../../generated/graphql";

const EditStudent: NextPage = () => {
  const router = useRouter();
  const t = useTranslate();

  const { data } = useGetStudentQuery({
    variables: {
      getStudentId: router.query.id as string,
    },
  });

  const { data: dataCenters } = useSimpleCentersNameQuery({
    variables: {},
  });

  const [addGroup, setAddGroup] = useState<boolean>(false);
  const [newCenter, setNewCenter] = useState<string>("");
  const { data: dataGroups } = useGetCenterGroupsQuery({
    variables: {
      getCenterId: newCenter,
    },
  });
  const [newGroup, setNewGroup] = useState<string>("");
  const { data: newGroupData } = useGetGroupQuery({
    variables: {
      getGroupId: newGroup,
    },
  });

  const [showFolder, setShowFolder] = useState<boolean>(true);
  const [showFolder1, setShowFolder1] = useState<boolean>(true);
  const [showFolder2, setShowFolder2] = useState<boolean>(true);
  const [name, setName] = useState<string>(data?.getStudent.name || "");
  const [nameError, setNameError] = useState<boolean>(false);
  const [birth, setBirth] = useState<string>(data?.getStudent.birthDate || "");
  const [birthError, setBirthError] = useState<boolean>(false);
  const [courseError, setCourseError] = useState<boolean>(false);
  const [course, setCourse] = useState<string>(data?.getStudent.course || "");
  const [dateIn, setDateIn] = useState<string>(
    data?.getStudent.registrationDate || ""
  );
  const [dateInError, setDateInError] = useState<boolean>(false);
  const [allergies, setAllergies] = useState<boolean>(
    data?.getStudent.allergies || false
  );
  const [allergiesText, setAllergiesText] = useState<string>(
    data?.getStudent.descriptionAllergy || ""
  );
  const [pickup, setPickup] = useState<string>(
    data?.getStudent.collectionPermit || ""
  );
  const [images, setImages] = useState<boolean>(
    data?.getStudent.imageAuthorisation || false
  );
  const [alone, setAlone] = useState<boolean>(
    data?.getStudent.goesAlone || false
  );
  const [prev, setPrev] = useState<boolean>(
    data?.getStudent.oldStudent || false
  );
  const [mandate, setMandate] = useState<boolean>(
    data?.getStudent.signedMandate || false
  );
  const [notes, setNotes] = useState<string>(data?.getStudent.notes || "");
  const [contacts, setContacts] = useState<StudentContact[]>(
    data?.getStudent.contacts || []
  );
  const [contactsError, setContactsError] = useState<boolean>(false);
  const [order, setOrder] = useState<{
    key: OrderFilterGroup;
    direction: number;
  }>({
    key: OrderFilterGroup.IdGroup,
    direction: 1,
  });
  const [groups, setGroups] = useState<Group[]>(
    (data?.getStudent.groups as Group[]) || []
  );
  const [groupsId, setGroupsId] = useState<string[]>(
    (data?.getStudent.groups.map((elem) => {
      return elem.id;
    }) as string[]) || []
  );

  const [changes, setChanges] = useState<boolean>(false);

  useEffect(() => {
    {
      name !== data?.getStudent.name && setChanges(true);
    }
    {
      data?.getStudent.birthDate === null && birth !== "" && setChanges(true);
    }
    {
      data?.getStudent.birthDate !== null &&
        birth !== data?.getStudent.birthDate &&
        setChanges(true);
    }
    {
      course !== data?.getStudent.course && setChanges(true);
    }
    {
      data?.getStudent.registrationDate === null &&
        dateIn !== "" &&
        setChanges(true);
    }
    {
      data?.getStudent.registrationDate !== null &&
        dateIn !== data?.getStudent.registrationDate &&
        setChanges(true);
    }
    {
      data?.getStudent.allergies === null &&
        allergies !== false &&
        setChanges(true);
    }
    {
      data?.getStudent.allergies !== null &&
        allergies !== data?.getStudent.allergies &&
        setChanges(true);
    }
    {
      data?.getStudent.descriptionAllergy === null &&
        allergiesText !== "" &&
        setChanges(true);
    }
    {
      data?.getStudent.descriptionAllergy !== null &&
        allergiesText !== data?.getStudent.descriptionAllergy &&
        setChanges(true);
    }
    {
      data?.getStudent.collectionPermit === null &&
        pickup !== "" &&
        setChanges(true);
    }
    {
      data?.getStudent.collectionPermit !== null &&
        pickup !== data?.getStudent.collectionPermit &&
        setChanges(true);
    }
    {
      data?.getStudent.imageAuthorisation === null &&
        images !== false &&
        setChanges(true);
    }
    {
      data?.getStudent.imageAuthorisation !== null &&
        images !== data?.getStudent.imageAuthorisation &&
        setChanges(true);
    }
    {
      data?.getStudent.goesAlone === null &&
        alone !== false &&
        setChanges(true);
    }
    {
      data?.getStudent.goesAlone !== null &&
        alone !== data?.getStudent.goesAlone &&
        setChanges(true);
    }
    {
      data?.getStudent.oldStudent === null &&
        prev !== false &&
        setChanges(true);
    }
    {
      data?.getStudent.oldStudent !== null &&
        prev !== data?.getStudent.oldStudent &&
        setChanges(true);
    }
    {
      data?.getStudent.signedMandate === null &&
        mandate !== false &&
        setChanges(true);
    }
    {
      data?.getStudent.signedMandate !== null &&
        mandate !== data?.getStudent.signedMandate &&
        setChanges(true);
    }
    {
      data?.getStudent.notes === null && notes !== "" && setChanges(true);
    }
    {
      data?.getStudent.notes !== null &&
        notes !== data?.getStudent.notes &&
        setChanges(true);
    }
    {
      data?.getStudent.contacts !== contacts && setChanges(true);
    }
  }, [
    name,
    birth,
    course,
    dateIn,
    allergies,
    allergiesText,
    pickup,
    images,
    alone,
    prev,
    mandate,
    notes,
    contacts,
    groupsId,
  ]);

  const [editStudentMutation, { loading }] = useEditStudentMutation({
    variables: {
      editStudentId: router.query.id as string,
      groups: groupsId,
      course,
      registrationDate: dateIn,
      name,
      birthDate: birth,
      notes,
      contacts: contacts.map((elem) => {
        return {
          name: elem.name,
          phone: elem.phone,
          email: elem.email,
          send_info: elem.send_info,
        };
      }),
      collectionPermit: pickup,
      imageAuthorisation: images,
      signedMandate: mandate,
      oldStudent: prev,
      descriptionAllergy: allergiesText,
      allergies,
    },
  });

  const [openAlertBad, setOpenAlertBad] = useState<boolean>(false);
  const [openAlertGood, setOpenAlertGood] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [studentState, setStudentState] = useState<boolean>(
    data?.getStudent.enrolled || false
  );

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
      setName(data.getStudent.name);
      {
        data.getStudent.birthDate && setBirth(data.getStudent.birthDate);
      }
      {
        data.getStudent.course && setCourse(data.getStudent.course);
      }
      {
        data.getStudent.registrationDate &&
          setDateIn(data.getStudent.registrationDate);
      }
      {
        data.getStudent.allergies && setAllergies(data.getStudent.allergies);
      }
      {
        data.getStudent.descriptionAllergy &&
          setAllergiesText(data.getStudent.descriptionAllergy);
      }
      {
        data.getStudent.collectionPermit &&
          setPickup(data.getStudent.collectionPermit);
      }
      {
        data.getStudent.imageAuthorisation &&
          setImages(data.getStudent.imageAuthorisation);
      }
      {
        data.getStudent.goesAlone && setAlone(data.getStudent.goesAlone);
      }
      {
        data.getStudent.oldStudent && setPrev(data.getStudent.oldStudent);
      }
      {
        data.getStudent.signedMandate &&
          setMandate(data.getStudent.signedMandate);
      }
      {
        data.getStudent.notes && setNotes(data.getStudent.notes);
      }
      {
        data.getStudent.contacts && setContacts(data.getStudent.contacts);
      }
      {
        data.getStudent.groups && setGroups(data.getStudent.groups as Group[]);
      }
    }
  }, [data]);

  const [setStatusStudentMutation] = useSetStatusStudentMutation();
  const [openModalState, setOpenModalState] = useState<boolean>(false);

  return (
    <>
      {openAlertBad && (
        <Alert setOpen={setOpenAlertBad} bad title={t("general.error")} />
      )}
      {openAlertGood && (
        <Alert setOpen={setOpenAlertGood} ok title={t("general.saved")} />
      )}
      {openModalState && (
        <Modal
          setModal={setOpenModalState}
          title=""
          children={
            <ModalDiv>
              <styles.BoldP2>
                {t("pages.edit-center.state-modal.title")}
              </styles.BoldP2>
              <styles.P4>{t("pages.edit-center.state-modal.text1")}</styles.P4>
              <DelteModalDiv>
                <Icon name="alert" />
                <styles.P4>
                  {t("pages.edit-center.state-modal.text2")}
                </styles.P4>
              </DelteModalDiv>
              <DelteModalDiv2>
                <Icon name="alert" />
                <styles.P4>
                  {t("pages.edit-center.state-modal.text3")}
                </styles.P4>
              </DelteModalDiv2>
              <ButtonsModalDiv>
                <Button
                  text={t("pages.edit-center.state-modal.button1")}
                  deleteRed
                  onClick={() => {
                    setStatusStudentMutation({
                      variables: {
                        setStatusStudentId: router.query.id as string,
                        enrolled: false,
                      },
                    }).then(() => {
                      setStudentState(false);
                      setOpenModalState(false);
                    });
                  }}
                />
                <Button
                  text={t("pages.edit-center.state-modal.button2")}
                  secondary
                  onClick={() => {
                    setOpenModalState(false);
                  }}
                />
              </ButtonsModalDiv>
            </ModalDiv>
          }
        />
      )}
      <Layout
        title={sections[0].bigTitle}
        section={sections[0].title}
        label={sections[0].links[3].label}
        childrenHeader={
          <HeaderDiv>
            <styles.BoldP2>
              {t("general.sections.links.students")} / {data?.getStudent.name}
            </styles.BoldP2>
          </HeaderDiv>
        }
        childrenSubHeader={
          <SubHeaderDiv>
            <Button
              text={t("pages.edit-student.delete")}
              onClick={() => {
                // setOpenModalDelete(true);
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
                if (!contactsError) {
                  editStudentMutation()
                    .then(() => {
                      setChanges(false);
                      setShowFolder2(false);
                      setShowFolder2(true);
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
          <BodyDiv>
            <GateFolder>
              <GateFolderButton onClick={() => setShowFolder1(!showFolder1)}>
                <GateFolderArrow name="direction" open={showFolder1} />
              </GateFolderButton>
              <GateFolderTitle>
                <styles.BoldP4>
                  {t("pages.edit-student.info-contact")}
                </styles.BoldP4>
                <AddContactButton
                  onClick={() => {
                    {
                      !showFolder1 && setShowFolder1(true);
                    }
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
              </GateFolderTitle>
            </GateFolder>
            {showFolder1 && (
              <>
                {contacts.length > 0 && <MarginDiv />}
                {contacts.map((contact, index) => {
                  return (
                    <AddContactEditStudent
                      contact={contact}
                      index={index}
                      setContacts={setContacts}
                      contacts={contacts}
                      setErrorContacts={setContactsError}
                    />
                  );
                })}
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
                <styles.BoldP4>
                  {t("pages.edit-student.info-groups")}
                </styles.BoldP4>
                <AddContactButton
                  onClick={() => {
                    setAddGroup(true);
                    setChanges(true);
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
            {showFolder2 && data && (
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
                          {item.timetable?.every((elem) => elem.start !== "") &&
                            item.timetable
                              ?.map((elem) => elem.start)
                              .join(", ")}
                          {(item.timetable?.every((elem) => elem.start == "") ||
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
                            item.timetable?.map((elem) => elem.end).join(", ")}
                          {(item.timetable?.every((elem) => elem.start == "") ||
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
                                setChanges(true);
                                setGroups(
                                  groups.filter(
                                    (elem) => elem.id_group !== item.id_group
                                  )
                                );
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
                          options={dataCenters.getCenters.data.map((elem) => ({
                            key: elem.id,
                            label: elem.name,
                          }))}
                          setSelected={setNewCenter}
                          selected={newCenter}
                          width="7vw"
                        />
                      </Cell>
                      <Cell>
                        <DropDownUnique
                          disabled={newCenter === ""}
                          options={
                            dataGroups?.getCenter.center.groups.map((elem) => ({
                              key: elem.id,
                              label: elem.name,
                            })) || []
                          }
                          setSelected={(elem) => {
                            if (!groupsId.includes(elem)) {
                              setGroupsId([...groupsId, elem]);
                              setNewGroup(elem);
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
                              newGroupData.getGroup.group.timetable?.length ===
                                0) &&
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
                              newGroupData.getGroup.group.timetable?.length ===
                                0) &&
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
                              newGroupData.getGroup.group.timetable?.length ===
                                0) &&
                              "-"}
                          </div>
                        )}
                      </Cell>
                      <Cell>
                        {newGroupData &&
                          (newGroupData.getGroup.group.course.EPO.length > 0 ||
                            newGroupData.getGroup.group.course.ESO.length >
                              0) &&
                          (newGroupData.getGroup.group.course.EPO.length > 0 ||
                            newGroupData.getGroup.group.course.ESO.length >
                              0) && (
                            <styles.P4>
                              {t("pages.edit-group.course")}
                              {newGroupData.getGroup.group.course.ESO &&
                                newGroupData.getGroup.group.course.EPO &&
                                t(
                                  `general.courses.${
                                    [
                                      ...newGroupData.getGroup.group.course.EPO,
                                    ].sort((a, b) => a.localeCompare(b))[0]
                                  }`
                                ) +
                                  t("general.to") +
                                  t(
                                    `general.courses.${[
                                      ...newGroupData.getGroup.group.course.ESO,
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
        {data && (
          <BodyDiv>
            <GateFolder>
              <GateFolderButton onClick={() => setShowFolder(!showFolder)}>
                <GateFolderArrow name="direction" open={showFolder} />
              </GateFolderButton>
              <GateFolderTitle>
                <styles.BoldP4>{t("pages.edit-student.info")}</styles.BoldP4>
                <CenterStateDiv>
                  {!studentState && (
                    <styles.P4>{t("pages.edit-student.state")}</styles.P4>
                  )}
                  {studentState && (
                    <styles.P4>{t("pages.edit-student.no-state")}</styles.P4>
                  )}
                  <Switch
                    option={studentState}
                    setOption={() => {
                      if (studentState) {
                        setOpenModalState(true);
                      } else {
                        setStatusStudentMutation({
                          variables: {
                            setStatusStudentId: router.query.id as string,
                            enrolled: true,
                          },
                        }).then(() => {
                          setStudentState(true);
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
                    <styles.P4>{t("pages.edit-student.name")}</styles.P4>
                    <InputSuper
                      input={name}
                      setInput={setName}
                      placeholder={t("pages.edit-student.name")}
                      error={nameError}
                      setError={setNameError}
                      width="38.281vw"
                    />
                  </FillIn>
                  <FillIn>
                    <styles.P4>{t("pages.edit-student.birth")}</styles.P4>
                    <InputSuper
                      placeholder={t("pages.edit-student.birth-placeholder")}
                      input={birth}
                      setInput={setBirth}
                      error={birthError}
                      setError={setBirthError}
                      width="12vw"
                      datePattern
                    />
                  </FillIn>
                  <FillIn>
                    <styles.P4>{t("pages.edit-student.course")}</styles.P4>
                    <DropDownUnique
                      error={courseError}
                      setError={setCourseError}
                      options={courses.map((elem) => {
                        return {
                          key: elem.key,
                          label: t(elem.label),
                        };
                      })}
                      width="7.813vw"
                      setSelected={setCourse}
                      selected={course}
                    />
                  </FillIn>
                  <FillIn>
                    <styles.P4>{t("pages.edit-student.dateIn")}</styles.P4>
                    <InputSuper
                      placeholder={t("pages.edit-student.birth-placeholder")}
                      input={dateIn}
                      setInput={setDateIn}
                      error={dateInError}
                      setError={setDateInError}
                      width="12vw"
                      datePattern
                    />
                  </FillIn>
                </BodyContent>
                <BodyContent>
                  <FillIn>
                    <CheckDiv>
                      <CheckBox
                        option={allergies ? true : false}
                        setOption={setAllergies}
                      />
                      <styles.P4>{t("pages.edit-student.allergies")}</styles.P4>
                    </CheckDiv>
                  </FillIn>
                  <FillIn>
                    <styles.P4>
                      {t("pages.edit-student.allergies-text")}
                    </styles.P4>
                    <InputSuper
                      input={allergiesText}
                      setInput={setAllergiesText}
                      placeholder={t("pages.edit-student.allergies-text")}
                      width="27.344vw"
                    />
                  </FillIn>
                  <FillIn>
                    <styles.P4>{t("pages.edit-student.pickup")}</styles.P4>
                    <InputSuper
                      input={pickup}
                      setInput={setPickup}
                      placeholder={t("pages.edit-student.pickup-placeholder")}
                      width="29.688vw"
                    />
                  </FillIn>
                </BodyContent>
                <BodyContent>
                  <FillIn>
                    <CheckDiv1>
                      <CheckBox
                        option={images ? true : false}
                        setOption={setImages}
                      />
                      <styles.P4>{t("pages.edit-student.image")}</styles.P4>
                    </CheckDiv1>
                  </FillIn>
                  <FillIn>
                    <CheckDiv1>
                      <CheckBox
                        option={alone ? true : false}
                        setOption={setAlone}
                      />
                      <styles.P4>{t("pages.edit-student.alone")}</styles.P4>
                    </CheckDiv1>
                  </FillIn>
                  <FillIn>
                    <CheckDiv1>
                      <CheckBox
                        option={prev ? true : false}
                        setOption={setPrev}
                      />
                      <styles.P4>{t("pages.edit-student.previous")}</styles.P4>
                    </CheckDiv1>
                  </FillIn>
                  <FillIn>
                    <CheckDiv1>
                      <CheckBox
                        option={mandate ? true : false}
                        setOption={setMandate}
                      />
                      <styles.P4>{t("pages.edit-student.mandate")}</styles.P4>
                    </CheckDiv1>
                  </FillIn>
                </BodyContent>
                <BodyContent>
                  <FillIn>
                    <styles.BoldP4>
                      {t(`pages.edit-student.notes`)}
                    </styles.BoldP4>
                    <InputSuper
                      width="69.6vw"
                      height="8.33vw"
                      placeholder={t("pages.edit-student.notes-placeholder")}
                      input={notes}
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

export default withApollo(EditStudent, { requiresAccess: false });

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

const AddGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
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

const CheckDiv = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  margin: 35px 0px 0px 0px;
  & > * {
    margin-right: 10px;
  }
`;

const CheckDiv1 = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  margin: 10px 0px 0px 0px;
  & > * {
    margin-right: 10px;
  }
`;

const MarginDiv = styled.div`
  margin-top: 20px;
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

const CenterStateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > p {
    margin-right: 10px;
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

const BinButton = styled(Icon)`
  margin-left: 10px;
  cursor: pointer;
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

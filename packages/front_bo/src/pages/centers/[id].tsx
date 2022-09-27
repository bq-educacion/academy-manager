import {
  Alert,
  Button,
  colors,
  DropDown,
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
import { useEffect, useLayoutEffect, useState } from "react";
import withApollo from "../../apollo/withApollo";
import { AddContactFilterCenter, Layout, Modal, Table } from "../../components";
import { sections } from "../../config";
import {
  CenterActivityType,
  CenterContact,
  CenterNature,
  Languages,
  OrderFilterGroup,
  useDeleteCenterMutation,
  useEditCenterMutation,
  useGetCenterGroupsQuery,
  useGetCenterQuery,
  useSetActiveCenterMutation,
} from "../../generated/graphql";

const EditCenter: NextPage = () => {
  const router = useRouter();
  const t = useTranslate();

  const { data } = useGetCenterQuery({
    variables: {
      getCenterId: router.query.id as string,
    },
    fetchPolicy: "network-only",
  });

  const [deleteCenterMutation] = useDeleteCenterMutation({
    variables: {
      deleteCenterId: router.query.id as string,
    },
  });

  const { data: dataGroups } = useGetCenterGroupsQuery({
    variables: {
      getCenterId: router.query.id as string,
    },
  });

  const [changes, setChanges] = useState<boolean>(false);

  const [showFolder, setShowFolder] = useState<boolean>(
    data?.getCenter.center.active || true
  );
  const [centerState, setCenterState] = useState<boolean>(
    data?.getCenter.center.active || true
  );
  const [type, setType] = useState<CenterActivityType[]>(
    data?.getCenter.center.type || []
  );
  const [nature, setNature] = useState<CenterNature | undefined>(
    data?.getCenter.center.nature || undefined
  );
  const [languagesSelection, setLanguagesSelection] = useState<Languages[]>(
    data?.getCenter.center.languages || []
  );
  const [name, setName] = useState<string>(data?.getCenter.center.name || "");
  const [address, setAddress] = useState<string>(
    data?.getCenter.center.address || ""
  );
  const [city, setCity] = useState<string>(data?.getCenter.center.city || "");
  const [phone, setPhone] = useState<string>(
    data?.getCenter.center.phone || ""
  );
  const [email, setEmail] = useState<string>(
    data?.getCenter.center.email || ""
  );
  const [contacts, setContacts] = useState<CenterContact[]>(
    data?.getCenter.center.contacts || [
      {
        name: "",
        phone: "",
        email: "",
      },
    ]
  );
  const [notes, setNotes] = useState<string>(
    data?.getCenter.center.notes || ""
  );

  const [editCenterMutation, { loading }] = useEditCenterMutation({
    variables: {
      editCenterId: router.query.id as string,
      center: {
        name,
        address,
        city,
        phone,
        email,
        type,
        nature,
        languages: languagesSelection,
        contacts: contacts.map((c) => ({
          name: c.name,
          phone: c.phone,
          email: c.email,
        })),
        notes,
      },
    },
  });

  const [setActiveCenterMutation] = useSetActiveCenterMutation();

  const [nameError, setNameError] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<boolean>(false);
  const [cityError, setCityError] = useState<boolean>(false);
  const [cityError2, setCityError2] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);

  // const [openModalSave, setOpenModalSave] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalState, setOpenModalState] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (
      type !== data?.getCenter.center.type ||
      nature !== data?.getCenter.center.nature ||
      languagesSelection !== data?.getCenter.center.languages ||
      name !== data?.getCenter.center.name ||
      address !== data?.getCenter.center.address ||
      city !== data?.getCenter.center.city ||
      phone !== data?.getCenter.center.phone ||
      email !== "" ||
      notes !== "" ||
      contacts !== data?.getCenter.center.contacts
    ) {
      setChanges(true);
      window.addEventListener("beforeunload", function (e) {
        // setOpenModalSave(true);
        e.preventDefault();
        e.returnValue = "";
      });
    }
    if (
      type === data?.getCenter.center.type &&
      nature === data?.getCenter.center.nature &&
      languagesSelection === data?.getCenter.center.languages &&
      name === data?.getCenter.center.name &&
      address === data?.getCenter.center.address &&
      city === data?.getCenter.center.city &&
      phone === data?.getCenter.center.phone &&
      email === "" &&
      notes === "" &&
      contacts === data?.getCenter.center.contacts
    ) {
      setChanges(false);
    }
  }, [
    showFolder,
    type,
    nature,
    languagesSelection,
    name,
    address,
    city,
    phone,
    email,
    contacts,
    notes,
  ]);

  const [loadingWithOffset, setloadingWithOffset] = useState<boolean>(false);
  useEffect(() => {
    if (loading) {
      setloadingWithOffset(true);
    }
    const timer = setTimeout(() => {
      setloadingWithOffset(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  const [openAlertBad, setOpenAlertBad] = useState<boolean>(false);
  const [openAlertGood, setOpenAlertGood] = useState<boolean>(false);

  const [showFolder4, setShowFolder4] = useState<boolean>(true);
  const [order, setOrder] = useState<{
    key: OrderFilterGroup;
    direction: number;
  }>({
    key: OrderFilterGroup.IdGroup,
    direction: 1,
  });

  //update hooks with data
  useEffect(() => {
    if (data) {
      setCenterState(data.getCenter.center.active);
      setType(data.getCenter.center.type);
      setNature(data.getCenter.center.nature);
      setLanguagesSelection(data.getCenter.center.languages);
      setName(data.getCenter.center.name);
      setAddress(data.getCenter.center.address);
      setCity(data.getCenter.center.city);
      {
        data.getCenter.center.phone && setPhone(data.getCenter.center.phone);
      }
      {
        data.getCenter.center.email && setEmail(data.getCenter.center.email);
      }
      {
        data.getCenter.center.contacts &&
          setContacts(data.getCenter.center.contacts);
      }
      {
        data.getCenter.center.notes && setNotes(data.getCenter.center.notes);
      }
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
      {openModalDelete && (
        <Modal
          setModal={setOpenModalDelete}
          title=""
          children={
            <ModalDiv>
              <styles.BoldP2>
                {t("pages.edit-center.delete-modal.title")}
              </styles.BoldP2>
              <styles.P4>{t("pages.edit-center.delete-modal.text")}</styles.P4>
              <DelteModalDiv>
                <Icon name="alert" />
                <styles.P4>
                  {t("pages.edit-center.delete-modal.text1")}
                </styles.P4>
              </DelteModalDiv>
              <DelteModalDiv2>
                <Icon name="alert" />
                <styles.P4>
                  {t("pages.edit-center.delete-modal.text2")}
                </styles.P4>
              </DelteModalDiv2>
              <ButtonsModalDiv>
                <Button
                  text={t("pages.edit-center.delete-modal.button1")}
                  deleteRed
                  onClick={() => {
                    deleteCenterMutation().then(() => {
                      router.push("/centers");
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
              <DelteModalDiv>
                <Icon name="alert" />
                <styles.P4>
                  {t("pages.edit-center.state-modal.text3")}
                </styles.P4>
              </DelteModalDiv>
              <DelteModalDiv2>
                <Icon name="alert" />
                <styles.P4>
                  {t("pages.edit-center.state-modal.text4")}
                </styles.P4>
              </DelteModalDiv2>
              <ButtonsModalDiv>
                <Button
                  text={t("pages.edit-center.state-modal.button1")}
                  deleteRed
                  onClick={() => {
                    setActiveCenterMutation({
                      variables: {
                        setActiveCenterId: router.query.id as string,
                        active: false,
                      },
                    }).then(() => {
                      setCenterState(false);
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
              {t("general.sections.links.centers")} /{" "}
              {data?.getCenter.center.name}
            </styles.BoldP2>
            {/* TODO: Año academico */}
          </HeaderDiv>
        }
        section={sections[0].title}
        label={sections[0].links[1].label}
        childrenSubHeader={
          <SubHeaderDiv>
            <Button
              text={t("pages.edit-center.delete")}
              onClick={() => {
                setOpenModalDelete(true);
              }}
              deleteRed
            />
            <GreyDivider loading={loadingWithOffset} />
            {loadingWithOffset && (
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
                if (address === "") {
                  setAddressError(true);
                }
                if (city === "") {
                  setCityError(true);
                }
                if (!city.match(/^[a-zA-Z ]+$/)) {
                  setCityError2(true);
                }
                if (
                  phone.length > 0 &&
                  phone.length !== 9 &&
                  phone.length !== 12
                ) {
                  setPhoneError(true);
                }
                if (email.length > 0 && !validEmail) {
                  setEmailError(true);
                } else {
                  editCenterMutation()
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
          <BodyDiv>
            <GateFolder>
              <GateFolderButton onClick={() => setShowFolder4(!showFolder4)}>
                <GateFolderArrow name="direction" open={showFolder4} />
              </GateFolderButton>
              <GateFolderTitle>
                <styles.BoldP4>{t("pages.edit-teacher.groups")}</styles.BoldP4>
              </GateFolderTitle>
            </GateFolder>
            {showFolder4 && (
              <Table
                inactiveIndexes={[]}
                data={dataGroups?.getCenter.center.groups || []}
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
                          item.timetable?.map((elem) => elem.start).join(", ")}
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
                        </>
                      ),
                  },
                ]}
              />
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
                <styles.BoldP4>{t("pages.edit-center.info")}</styles.BoldP4>
                <CenterStateDiv>
                  {!centerState && (
                    <styles.P4>{t("pages.edit-center.state")}</styles.P4>
                  )}
                  {centerState && (
                    <styles.P4>{t("pages.edit-center.no-state")}</styles.P4>
                  )}
                  <Switch
                    option={centerState}
                    setOption={() => {
                      if (centerState) setOpenModalState(true);
                      else {
                        setActiveCenterMutation({
                          variables: {
                            setActiveCenterId: router.query.id as string,
                            active: true,
                          },
                        }).then(() => {
                          setCenterState(true);
                        });
                      }
                    }}
                  />
                </CenterStateDiv>
              </GateFolderTitle>
            </GateFolder>
            {showFolder && (
              <>
                <BodySubHeader>
                  <styles.P4>
                    {t("pages.edit-center.date")}
                    {data?.getCenter.center.createdAt}
                  </styles.P4>
                  <a>
                    <styles.P4>
                      {t("pages.edit-center.students")}
                      {data?.getCenter.totalStudents}
                    </styles.P4>
                  </a>
                  <a>
                    <styles.P4>
                      {t("pages.edit-center.groups")}
                      {data?.getCenter.totalGroups}
                    </styles.P4>
                  </a>
                </BodySubHeader>
                <BodyContent>
                  <FillIn>
                    <styles.BoldP4>{t("pages.edit-center.type")}</styles.BoldP4>
                    <DropDown
                      options={Object.values(CenterActivityType).map(
                        (type) => ({
                          key: type,
                          label: t(`pages.centers.type.${type.toLowerCase()}`),
                        })
                      )}
                      selected={type}
                      setSelected={(selected) => {
                        setType(selected as CenterActivityType[]);
                      }}
                      width="11.250vw"
                    />
                  </FillIn>
                  <FillIn>
                    <styles.BoldP4>
                      {t("pages.edit-center.nature")}
                    </styles.BoldP4>
                    <DropDownUnique
                      options={Object.values(CenterNature).map((nature) => ({
                        key: nature,
                        label: t(
                          `pages.centers.nature.${nature.toLowerCase()}`
                        ),
                      }))}
                      width="7.813vw"
                      selected={nature}
                      setSelected={(selected) =>
                        setNature(selected as CenterNature)
                      }
                    />
                  </FillIn>
                  <FillIn>
                    <styles.BoldP4>
                      {t(`components.create-center.1.subtitle.languages`)}
                    </styles.BoldP4>
                    <DropDown
                      options={Object.values(Languages).map((language) => ({
                        key: language,
                        label: t(
                          `pages.centers.languages.${language.toLowerCase()}-label`
                        ),
                      }))}
                      selected={languagesSelection}
                      setSelected={
                        setLanguagesSelection as (selected: string[]) => void
                      }
                      width="10.156vw"
                    />
                  </FillIn>
                  <FillIn>
                    <styles.BoldP4>{t("pages.edit-center.name")}</styles.BoldP4>
                    <InputSuper
                      error={nameError}
                      setError={setNameError}
                      width="36.719vw"
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
                </BodyContent>
                <BodyContent>
                  <FillIn>
                    <styles.BoldP4>
                      {t(`components.create-center.2.subtitle.address`)}
                    </styles.BoldP4>
                    <InputSuper
                      error={addressError}
                      setError={setAddressError}
                      width="20vw"
                      placeholder={t(
                        "components.create-center.2.subtitle.address-placeholder"
                      )}
                      input={address}
                      setInput={setAddress}
                    />
                    {addressError && (
                      <styles.P0Error>{t("general.empty")}</styles.P0Error>
                    )}
                  </FillIn>
                  <FillIn>
                    <styles.BoldP4>
                      {t(`components.create-center.2.subtitle.city`)}
                    </styles.BoldP4>
                    <InputSuper
                      error={cityError || cityError2}
                      setError={(error) => {
                        setCityError(error);
                        setCityError2(error);
                      }}
                      width="17.18vw"
                      placeholder={t(
                        "components.create-center.2.subtitle.city"
                      )}
                      input={city}
                      setInput={setCity}
                    />
                    {cityError && (
                      <styles.P0Error>{t("general.empty")}</styles.P0Error>
                    )}
                    {cityError2 && (
                      <styles.P0Error>
                        {t("general.only-letters")}
                      </styles.P0Error>
                    )}
                  </FillIn>
                  <FillIn>
                    <styles.BoldP4>
                      {t(`pages.edit-center.phone`)}
                    </styles.BoldP4>
                    <InputSuper
                      width="7.81vw"
                      telPattern
                      placeholder={t("pages.edit-center.phone")}
                      input={phone}
                      setInput={setPhone}
                      error={phoneError}
                      setError={setPhoneError}
                    />
                    {phoneError && (
                      <styles.P0Error>
                        {t("general.decline-phone")}
                      </styles.P0Error>
                    )}
                  </FillIn>
                  <FillIn>
                    <styles.BoldP4>
                      {t(`pages.edit-center.email`)}
                    </styles.BoldP4>
                    <InputSuper
                      width="16.44vw"
                      type="email"
                      placeholder={t("pages.edit-center.email")}
                      input={email}
                      setInput={setEmail}
                      error={emailError}
                      setError={setEmailError}
                      setValid={setValidEmail}
                    />
                    {emailError && (
                      <styles.P0Error>
                        {t("general.decline-email")}
                      </styles.P0Error>
                    )}
                  </FillIn>
                </BodyContent>
                {contacts.map((contact) => (
                  <BodyContent>
                    <AddContactFilterCenter
                      contacts={contacts}
                      setContacts={setContacts}
                      index={contacts.indexOf(contact)}
                      contact={contact}
                      key={contact.phone}
                    />
                    <Bin
                      onClick={() => {
                        setContacts(
                          contacts.filter((elem) => elem !== contact)
                        );
                      }}
                    >
                      <Icon name="eliminate" />
                    </Bin>
                  </BodyContent>
                ))}
                <BodyContent>
                  <AddContactButton
                    onClick={() => {
                      setContacts([
                        ...contacts,
                        {
                          name: "",
                          phone: "",
                          email: "",
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

export default withApollo(EditCenter, { requiresAccess: true });

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

const CenterStateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > p {
    margin-right: 10px;
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
  width: max-content;
  margin-bottom: 20px;
`;

const Bin = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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

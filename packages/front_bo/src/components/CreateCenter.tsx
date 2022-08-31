import {
  Button,
  colors,
  DropDown,
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
import {
  CenterActivityType,
  CenterContact,
  CenterNature,
  Languages,
  useCreateCenterMutation,
} from "../generated/graphql";
import AddContact from "./AddContact";

const CreateCenter: FC<{
  changeTitle: (title: string) => void;
  close: (action: boolean) => void;
  refetch: () => void;
  setError: (error: ApolloError) => void;
}> = ({ close, changeTitle, refetch, setError }) => {
  const t = useTranslate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [typeSelection, setTypeSelection] = useState<CenterActivityType[]>([]);
  const [natureSelection, setNatureSelection] = useState<
    CenterNature | undefined
  >(undefined);
  const [languagesSelection, setLanguagesSelection] = useState<Languages[]>([]);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setcity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contacts, setContacts] = useState<CenterContact[]>([
    {
      name: "",
      phone: "",
      email: "",
    },
  ]);

  const [createCenterMutation, { error }] = useCreateCenterMutation({
    variables: {
      name,
      address,
      city,
      type: typeSelection,
      nature: natureSelection as CenterNature,
      languages: languagesSelection,
      phone,
      email,
      contacts,
    },
  });

  const [validEmail, setValidEmail] = useState<boolean>(false);

  if (error) {
    setError(error);
  }

  if (step === 1) {
    changeTitle(t("pages.centers.modal-create.center.title"));
  }

  return (
    <Form>
      {step !== 3 && (
        <styles.P4>{t(`components.create-center.${step}.title`)}</styles.P4>
      )}
      {step === 1 && (
        <>
          <FillIn>
            <styles.BoldP4>
              {t(`components.create-center.1.subtitle.type`)}
            </styles.BoldP4>
            <DropDown
              options={Object.values(CenterActivityType).map((type) => ({
                key: type,
                label: t(`pages.centers.type.${type.toLowerCase()}`),
              }))}
              selected={typeSelection}
              setSelected={(selected) =>
                setTypeSelection(selected as CenterActivityType[])
              }
              width="390px"
            />
          </FillIn>

          <FillIn>
            <styles.BoldP4>
              {t(`components.create-center.1.subtitle.nature`)}
            </styles.BoldP4>
            <DropDownUnique
              options={Object.values(CenterNature).map((nature) => ({
                key: nature,
                label: t(`pages.centers.nature.${nature.toLowerCase()}`),
              }))}
              width="390px"
              selected={natureSelection}
              setSelected={(selected) =>
                setNatureSelection(selected as CenterNature)
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
                label: t(`pages.centers.languages.${language.toLowerCase()}`),
              }))}
              selected={languagesSelection}
              setSelected={
                setLanguagesSelection as (selected: string[]) => void
              }
              width="390px"
            />
          </FillIn>
          <NavDiv>
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
          </NavDiv>
        </>
      )}
      {step === 2 && (
        <>
          <FillIn>
            <styles.BoldP4>
              {t(`components.create-center.2.subtitle.name`)}
            </styles.BoldP4>
            <InputSuper
              placeholder={t(
                "components.create-center.2.subtitle.name-placeholder"
              )}
              input={name}
              setInput={setName}
            />
          </FillIn>
          <FillInSectioned>
            <FillIn width="252px">
              <styles.BoldP4>
                {t(`components.create-center.2.subtitle.address`)}
              </styles.BoldP4>
              <InputSuper
                placeholder={t(
                  "components.create-center.2.subtitle.address-placeholder"
                )}
                input={address}
                setInput={setAddress}
              />
            </FillIn>
            <FillIn width="129px">
              <styles.BoldP4>
                {t(`components.create-center.2.subtitle.city`)}
              </styles.BoldP4>
              <InputSuper
                placeholder={t("components.create-center.2.subtitle.city")}
                input={city}
                setInput={setcity}
              />
            </FillIn>
          </FillInSectioned>
          <FillInSectioned>
            <FillIn width="130px">
              <styles.BoldP4>
                {t(`components.create-center.2.subtitle.phone`)}
              </styles.BoldP4>
              <InputSuper
                telPattern
                placeholder={t(
                  "components.create-center.2.subtitle.phone-placeholder"
                )}
                input={phone}
                setInput={setPhone}
              />
            </FillIn>
            <FillIn width="258px">
              <styles.BoldP4>
                {t(`components.create-center.2.subtitle.email`)}
              </styles.BoldP4>
              <InputSuper
                setValid={setValidEmail}
                type="email"
                placeholder={t(
                  "components.create-center.2.subtitle.email-placeholder"
                )}
                input={email}
                setInput={setEmail}
              />
            </FillIn>
          </FillInSectioned>
          <NavDiv>
            <Button
              secondary
              onClick={() => setStep(1)}
              text={t("general.actions.back")}
            />
            <Button
              main
              onClick={() => {
                if (validEmail) {
                  setValidEmail(false);
                  setStep(3);
                } else {
                  alert("Email declined");
                }
              }}
              text={t("general.actions.next")}
            />
          </NavDiv>
        </>
      )}
      {step === 3 && (
        <>
          <ContactsDiv>
            <TitleStep3>
              {t(`components.create-center.${step}.title`)}
            </TitleStep3>
            {contacts.map((contact, index) => {
              return (
                <AddContact
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
                setContacts([...contacts, { name: "", phone: "", email: "" }]);
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
                onClick={() => setStep(2)}
                text={t("general.actions.back")}
              />
              <Button
                create
                onClick={() => {
                  if (name !== "" && address !== "" && city !== "") {
                    createCenterMutation().then(() => {
                      changeTitle("");
                      refetch();
                      setStep(4);
                    });
                  } else {
                    alert("Please fill all the fields");
                  }
                }}
                text={t("components.create-center.3.create")}
              />
            </NavDivStep3>
          )}
          {contacts.length === 1 && (
            <NavDiv>
              <Button
                secondary
                onClick={() => setStep(2)}
                text={t("general.actions.back")}
              />
              <Button
                create
                onClick={() => {
                  if (name !== "" && address !== "" && city !== "") {
                    createCenterMutation().then(() => {
                      changeTitle("");
                      refetch();
                      setStep(4);
                    });
                  } else {
                    alert("Please fill all the fields");
                  }
                }}
                text={t("components.create-center.3.create")}
              />
            </NavDiv>
          )}
        </>
      )}
      {step === 4 && (
        <FillIn>
          <EndButton
            main
            onClick={() => {
              changeTitle(t("pages.centers.modal-create.center.title"));
              close(false);
            }}
            text={t("general.actions.consent")}
          />
        </FillIn>
      )}
    </Form>
  );
};

export default CreateCenter;

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

const ContactsDiv = styled.div`
  margin: 0;
  width: 100%;
  max-height: 499px;
  margin-top: -30px;
  overflow-y: scroll;
  padding-bottom: 20px;
`;

const TitleStep3 = styled(styles.P4)`
  margin: 30px 0;
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

const EndButton = styled(Button)`
  align-self: flex-start;
`;

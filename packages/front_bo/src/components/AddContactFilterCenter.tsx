import { FillIn, InputSuper, styles, useTranslate } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import { CenterContact, CenterContactInput } from "../generated/graphql";

const AddContactFilterCenter: FC<{
  contact: CenterContact;
  index: number;
  setContacts: (contacts: CenterContactInput[]) => void;
  contacts: CenterContactInput[];
}> = ({ contact, index, setContacts, contacts }) => {
  const t = useTranslate();
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>(contact.phone);

  return (
    <Container>
      <FillIn>
        <styles.P4>{t("pages.edit-center.contact-name")}</styles.P4>
        <InputSuper
          input={contact.name}
          setInput={(value) => {
            setContacts(
              contacts.map((c, i) => {
                if (i === index) {
                  return { ...c, name: value };
                }
                return c;
              })
            );
          }}
          namePattern
          placeholder={t("pages.edit-center.contact-name")}
          width="267px"
        />
      </FillIn>
      <FillIn>
        <styles.P4>{t("pages.edit-center.contact-phone")}</styles.P4>
        <InputSuper
          input={phone}
          onBlur={() => {
            if (phone.length > 0 && phone.length !== 9 && phone.length !== 12) {
              setPhoneError(true);
            } else {
              setContacts(
                contacts.map((c, i) => {
                  if (i === index) {
                    return { ...c, phone: phone };
                  }
                  return c;
                })
              );
            }
          }}
          setInput={setPhone}
          telPattern
          placeholder={t("pages.edit-center.contact-phone")}
          width="122px"
          error={phoneError}
          setError={setPhoneError}
        />
        {phoneError && (
          <styles.P0Error>{t("general.decline-phone")}</styles.P0Error>
        )}
      </FillIn>
      <FillIn>
        <styles.P4>{t("pages.edit-center.contact-email")}</styles.P4>
        <InputSuper
          error={emailError}
          setError={setEmailError}
          onBlur={() => {
            if (contact.email && !contact.email.includes("@")) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
          }}
          input={contact.email}
          setInput={(value) => {
            setContacts(
              contacts.map((c, i) => {
                if (i === index) {
                  return { ...c, email: value };
                }
                return c;
              })
            );
          }}
          type="email"
          placeholder={t("pages.edit-center.contact-email")}
          width="212px"
        />
        {emailError && (
          <styles.P0Error>{t("general.decline-email")}</styles.P0Error>
        )}
      </FillIn>
    </Container>
  );
};

export default AddContactFilterCenter;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  & > * {
    margin-right: 10px;
  }
  width: max-content;
`;

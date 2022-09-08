import { FillIn, InputSuper, styles, useTranslate } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC } from "react";
import { CenterContact, CenterContactInput } from "../generated/graphql";

const AddContactFilterCenter: FC<{
  contact: CenterContact;
  index: number;
  setContacts: (contacts: CenterContactInput[]) => void;
  contacts: CenterContactInput[];
}> = ({ contact, index, setContacts, contacts }) => {
  const t = useTranslate();

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
          input={contact.phone}
          setInput={(value) => {
            setContacts(
              contacts.map((c, i) => {
                if (i === index) {
                  return { ...c, phone: value };
                }
                return c;
              })
            );
          }}
          telPattern
          placeholder={t("pages.edit-center.contact-phone")}
          width="122px"
        />
      </FillIn>
      <FillIn>
        <styles.P4>{t("pages.edit-center.contact-email")}</styles.P4>
        <InputSuper
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

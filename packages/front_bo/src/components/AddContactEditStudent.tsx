import {
  CheckBox,
  FillIn,
  Icon,
  InputSuper,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import { StudentContact } from "../generated/graphql";

const AddContactEditStudent: FC<{
  contact: StudentContact;
  contacts: StudentContact[];
  setContacts: (contacts: StudentContact[]) => void;
  index: number;
  setErrorContacts: (value: boolean) => void;
}> = ({ contact, contacts, setContacts, index }) => {
  const t = useTranslate();
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);

  return (
    <>
      <BodyContent>
        <FillIn>
          <styles.P4>{t("pages.edit-student.name")}</styles.P4>
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
            placeholder={t("pages.edit-student.name")}
            width="29.531vw"
          />
        </FillIn>
        <FillIn>
          <styles.P4>{t("pages.edit-student.contact-email")}</styles.P4>
          <InputSuper
            input={contact.email}
            setInput={(value) => {
              if (value.length > 0 && !value.includes("@")) {
                setEmailError(true);
              } else {
                setEmailError(false);
              }
              setContacts(
                contacts.map((c, i) => {
                  if (i === index) {
                    return { ...c, email: value };
                  }
                  return c;
                })
              );
            }}
            placeholder={t("pages.edit-student.contact-email")}
            width="29.531vw"
            error={emailError}
            setError={setEmailError}
          />
          {emailError && (
            <styles.P0Error>{t("general.decline-email")}</styles.P0Error>
          )}
        </FillIn>
        <FillIn>
          <styles.P4>{t("pages.edit-student.contact-phone")}</styles.P4>
          <InputSuper
            input={contact.phone}
            setInput={(value) => {
              if (
                value.length > 0 &&
                value.length !== 9 &&
                value.length !== 12
              ) {
                setPhoneError(true);
              } else {
                setPhoneError(false);
              }
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
            placeholder={t("pages.edit-student.contact-phone")}
            width="9.141vw"
            error={phoneError}
            setError={setPhoneError}
          />
        </FillIn>
      </BodyContent>
      <BodyContent>
        <FillIn>
          <CheckDiv>
            <CheckBox
              option={contact.send_info}
              setOption={(value) => {
                setContacts(
                  contacts.map((c, i) => {
                    if (i === index) {
                      return { ...c, send_info: value };
                    }
                    return c;
                  })
                );
              }}
            />
            <styles.P4>{t("pages.edit-student.info-send")}</styles.P4>
          </CheckDiv>
        </FillIn>
        <FillIn>
          <Bin
            onClick={() => {
              setContacts(contacts.filter((c, i) => i !== index));
            }}
          >
            <Icon name="eliminate" />
          </Bin>
        </FillIn>
      </BodyContent>
    </>
  );
};

export default AddContactEditStudent;

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

const CheckDiv = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  & > * {
    margin-right: 10px;
  }
`;

const Bin = styled.div`
  display: flex;
  cursor: pointer;
`;

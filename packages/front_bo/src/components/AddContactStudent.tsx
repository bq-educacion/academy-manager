import {
  CheckBox,
  colors,
  FillIn,
  FillInSectioned,
  Icon,
  InputSuper,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC } from "react";
import { StudentContactInput } from "../generated/graphql";

const AddContactStudent: FC<{
  setContact: (contacts: StudentContactInput) => void;
  setContacts: (contacts: StudentContactInput[]) => void;
  contact: StudentContactInput;
  contacts: StudentContactInput[];
}> = ({ setContact, setContacts, contacts, contact }) => {
  const t = useTranslate();

  return (
    <ContactDiv quantity={contacts.length}>
      <FillIn>
        <Header>
          <styles.BoldP4>
            {t(`components.create-student.2.subtitle.name`)}
          </styles.BoldP4>
          {contacts.length > 1 && (
            <Eliminate
              onClick={() => {
                setContacts(contacts.filter((c) => c !== contact));
              }}
            >
              <Icon name="eliminate" />
            </Eliminate>
          )}
        </Header>
        <InputSuper
          placeholder={t(
            "components.create-student.2.subtitle.name-placeholder"
          )}
          input={contact.name}
          setInput={(name) => setContact({ ...contact, name })}
        />
      </FillIn>
      <FillInSectioned>
        <FillIn width="260px">
          <styles.BoldP4>
            {t(`components.create-student.2.subtitle.email`)}
          </styles.BoldP4>
          <InputSuper
            placeholder={t(
              "components.create-student.2.subtitle.email-placeholder"
            )}
            input={contact.email}
            setInput={(email) => setContact({ ...contact, email })}
          />
        </FillIn>
        <FillIn width="115px">
          <styles.BoldP4>
            {t(`components.create-student.2.subtitle.phone`)}
          </styles.BoldP4>
          <InputSuper
            telPattern
            placeholder={t("components.create-student.2.subtitle.phone")}
            input={contact.phone}
            setInput={(phone) => setContact({ ...contact, phone })}
          />
        </FillIn>
      </FillInSectioned>
      <CheckOption>
        <CheckBox
          option={contact.send_info}
          setOption={(send_info) =>
            setContact({ ...contact, send_info: send_info })
          }
        />
        <styles.P4>{t(`components.create-student.2.subtitle.send`)}</styles.P4>
      </CheckOption>
    </ContactDiv>
  );
};

export default AddContactStudent;

const ContactDiv = styled.div<{ quantity: number }>`
  margin: 0;
  ${({ quantity }) =>
    quantity > 1 &&
    `
    border-bottom: 1px solid ${colors.colors.grayBlue};
    margin-bottom: 20px;
    `};
`;

const Header = styled.div`
  margin: 0 0 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Eliminate = styled.div`
  margin: 0;
  cursor: pointer;
`;

const CheckOption = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
  & > p {
    margin-left: 10px;
  }
`;

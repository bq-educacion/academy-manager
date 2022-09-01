import {
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
import { CenterContact } from "../generated/graphql";

const AddContact: FC<{
  setContact: (contacts: CenterContact) => void;
  setContacts: (contacts: CenterContact[]) => void;
  contact: CenterContact;
  contacts: CenterContact[];
}> = ({ setContact, setContacts, contacts, contact }) => {
  const t = useTranslate();

  return (
    <ContactDiv quantity={contacts.length}>
      <FillIn>
        <Header>
          <styles.BoldP4>
            {t(`components.create-center.3.subtitle.name`)}
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
            "components.create-center.3.subtitle.name-placeholder"
          )}
          input={contact.name}
          setInput={(name) => setContact({ ...contact, name })}
        />
      </FillIn>
      <FillInSectioned>
        <FillIn width="122px">
          <styles.BoldP4>
            {t(`components.create-center.3.subtitle.phone`)}
          </styles.BoldP4>
          <InputSuper
            telPattern
            placeholder={t("components.create-center.3.subtitle.phone")}
            input={contact.phone}
            setInput={(phone) => setContact({ ...contact, phone })}
          />
        </FillIn>
        <FillIn width="258px">
          <styles.BoldP4>
            {t(`components.create-center.2.subtitle.email`)}
          </styles.BoldP4>
          <InputSuper
            placeholder={t(
              "components.create-center.2.subtitle.email-placeholder"
            )}
            input={contact.email}
            setInput={(email) => setContact({ ...contact, email })}
          />
        </FillIn>
      </FillInSectioned>
    </ContactDiv>
  );
};

export default AddContact;

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

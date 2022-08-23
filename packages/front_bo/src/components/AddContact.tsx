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
import { FC, useEffect, useState } from "react";
import { CenterContact } from "../generated/graphql";

const AddContact: FC<{
  setContact: (contacts: CenterContact) => void;
  numberOfContacts: number;
  setNumberOfContacts: (numberOfContacts: number) => void;
  finish: boolean;
}> = ({ setContact, numberOfContacts, finish, setNumberOfContacts }) => {
  const t = useTranslate();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (finish) {
      setContact({
        name,
        phone,
        email,
      });
    }
  }, [finish]);

  return (
    <ContactDiv quantity={numberOfContacts}>
      <FillIn>
        <Header>
          <styles.BoldP4>
            {t(`components.create-center.3.subtitle.name`)}
          </styles.BoldP4>
          {numberOfContacts > 1 && (
            <Eliminate
              onClick={() => setNumberOfContacts(numberOfContacts - 1)}
            >
              <Icon name="eliminate" />
            </Eliminate>
          )}
        </Header>
        <InputSuper
          placeholder={t(
            "components.create-center.3.subtitle.name-placeholder"
          )}
          input={name}
          setInput={setName}
        />
      </FillIn>
      <FillInSectioned>
        <FillIn width="122px">
          <styles.BoldP4>
            {t(`components.create-center.3.subtitle.phone`)}
          </styles.BoldP4>
          <InputSuper
            placeholder={t("components.create-center.3.subtitle.phone")}
            input={phone}
            setInput={setPhone}
          />
        </FillIn>
        <FillIn width="258px">
          <styles.BoldP4>
            {t(`components.create-center.2.subtitle.email`)}
          </styles.BoldP4>
          <InputSuper
            type="email"
            placeholder={t(
              "components.create-center.2.subtitle.email-placeholder"
            )}
            input={email}
            setInput={setEmail}
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

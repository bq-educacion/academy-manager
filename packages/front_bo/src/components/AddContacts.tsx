import { colors, InputSuper, styles, useTranslate } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import { CenterContact } from "../generated/graphql";
import { FillIn, FillInSectioned } from "./CreateCenter";

const AddContacts: FC<{
  setContacts: (contacts: CenterContact[]) => void;
  numberOfContacts: number;
  contacts: CenterContact[];
}> = ({ numberOfContacts }) => {
  const t = useTranslate();
  const [newContacts, setNewContacts] = useState<CenterContact[]>(
    Array(numberOfContacts).fill({
      name: "",
      phone: "",
      email: "",
    })
  );

  return (
    <>
      {Array(numberOfContacts)
        .fill(0)
        .map((elem) => {
          return (
            <ContactDiv quantity={numberOfContacts}>
              <FillIn>
                <styles.BoldP4>
                  {t(`components.create-center.3.subtitle.name`)}
                </styles.BoldP4>
                <InputSuper
                  placeholder={t(
                    "components.create-center.3.subtitle.name-placeholder"
                  )}
                  input={newContacts[elem].name}
                  setInput={(input) => {
                    setNewContacts([
                      ...newContacts.slice(0, elem),
                      { ...newContacts[elem], name: input },
                      ...newContacts.slice(elem + 1),
                    ]);
                  }}
                />
              </FillIn>
              <FillInSectioned>
                <FillIn width="122px">
                  <styles.BoldP4>
                    {t(`components.create-center.3.subtitle.phone`)}
                  </styles.BoldP4>
                  <InputSuper
                    placeholder={t("components.create-center.3.subtitle.phone")}
                    input={newContacts[elem].phone}
                    setInput={(input) => {
                      setNewContacts([
                        ...newContacts.slice(0, elem),
                        { ...newContacts[elem], phone: input },
                        ...newContacts.slice(elem + 1),
                      ]);
                    }}
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
                    input={newContacts[elem].email}
                    setInput={(input) => {
                      setNewContacts([
                        ...newContacts.slice(0, elem),
                        { ...newContacts[elem], email: input },
                        ...newContacts.slice(elem + 1),
                      ]);
                    }}
                  />
                </FillIn>
              </FillInSectioned>
            </ContactDiv>
          );
        })}
    </>
  );
};

export default AddContacts;

const ContactDiv = styled.div<{ quantity: number }>`
  margin: 0;
  ${({ quantity }) =>
    quantity > 1 &&
    `
    border-bottom: 1px solid ${colors.colors.grayBlue};
    margin-bottom: 20px;
    `};
`;

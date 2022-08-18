import {
  colors,
  DropDown,
  DropDownUnique,
  InputSuper,
  MButton,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import { centerLanguages } from "../config";
import {
  CenterContact,
  CenterModality,
  CenterNature,
  CenterType,
} from "../generated/graphql";
import AddContacts from "./AddContacts";

const CreateCenter: FC<{ close: (action: boolean) => void }> = ({ close }) => {
  const t = useTranslate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [typeSelection, setTypeSelection] = useState<CenterType | undefined>(
    undefined
  );
  const [modalitySelection, setModalitySelection] = useState<
    CenterModality | undefined
  >(undefined);
  const [natureSelection, setNatureSelection] = useState<
    CenterNature | undefined
  >(undefined);
  const [languagesSelection, setLanguagesSelection] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [population, setPopulation] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [numberOfContacts, setNumberOfContacts] = useState<number>(1);
  const [contacts, setContacts] = useState<CenterContact[]>([]);

  return (
    <Form>
      {step !== 3 && (
        <styles.P4>{t(`components.create-center.${step}.title`)}</styles.P4>
      )}
      {step === 1 && (
        <>
          <FillInSectioned>
            <FillIn>
              <styles.BoldP4>
                {t(`components.create-center.1.subtitle.type`)}
              </styles.BoldP4>
              <DropDownUnique
                titles={[
                  CenterType.Academy,
                  CenterType.NoAcademy,
                  CenterType.Campus,
                ]}
                width="190px"
                selected={typeSelection}
                setSelected={(selected) =>
                  setTypeSelection(selected as CenterType)
                }
              />
            </FillIn>
            <FillIn>
              <styles.BoldP4>
                {t(`components.create-center.1.subtitle.modality`)}
              </styles.BoldP4>
              <DropDownUnique
                titles={[
                  CenterModality.Online,
                  CenterModality.Presential,
                  CenterModality.SemiPresential,
                ]}
                width="190px"
                selected={modalitySelection}
                setSelected={(selected) =>
                  setModalitySelection(selected as CenterModality)
                }
              />
            </FillIn>
          </FillInSectioned>
          <FillIn>
            <styles.BoldP4>
              {t(`components.create-center.1.subtitle.nature`)}
            </styles.BoldP4>
            <DropDownUnique
              titles={[
                CenterNature.Concerted,
                CenterNature.Private,
                CenterNature.Public,
              ]}
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
              titles={centerLanguages}
              selected={languagesSelection}
              setSelected={setLanguagesSelection}
              width="390px"
            />
          </FillIn>
          <NavDiv>
            <MButton
              Click={() => close(false)}
              text={t("general.actions.cancel")}
              color={colors.colors.blackBackground}
              backColor={colors.colors.gray60}
            />
            <MButton
              Click={() => setStep(2)}
              text={t("general.actions.next")}
              color={colors.colors.white}
              backColor={colors.colors.blackBackground}
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
                {t(`components.create-center.2.subtitle.population`)}
              </styles.BoldP4>
              <InputSuper
                placeholder={t(
                  "components.create-center.2.subtitle.population"
                )}
                input={population}
                setInput={setPopulation}
              />
            </FillIn>
          </FillInSectioned>
          <FillInSectioned>
            <FillIn width="130px">
              <styles.BoldP4>
                {t(`components.create-center.2.subtitle.phone`)}
              </styles.BoldP4>
              <InputSuper
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
                placeholder={t(
                  "components.create-center.2.subtitle.email-placeholder"
                )}
                input={email}
                setInput={setEmail}
              />
            </FillIn>
          </FillInSectioned>
          <NavDiv>
            <MButton
              Click={() => setStep(1)}
              text={t("general.actions.back")}
              color={colors.colors.blackBackground}
              backColor={colors.colors.gray60}
            />
            <MButton
              Click={() => setStep(3)}
              text={t("general.actions.next")}
              color={colors.colors.white}
              backColor={colors.colors.blackBackground}
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
            <AddContacts
              numberOfContacts={numberOfContacts}
              contacts={contacts}
              setContacts={setContacts}
            />
            <button
              onClick={() => {
                setNumberOfContacts(numberOfContacts + 1);
              }}
            ></button>
          </ContactsDiv>
          <NavDivStep3>
            <MButton
              Click={() => setStep(2)}
              text={t("general.actions.back")}
              color={colors.colors.blackBackground}
              backColor={colors.colors.gray60}
            />
            <MButton
              Click={() => setStep(4)}
              text={t("components.create-center.3.create")}
              color={colors.colors.white}
              backColor={colors.colors.green80}
            />
          </NavDivStep3>
        </>
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

export const FillInSectioned = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  & > :not(div:first-child) {
    margin-left: 10px;
  }
`;
export const FillIn = styled.div<{ width?: string }>`
  display: flex;
  ${({ width }) => (width ? `width: ${width}` : "width: 100%")};
  flex-direction: column;
  margin-bottom: 20px;
  & > p {
    margin-bottom: 5px;
  }
  & > div {
    align-items: flex-start;
  }
`;

const NavDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ContactsDiv = styled.div`
  margin: 0;
  width: 100%;
  max-height: 499px;
  margin-top: -30px;
  overflow-y: scroll;
  margin-bottom: 40px;
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
  margin: -30px -45px;
  background-color: ${colors.colors.white};
`;

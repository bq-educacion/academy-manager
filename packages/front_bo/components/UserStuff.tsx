import styled from "@emotion/styled";
import { FC } from "react";
import SecondActionButton from "@academy-manager/ui/src/components/SecondActionButton";
import UserButton from "@academy-manager/ui/src/components/UserButton";
import OptionsButton from "@academy-manager/ui/src/components/OptionsButton";
import { colors, Popover } from "@academy-manager/ui";
import { P4 } from "@academy-manager/ui/src/theme/styles";

export const UserStuff: FC<{ token: string }> = ({ token }) => {
  return (
    <UserStuffLayout>
      <SecondActionButton />
      <UserButton />
      <Popover title={<OptionsButton />} content={<PopoverContent><P4>Cerrar sesión</P4></PopoverContent>}></Popover>
    </UserStuffLayout>
  );
};

const UserStuffLayout = styled.div`
    display: flex;
    flex-direction: row;
    &:last-child {
        margin-right: 40px;
    }
`;

const PopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 125px;
  height: 51px;
  border-radius: 3px;
  margin-right: 100px;
  border: solid 1px ${colors.colors.gray4};
  background-color: ${colors.colors.white};
  color: ${colors.colors.black};
  box-shadow: 0 10px 20px 0 ${colors.colors.shadow2};
  &:hover {
    cursor: pointer;
  }
`;

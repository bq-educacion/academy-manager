import styled from "@emotion/styled";
import { FC } from "react";
import {
  SecondActionButton,
  UserButton,
  OptionsButton,
  styles,
  Popover,
  colors,
} from "@academy-manager/ui";
import { useCookies } from "react-cookie";

export const UserStuff: FC<{ token: string }> = () => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const [cookie, removeCookie] = useCookies(["token"]);
    if (cookie.token) {
      removeCookie("token", { path: "/" });
    }
    true && (window.location.href = "/login");
  };

  return (
    <UserStuffLayout>
      <SecondActionButton />
      <UserButton />
      <Popover
        title={<OptionsButton />}
        content={
          <PopoverContent onClick={onClick}>
            <styles.P4>Cerrar sesión</styles.P4>
          </PopoverContent>
        }
      />
    </UserStuffLayout>
  );
};

export default UserStuff;

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
  position: fixed;
  right: 50px;
  border: solid 1px ${colors.colors.gray4};
  background-color: ${colors.colors.white};
  color: ${colors.colors.black};
  box-shadow: 0 10px 20px 0 ${colors.colors.shadow2};
  &:hover {
    cursor: pointer;
  }
`;

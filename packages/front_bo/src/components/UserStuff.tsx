import styled from "@emotion/styled";
import { FC } from "react";
import {
  SecondActionButton,
  UserButton,
  OptionsButton,
} from "@academy-manager/ui";

const UserStuff: FC<{ token: string }> = ({ token }) => {
  return (
    <UserStuffLayout>
      <SecondActionButton />
      <UserButton />
      <OptionsButton />
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

import styled from "@emotion/styled";
import { FC } from "react";
import  SecondActionButton  from "@academy-manager/ui/src/components/SecondActionButton";
import  UserButton  from "@academy-manager/ui/src/components/UserButton";
import  OptionsButton  from "@academy-manager/ui/src/components/OptionsButton";

export const UserStuff: FC<{ token: string }> = ({ token }) => {
  return (
    <UserStuffLayout>
      <SecondActionButton/>
      <UserButton/>
      <OptionsButton/>
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

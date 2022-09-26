import styled from "@emotion/styled";
import { FC } from "react";
import {
  colors,
  OptionsButton,
  Popover,
  SecondActionButton,
  styles,
  UserButton,
} from "@academy-manager/ui";
import { useApolloClient } from "@apollo/client";
import { useGetUserQuery } from "../generated/graphql";
import withApollo from "../apollo/withApollo";

export const UserStuff: FC = () => {
  const useClient = useApolloClient();
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    useClient.resetStore();
    document.cookie = `token="";path=/;`;
    true && (window.location.href = "/login");
  };

  const { data } = useGetUserQuery();

  return (
    <UserStuffLayout>
      <SecondActionButton />
      {data?.getUser && (
        <UserButton name={data?.getUser.name} picture={data?.getUser.picture} />
      )}
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
export default withApollo(UserStuff, { requiresAccess: true });

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

import { P3 } from "@academy-manager/ui/src/theme/styles";
import styled from "@emotion/styled";
import { FC } from "react";
import { MenuKebab } from "@academy-manager/ui/src/assets/icons";
import {colors} from "@academy-manager/ui";

export const UserStuff: FC<{ token: string }> = ({ token }) => {
  return (
    <UserStuffLayout>
      <Circle border={true}><P3User>?</P3User></Circle>
      <Circle border={false}><PUser>JL</PUser></Circle>
      <Kebabdiv><MenuKebab/></Kebabdiv>
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

const Circle = styled.div<{border:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 5px;
    background-color: ${(props) => (props.border ? "#ffff" : "")};
    background-image: ${(props) => (!props.border ? "linear-gradient(225deg, #6d2077, #ff1842)" : "")};
    border: ${(props) => (props.border ? "1px solid #6e7077" : "none")};
`

const P3User = styled(P3)`
    color: ${colors.grayBlue};
`

const PUser = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${colors.white};
`

const Kebabdiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: 5px;
`
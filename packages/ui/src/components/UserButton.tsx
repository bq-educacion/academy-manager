import styled from "@emotion/styled";
import { FC } from "react";
import { colors, fonts } from "../theme";
import { P3 } from "../theme/styles";


const UserButton:FC =()=>{
    return(
        <Circle border={false}><PUser>JL</PUser></Circle>
    )
}

const Circle = styled.div<{border:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 5px;
    background-color: ${(props) => (props.border ? `${colors.colors.white}` : "")};
    background-image: ${colors.gradient.pink80};
    border: ${(props) => (props.border ? `1px solid ${colors.colors.grayBlue2}` : "none")};
    &:hover {
        background-image: ${colors.gradient.yellow80};
    }
`

const PUser = styled.p`
  ${fonts.family.roboto};
  ${fonts.size.medium};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${colors.colors.white};
`

export default UserButton;
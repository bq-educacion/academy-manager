import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";
import { P3 } from "../theme/styles";


const SecondActionButton:FC =()=>{
    return(
        <Circle border={true}><P3User>?</P3User></Circle>
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
    background-color: ${(props) => (props.border ? "#ffff" : "")};
    background-image: ${(props) => (!props.border ? "linear-gradient(225deg, #6d2077, #ff1842)" : "")};
    border: ${(props) => (props.border ? "1px solid #6e7077" : "none")};
    &:hover {
        border: solid 1px ${colors.gray2};
    }
`

const P3User = styled(P3)`
    color: ${colors.grayBlue};
    &:hover {
        color: ${colors.gray2};
    }
`

export default SecondActionButton;
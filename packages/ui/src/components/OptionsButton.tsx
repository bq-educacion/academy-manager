import { FC } from "react";
import { MenuKebab } from "@academy-manager/ui/src/assets/icons";
import styled from "@emotion/styled";
import { colors } from "../theme";



const OptionsButton:FC =()=>{
    return(
        <Kebabdiv><MenuKebab/></Kebabdiv>
    )
}

const Kebabdiv = styled.div`
    color: ${colors.colors.grayBlue2};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: 5px;
`

export default OptionsButton;
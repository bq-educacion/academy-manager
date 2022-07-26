import { FC } from "react";
import { MenuKebab } from "@academy-manager/ui/src/assets/icons";
import styled from "@emotion/styled";



const OptionsButton:FC =()=>{
    return(
        <Kebabdiv><MenuKebab/></Kebabdiv>
    )
}

const Kebabdiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: 5px;
`

export default OptionsButton;
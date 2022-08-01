import { FC, useState } from "react";
import { MenuKebab } from "@academy-manager/ui/src/assets/icons";
import styled from "@emotion/styled";
import { colors } from "../theme";



const OptionsButton:FC<{disable?:boolean}>=({disable})=>{
    const disabled = disable ? true : false;
    const [clicked, setClicked] = useState(false);
    return(
        <Kebabdiv clicked={clicked} disable={disabled} onClick={()=>{setClicked(!clicked)}}><MenuKebab/></Kebabdiv>
    )
}

const Kebabdiv = styled.div<{disable:boolean, clicked:boolean}>`
    color: ${colors.colors.grayBlue2};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: 5px;
    &:hover {
        opacity: 0.8;
        cursor: pointer;
        ${(props)=> props.clicked ? `color: ${colors.colors.gray100}; opacity: 1`:``};
    }
    ${(props) => (props.disable && `
        color: ${colors.colors.gray3};
        &:hover {
            color: ${colors.colors.gray3};
        }
    `)}
`

export default OptionsButton;
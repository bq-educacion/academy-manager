import { Lens } from "@academy-manager/ui/src/assets/icons";
import { P1, P2, RainbowDivider } from "@academy-manager/ui/src/theme/styles";
import styled from "@emotion/styled";
import { FC } from "react";
import { UserStuff } from "./UserStuff";
import {colors} from "@academy-manager/ui";


export const ContentStart : FC<{section: string, label: string}> = ({section, label}) => {
    return (
        <ContentLayout>
            <ContentHeader>
                <P1>{section}</P1>
                <UserStuff token="token"/>
            </ContentHeader>
            <RainbowDivider/>
            <ContentSubHeader>
                <P2>{label}</P2>
                <InputMail placeholder="    Buscar por email"></InputMail><LensSearch/>
            </ContentSubHeader>
            <ContentBody>

            </ContentBody>
        </ContentLayout>
    );
}

const ContentLayout = styled.div`
    background-color: ${colors.colors.grayBlueTransparent};
    width: calc(100% - 250px);
    height: 100vh;
    padding-left: 250px;
    display: flex;
    flex-direction: column;
`

const ContentHeader = styled.div`
    background-color: ${colors.colors.white};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    min-height: 80px;

    & > p {
        margin-left: 40px;
    }
`

const ContentSubHeader = styled.div`
    background-color: ${colors.colors.white};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 64px;;
    height: 64px;

    & > p {
        margin-left: 41px;
    }
`
const InputMail = styled.input`
    width: 22.7%;
    height: 40px;
    border-radius: 5px;
    border: solid 1px ${colors.colors.gray};
    margin-right: 40px;
    &::placeholder {
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: italic;
        line-height: 1.07;
        letter-spacing: normal;
        color: ${colors.colors.gray2};
        padding-left: 20px;
    }
`

const LensSearch = styled(Lens)`
    color: ${colors.colors.grayBlue2};
    position: absolute;
    right: 61px;
    z-index: 1;
`

const ContentBody = styled.div`
    background-color: ${colors.colors.white};
    width: calc(100% - 41px - 39px);
    height: calc(100% - 24px - 30px);
    margin: 24px 41px 30px 39px;
`
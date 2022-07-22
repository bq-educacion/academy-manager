import { P1 } from "@academy-manager/ui/src/theme/styles";
import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { UserStuff } from "./UserStuff";


export const ContentStart : FC<{section: string, label: string}> = ({section, label}) => {
    return (
        <ContentLayout>
            <ContentHeader>
                <P1>{section}</P1>
                <UserStuff token="token"/>
            </ContentHeader>
            <RainbowDivider/>
            <P1>{label}</P1>
        </ContentLayout>
    );
}

const ContentLayout = styled.div`
    width: calc(100% - 250px);
    height: 100vh;
    padding-left: 250px;
    display: flex;
    flex-direction: column;
`

const ContentHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;

    & > p {
        margin-left: 40px;
    }
`

const RainbowDivider = styled.div`
    background-image: linear-gradient(to right, #44b8af, #f6a001 33%, #e4002b 67%, #6d2077);
    width: 100%;
    height: 1px;
`

import { colors } from "@academy-manager/ui";
import { P2, P4, PG } from "@academy-manager/ui/src/theme/styles";
import styled from "@emotion/styled";
import { FC } from "react";
import { MButton } from "@academy-manager/ui/src/components/MainButton";
import { useRouter } from "next/router";

export const ErrorContent: FC<{ error: number }> = ({ error }) => {
    const router = useRouter();
  return (
    <ErrorContainer>
      <div>
        <PG>{error}</PG>
        <P2>
            {error === 404 && "Página equivocada"}
            {error === 403 && "Acceso privado"}
            {error === 500 && "Error desconocido"}
        </P2>
        <P4Error>
            {error === 404 && "¡Vaya! La página web a la que intentas acceder no existe."}
            {error === 403 && "Lo sentimos, no tienes permisos para poder continuar por este camino."}
            {error === 500 && "¡Uy! Parece que ha ocurrido un error, vuelve a cargar la página."}
        </P4Error>
        <MButton width="133px" text="Volver a inicio" Click={()=>{router.push("/")}}></MButton>
      </div>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.colors.grayBlueTransparent};
    width: calc(100% - 250px);
    height: 100vh;
    padding-left: 250px;
    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: calc(100% - 60px);
        height: calc(100% - 80px);
        background-color: ${colors.colors.white};

        p:first-of-type {
            margin-bottom: 20px;
        }
        p:nth-of-type(2) {
            margin-bottom: 10px;
        }
        p:nth-of-type(3) {
            margin-bottom: 20px;
        }
    }
`;

const P4Error = styled(P4)`
    font-weight: normal;
`
import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum Languages{
    English
    Spanish
  }
  
  enum Region{
    Andalucia
    Aragon
    Asturias
    Baleares
    Canarias
    Cantabria
    CastillaLaMancha
    CastillaYLeon
    Cataluna
    Ceuta
    ComunidadValenciana
    Extremadura
    Galicia
    LaRioja
    Madrid
    Melilla
    Murcia
    Navarra
    PaisVasco
  }
`;

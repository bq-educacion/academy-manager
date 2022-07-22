import type { NextPage } from "next";
import { LateralMenu } from "../../components/LateralMenu";

const HomePage: NextPage = () => {
  return (
    <div>
      <LateralMenu sections={
        [
          {title:"Contabilidad", links:[]},
          {title:"Traducción", links:[{label:"Inicio", href:""},{label:"Permisos", href:""},{label:"Idiomas", href:""},{label:"Proyectos", href:""}]},
          {title:"Otra sección", links:[]}]}/>
    </div>
  );
};

export default HomePage;

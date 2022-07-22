import { P4 } from "@academy-manager/ui/src/theme/styles";
import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useState } from "react";
import { ContentStart } from "../../components/ContentStart";
import { LateralMenu } from "../../components/LateralMenu";

const HomePage: NextPage = () => {

  const [section, setSection] = useState<string>("");
  const [label, setLabel] = useState<string>("");

  const sections = 
  [
    {title:"Contabilidad", links:[]},
    {title:"Traducción", links:[{label:"Inicio", href:"/1"},{label:"Permisos", href:""},{label:"Idiomas", href:""},{label:"Proyectos", href:""}]},
    {title:"Otra sección", links:[]}
  ]

  return (
    <div>
      <LateralMenu sections={sections} changeLabel={setLabel} changeSection={setSection}/>
      <ContentStart section={section} label={label}/>
    </div>
  );
};

export default HomePage;

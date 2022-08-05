import { NextPage } from "next";
import { useState } from "react";
import { ErrorContent, LateralMenu } from "../components";
import { sections } from "../config";

const InternalServerErrorPage: NextPage = () => {
  const [, setSection] = useState<string>(sections[0].title);
  const [, setLabel] = useState<string>(sections[0].links[0].label);

  return (
    <div>
      <LateralMenu
        sections={sections}
        changeLabel={setLabel}
        changeSection={setSection}
      />
      <ErrorContent error={404} />
    </div>
  );
};

export default InternalServerErrorPage;

import { NextPage } from "next";
import { LateralMenu } from "../components/LateralMenu";
import { useState } from "react";
import { sections } from "../config";
import { ErrorContent } from "../components/ErrorContent";

const NotFoundPage: NextPage = () => {
  const [section, setSection] = useState<string>(sections[0].title);
  const [label, setLabel] = useState<string>(sections[0].links[0].label);

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

export default NotFoundPage;

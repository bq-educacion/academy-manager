import { useTranslate } from "@academy-manager/ui";
import { FC } from "react";

const CreateStudent: FC<{
  changeTitle: (title: string) => void;
  close: (action: boolean) => void;
  refetch: () => void;
}> = (/*{ close, changeTitle, refetch }*/) => {
  const t = useTranslate();
  //   const [step, setStep] = useState<1 | 2 | 3>(1);

  //Hooks to save stuff

  //Mutations

  return (
    <div>
      <h1>{t("CreateStudent")}</h1>
    </div>
  );
};

export default CreateStudent;

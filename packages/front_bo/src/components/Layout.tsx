import { FC, ReactNode } from "react";
import { ContentStart, ErrorContent, LateralMenu } from ".";
import { sections } from "../config";

const Layout: FC<{
  children: ReactNode;
  childrenHeader: ReactNode;
  section: string;
  error?: number;
}> = ({ children, section, error, childrenHeader }) => {
  return (
    <div>
      <LateralMenu sections={sections} />
      {!error && (
        <ContentStart childrenHeader={childrenHeader} section={section} children={children} />
      )}
      {error && <ErrorContent error={error} />}
    </div>
  );
};

export default Layout;

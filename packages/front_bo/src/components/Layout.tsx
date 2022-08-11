import { FC, ReactNode } from "react";
import { ContentStart, ErrorContent, LateralMenu } from ".";
import { sections } from "../config";

const Layout: FC<{
  children?: ReactNode;
  childrenHeader?: ReactNode;
  section: string;
  label: string;
  error?: number;
}> = ({ children, section, error, childrenHeader, label }) => {
  return (
    <div>
      <LateralMenu sections={sections} section={section} label={label} />
      {!error && (
        <ContentStart childrenHeader={childrenHeader} section={section}>
          {children}
        </ContentStart>
      )}
      {error && <ErrorContent error={error} />}
    </div>
  );
};

export default Layout;

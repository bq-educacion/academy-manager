import { FC, ReactNode } from "react";
import { ContentStart, ErrorContent, LateralMenu } from ".";
import { sections } from "../config";

const Layout: FC<{
  children?: ReactNode;
  section: string;
  label: string;
  error?: number;
}> = ({ children, section, label, error }) => {
  return (
    <div>
      <LateralMenu sections={sections} section={section} label={label} />
      {!error && (
        <ContentStart section={section} label={label}>
          {children}
        </ContentStart>
      )}
      {error && <ErrorContent error={error} />}
    </div>
  );
};

export default Layout;
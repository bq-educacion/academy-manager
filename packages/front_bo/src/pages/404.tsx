import { Image404 } from "@academy-manager/ui";
import { NextPage } from "next";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <h1>404</h1>
      <img src={Image404.src} />
    </div>
  );
};

export default NotFoundPage;

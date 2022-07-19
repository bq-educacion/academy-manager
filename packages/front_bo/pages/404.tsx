import { NextPage } from "next";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <h1>404</h1>
      <img className="errorImage" src="/404.gif"/>
    </div>
  );
};

export default NotFoundPage;

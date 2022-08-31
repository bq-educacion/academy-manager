import { NextPage } from "next";
import { useRouter } from "next/router";

const EditCenter: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <div>{router.pathname}</div>
      <div>{router.query.id}</div>
    </>
  );
};

export default EditCenter;

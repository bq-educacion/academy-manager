import { NextPage } from "next";
import { Layout } from "../../components";
import { sections } from "../../config";
// import withApollo from "../../apollo/withApollo";
import { FirstActionButton } from "@academy-manager/ui";

const CentersPage: NextPage = () => {
  return (
    <Layout section={sections[0].title} label={sections[0].links[1].label}>
      <FirstActionButton />
    </Layout>
  );
};

// export default withApollo(CentersPage);
export default CentersPage;

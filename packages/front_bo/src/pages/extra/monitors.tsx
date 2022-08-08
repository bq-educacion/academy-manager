import { NextPage } from "next";
import { Layout } from "../../components";
import { sections } from "../../config";
import withApollo from "../../apollo/withApollo";

const MonitorsPage: NextPage = () => {
  return (
    <Layout section={sections[0].title} label={sections[0].links[4].label}>
      <h1>Test</h1>
    </Layout>
  );
};

export default withApollo(MonitorsPage);

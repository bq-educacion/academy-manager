import { Server } from "std/http/server.ts";
import { makeExecutableSchema } from "graphql-tools";
import { gql } from "graphql-tag";
import { GraphQLHTTP } from "gql";
import { Bson, MongoClient } from "mongo";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./schema.ts";

const resolvers = {
  Query,
  Mutation,
};

const MONGO_URL = "mongodb://mongo_db:27017/academy_db";
const DB_NAME = "academy_db";

const client = new MongoClient();
try {
  await client.connect(MONGO_URL);
  console.log("Mongo DB connected");

  const handler = async (req: Request) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP<any>({
          schema: makeExecutableSchema({ resolvers, typeDefs }),
          graphiql: true,
          context: () => {
            return { db: client.database(DB_NAME) };
          },
        })(req)
      : new Response("Not Found", { status: 404 });
  };

  const port = 3000;
  const server = new Server({ handler });
  const listener = Deno.listen({ port });

  console.log("Listening on", listener.addr);

  await server.serve(listener);
} catch (e) {
  console.error(e);
}

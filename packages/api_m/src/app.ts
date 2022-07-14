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

//const MONGO_URL = "mongodb://localhost:27017";
//const DB_NAME = "test";

// const client = new MongoClient();
// await client.connect(MONGO_URL);
// const db = client.database(DB_NAME);

const handler = async (req: Request) => {
  const { pathname } = new URL(req.url);
  //const context = { db };
  
  return pathname === "/graphql"
    ? await GraphQLHTTP<any>({
        schema: makeExecutableSchema({ resolvers, typeDefs }),
        graphiql: true,
        context: (req:Request) => {
          return { request: req };
        },
      })(req)
    : new Response("Not Found", { status: 404 });
};
const port = 4000;
const server = new Server({ handler });
const listener = Deno.listen({ port });

console.log("Listening on", listener.addr);

await server.serve(listener);

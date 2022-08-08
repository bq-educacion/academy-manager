import { Server } from "std/http/server.ts";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLHTTP } from "gql";
import { Database, MongoClient } from "mongo";
import { Center, Group, Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs as center } from "./schemas/center.ts";
import { typeDefs as student } from "./schemas/student.ts";
import { typeDefs as instructor } from "./schemas/instructor.ts";
import { typeDefs as group } from "./schemas/group.ts";
import { typeDefs as scalars } from "./schemas/scalars.ts";

export type Context = {
  db: Database;
  request: Request;
};

const MONGO_URL = Deno.env.get("MONGO_URL");
const DB_NAME = Deno.env.get("DB_NAME");
const PORT = Deno.env.get("PORT") || "3000";

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not set");
}

if (!DB_NAME) {
  throw new Error("DB_NAME is not set");
}

const resolvers = {
  Query,
  Center,
  Group,
  Mutation,
};

const client = new MongoClient();
try {
  await client.connect(MONGO_URL);
  console.info("Mongo DB connected: ", MONGO_URL);

  const handler = async (req: Request) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP<Request, Context>({
          schema: makeExecutableSchema({
            resolvers,
            typeDefs: [center, student, instructor, group, scalars],
          }),
          graphiql: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          context: () => {
            return { db: client.database(DB_NAME), request: req };
          },
        })(req)
      : new Response("Not Found", { status: 404 });
  };

  const server = new Server({ handler });
  const listener = Deno.listen({ port: parseInt(PORT) });

  console.info("Listening on", listener.addr);

  await server.serve(listener);
} catch (e) {
  console.error(e);
}

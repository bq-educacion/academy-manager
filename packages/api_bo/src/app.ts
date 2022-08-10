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
import { opine, OpineRequest } from "opine";
import { readAll } from "std/streams/conversion.ts";
import { opineCors } from "cors";

type Params = {
  variables?: Record<string, unknown>;
  operationName?: string;
};

type QueryParams = Params & {
  query: string;
  mutation?: never;
};

type MutationParams = Params & {
  mutation: string;
  query?: never;
};

type GraphQLParams = QueryParams | MutationParams;

type Request = OpineRequest & {
  json: () => Promise<GraphQLParams>;
};

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

  const dec = new TextDecoder();
  const schema = makeExecutableSchema({
    resolvers,
    typeDefs: [center, student, instructor, group, scalars],
  });

  const app = opine();

  app
    .use(opineCors())
    .use("/graphql", async (req, res) => {
      const request = req as Request;

      request.json = async () => {
        const rawBody = await readAll(req.raw);
        return JSON.parse(dec.decode(rawBody));
      };

      if (request.method == "OPTIONS") {
        return res.end();
      }

      const resp = await GraphQLHTTP<Request, Context>({
        schema,
        graphiql: true,
        context: () => {
          return { db: client.database(DB_NAME), request };
        },
      })(request);

      for (const [k, v] of resp.headers.entries()) res.headers?.append(k, v);

      res.status = resp.status;
      res.send(await resp.text());
    })
    .listen(
      { port: parseInt(PORT) },
      () => console.log(`API BO started on http://localhost:3000`),
    );
} catch (e) {
  console.error(e);
}

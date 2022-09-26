import { makeExecutableSchema } from "graphql-tools";
import { GraphQLHTTP } from "gql";
import { Database, MongoClient } from "mongo";
import { centers } from "./resolvers/centers.ts";
import { groups } from "./resolvers/groups.ts";
import { instructors } from "./resolvers/instructors.ts";
import { students } from "./resolvers/students.ts";
import { areas } from "./resolvers/areas.ts";
import { users } from "./resolvers/users.ts";
import { typeDefs as center } from "./schemas/center.ts";
import { typeDefs as student } from "./schemas/student.ts";
import { typeDefs as instructor } from "./schemas/instructor.ts";
import { typeDefs as group } from "./schemas/group.ts";
import { typeDefs as scalars } from "./schemas/scalars.ts";
import { typeDefs as enums } from "./schemas/enums.ts";
import { typeDefs as area } from "./schemas/area.ts";
import { typeDefs as user } from "./schemas/user.ts";
import { opine, OpineRequest } from "opine";
import { readAll } from "std/streams/conversion.ts";
import { opineCors } from "cors";
import { Payload } from "jwt";
import { userCollection, UserModel } from "./models/UserModel.ts";
import { verifyJwt } from "./lib/jwt.ts";
import {
  applyAuthSchemaTransform,
  authDirectiveTypeDefs,
} from "./directives/auth.ts";

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
  user: UserModel | undefined;
  request: Request;
};

const MONGO_URL = Deno.env.get("MONGO_URL");
const DB_NAME = Deno.env.get("DB_NAME");
const PORT = Deno.env.get("PORT") || "3000";
export const JWT_SECRET = Deno.env.get("JWT_SECRET") || "";

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not set");
}

if (!DB_NAME) {
  throw new Error("DB_NAME is not set");
}

const client = new MongoClient();
try {
  await client.connect(MONGO_URL);
  console.info("Mongo DB connected: ", MONGO_URL);

  const dec = new TextDecoder();
  let schema = makeExecutableSchema({
    resolvers: [centers, groups, instructors, students, areas, users],
    typeDefs: [
      center,
      student,
      instructor,
      group,
      area,
      user,
      scalars,
      enums,
      authDirectiveTypeDefs("auth"),
    ],
  });
  schema = applyAuthSchemaTransform(schema);
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
        context: async () => {
          const db = client.database(DB_NAME);
          let emailUser = "";
          const [type, token] = req.headers.get("authorization")?.split(" ") ||
            [];
          if (token && token !== "null") {
            if (type === "Bearer") {
              const check: Payload = await verifyJwt(token, JWT_SECRET);
              emailUser = check.sub || "";
            }
          }
          const user = await userCollection(db).findOne({ email: emailUser });

          return {
            db,
            user,
            request,
          };
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

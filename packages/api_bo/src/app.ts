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
import { verify } from "jwt";
import { userCollection } from "./models/UserModel.ts";
import { getCookies } from "https://deno.land/std@0.137.0/http/cookie.ts";

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

//create a JSON Web Token
export const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

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
  const schema = makeExecutableSchema({
    resolvers: [centers, groups, instructors, students, areas, users],
    typeDefs: [center, student, instructor, group, area, user, scalars, enums],
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
        context: async () => {
          const db = client.database(DB_NAME);

          const reqAuth = [
            "getAreas",
            "getArea",
            "createArea",
            "deleteArea",
            "getCenters",
            "getCenter",
            "createCenter",
            "addCenterContact",
            "editCenter",
            "editCenterContact",
            "deleteCenter",
            "getGroups",
            "getGroup",
            "createGroup",
            "deleteGroup",
            "editGroup",
            "getInstructors",
            "getInstructor",
            "createInstructor",
            "deleteInstructor",
            "editInstructor",
            "getStudents",
            "getStudent",
            "createStudent",
            "deleteStudent",
            "editStudent",
            "addStudentContact",
            "editStudentContact",
          ];

          if (
            reqAuth.some((auth) => request._parsedUrl!.query?.includes(auth))
          ) {
            const token = getCookies(req.headers).token;
            const check = await verify(token, key);
            if (!check) {
              throw new Error("400, Unauthorized");
            }
            const data = JSON.parse(check.toString());
            const user = userCollection(db).findOne({ email: data.email });
            return {
              db,
              user,
              request,
            };
          }

          return {
            db,
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

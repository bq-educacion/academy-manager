import { Server } from 'https://deno.land/std@0.107.0/http/server.ts'
import { GraphQLHTTP } from 'https://deno.land/x/gql@1.1.1/mod.ts'
import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools@0.0.2/mod.ts'
import { Query } from "./resolvers/query.ts";
import { Mutation} from "./resolvers/mutation.ts"
import { typeDefs } from "./schema.ts";

const resolvers = {
  Query,
  Mutation
}

const s = new Server({
    handler: async (req) => {
      const { pathname } = new URL(req.url)
      return pathname === '/graphql'
        ? await GraphQLHTTP<Request>({
            schema: makeExecutableSchema({resolvers,typeDefs}),
            graphiql: true,
            // context: (request) => {
            //   return{
            //     request
            //   }
            // }
        })(req)
        : new Response('Not Found', { status: 404 })
    },
    addr: ':3000'
  })
  
  s.listenAndServe()
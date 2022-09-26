import { getDirectives } from "getDirectives";
import { mapSchema } from "mapSchema";
import { MapperKind } from "mapperKind";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { Context } from "../app.ts";

function authDirective(
  directiveName: string,
): (schema: GraphQLSchema) => GraphQLSchema {
  return (schema: GraphQLSchema) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directives = getDirectives(schema, fieldConfig);
        const authDirective = directives[directiveName];
        if (authDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          // TODO(@pruizj): actualizar tipo de función y quitar excepción del deno.json
          fieldConfig.resolve = function (...args: Context[]) {
            const context = args[2] as Context;
            if (!context.user) {
              throw new Error("401, Not authorized");
            }
            return resolve.apply(this, args);
          };
        }
        return fieldConfig;
      },
    });
  };
}

export const authDirectiveTypeDefs = (directiveName: string) => /* GraphQL */ `
  directive @${directiveName} on FIELD_DEFINITION
`;
export const applyAuthSchemaTransform = authDirective("auth");

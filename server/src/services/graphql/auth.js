const { mapSchema, getDirective, MapperKind } = require("@graphql-tools/utils");


// this directive reads the user from the context and pass it to our resolvers where the directive is specified withn our Graphql schema
function authDirective(directiveName) {
  const typeDirectiveArgumentMaps = {};
  

  return {
    authDirectiveTypeDefs: `directive
            @${directiveName} on QUERY | FIELD_DEFINITION | FIELD
        `,
    authDirectiveTransformer: (schema) =>
    // pass in schema itself and an object of functions that can transform the schema
      mapSchema(schema, {
        // run function for specific types TYPE and OBJECT_FIELD
        [MapperKind.TYPE]: (type) => {
            // read the schema and try to get the specified directiveName
          const authDirective = getDirective(schema, type, directiveName)?.[0];

          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {

            // try to get the directiveName if undefined return the directiveName in th object can also bw undefined
          const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName];

          if (authDirective) {
            const { resolve , defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = function (source, args, context, info) {
                // read the merchant from the resolver
              if (context.merchant) {
                return resolve(source, args, context, info);
              }
              throw new Error("Unauthenticated. You need to be logged in!");
            };
            return fieldConfig;
          }
        },
      }),
  };
}

if(exports) {
    exports.authDirective = authDirective
}
const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const decimalScalar = new GraphQLScalarType({
  name: "Decimal",
  description: "The `Decimal` scalar type to represent currency values",

  serialize(value) {
    return new Big(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      // @ts-ignore | TS2339
      throw new TypeError(`${String(ast.value)} is not a valid decimal value.`);
    }

    return Big(ast.value);
  },

  parseValue(value) {
    return Big(value);
  }
});

if (exports){
    exports.Date = dateScalar;
    exports.Decimal = decimalScalar;
}
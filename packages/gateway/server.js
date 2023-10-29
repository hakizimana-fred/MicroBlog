const { json } = require("express");
const server = require("express")();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const cors = require("cors");
const http = require("http");

const port = 4000;

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

async function run() {
  const httpServer = http.createServer(server);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  server
    .use(cors())
    .use(json())
    .use(expressMiddleware(apolloServer))
    .get("/", (_, res) => {
      res.send("I am working just fine!");
    })
    .listen(port, () =>
      console.log(`server started successfully on port ${port}`)
    );
}

run();

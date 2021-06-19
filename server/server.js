const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const http = require('http')
const path = require('path')
require('dotenv').config()
const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

//express server
const app = express();

// typeDefs
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs")));

//resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);


// graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

// apply Middleware metho connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

// server
const httpserver = http.createServer(app)

// rest endpoint
app.get('/rest', function(req, res) {
  res.json({
    data: 'you hit rest endpoint'
  })
})

// port
app.listen(process.env.PORT, function() {
  console.log(`server is ready at http://localhost${process.env.PORT}`)
  console.log(`graphql is ready at http://localhost${process.env.PORT}${apolloServer.graphqlPath}`)
});


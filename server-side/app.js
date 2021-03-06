const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const cors = require('cors')
// const expressGraphQL = require("express-graphql"); <----- this is part of an older version, it should be 'graphqlHTTP' destructed from express-graphql

const schema = require('./schema')

const app = express();

app.use(cors()) // not having cors enabled will cause an access control error


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("server running"));

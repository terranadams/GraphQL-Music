const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require("graphql");

let artists = [
  {
    id: 1,
    name: "Architects",
    country: "United Kingdom",
    genre: "Metal",
  },
  {
    id: 2,
    name: "Eminem",
    country: "United States",
    genre: "HipHop/Rap",
  },
  {
    id: 3,
    name: "Sasha Sloan",
    country: "United States",
    genre: "Indie Pop",
  },
  {
    id: 4,
    name: "Imminence",
    country: "Sweden",
    genre: "Metal",
  },
  {
    id: 5,
    name: "Conway the Machine",
    country: "United States",
    genre: "HipHop/Rap",
  },
];

const ArtistType = new GraphQLObjectType({
  name: "Artist",
  description: "This represents a musical artist",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const SongType = new GraphQLObjectType({
  name: "Song",
  description: "This represents an artist's song",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    artist: { type: GraphQLString },
    album: { type: GraphQLString },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve(parent, args) {
          return "This is a query";
        },
        // resolve: () => 'Hello World' <---- this works too
      },
      artists: {
        type: new GraphQLList(ArtistType),
        resolve() {
          return artists;
        },
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve(parent, args) {
          return "This is a mutation";
        },
      },
      addArtist: {
        type: ArtistType,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          country: { type: new GraphQLNonNull(GraphQLString) },
          genre: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            let newArtist = {
                name: args.name,
                country: args.country,
                genre: args.genre,
                id: artists.length + 1
            }
            artists.push(newArtist)
        }
      },
    }),
  }),
});

module.exports = schema;

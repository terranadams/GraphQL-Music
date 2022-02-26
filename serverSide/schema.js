const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");
const _ = require('lodash')

let artists = [
  {
    id: 1,
    name: "Architects",
    country: "United Kingdom",
    genre: "Metal",
    song: "Phantom Fear"
  },
  {
    id: 2,
    name: "Eminem",
    country: "United States",
    genre: "HipHop/Rap",
    song: "Evil Twin"
  },
  {
    id: 3,
    name: "Sasha Sloan",
    country: "United States",
    genre: "Indie Pop",
    song: "Dancing with Your Ghost"
  },
  {
    id: 4,
    name: "Imminence",
    country: "Sweden",
    genre: "Metal",
    song: "Ghost"
  },
  {
    id: 5,
    name: "Kendrick Lamar",
    country: "United States",
    genre: "HipHop/Rap",
    songId: "Fear"
  },
];
let songs = [
  {
    id: 1,
    name: "Phantom Fear",
    creatorId: 1,
    albumId: 1
  },
  {
    id: 2,
    name: "Naysayer",
    creatorId: 1,
    albumId: 2
  },
  {
    id: 3,
    name: "These Colours Don't Run",
    creatorId: 1,
    albumId: 3
  },
  {
    id: 4,
    name: "On Fire",
    creatorId: 2,
    albumId: 4
  },
  {
    id: 5,
    name: "Cinderella Man",
    creatorId: 2,
    albumId: 4
  },
  {
    id: 6,
    name: "Dancing with Your Ghost",
    creatorId: 3,
    albumId: 5
  },
  {
    id: 7,
    name: "Erase",
    creatorId: 4,
    albumId: 5
  }, {
    id: 8,
    name: "Chasing Shadows",
    creatorId: 4,
    albumId: 6
  },
  {
    id: 9,
    name: "Fear",
    creatorId: 5,
    albumId: 7
  }
]


const ArtistType = new GraphQLObjectType({
  name: "Artist",
  description: "This represents a musical artist",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    genre: { type: GraphQLString },
    songs: { 
      type: GraphQLList(SongType),
      resolve: (parent, args) => songs.filter(song => song.creatorId === parent.id)
    }
  }),
});

const SongType = new GraphQLObjectType({
  name: "Song",
  description: "This represents an artist's song",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    artist: { type: GraphQLString },
    album: { type: GraphQLString },
    creatorId: { type: GraphQLInt },
    creator: {
      type: ArtistType,
      resolve: (parent, args) => {
        return _.find(artists, {id: parent.creatorId})
      },
    }
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
      artist: {
        type: ArtistType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve(parent, args) {
          return artists.find(artist => artist.id === args.id);
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
          genre: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
          let newArtist = {
            name: args.name,
            country: args.country,
            genre: args.genre,
            id: artists.length + 1,
          };
          artists.push(newArtist);
        },
      },
    }),
  }),
});

module.exports = schema;

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const _ = require("lodash");

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
    name: "Kendrick Lamar",
    country: "United States",
    genre: "HipHop/Rap",
  },
];
let songs = [
  {
    id: 1,
    name: "Phantom Fear",
    creatorId: 1,
    albumId: 1,
  },
  {
    id: 2,
    name: "Naysayer",
    creatorId: 1,
    albumId: 2,
  },
  {
    id: 3,
    name: "These Colours Don't Run",
    creatorId: 1,
    albumId: 3,
  },
  {
    id: 4,
    name: "On Fire",
    creatorId: 2,
    albumId: 4,
  },
  {
    id: 5,
    name: "Cinderella Man",
    creatorId: 2,
    albumId: 4,
  },
  {
    id: 6,
    name: "Dancing with Your Ghost",
    creatorId: 3,
    albumId: 5,
  },
  {
    id: 7,
    name: "Erase",
    creatorId: 4,
    albumId: 6,
  },
  {
    id: 8,
    name: "Chasing Shadows",
    creatorId: 4,
    albumId: 7,
  },
  {
    id: 9,
    name: "Swimming Pools",
    creatorId: 5,
    albumId: 8,
  },
];
let albums = [
  {
    id: 1,
    name: "All Our Gods Have Abandoned Us",
    creatorId: 1,
  },
  {
    id: 2,
    name: "Lost Forever // Lost Together",
    creatorId: 1,
  },
  {
    id: 3,
    name: "Daybreaker",
    creatorId: 1,
  },
  {
    id: 4,
    name: "Recovery",
    creatorId: 2,
  },
  {
    id: 3,
    name: "Self Portrait - EP",
    creatorId: 3,
  },
  {
    id: 4,
    name: "Turn the Light On",
    creatorId: 4,
  },
  {
    id: 5,
    name: "Heaven In Hiding",
    creatorId: 4,
  },
  {
    id: 6,
    name: "Good Kid, M.A.A.D City",
    creatorId: 5,
  },
];

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
      resolve: (parent, args) =>
        songs.filter((song) => song.creatorId === parent.id),
    },
    albums: {
      type: GraphQLList(AlbumType),
      resolve: (parent, args) =>
        albums.filter((album) => album.creatorId === parent.id),
    },
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
        return _.find(artists, { id: parent.creatorId });
      },
    },
  }),
});

const AlbumType = new GraphQLObjectType({
  name: "Album",
  description: "This represents an artist's album",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    creatorId: { type: GraphQLInt },
    creator: {
      type: ArtistType,
      resolve: (parent, args) => {
        return _.find(artists, { id: parent.creatorId });
      },
    },
    songs: {
      type: GraphQLList(SongType),
      resolve: (parent, args) => {
        return songs.filter((song) => song.albumId == parent.id);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      artists: {
        type: new GraphQLList(ArtistType),
        resolve() {
          return artists;
        },
      },
      artist: {
        type: ArtistType,
        args: { id: { type: GraphQLInt } },
        resolve(parent, args) {
          return artists.find((artist) => artist.id === args.id);
        },
      },
      albums: {
        type: GraphQLList(AlbumType),
        resolve(parent, args) {
          return albums;
        },
      },
      album: {
        type: AlbumType,
        args: { id: { type: GraphQLInt } },
        resolve: (parent, args) => {
          return albums.find((album) => album.id === args.id);
        },
      },
      songs: {
        type: GraphQLList(SongType),
        resolve: (parent, args) => {
          return songs;
        },
      },
      song: {
        type: SongType,
        args: {id: {type: GraphQLInt}},
        resolve: (parent, args) => {
          return songs.find(song => song.id === args.id)
        }
      }
    }),
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
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

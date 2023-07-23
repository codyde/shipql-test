import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag'
const axios = require('axios');


const resolvers = {
    Query: {
      starships: async () => {
        let starships = [];
        let nextUrl = 'https://swapi.dev/api/starships/';
  
        while (nextUrl) {
          try {
            const response = await axios.get(nextUrl);
            starships = starships.concat(response.data.results);
            nextUrl = response.data.next;
          } catch (error) {
            throw error;
          }
        }
        return starships
      },
    },
  };

const typeDefs = gql`
  type Starship {
    name: String
    model: String
    manufacturer: String
    cost_in_credits: String
    length: String
    crew: String
    passengers: String
    cargo_capacity: String
    consumables: String
    hyperdrive_rating: String
    MGLT: String
    starship_class: String
  }

  type Query {
    starships: [Starship]
  }
`;


const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request) {
  return handler(request);
}

export async function POST(request) {
  return handler(request);
}
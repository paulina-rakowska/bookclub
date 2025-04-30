import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import { typeDefs } from '../graphql/schema';
import { resolvers } from '../graphql/resolvers';


// Replace with your Mongo Atlas URI
const MONGO_URI = 'mongodb+srv://paulina:IAEujlkeqRSxcENS@lyricaldb.t62pe.mongodb.net/lyricaldb?retryWrites=true&w=majority&appName=lyricaldb';

if (!MONGO_URI) {
  throw new Error('You must provide a Mongo Atlas URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo Atlas instance.'))
  .on('error', error => console.log('Error connecting to Mongo Atlas:', error));

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }, // Apollo server listens on port 4000
  });

  console.log(`🚀 Server ready at ${url}`);
};

startApolloServer();
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';
import dbConnect from '@/lib/mongoose';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const handler = startServerAndCreateNextHandler(server);

const nextHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect(); 
  return handler(req, res);
};

export default nextHandler;
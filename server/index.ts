import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import typeDefs from './src/model/typeDefs';
import resolvers from "./src/model/resolvers";

const startApolloServer = async(typeDefs: any, resolvers: any) => {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer})]
    }) as any;
    await server.start();
    server.applyMiddleware({app});
    await new Promise<void>((resolve) => 
    httpServer.listen({ port: 4000 }, resolve) //run the server on port 4000
  );
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer(typeDefs, resolvers);

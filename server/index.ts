import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

const startApolloServer= async(schema: any, resolvers: any) => {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs: schema,
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


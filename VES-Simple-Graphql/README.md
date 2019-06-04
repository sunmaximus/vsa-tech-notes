# Simple Express Graphql Tutorial

## Apollo Implementation 🚀🚀🚀

### Prerequisites

Get git [bash](https://git-scm.com/downloads)

Get [VSCode](https://code.visualstudio.com/) 

### Instructions

Create and go to project directory
    
    $ mkdir <project-name>
    $ cd <project-name>

Initialize Git

    $ git init

Initialize npm 

    $ npm init -y

Install dependencies

    $ npm install -S express apollo-server-express

Create a file called `server.js` in project directory

Copy & Paste the following code in `server.js`

    const express = require('express');
    const { ApolloServer, gql } = require('apollo-server-express');

    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`
        type Query {
            hello: String
        }
    `;

    // Provide resolver functions for your schema fields
    const resolvers = {
        Query: {
                hello: () => 'Hello world!',
            },
    };

    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );

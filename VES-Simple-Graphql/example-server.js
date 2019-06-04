const mongoose = require('mongoose');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Module for User
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = new mongoose.model('User', userSchema);

mongoose.connect("mongodb://hostname-or-ip-address/SampleUsers");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    getAllUsers: [User]
    getUser(id: String!): User
  }

  type Mutation {
      addUser(user: UserInput!): User
  }

  input UserInput {
      name: String
      age: Int
  }

  type User {
      id: String,
      name: String,
      age: Int
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getAllUsers: async (_, args) => {
        try {
            const users = User.find({});
            console.log(users);
            return users
        } catch(err) {
            console.log(err);
        }
    },

    getUser: async (_, args) => {
        try {
            const user = await User.findById(args.id);
            return user
        } catch(err) {
            console.log(err)
        }
    }
  },

  Mutation: {
    addUser: async (_, args) => {
        try {
            const newUser = new User({
                name: args.user.name,
                age: args.user.age
            })

            return await newUser.save();
        } catch(err) {
            console.log(err);
        }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// merge express server with Apollo server
server.applyMiddleware({ app });

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);
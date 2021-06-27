const { gql } = require('apollo-server-express');

module.exports = gql `
  type Post {
    _id: ID!
    content: String
    image: Image
    postedBy: User
  }
  type Query {
    allPosts: [Post!]!
    postsByUser: [Post!]!
  }
  # input type
  input PostCreateInput {
    content: String!
    image: ImageInput
  }

  # mutations
  type Mutation {
    postCreate(input: PostCreateInput!): Post!
  }

`;
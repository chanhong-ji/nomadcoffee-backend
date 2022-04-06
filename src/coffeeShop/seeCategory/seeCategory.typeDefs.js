import { gql } from "apollo-server-core";

export default gql`
  type SeeCategoryResult {
    totalPages: Int!
    shops: [CoffeeShop]
  }
  type Query {
    seeCategory(category: String!, page: Int!): SeeCategoryResult!
  }
`;

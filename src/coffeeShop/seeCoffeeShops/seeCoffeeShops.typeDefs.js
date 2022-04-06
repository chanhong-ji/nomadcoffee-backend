import { gql } from "apollo-server-core";

export default gql`
  type seeCoffeeShopsResult {
    ok: Boolean!
    error: String
    shops: [CoffeeShop]
    totalPages: Int!
  }

  type Query {
    seeCoffeeShops(page: Int!): seeCoffeeShopsResult!
  }
`;

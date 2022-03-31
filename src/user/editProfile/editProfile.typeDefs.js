import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(password: String, avatarURL: String): MutationResponse!
  }
`;

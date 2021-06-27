import {gql} from 'apollo-boost'
import { USER_INFO, POST_DATA  } from "./fragments";

export const USER_UPDATE = gql`
  mutation userUpdate($input: UserUpdateInput) {
    userUpdate(input: $input) {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const POST_CREATE = gql`
  mutation postCreate($input: PostCreateInput!) {
    postCreate(input: $input) {
      ...postData
    }
  }
  ${POST_DATA}
`;
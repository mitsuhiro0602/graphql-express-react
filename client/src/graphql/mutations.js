import { USER_INFO } from "./fragments";

export const USER_UPDATE = gql`
  mutation userUpdate($input: UserUpdateInput) {
    userUpdate(input: $input) {
      ...userInfo
    }
  }
  ${USER_INFO}
`;
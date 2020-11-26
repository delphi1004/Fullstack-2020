import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
mutation authorize($username:String! , $password:String!) {
  authorize(credentials: {username:$username , password:$password})
  {
    accessToken
  }
}
`;

export const AUTHORISED_USER = gql`
query {
  authorizedUser {
    id
    username
  }
}
`;

export const GET_REPOSITORIES = gql`
query {
  repositories{
    edges{
      node{
        id
        fullName
        description
        language
        forksCount
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
      }
    }
  }
} 
`;
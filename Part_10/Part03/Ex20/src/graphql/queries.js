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

export const GET_REPOSITORY = gql`
query repository($id:ID!){
  repository(id: $id) {
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
`;

export const GET_REPOSITORY_REVIEW = gql`
query repository($id:ID!) {
  repository(id: $id) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}`
;

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
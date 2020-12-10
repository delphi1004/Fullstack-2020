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

export const CREATE_USER = gql`
mutation createUser( $username:String! , $password:String!){
  createUser(user:{username:$username , password:$password}) {
    id
    username
    createdAt
  }
}
`;

export const CREATE_REVIEW = gql`
mutation createReview( $ownerName:String! , $repositoryName:String! , $rating:Int! , $text:String!){
  createReview(review:{ownerName:$ownerName , repositoryName:$repositoryName  , rating:$rating , text:$text }) {
    id
    user{
      username
    }
    repository{
      fullName
    }
    rating
    createdAt
    text
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
  query ($id: ID!, $first: Int, $after: String) {
    repository (id: $id) {
      id
      fullName
      reviews (first: $first, after: $after){
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
query repositories($orderDirection:OrderDirection , $orderBy:AllRepositoriesOrderBy , $searchKeyword:String){
  repositories(orderDirection:$orderDirection , orderBy:$orderBy , searchKeyword:$searchKeyword){
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

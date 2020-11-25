import { gql } from 'apollo-boost';

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
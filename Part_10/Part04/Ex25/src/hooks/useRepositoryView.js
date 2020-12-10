import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY_REVIEW } from '../graphql/queries';

const useRepositoryReview = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY_REVIEW, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {

    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (data) {
      console.log(`handleFetchMore: name:${data.repository.fullName} loading:${loading} canFetchMore:${canFetchMore} hasNextPage:${data.repository.reviews.pageInfo.hasNextPage}`);
    }

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY_REVIEW,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ]
            }
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositoryReviewResult: data ? data.repository : undefined,
    handleFetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositoryReview;
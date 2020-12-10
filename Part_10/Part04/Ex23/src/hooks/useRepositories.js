import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const OrderDirection = ['ASC', 'DESC'];
const OrderBy = ['CREATED_AT', 'RATING_AVERAGE'];

const useRepositories = (orderDirection = 1, orderBy = 0) => {
  const [repositories, setRepositories] = useState();
  const result = useQuery(GET_REPOSITORIES, {
    tchPolicy: 'cache-and-network',
    variables: { orderDirection: OrderDirection[orderDirection], orderBy: OrderBy[orderBy] }
  });

  useEffect(() => {
    if (result.data !== undefined) {
      setRepositories(result.data.repositories);
    }
  }, [result.data]);

  return { repositories };
};

export default useRepositories;
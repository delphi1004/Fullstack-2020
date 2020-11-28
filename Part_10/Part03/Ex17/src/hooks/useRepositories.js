import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const result = useQuery(GET_REPOSITORIES);

  useEffect(() => {
    if (result.data !== undefined) {
      console.log('recevied repositories ');
      setRepositories(result.data.repositories);
    }
  }, [result.data]);

  return { repositories };
};

export default useRepositories;
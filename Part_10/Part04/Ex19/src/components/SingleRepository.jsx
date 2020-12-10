import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-native';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

const SingleRepository = () => {
  const { id } = useParams(id);
  const [repository, setRepository] = useState(null);
  const result = useQuery(GET_REPOSITORY, { variables: { id: id } });

  useEffect(() => {
    if (result.data !== undefined) {
      setRepository(result.data.repository);
    }
  }, [result.data]);

  return (
    <View>
      {repository && <RepositoryItem item={repository} showSingleRepository={true} />}
    </View>
  );
};

export default SingleRepository;

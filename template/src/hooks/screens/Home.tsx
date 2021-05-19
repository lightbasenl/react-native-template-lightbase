import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { api } from 'utils/api';
import { useQuery } from 'react-query';
import View from 'components/View';

export default function Home() {
  const { isLoading, data, isFetching } = useQuery('characters', async () => {
    const result = await api.get('https://rickandmortyapi.com/api/character/');
    return result.data;
  });

  return (
    <View.Screen>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {isFetching && <Text style={{ paddingVertical: 20 }}>FETCHING</Text>}

          {data?.results.map(({ name }: { name: string }) => (
            <Text key={name}>{name}</Text>
          ))}
        </>
      )}
    </View.Screen>
  );
}

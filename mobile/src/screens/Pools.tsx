import { useCallback, useState } from 'react';
import { FlatList, Icon, useToast, VStack } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { PoolCard } from '../components/PoolCard';
import { EmptyPoolList } from '../components/EmptyPoolList';

import type { PoolCardPros } from '../components/PoolCard';
import { api } from '../services/api';

export function Pools() {
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolCardPros[]>([]);

  const toast = useToast();

  const navigation = useNavigation();

  function navigateToFindPoolScreen() {
    navigation.navigate('findPool');
  }

  async function fetchPools() {
    try {
      setIsLoading(true);

      const response = await api.get<{ pools: PoolCardPros[] }>('/pools');
      console.log(response.data);

      setPools(response.data.pools);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  return (
    <VStack flex="1" bg="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mx="5"
        mt="6"
        pb="4"
        mb="4"
        borderBottomWidth="1"
        borderBottomColor="gray.600"
        alignItems="center"
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={navigateToFindPoolScreen}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() =>
                navigation.navigate('poolDetails', { id: item.id })
              }
            />
          )}
          px="5"
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
}

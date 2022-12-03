import { useEffect, useState } from 'react';
import { HStack, useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import type { PoolCardPros } from '../components/PoolCard';

import { api } from '../services/api';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';
import { Share } from 'react-native';

interface RouteParams {
  id: string;
}

type TabOptions = 'guesses' | 'ranking';

export function PoolDetails() {
  const [tabOptionSelected, setTabOptionSelected] =
    useState<TabOptions>('guesses');
  const [isLoading, setIsLoading] = useState(true);
  const [poolDetails, setPoolDetails] = useState<PoolCardPros>(
    {} as PoolCardPros
  );

  const route = useRoute();
  const { id } = route.params as RouteParams;
  const toast = useToast();

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const response = await api.get<{ pool: PoolCardPros }>(`/pools/${id}`);

      setPoolDetails(response.data.pool);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePoolCodeShare() {
    await Share.share({
      message: poolDetails.code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex="1" bgColor="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handlePoolCodeShare}
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack flex="1" px="5">
          <PoolHeader data={poolDetails} />

          <HStack bgColor="gray.800" p="1" rounded="sm" mb="5">
            <Option
              title="Seu palpites"
              isSelected={tabOptionSelected === 'guesses'}
              onPress={() => setTabOptionSelected('guesses')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={tabOptionSelected === 'ranking'}
              onPress={() => setTabOptionSelected('ranking')}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}

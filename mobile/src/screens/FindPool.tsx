import { useState } from 'react';
import { Heading, useToast, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

import { api } from '../services/api';

export function FindPool() {
  const [isLoading, setIsLoading] = useState(false);
  const [poolCode, setPoolCode] = useState('');

  const toast = useToast();
  const navigation = useNavigation();

  async function handlePoolJoin() {
    try {
      if (!poolCode.trim()) {
        toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500',
        });

        return;
      }
      setIsLoading(true);

      await api.post('/pools/join', { code: poolCode });

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigation.navigate('pools');
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === 'You already join this pool.') {
          toast.show({
            title: 'Você já está nesse bolão!',
            placement: 'top',
            bgColor: 'red.500',
          });

          return;
        }
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  return (
    <VStack flex="1" bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mx="5" alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my="8"
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          mb="2"
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          value={poolCode}
          onChangeText={(value) => setPoolCode(value)}
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handlePoolJoin}
        />
      </VStack>
    </VStack>
  );
}

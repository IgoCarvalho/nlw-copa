import { Heading, VStack } from 'native-base';
import { Header } from '../components/Header';

import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function FindPool() {
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

        <Input mb="2" placeholder="Qual o código do bolão?" />
        <Button title="BUSCAR BOLÃO" />

      </VStack>
    </VStack>
  );
}

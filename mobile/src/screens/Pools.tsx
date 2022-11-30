import { Icon, VStack } from 'native-base';
import { Octicons } from '@expo/vector-icons';

import { Header } from '../components/Header';
import { Button } from '../components/Button';

export function Pools() {
  return (
    <VStack flex="1" bg="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mx="5"
        mt="6"
        pb="4"
        borderBottomWidth="1"
        borderBottomColor="gray.600"
        alignItems="center"
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
        />
      </VStack>
    </VStack>
  );
}

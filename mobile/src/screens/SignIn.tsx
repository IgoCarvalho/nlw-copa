import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from 'native-base';

import { Button } from '../components/Button';

import NlwCopaLogo from '../assets/logo.svg';

export function SignIn() {
  return (
    <Center flex="1" bgColor="gray.900" p="7">
      <NlwCopaLogo width={212} height={40} />
      <Button
        title="Entrar com Google"
        type="SECONDARY"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt="12"
      />

      <Text color="gray.200" mt="4" textAlign="center">
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  );
}

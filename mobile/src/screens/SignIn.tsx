import { Text, VStack } from 'native-base';

export function SignIn() {
  return (
    <VStack
      flex="1"
      bgColor="gray.900"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="white" fontSize="24" fontFamily="heading">
        SignIn
      </Text>
    </VStack>
  );
}

import { HStack } from 'native-base';
import CountryFlag from 'react-native-country-flag';

import { Input } from './Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
  teamPoints?: number;
  hasGuess: boolean;
}

export function Team({
  code,
  position,
  onChangeText,
  hasGuess,
  teamPoints,
}: Props) {
  return (
    <HStack alignItems="center">
      {position === 'left' && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}

      <Input
        w={10}
        h={9}
        editable={!hasGuess}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={onChangeText}
        defaultValue={String(teamPoints || '')}
      />

      {position === 'right' && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  );
}

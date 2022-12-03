import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { useTheme } from 'native-base';

import { NewPool } from '../screens/NewPool';
import { Pools } from '../screens/Pools';
import { FindPool } from '../screens/FindPool';
import { PoolDetails } from '../screens/PoolDetails';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes, fonts, fontSizes } = useTheme();

  const iconSize = sizes[6];
  const tabSize = iconSize + sizes[6] * 2;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: tabSize,
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
          padding: 0,
        },
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontFamily: fonts['medium'],
          fontSize: fontSizes['md'],
        },
      }}
    >
      <Screen
        name="newPool"
        component={NewPool}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={iconSize} />
          ),
          tabBarLabel: 'Novo bolão',
        }}
      />

      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={iconSize} />
          ),
          tabBarLabel: 'Meus bolões',
        }}
      />

      <Screen
        name="findPool"
        component={FindPool}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="poolDetails"
        component={PoolDetails}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}

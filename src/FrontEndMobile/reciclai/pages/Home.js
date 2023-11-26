import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

import Pesquisa from './Pesquisa';
import AposLogin from './AposLogin';
import PerfilUsuario from './PerfilUsuario';
import Historico from './Historico';

const Home = () => {


  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }
      }
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.title;

            return label;
          }}

        />
      )}
    >
      <Tab.Screen
        name="AposLogin"
        component={AposLogin}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Pesquisa"
        component={Pesquisa}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="file-search-outline" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="PerfilUsuario"
        component={PerfilUsuario}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Historico"
        component={Historico}
        options={{
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="format-list-bulleted" size={size} color={color} />;
          },
        }}
      />

    </Tab.Navigator>
  );
};

export default Home;
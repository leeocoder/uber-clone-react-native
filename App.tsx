import HomeScreen from '@/screens/HomeScreen';
import MapScreen from '@/screens/MapScreen';
import store from '@/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

export type RootStackParamList = {
  HomeScreen: undefined;
  MapScreen: undefined;
  EatsScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
        >
          <StatusBar
            style='auto'
            translucent
          />
          <Navigator screenOptions={{ headerShown: false }}>
            <Screen
              name='HomeScreen'
              component={HomeScreen}
            />
            <Screen
              name='MapScreen'
              component={MapScreen}
            />
          </Navigator>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

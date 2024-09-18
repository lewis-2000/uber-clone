import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Store from './store';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';


// 1). Setup Redux with store reducer
// 2). Setup Tailwind React native Classes


export default function App() {
  //Create a stack navigator
  const Stack = createStackNavigator();


  return (
    <Provider store={Store}>
      <NavigationContainer>

        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "height" : "padding"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            style={{ flex: 1 }}
          >
            <Stack.Navigator>
              <Stack.Screen name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false,
                }} />

              <Stack.Screen name='MapScreen'
                component={MapScreen}
                options={{
                  headerShown: false,
                }} />

            </Stack.Navigator>

          </KeyboardAvoidingView>

        </SafeAreaProvider>

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

import React, { Component } from 'react';
import Main from './components/MainComponent';
import { LogBox } from 'react-native';
// redux
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
// redux-persist
import { PersistGate } from 'redux-persist/es/integration/react';
const { persistor, store } = ConfigureStore();

class App extends Component {
  constructor (props) {
    super (props);
    LogBox.ignoreLogs ([
      'expo-notifications: Android Push notifications (remote notifications) functionality provided by expo-notifications was removed from Expo Go with the release of SDK 53. Use a development build instead of Expo Go. Read more at https://docs.expo.dev/develop/development-builds/introduction/.'
    ]);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
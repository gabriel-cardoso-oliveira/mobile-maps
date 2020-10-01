import 'react-native-gesture-handler';
import React, { Component } from 'react';
// import { AppLoading } from 'expo';
// import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
// import {
//   Ubuntu_700Bold,
//   Ubuntu_500Medium,
//   useFonts,
// } from '@expo-google-fonts/ubuntu';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import './config/ReactotronConfig';
import { store, persistor } from './store';
import Routes from './routes';

class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('25ff1129-29e2-414a-8522-7ed86cd5f9a9');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (data) => {};

  onOpened = (notification) => {};

  onIds = (id) => {};
  // const [fontsLoaded] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_500Medium,
  //   Ubuntu_700Bold,
  //   Ubuntu_500Medium,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#3e3e3e" />

          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);

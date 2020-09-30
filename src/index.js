import 'react-native-gesture-handler';
import React from 'react';
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
import './config/ReactotronConfig';
import { store, persistor } from './store';
import Routes from './routes';

const Index = () => {
  // const [fontsLoaded] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_500Medium,
  //   Ubuntu_700Bold,
  //   Ubuntu_500Medium,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#3e3e3e" />

        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);

import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
// import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron
    // .asyncStorageHandler(AsyncStorage)
    .configure({ host: '192.168.12.1' })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}

/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
// import io from 'socket.io-client';
import Background from '~/components/Background';
import { Container, Description, Title } from './styles';
import { defaultLocation } from '~/utils/defaultLocation';
import logo from '~/assets/logo.png';
// import { getDistanceFromLatLonInKm } from '../utils/getDistance';

export default function Dashboard(isActive) {
  const [locations, setLocations] = useState(defaultLocation);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.LOW_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 150,
      debug: true,
      notificationTitle: 'CampoTV Maps',
      notificationText: 'Ativado',
      startOnBoot: false,
      startForeground: false,
      stopOnTerminate: true,
      locationProvider: 2,
      interval: 60000,
      fastestInterval: 120000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: 'https://quantum-balm-274511.uc.r.appspot.com/locations',
      syncUrl: 'https://quantum-balm-274511.uc.r.appspot.com/sync',
      // url: 'http://10.0.2.2:3333/locations',
      // syncUrl: 'http://10.0.2.2:3333/sync',
      syncThreshold: 50,
      httpHeaders: {
        'X-FOO': 'bar',
      },
      maxLocations: 1000,
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar',
      },
    });

    BackgroundGeolocation.on('location', (location) => {
      console.tron.log('loc', location);
      setLocations((prev) => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));

      BackgroundGeolocation.startTask((taskKey) => {
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', (/* stationaryLocation */) => {
      // handle stationary locations here
    });

    BackgroundGeolocation.on('error', (error) => {
      console.tron.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.tron.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.tron.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.tron.log(
        `[INFO] BackgroundGeolocation authorization status: ${status}`
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'O aplicativo requer permissão de localização',
              'Gostaria de abrir as configurações do aplicativo?',
              [
                {
                  text: 'Sim',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'Não',
                  onPress: () => console.tron.log('No Pressed'),
                  style: 'cancel',
                },
              ]
            ),
          1000
        );
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.tron.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.tron.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.checkStatus((status) => {
      if (!status.isRunning) {
        BackgroundGeolocation.start();
      }
    });

    return () => {
      console.tron.log('Removing all listeners');
      BackgroundGeolocation.removeAllListeners();
    };
  }, [locations, isActive]);

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Title>CampoTV Maps</Title>
        <Description>Seja bem vindo!</Description>
        {/* <Main>
        </Main> */}
        {/* <Text>Latitude: {locations.latitude}</Text>
        <Text>Longitude: {locations.longitude}</Text>
        <Text>AUTHORIZED: {BackgroundGeolocation.AUTHORIZED}</Text> */}

        {/* {console.tron.log('region', region)}
        {console.tron.log('isRunning', isRunning)} */}
      </Container>
    </Background>
  );
}

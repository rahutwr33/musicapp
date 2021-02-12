/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {Navigation} from 'react-native-navigation';
import {SplashScreen} from './src/navigation';

import storage from './src/utils/storage';
import {LoadAppScreen} from './src/navigation/stack/load';

Navigation.events().registerAppLaunchedListener(async () => {
  let user = await storage.get('user');
  user = JSON.parse(user);
  if (user && Object.keys(user).length > 0) {
    if (user && user.user && user.user.is_artist) {
      LoadAppScreen();
    } else {
      LoadAppScreen();
    }
  } else {
    SplashScreen();
  }
});

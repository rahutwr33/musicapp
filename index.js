/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PlayerInitialiaze} from './src/utils/player/service';
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

YellowBox.ignoreWarnings(['']);
AppRegistry.registerComponent(appName, () => App);
PlayerInitialiaze().then((res) => {
  console.log('done');
});

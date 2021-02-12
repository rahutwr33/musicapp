import {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import * as firebase from '@react-native-firebase/app';

export default class Pushnotification extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.checkPermission();
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  async checkPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getToken();
      console.log('Authorization status:', authStatus);
    }
  }

  async getToken() {
    var fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      console.log('fcmToken', fcmToken);
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    messaging().onTokenRefresh(async (token) => {
      console.log('refreshtoken', token);
      if (fcmToken !== token) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    });
  }

  render() {
    return null;
  }
}

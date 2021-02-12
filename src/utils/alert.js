import {Alert} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {PopScreen} from '../navigation/pushscreen';

export const Alerts = async (message, actions, payload) => {
  console.log('actions', actions);
  if (actions === 'modal') {
    Alert.alert(
      '',
      message || '',
      [{text: 'OK', onPress: () => PopScreen(payload)}],
      {
        cancelable: true,
      },
    );
  } else if (actions === 'playlist') {
    Alert.alert(
      '',
      message || '',
      [{text: 'OK', onPress: () => PopScreen(payload)}],
      {
        cancelable: true,
      },
    );
  } else {
    Alert.alert(
      '',
      message || '',
      [{text: 'OK', onPress: () => (actions ? actions(payload) : '')}],
      {
        cancelable: true,
      },
    );
  }
};

import {Alert} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {PopScreen} from '../navigation/pushscreen';

export const Alerts = async (message, actions, payload) => {
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

export const uploadTitle = () => `Choose a file to upload from your device`

export const uploadMessage = () => `By uploading, you confirm that your sounds conform with our Term of Use and you don't infringe on anyone else's rights.`
 
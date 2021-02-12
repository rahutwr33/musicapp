import {Navigation} from 'react-native-navigation';
import {LOGIN_SCREEN} from '../screen';

export function AuthStack(props) {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
    },
    statusBar: {
      backgroundColor: '#262626',
    },
    layout: {
      backgroundColor: '#262626',
      componentBackgroundColor: '#262626',
      direction: 'ltr',
      orientation: ['portrait'],
    },
  });

  Navigation.setRoot({
    root: {
      stack: {
        id: 'Auth',
        children: [
          {
            component: {
              name: LOGIN_SCREEN,
              id: 'login',
              passProps: {
                state: props.logout ? props.logout : false,
              },
              options: {
                topBar: {
                  visible: false,
                },
                statusBar: {
                  style: null,
                },
              },
            },
          },
        ],
      },
    },
  });
}

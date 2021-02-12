import {Navigation} from 'react-native-navigation';
import {BUFFER_SCREEN} from '../screen';

export function LoadAppScreen() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
    },
    statusBar: {
      style: 'light',
      backgroundColor: '#ffff',
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
        children: [
          {
            component: {
              name: BUFFER_SCREEN,
              options: {
                layout: {
                  backgroundColor: '#262626',
                  componentBackgroundColor: '#262626',
                },
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

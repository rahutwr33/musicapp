import {Navigation} from 'react-native-navigation';
import {SPLASH_SCREEN} from '../screen';

export function SplashScreen() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      // background: {
      //   color: '#039893'
      // },
      // title: {
      //   color: 'white',
      // },
      // backButton: {
      //   title: '', // Remove previous screen name from back button
      //   color: 'white'
      // },s
      // buttonColor: 'white',
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
              name: SPLASH_SCREEN,
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

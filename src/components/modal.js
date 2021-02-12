import {Navigation} from 'react-native-navigation';
import {PopScreen} from '../navigation/pushscreen';

import {
  FULL_SCREEN_PLAYER,
  ADD_SONG_PLAYLIST,
  CREATE_PLAYLIST,
  SONGS_CREDIT_SCREEN,
  ADD_SONG_TO_ALBUM,
} from '../navigation/screen';

export const showmodal = (props) => {
  Navigation.showModal({
    stack: {
      id: 'fullscreen.player',
      options: {
        bottomTabs: {
          visible: true,
        },
      },
      children: [
        // {
        //   component: {
        //     name: SONGS_CREDIT_SCREEN,
        //     id: 'songscredit.action',
        //     options: {
        //       modalPresentationStyle: 'fullScreen',
        //     },
        //   },
        // },
        // {
        //   component: {
        //     name: ADD_SONG_TO_ALBUM,
        //     id: 'album.list',
        //     options: {
        //       modalPresentationStyle: 'fullScreen',
        //     },
        //   },
        // },
        // {
        //   component: {
        //     name: CREATE_PLAYLIST,
        //     id: 'playlist',
        //     options: {
        //       modalPresentationStyle: 'fullScreen',
        //     },
        //   },
        // },
        // {
        //   component: {
        //     name: ADD_SONG_PLAYLIST,
        //     id: 'modal.action',
        //     passProps: {},
        //     options: {
        //       modalPresentationStyle: 'fullScreen',
        //     },
        //   },
        // },
        {
          component: {
            name: FULL_SCREEN_PLAYER,
            id: 'fullscreen.player',
            passProps: {
              state: props,
            },
            options: {
              modalPresentationStyle: 'fullScreen',
              layout: {
                direction: 'ltr',
              },
            },
          },
        },
      ],
    },
  });
};

export const closemodal = (props) => {
  PopScreen(props);
};

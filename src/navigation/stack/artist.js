import {Navigation} from 'react-native-navigation';
import {
  MAIN_SCREEN,
  SEARCH_SCREEN,
  Library_PLAYLIST_SCREEN,
  UPLOAD_SCREEN,
} from '../screen';
import Album from '../../assets/icons/Albums.png';
import Download from '../../assets/icons/Download_Items.png';
import Home from '../../assets/icons/Home.png';
import Search from '../../assets/icons/Serch.png';
export function ArtistMainStack() {
  const layouts = new Promise((resolve) => {
    Promise.all([]).then((icons) => {
      resolve({
        home: {
          root: {
            bottomTabs: {
              id: 'BOTTOM_TABS_LAYOUT',
              options: {
                bottomTabs: {
                  backgroundColor: '#474747',
                  titleDisplayMode: 'alwaysShow',
                  tabsAttachMode: 'onSwitchToTab',
                  currentTabIndex: 3,
                },
              },
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: UPLOAD_SCREEN,
                          id: 'upload',
                        },
                      },
                    ],
                    options: {
                      bottomTab: {
                        icon: Download,
                        testID: 'upload',
                        selectedIconColor: '#000',
                      },
                    },
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: Library_PLAYLIST_SCREEN,
                          id: 'library',
                        },
                      },
                    ],
                    options: {
                      bottomTab: {
                        icon: Album,
                        testID: 'library',
                        selectedIconColor: '#000',
                      },
                    },
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: SEARCH_SCREEN,
                          id: 'search',
                        },
                      },
                    ],
                    options: {
                      bottomTab: {
                        icon: Search,
                        testID: 'search',
                        selectedIconColor: '#000',
                      },
                    },
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: MAIN_SCREEN,
                          id: 'main',
                        },
                      },
                    ],
                    options: {
                      bottomTab: {
                        icon: Home,
                        testID: 'home',
                        selectedIconColor: '#000',
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      });
    });
  });

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
  layouts.then(({home}) => {
    Navigation.setRoot(home);
  });
}

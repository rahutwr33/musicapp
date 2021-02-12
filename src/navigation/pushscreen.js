import {Navigation} from 'react-native-navigation';

export const PopScreen = (props, tabvisible) => {
  Navigation.pop(props.componentId, {
    bottomTabs: {
      visible: tabvisible ? tabvisible : false,
    },
  });
};

export const toggleTabs = async (tabvisible) => {
  Navigation.mergeOptions('BOTTOM_TABS_LAYOUT', {
    bottomTabs: {
      visible: tabvisible,
    },
  });
};

export const PushScreen = (screen, props, tabvisible, index) =>
  Navigation.push(props.componentId, {
    component: {
      name: screen,
      passProps: {
        state: index,
      },
      options: {
        bottomTabs: {
          visible: tabvisible,
        },
        animations: {
          pop: {
            content: {
              translationX: {
                from: 0,
                to: -require('react-native').Dimensions.get('window').width,
                duration: 300,
              },
            },
          },
        },
      },
    },
  });
export const PushPropsScreen = (screen, props, tabvisible, cmprops) =>
  Navigation.push(props.componentId, {
    component: {
      name: screen,
      passProps: {
        state: cmprops,
      },
      options: {
        bottomTabs: {
          visible: tabvisible,
        },
        animations: {
          pop: {
            content: {
              translationX: {
                from: 0,
                to: -require('react-native').Dimensions.get('window').width,
                duration: 300,
              },
            },
          },
        },
      },
    },
  });

export const PoptoScreen = (screen, title, props, backbuttonvisible) =>
  Navigation.popTo(props.componentId, {
    component: {
      name: screen,
      passProps: {},
      options: {
        topBar: {
          title: {
            text: title,
            alignment: 'center',
          },
          backButton: {
            visible: backbuttonvisible,
          },
        },
        animations: {
          push: {
            content: {
              translationX: {
                from: require('react-native').Dimensions.get('window').width,
                to: 0,
                duration: 300,
              },
            },
          },
        },
      },
    },
  });

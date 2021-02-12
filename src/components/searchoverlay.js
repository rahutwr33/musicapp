import {Navigation} from 'react-native-navigation';

export const showsearchbar = (props) => {
  Navigation.showOverlay({
    stack: {
      id: 'overlaysearch',
      options: {
        layout: {
          componentBackgroundColor: 'transparent',
        },
        overlay: {
          interceptTouchOutside: false,
          handleKeyboardEvents: true,
        },
      },
      children: [
        {
          component: {
            name: props.Screen,
            id: 'overlaycmp',
            bottomTabs: {
              visible: true,
            },
            passProps: {
              placeholder: props.placeholder || '',
              type: props,
            },
          },
        },
      ],
    },
  });
};
export const closeOverlay = (props) => {
  // Navigation.pop(props.componentId);
  Navigation.dismissOverlay('overlaysearch');
};

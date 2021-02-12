// import {Navigation} from 'react-native-navigation';

// import {TAB1_SCREEN, TAB2_SCREEN, SIDEBAR_SCREEN} from '../screen';

// export function pushTabBasedApp() {
//   Navigation.setRoot({
//     root: {
//       sideMenu: {
//         right: {
//           component: {
//             name: SIDEBAR_SCREEN,
//             id: 'rightDrawer',
//             options: {
//               customTransition: {
//                 animations: [
//                   {
//                     startDelay: 0,
//                     springVelocity: 0.2,
//                     duration: 0.5,
//                   },
//                 ],
//                 duration: 0.8,
//               },
//             },
//           },
//         },
//         center: {
//           bottomTabs: {
//             options: {
//               bottomTabs: {
//                 titleDisplayMode: 'alwaysShow',
//               },
//             },
//             children: [
//               {
//                 stack: {
//                   children: [
//                     {
//                       component: {
//                         name: TAB1_SCREEN,
//                         id: 'home',
//                         options: {
//                           topBar: {
//                             title: {
//                               text: 'Home',
//                               alignment: 'center',
//                               color: 'white',
//                             },
//                             background: {
//                               color: '#039893',
//                             },
//                             leftButtons: [
//                               {
//                                 id: 'sidebar_btn',
//                                 icon: require('assets/icons/ic_tab_menu.png'),
//                                 color: 'black',
//                               },
//                             ],
//                             rightButtons: [],
//                           },
//                         },
//                       },
//                     },
//                   ],
//                   options: {
//                     bottomTab: {
//                       icon: require('assets/icons/ic_tab_home.png'),
//                       testID: 'FIRST_TAB_BAR_BUTTON',
//                       text: 'Home',
//                     },
//                   },
//                 },
//               },
//               {
//                 stack: {
//                   children: [
//                     {
//                       component: {
//                         name: TAB2_SCREEN,
//                         id: 'setting',
//                         options: {
//                           topBar: {
//                             title: {
//                               text: 'Settings',
//                               alignment: 'center',
//                               color: 'white',
//                             },
//                             background: {
//                               color: '#039893',
//                             },
//                             leftButtons: [],
//                             rightButtons: [],
//                           },
//                         },
//                       },
//                     },
//                   ],
//                   options: {
//                     bottomTab: {
//                       icon: require('assets/icons/ic_nav_user.png'),
//                       testID: 'SECOND_TAB_BAR_BUTTON',
//                       text: 'Settings',
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//         },
//         options: {
//           bottomTab: {
//             text: 'SideMenu',
//             testID: 'SIDE_MENU_TAB',
//           },
//         },
//       },
//     },
//   });
// }

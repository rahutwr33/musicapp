import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const statusbarheight =
  Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(true);

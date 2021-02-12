import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusbarheight =
  Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(true);
export const {height} = Dimensions.get('window');
const φ = (1 + Math.sqrt(5)) / 2;

export const MIN_HEADER_HEIGHT = statusbarheight;
export const MAX_HEADER_HEIGHT = height * (1 - 1 / φ);
export const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;
export const MobileHeight = height;

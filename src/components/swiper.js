import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  add,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  floor,
  not,
  set,
  useCode,
} from 'react-native-reanimated';
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from 'react-native-redash';

const {width, height} = Dimensions.get('window');
const Swiper = (props) => {
  // export const assets = [
  //   require('../assets/images/music.png'),
  //   require('../assets/images/music.png'),
  // require('./assets/2.jpg'),
  // require('./assets/4.jpg'),
  // require('./assets/5.jpg'),
  // require('./assets/1.jpg'),
  // ];
  const assets = props.image;
  const snapPoints = assets.map((_, i) => i * -width);

  const styles = StyleSheet.create({
    container: {
      // flex: 0.5,
    },
    pictures: {
      width: width * assets.length,
      height,
      flexDirection: 'row-reverse',
    },
    picture: {
      width,
      height,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: height / 2,
    },
  });
  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const {gestureHandler, state, velocity, translation} = usePanGestureHandler();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({clock, from: translateX, to})),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
          debug('index', index),
        ]),
      ]),
    ],
    [],
  );
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.pictures, {transform: [{translateX}]}]}>
            {assets.map((source) => (
              <View key={source} style={styles.picture}>
                <ImageBackground style={styles.image} {...{source}} />
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Swiper;

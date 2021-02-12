/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {MAX_HEADER_HEIGHT, HEADER_DELTA} from './Model';
import {BUTTON_HEIGHT} from './ShufflePlay';

const {interpolate, Extrapolate} = Animated;

export const Cover = ({album: {cover}, y}) => {
  const scale = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [0, 1],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = interpolate(y, {
    inputRange: [-64, 0, HEADER_DELTA],
    outputRange: [0, 0.2, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View style={[styles.container, {transform: [{scale}]}]}>
      <Image style={styles.image} source={{uri: cover}} resizeMode="cover" />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'black',
          opacity,
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';

import {MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT} from './Model';
import {Track} from './Track';
import {ShufflePlay, BUTTON_HEIGHT} from './ShufflePlay';
import Header from './Header';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

const {interpolate, Extrapolate} = Animated;

export const Content = ({
  album: {artist, tracks},
  y,
  onPress,
  onshuffleplay,
}) => {
  const {t, i18n} = useTranslation();
  const height = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, -BUTTON_HEIGHT / 2],
    outputRange: [0, MAX_HEADER_HEIGHT + BUTTON_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const renderlistheader = () => {
    return (
      <View style={styles.listheader}>
        <Text
          style={{
            ...styles.fontcolor,
            ...{fontSize: 16, paddingLeft: 10, fontWeight: '600'},
          }}>
          {t('Popular_release')}
        </Text>
      </View>
    );
  };
  return (
    <Animated.ScrollView
      onScroll={onScrollEvent({y})}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      stickyHeaderIndices={[1]}>
      <View style={styles.cover}>
        <Animated.View style={[styles.gradient, {height}]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={['transparent', 'rgba(0, 0, 0, 0.2)', '#000']}
          />
        </Animated.View>
        <View style={styles.artistContainer}>
          <Animated.Text
            adjustsFontSizeToFit={true}
            style={[styles.artist, {opacity}]}>
            {artist}
          </Animated.Text>
          <Text style={styles.info}>413,413 Monthly Listners</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Header {...{y, artist}} />
        <ShufflePlay onshuffleplay={onshuffleplay} />
      </View>
      <View style={styles.tracks}>
        <FlatList
          data={tracks}
          ListHeaderComponent={renderlistheader}
          renderItem={(item) => {
            return (
              <Track
                Play={onPress}
                index={item.index + 1}
                track={{...item.item, artist}}
              />
            );
          }}
          keyExtractor={(item) => item.key}
        />
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
    marginBottom: 70,
    marginTop: 80,
  },
  cover: {
    height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artist: {
    textAlign: 'center',
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  header: {
    marginTop: -BUTTON_HEIGHT,
  },
  info: {
    color: '#fff',
    opacity: 0.5,
    fontSize: 16,
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: 'black',
  },
  fontcolor: {
    color: '#fff',
    textAlign: 'left',
  },
});

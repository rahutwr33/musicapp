/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MUSICLOGO from '../../assets/images/musiclogo.png';

export const Track = ({track, Play}) => (
  <TouchableOpacity
    style={styles.row}
    onPress={() => {
      console.log(11111);
      Play(track);
    }}>
    <View
      style={[
        styles.cell,
        {flex: 0.1, alignItems: 'center', justifyContent: 'center'},
      ]}>
      {/* <Icon name="ellipsis-v" color="#b2b3b4" size={24} /> */}
    </View>
    <View style={[styles.cell, {alignItems: 'center', flex: 0.9}]}>
      <Image
        source={track.cover ? {uri: track.cover} : MUSICLOGO}
        style={styles.imagestyle}
      />
      <View style={styles.space}>
        <Text style={styles.name}>{track.song_title}</Text>
        <Text style={styles.artist}>{track.artist_name || ''}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 10,
  },
  cell: {
    flexDirection: 'row',
  },
  index: {
    color: '#b2b3b4',
  },
  artist: {
    color: '#b2b3b4',
    textAlign: 'left',
    fontSize: 12,
    paddingTop: 5,
  },
  name: {
    color: 'white',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '700',
  },
  space: {
    paddingLeft: 20,
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import HidenArtistScreen from './artist';
import HiddenSongsScreen from './songs';
import Player from '../../components/miniplayer';
import MainHeaders from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';

const HiddenMainScreen = (props) => {
  const [tabindex, settabIndex] = useState(props.state);
  return (
    <SafeAreaView style={styles.container}>
      <MainHeaders
        title="Hidden"
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <View style={styles.headerstyle}>
        <TouchableOpacity style={styles.space} onPress={() => settabIndex(0)}>
          <Text
            adjustsFontSizeToFit={true}
            style={[
              styles.tabfontcolor,
              {
                color: tabindex === 0 ? '#01BDBD' : '#fff',
                opacity: tabindex === 0 ? 1 : 0.5,
              },
            ]}>
            Artist
          </Text>
          {tabindex === 0 ? <View style={styles.underline} /> : null}
        </TouchableOpacity>
        <TouchableOpacity style={styles.space} onPress={() => settabIndex(1)}>
          <Text
            adjustsFontSizeToFit={true}
            style={[
              styles.tabfontcolor,
              {
                color: tabindex === 1 ? '#01BDBD' : '#fff',
                opacity: tabindex === 1 ? 1 : 0.5,
              },
            ]}>
            Songs
          </Text>
          {tabindex === 1 ? <View style={styles.underline} /> : null}
        </TouchableOpacity>
      </View>
      <View style={styles.contentstyle}>
        {tabindex === 0 ? <HidenArtistScreen {...props} /> : null}
        {tabindex === 1 ? <HiddenSongsScreen {...props} /> : null}
      </View>
      <Player />
    </SafeAreaView>
  );
};

export default HiddenMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#262626',
  },
  headerstyle: {
    flexDirection: 'row',
    width: null,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  tabfontcolor: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabStyle: {backgroundColor: '#262626'},
  tabContainerStyle: {
    backgroundColor: '#262626',
  },
  underline: {
    backgroundColor: '#01BDBD',
    width: null,
    height: 2,
  },
  space: {
    marginHorizontal: 20,
    padding: 10,
  },
  contentstyle: {
    flex: 1,
  },
});

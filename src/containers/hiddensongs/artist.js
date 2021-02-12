/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Hidden from '../../assets/svg/hidden.svg';
const playlist = [
  {
    id: 'gdhagwdagwdhjagwdhjgawd',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    name: 'Sweet but psycho',
    artist: 'Ava max',
  },
];
const HidenArtistScreen = (props) => {
  const renderItem = ({item, index}) => (
    <View
      key={`playlist${String(item.id)}${Date.now()}`}
      style={styles.liststyle}>
      <TouchableOpacity style={{flex: 0.9}}>
        <View style={{flexDirection: 'row-reverse', padding: 10}}>
          <Image source={{uri: item.uri}} style={styles.imagestyle} />
          <View style={{marginRight: 10}}>
            <Text
              adjustsFontSizeToFit={true}
              style={{...styles.rightstyle, ...styles.topspace}}>
              {/* {index === 0 ? (
                <Icons name="alpha-e-box" size={20} color="#01BDBD" />
              ) : null} */}
              {item.name}
            </Text>
            <View style={{flexDirection: 'row-reverse'}}>
              <Text
                adjustsFontSizeToFit={true}
                style={{
                  ...styles.rightstyle,
                  ...styles.rightspace,
                  ...{fontSize: 12},
                }}>
                {item.artist}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dotstyle} onPress={() => {}}>
        <Hidden width="16" height="15" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.content2} />
      <View style={styles.content3}>
        <FlatList
          data={playlist}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HidenArtistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#262626',
  },
  listheader: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingRight: 10,
  },
  liststyle: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  smalfont: {
    color: '#fff',
    opacity: 0.5,
    paddingLeft: 5,
  },
  dotstyle: {
    marginLeft: 10,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  imagestyle2: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },
  content: {
    width: '100%',
    height: 40,
    marginTop: 20,
  },
  content2: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content3: {
    flex: 0.8,
    marginBottom: 70,
  },
  rightstyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '700',
  },
  fontcolor: {
    color: '#fff',
  },
  block: {
    width: 50,
    height: 50,
    backgroundColor: '#01BDBD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topspace: {
    marginRight: 10,
  },
  rightspace: {
    paddingTop: 5,
    marginRight: 10,
  },
});

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {Content} from './Content';
import {Cover} from './Cover';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PopScreen, PushScreen} from '../../navigation/pushscreen';
import {FULL_SCREEN_PLAYER} from '../../navigation/screen';
import Player from '../miniplayer';
import {followartist} from '../../globals/store/actions/song';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

const {Value} = Animated;

export const Album = ({album, props}) => {
  const y = new Value(0);
  const {t, i18n} = useTranslation();
  const openplayer = async (item) => {
    item.state = true;
    const results = await props.currentplaylist({
      item: item,
      list: album.tracks,
      currentsong: props.Player.currentsong,
    });
    if (results.success) {
      const tmp = await props.currentsong({
        item: item,
        currentsong: props.Player,
        currentsongid: item.song_id,
      });
      if (tmp.success) {
        // showmodal(item);
      }
      // PushScreen(FULL_SCREEN_PLAYER, props, true, 0);
      // showmodal(item);
    }
  };

  const shuffleplay = async () => {
    const results = await props.currentsong({
      item: {},
      currentsong: props.Player,
      currentsongid: 'shuffle',
    });
    if (results.success) {
      // showmodal(item);
    }
  };
  const follow = async () => {
    const response = await followartist({
      artist_id: album.id,
      is_follow: 1,
    });
    if (response && response.success) {
      Alert.alert('Artist followed successfully!');
    }
  };
  return (
    <View style={styles.container}>
      <Cover {...{y, album}} />
      <Content
        {...{y, album}}
        onPress={(e) => openplayer(e)}
        onshuffleplay={(e) => shuffleplay(e)}
      />
      <View style={styles.topbtnstyle}>
        <TouchableOpacity onPress={() => PopScreen(props, true)}>
          <Icon name="long-arrow-left" size={25} color="#fff" />
        </TouchableOpacity>
        <View />
        <View style={styles.row}>
          <View style={styles.rowspace}>
            <TouchableOpacity
              onPress={() => follow()}
              style={{
                backgroundColor: '#01BDBD',
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 10,
              }}>
              <Text style={styles.fontstyle}>{t('Follow')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowspace}>
            <TouchableOpacity style={styles.rowspace}>
              <Icon name="ellipsis-h" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Player />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  titlestyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  topbtnstyle: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
    width: '100%',
    top: 50,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowspace: {
    marginHorizontal: 10,
  },
  fontstyle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
  },
});

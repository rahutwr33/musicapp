/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Item, Form} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Heart from '../assets/svg/heart.svg';
import Wave from '../assets/svg/wave.svg';
import {
  CREATE_PLAYLIST,
  LIKED_SONG_SCREEN,
  PLAYLIST_SEARCH_SCREEN,
} from '../navigation/screen';
import {PushScreen} from '../navigation/pushscreen';
import NoImage from '../assets/images/noimage.png';
import {useTranslation} from 'react-i18next';

const PlayListSection = (props) => {
  const {t, i18n} = useTranslation();
  let playlist = [];
  if (props && props.Playlist && props.Playlist) {
    if (props.tabindex === 0) {
      if (Array.isArray(props.Playlist.albums)) {
        playlist = props.Playlist.albums;
      } else {
        playlist = [];
      }
    } else if (props.tabindex === 1) {
      if (Array.isArray(props.Playlist.songs)) {
        playlist = props.Playlist.songs;
      } else {
        playlist = [];
      }
    } else if (props.tabindex === 2) {
      if (Array.isArray(props.Playlist.playlist)) {
        playlist = props.Playlist.playlist;
      } else {
        playlist = [];
      }
    }
  }
  const [placeholder, setplaceholder] = useState('');
  useEffect(() => {
    if (props.tabindex === 0) {
      setplaceholder('album');
    } else if (props.tabindex === 1) {
      setplaceholder('artist');
    } else if (props.tabindex === 2) {
      setplaceholder('playlist');
    }
  }, [props]);
  const createplaylist = () => {
    PushScreen(CREATE_PLAYLIST, props, true, 0);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={`playlist${String(item.id)}${Date.now()}`}
      onPress={async () => {
        if (props.tabindex === 0) {
          let res = await props.currentplaylist({
            list: item.song,
            item: item,
            currentsong: props.Player.currentsong,
          });
          if (res.success) {
            PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
          }
        }
        if (props.tabindex === 1) {
          let res = await props.currentplaylist({
            list: [item],
            item: [item],
            currentsong: props.Player.currentsong,
          });
          if (res.success) {
            PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
          }
        }
        if (props.tabindex === 2) {
          let res = await props.currentplaylist({
            list: item.song,
            item: item,
            currentsong: props.Player.currentsong,
          });
          if (res.success) {
            PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
          }
        }
      }}
      style={styles.liststyle}>
      {props.tabindex === 1 && !item.hide ? (
        <>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Image
              source={item.cover_image ? {uri: item.cover_image} : NoImage}
              style={styles.imagestyle}
            />
            <View>
              <Text
                adjustsFontSizeToFit={true}
                style={{...styles.rightstyle, ...styles.topspace}}>
                {props.tabindex === 0
                  ? item.album
                  : props.tabindex === 1
                  ? item.song_title
                  : props.tabindex === 2
                  ? item.playlist
                  : ''}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {props.tabindex === 2 || props.tabindex === 0 ? (
                  <View style={styles.waveicon}>
                    <Wave preserveAspectRatio="none" width={20} height={10} />
                  </View>
                ) : null}
                <Text
                  adjustsFontSizeToFit={true}
                  style={{
                    ...styles.rightstyle,
                    ...styles.rightspace,
                    ...{fontSize: 12, opacity: 0.5},
                  }}>
                  {props.tabindex === 0
                    ? `${item.total_songs} Song`
                    : props.tabindex === 1
                    ? item.artist_name
                    : props.tabindex === 2
                    ? `${item.total_song} Song`
                    : ''}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Image
              source={item.cover_image ? {uri: item.cover_image} : NoImage}
              style={styles.imagestyle}
            />
            <View>
              <Text
                adjustsFontSizeToFit={true}
                style={{...styles.rightstyle, ...styles.topspace}}>
                {props.tabindex === 0
                  ? item.album
                  : props.tabindex === 1
                  ? item.song_title
                  : props.tabindex === 2
                  ? item.playlist
                  : ''}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {props.tabindex === 2 || props.tabindex === 0 ? (
                  <View style={styles.waveicon}>
                    <Wave preserveAspectRatio="none" width={20} height={10} />
                  </View>
                ) : null}
                <Text
                  adjustsFontSizeToFit={true}
                  style={{
                    ...styles.rightstyle,
                    ...styles.rightspace,
                    ...{fontSize: 12, opacity: 0.5},
                  }}>
                  {props.tabindex === 0
                    ? `${item.total_songs} ${t('Songs')}`
                    : props.tabindex === 1
                    ? item.artist_name
                    : props.tabindex === 2
                    ? `${item.total_song} ${t('Songs')}`
                    : ''}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
  const showplaylistoption = () => {
    return (
      <>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.rowalign}
            onPress={() => createplaylist()}>
            <Icon
              style={styles.searchIcon}
              name="plus-circle"
              size={25}
              color="#fff"
            />
            <Text
              style={{
                ...styles.rightstyle,
                ...{fontSize: 20, fontWeight: '500', paddingLeft: 10},
              }}>
              {t('Create_Playlist')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content2}>
          <TouchableOpacity
            style={{flexDirection: 'row', padding: 10}}
            onPress={() => PushScreen(LIKED_SONG_SCREEN, props, true, 2)}>
            <View style={styles.block}>
              <Heart preserveAspectRatio="none" width={30} height={30} />
            </View>
            <View>
              <Text style={{...styles.rightstyle, ...styles.topspace}}>
                {t('Liked_Songs')}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{...styles.rightstyle, ...styles.rightspace}}>
                  {props && props.Playlist.likedsong
                    ? props.Playlist.likedsong.length
                    : ''}{' '}
                  {t('Songs')}
                </Text>
                <View style={styles.waveicon}>
                  <Wave preserveAspectRatio="none" width={20} height={10} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnstyle}>
        <View style={styles.inputstyle}>
          <Form>
            <Item
              regular
              style={styles.borderInput}
              onPress={() => {
                props.activesearchbar(true);
              }}>
              <Icon
                style={styles.searchIcon}
                name="search"
                size={16}
                color="#929292"
              />
              <Text style={styles.fontStyle}>{`${t('find_song')} ${t(
                placeholder,
              )}`}</Text>
            </Item>
          </Form>
        </View>
      </View>
      {props && props.tabindex === 2 ? showplaylistoption() : null}
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

export default PlayListSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#262626',
  },
  fontcolor: {
    color: '#fff',
    fontSize: 16,
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  btnstyle: {
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
    width: '100%',
    margin: 10,
  },
  liststyle: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fontStyle: {
    color: '#ffffff',
    textAlign: 'left',
    padding: 15,
  },
  borderInput: {
    borderColor: '#ffffff',
    textAlign: 'right',
    // justifyContent: 'flex-end',
    paddingLeft: 5,
  },
  searchIcon: {
    textAlign: 'left',
  },
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
  },
  inputstyle: {
    flex: 1,
    marginRight: 20,
  },
  filterbtnalign: {
    marginTop: 10,
  },
  content: {
    width: '100%',
    height: 40,
    marginTop: 10,
    paddingRight: 10,
  },
  content2: {
    width: '100%',
    height: 80,
  },
  content3: {
    flex: 1,
    marginBottom: 60,
  },
  rightstyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  rowalign: {
    flexDirection: 'row',
    marginLeft: 15,
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
    marginLeft: 10,
    fontWeight: '700',
  },
  rightspace: {
    paddingTop: 5,
    marginLeft: 10,
  },
  waveicon: {
    marginTop: 10,
    marginLeft: 10,
  },
});

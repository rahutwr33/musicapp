/* eslint-disable no-sequences */
/* eslint-disable consistent-this */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Form, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {searchAll} from '../globals/store/actions/playlist';
import Wave from '../assets/svg/wave.svg';
import {PushScreen} from '../navigation/pushscreen';
import {
  PLAYLIST_SEARCH_SCREEN,
  // PLAYLIST_ACTION_MODEL,
} from '../navigation/screen';
import {currentplaylist} from '../globals/store/actions/player';
import NoImage from '../assets/images/noimage.png';
import api from '../config/api';
// import {showmodal} from './modal';
import {useTranslation} from 'react-i18next';

function debounce(a, b, c) {
  var d, e;
  return function () {
    function h() {
      (d = null), c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
}
const GlobalSearchBarScreen = (props) => {
  const [state, setplaceholder] = useState('');
  const [search, setsearch] = useState('');
  const [list, setList] = useState([]);
  const [message, setMessage] = useState([]);
  const [loader, setloader] = useState(false);
  const {t, i18n} = useTranslation();

  var results = null;
  useEffect(() => {
    if (props && props.type === 0) {
      setplaceholder('albums');
    }
    if (props && props.type === 1) {
      setplaceholder('songs');
    }
    if (props && props.type === 2) {
      setplaceholder('playlist');
    }
  }, [props]);
  const filter = debounce((searchvalue) => {
    Promise.resolve(setsearch(searchvalue)).then(async () => {
      let val = searchvalue;
      setloader(true);
      console.log(state)
      if (state === 'playlist') {
        results = await searchAll(`create-playlist?playlist_name=${val}`);
        if (results.success) {
          setloader(false);
          setList(results.data);
          if (results.data.length === 0) {
            setMessage('No playlist found.');
          } else {
            setMessage('');
          }
        }
      } else if (state === 'songs') {
        console.log(searchvalue)

        results = await searchAll(`song-view?song_name=${val}`);
        if (results.success) {
          setloader(false);
          setList(results.data);
          if (results.data.length === 0) {
            setMessage('No song found.');
          } else {
            setMessage('');
          }
        }
      } else if (state === 'albums') {
        results = await searchAll(`album?album_name=${val}`);
        if (results.success) {
          setloader(false);
          setList(results.data);
          if (results.data.length === 0) {
            setMessage('No album found.');
          } else {
            setMessage('');
          }
        }
      }
    });
  }, 1000);
  const renderItem = ({item}) => (
    <TouchableOpacity
      key={`playlist${String(item.id)}${Date.now()}`}
      onPress={async () => {
        if (state === 'album') {
          let res1 = await props.currentplaylist({
            item: item,
            list: item.song,
            currentsong: props.Player.currentsong,
          });
          if (res1.success) {
            PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
            // showmodal(item);
          }
          // props.activesearchbar(false);
        } else if (state === 'song') {
          let res2 = await props.currentplaylist({
            item: item,
            list: [item],
            currentsong: props.Player.currentsong,
          });
          if (res2.success) {
            PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
            // showmodal(item);
          }
        } else if (state === 'playlist') {
          let res3 = await props.currentplaylist({
            item: item,
            list: item.song,
            currentsong: props.Player.currentsong,
          });
          if (res3.success) {
            PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
            // showmodal(item);
          }
          // props.activesearchbar(false);
        }
      }}
      style={styles.liststyle}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Image
          source={
            state === 'album'
              ? item.album_pic
                ? {uri: api.imageurl + item.album_pic}
                : NoImage
              : state === 'song'
              ? item.song_image
                ? {uri: api.imageurl + item.song_image}
                : NoImage
              : state === 'playlist'
              ? item.cover_image
                ? {uri: api.imageurl + item.cover_image}
                : NoImage
              : NoImage
          }
          style={styles.imagestyle}
        />
        <View>
          <Text
            adjustsFontSizeToFit={true}
            style={{...styles.rightstyle, ...styles.topspace}}>
            {state === 'album'
              ? item.album
              : state === 'song'
              ? item.song_title
              : state === 'playlist'
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
              {state === 'album'
                ? `${item.total_songs} Song`
                : state === 'song'
                ? item.artist_name
                : state === 'playlist'
                ? `${item.total_song} Song`
                : ''}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.viewstyle}>
        <Form style={styles.formstyle}>
          <Item regular style={styles.borderInput}>
            <Icon
              style={styles.searchIcon}
              name="times-circle"
              size={20}
              color="#fff"
              onPress={() => props.activesearchbar(false)}
            />
            <Input
              placeholderTextColor="#ffffff"
              placeholder={`${t('find_song')} ${t(state)}`}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="off"
              focusable={true}
              style={styles.emailInput}
              autoFocus={true}
              onChangeText={(e) => filter(e)}
            />
          </Item>
          <View style={{alignSelf: 'center', marginTop: 10}}>
            <Text style={{color: '#fff', fontSize: 16}}>{message}</Text>
          </View>
        </Form>
        <View style={styles.content}>
          {loader ? <ActivityIndicator size="large" /> : null}
          <FlatList
            data={list}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Playlist: state.Playlist || [],
  Player: state.Player,
});

const mapDispatchToProps = {currentplaylist};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalSearchBarScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  liststyle: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewstyle: {
    flex: 1,
  },
  fontstyle: {
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  borderInput: {
    borderColor: '#ffffff',
  },
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '600',
  },
  searchIcon: {
    paddingLeft: 15,
    top: 2,
  },
  formstyle: {
    margin: 25,
  },
  content: {
    flex: 1,
    marginBottom: 60,
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  rightstyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  topspace: {
    marginLeft: 10,
    fontWeight: '700',
  },
  waveicon: {
    marginTop: 10,
    marginLeft: 10,
  },
  rightspace: {
    paddingTop: 5,
    marginLeft: 5,
  },
});

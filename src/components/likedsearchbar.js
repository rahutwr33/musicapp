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
import {PushPropsScreen, PushScreen} from '../navigation/pushscreen';
import {
  PLAYLIST_SEARCH_SCREEN,
  PLAYLIST_ACTION_MODEL,
} from '../navigation/screen';
import {currentplaylist} from '../globals/store/actions/player';
import NoImage from '../assets/images/noimage.png';
import {showmodal} from './modal';
import api from '../config/api';

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
const LikedSearchBarScreen = (props) => {
  const [search, setsearch] = useState('');
  const [list, setList] = useState([]);
  const [message, setMessage] = useState([]);
  const [load, setload] = useState(false);
  var results = null;

  const filter = debounce((searchvalue) => {
    setload(true);
    Promise.resolve(setsearch(searchvalue)).then(async () => {
      let val = searchvalue;
      results = await searchAll(`like-song?song_name=${val}`);
      if (results.success) {
        setload(false);
        setList(results.data);
        if (results.data.length === 0) {
          setMessage('No song found.');
        } else {
          setMessage('');
        }
      }
    });
  }, 1000);
  const renderItem = ({item}) => (
    <View
      key={`playlist${String(item.id)}${Date.now()}`}
      style={styles.liststyle}>
      <TouchableOpacity
        style={{flex: 0.9}}
        onPress={async () => {
          let res3 = await props.currentplaylist({
            item: item,
            list: [item],
            currentsong: props.Player.currentsong,
          });
          if (res3.success) {
            PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
            // showmodal(item);
          }
          // openplayer(item);
          // props.activesearchbar(false);
        }}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Image
            source={
              item.song_detail && item.song_detail.song_image
                ? {uri: api.imageurl + item.song_detail.song_image}
                : NoImage
            }
            style={styles.imagestyle}
          />
          <View style={{marginRight: 10}}>
            <Text
              adjustsFontSizeToFit={true}
              style={{...styles.rightstyle, ...styles.topspace}}>
              {item.song_detail.song_title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                adjustsFontSizeToFit={true}
                style={{
                  ...styles.rightstyle,
                  ...styles.rightspace,
                  ...{fontSize: 14, fontWeight: '500', opacity: 0.5},
                }}>
                {item.song_detail.artist_name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dotstyle}
        onPress={() => {
          // PushPropsScreen(PLAYLIST_ACTION_MODEL, props, false, item);
          props.activesearchbar(false);
        }}>
        <Icon name="ellipsis-v" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
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
            placeholder={props.placeholder}
            autoCapitalize="none"
            focusable={true}
            style={styles.emailInput}
            autoCompleteType="off"
            autoCorrect={false}
            autoFocus={true}
            onChangeText={(e) => filter(e)}
          />
        </Item>
        <View style={{alignSelf: 'center', marginTop: 10}}>
          <Text style={{color: '#fff', fontSize: 16}}>{message}</Text>
        </View>
      </Form>
      {load ? <ActivityIndicator size="large" /> : null}
      <FlatList
        data={list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
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
)(LikedSearchBarScreen);

const styles = StyleSheet.create({
  container: {},
  liststyle: {
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewstyle: {},
  fontstyle: {
    color: '#fff',
    textAlign: 'center',
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
  dotstyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  searchIcon: {
    paddingLeft: 15,
    top: 2,
  },
  formstyle: {
    margin: 25,
  },
  content: {},
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
    marginLeft: 5,
  },
  rightspace: {
    paddingTop: 5,
    marginLeft: 10,
  },
});

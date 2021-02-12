/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import {Form, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {statusbarheight} from '../utils/statusbarheight';
import Wave from '../assets/svg/wave.svg';
import NoImage from '../assets/images/noimage.png';
import {searchAll} from '../globals/store/actions/playlist';
import {currentplaylist} from '../globals/store/actions/player';
import {connect} from 'react-redux';
import {PushScreen} from '../navigation/pushscreen';
import {PLAYLIST_SEARCH_SCREEN} from '../navigation/screen';
import {PopScreen} from '../navigation/pushscreen';

// import {closeOverlay} from './searchoverlay';
// import {showmodal} from './modal';
// import {PushPropsScreen} from '../navigation/pushscreen';

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
const SearchBarScreen = (props) => {
  const [message, setMessage] = useState('');
  const [search, setsearch] = useState('');
  const [list, setList] = useState([]);
  let [inputref, setinputref] = useState('');
  let [load, setload] = useState(false);

  const filter = debounce((searchvalue) => {
    setload(true);
    Promise.resolve(setsearch(searchvalue)).then(async () => {
      let val = searchvalue;
      const results = await searchAll(`song-view?song_name=${val}`);
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
  const openplayer = async (item) => {
    item.state = true;
    const results = await props.currentplaylist({
      item: item,
      list: list,
      currentsong: props.Player.currentsong,
    });
    if (results.success) {
      PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
      // closeOverlay(props);
      // showmodal(item);
    }
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      key={`playlist${String(item.id)}${Date.now()}`}
      onPress={() => {
        openplayer(item);
      }}
      style={styles.liststyle}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Image
          source={item.cover_image ? {uri: item.cover_image} : NoImage}
          style={styles.imagestyle}
        />
        <View>
          <Text
            adjustsFontSizeToFit={true}
            style={{...styles.rightstyle, ...styles.topspace}}>
            {item.song_title}
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
                ...{fontSize: 12},
              }}>
              {item.artist_name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.viewstyle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.1}}>
            <Icon
              style={styles.searchIcon}
              name="long-arrow-left"
              size={25}
              color="#fff"
              onPress={() => PopScreen(props)}
            />
          </View>
          <View style={{flex: 0.9}}>
            <Form style={styles.formstyle}>
              <Item regular style={styles.borderInput}>
                <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={16}
                  color="#fff"
                />
                <Input
                  placeholderTextColor="#ffffff"
                  placeholder={
                    props.state && props.state.placeholder
                      ? props.state.placeholder
                      : ''
                  }
                  autoCapitalize="none"
                  style={styles.emailInput}
                  autoCorrect={false}
                  autoCompleteType="off"
                  autoFocus={true}
                  ref={(input) => setinputref(input)}
                  onChangeText={(e) => filter(e)}
                />
                <Icon
                  style={styles.closeIcon}
                  name="times-circle"
                  size={16}
                  color="#fff"
                  onPress={() => {
                    inputref.setNativeProps({
                      text: ' ',
                    });
                    setList([]);
                  }}
                />
              </Item>
            </Form>
          </View>
        </View>
        <View style={styles.messagestyle}>
          <Text style={styles.emailInput}>{message}</Text>
        </View>
      </View>
      <View style={styles.content}>
        {load ? <ActivityIndicator size="large" /> : false}
        <FlatList
          data={list}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    marginTop: statusbarheight,
  },
  viewstyle: {
    flex: 0.15,
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
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
  },
  closeIcon: {
    paddingRight: 15,
    top: 2,
  },
  searchIcon: {
    top: 2,
    paddingLeft: 10,
  },
  formstyle: {
    margin: 10,
  },
  messagestyle: {
    alignSelf: 'center',
  },
  content: {
    flex: 0.85,
  },
  liststyle: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  rightspace: {
    paddingTop: 5,
    marginLeft: 10,
  },
  waveicon: {
    marginTop: 10,
    marginLeft: 5,
  },
});

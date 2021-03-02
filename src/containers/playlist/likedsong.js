/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import {LargeButton} from '../../components/button';
import {Item, Form} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Player from '../../components/miniplayer';
import {PopScreen, PushPropsScreen} from '../../navigation/pushscreen';
import {connect} from 'react-redux';
import {statusbarheight} from '../../utils/statusbarheight';
import NoImage from '../../assets/images/noimage.png';
import LikedSearchBarScreen from '../../components/likedsearchbar';
import {PLAYLIST_ACTION_MODEL} from '../../navigation/screen';
import {currentplaylist} from '../../globals/store/actions/player';
import {PushScreen} from '../../navigation/pushscreen';
import {PLAYLIST_SEARCH_SCREEN} from '../../navigation/screen';
import {Content} from 'native-base';
import {currentsong} from '../../globals/store/actions/player';
import {useTranslation} from 'react-i18next';
import api from '../../config/api';

// import {showmodal} from '../../components/modal';

const {width} = Dimensions.get('window');

const LikedSong = (props) => {
  const [likedsongArr, setstate] = useState([]);
  const {Playlist} = props;
  const {likedsong} = Playlist;
  const [screenstate, setscreenstate] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const {t, i18n} = useTranslation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  });
  useEffect(() => {
    if (likedsong && Array.isArray(likedsong)) {
      let tempsong = likedsong.map((key) => {
        return key.song_detail;
      });
      setstate(tempsong);
    }
  }, []);

  const openplayer = async (item) => {
    item.state = true;
    const results = await props.currentplaylist({
      item: {
        ...item,
        ...item.song_detail,
      },
      list: likedsongArr,
      currentsong: props.Player.currentsong,
    });
    if (results.success) {
      PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
      // showmodal({
      //   ...item,
      //   ...item.song_detail,
      // });
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
  const renderItem = ({item}) => (
    <View
      key={`playlist${String(item.id)}${Date.now()}`}
      style={styles.liststyle}>
      <TouchableOpacity style={{flex: 0.9}} onPress={() => openplayer(item)}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Image
            source={item.song_image ? {uri: api.imageurl+item.song_image} : NoImage}
            style={styles.imagestyle}
          />
          <View style={{marginLeft: 10}}>
            <Text
              adjustsFontSizeToFit={true}
              style={{...styles.rightstyle, ...styles.topspace}}>
              {item.song_title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                adjustsFontSizeToFit={true}
                style={{
                  ...styles.rightstyle,
                  ...styles.rightspace,
                  ...{fontSize: 14, fontWeight: '500', opacity: 0.5},
                }}>
                {item.artist_name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dotstyle}
        onPress={() => {
          PushPropsScreen(PLAYLIST_ACTION_MODEL, props, false, {
            ...{detail: true},
            ...item,
          });
        }}>
        <Icon name="ellipsis-v" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  const renderheader = () => {
    return (
      <View style={styles.space}>
        <View style={styles.btnstyle}>
          <View style={styles.inputstyle}>
            <Form>
              <Item
                regular
                style={styles.borderInput}
                onPress={() => {
                  setscreenstate(true);
                }}>
                <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={16}
                  color="#929292"
                />
                <Text style={styles.fontStyle}>{t('Find_in_liked_songs')}</Text>
              </Item>
            </Form>
          </View>
          {/* <View style={styles.filterbtnalign}>
            <SmallButton buttonTitle="FILTERS" />
          </View> */}
          <TouchableOpacity
            style={styles.filterbtnalign}
            onPress={() => PopScreen(props, true)}>
            <Icons color="#ffffff" name="long-arrow-right" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text
            style={{
              ...styles.fontcolor,
              ...{textAlign: 'center', fontWeight: '700'},
            }}>
            {t('Liked_Songs')}
          </Text>
        </View>
        <View style={styles.content2}>
          <LargeButton
            buttonTitle={t('Shuffle_Play')}
            onPress={() => shuffleplay()}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {!screenstate ? (
        <Content style={styles.content3}>
          <FlatList
            data={likedsongArr}
            // contentOffset={{y: 60}}
            renderItem={(item) => renderItem(item)}
            ListHeaderComponent={renderheader}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </Content>
      ) : null}
      {screenstate ? (
        <View style={styles.content3}>
          <Animated.View style={[{opacity: fadeAnim}]}>
            <LikedSearchBarScreen
              {...props}
              activesearchbar={(e) => setscreenstate(e)}
              placeholder={t('Find_in_liked_songs')}
            />
          </Animated.View>
        </View>
      ) : null}
      <Player />
    </View>
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Playlist: state.Playlist || [],
  Player: state.Player,
});

const mapDispatchToProps = {currentplaylist, currentsong};
export default connect(mapStateToProps, mapDispatchToProps)(LikedSong);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    marginTop: statusbarheight,
  },
  fontcolor: {
    color: '#fff',
    fontSize: 21,
  },
  btnstyle: {
    flexDirection: 'row',
    height: 50,
    flex: 0.9,
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  liststyle: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dotstyle: {
    marginLeft: 10,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  borderInput: {
    borderColor: '#ffffff',
    textAlign: 'left',
    width: width - 70,
  },
  fontStyle: {
    color: '#ffffff',
    textAlign: 'left',
    padding: 15,
    paddingLeft: 5,
  },
  searchIcon: {textAlign: 'left', paddingLeft: 5},
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
    paddingRight: 10,
  },
  inputstyle: {
    flexDirection: 'row',
    flex: 0.9,
  },
  filterbtnalign: {
    alignItems: 'center',
    width: null,
    marginTop: 10,
  },
  content: {
    width: '100%',
    height: 40,
    marginTop: 20,
  },
  content2: {
    width: '100%',
    height: null,
  },
  content3: {
    flex: 1,
    marginBottom: 60,
  },
  rightstyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
  },
  rowalign: {
    flexDirection: 'row-reverse',
    marginRight: 10,
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
  waveicon: {
    marginTop: 10,
    marginRight: 5,
  },
  space: {
    marginTop: 20,
  },
});

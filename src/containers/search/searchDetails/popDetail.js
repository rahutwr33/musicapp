/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Player from '../../../components/miniplayer';
import MainHeaders from '../../../components/mainheader';
import {PopScreen} from '../../../navigation/pushscreen';
import {FlatList} from 'react-native-gesture-handler';
import {songsbygenere} from '../../../globals/store/actions/song';
import {statusbarheight} from '../../../utils/statusbarheight';
import api from '../../../config/api';
import MUSICLOGO from '../../../assets/images/musiclogo.png';
import {currentplaylist} from '../../../globals/store/actions/player';
import {connect} from 'react-redux';
import {PushScreen} from '../../../navigation/pushscreen';
import {PLAYLIST_SEARCH_SCREEN} from '../../../navigation/screen';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');
const PopMusicScreen = (props) => {
  const {t, i18n} = useTranslation();
  const [loader, setloader] = useState(false);
  const [data, setdata] = useState([]);

  const getsongbygenere = async () => {
    const results = await songsbygenere({
      slug: String(props.state).toLowerCase(),
    });
    if (results && results.success && Array.isArray(results.data)) {
      setdata(results.data);
      setloader(false);
    } else {
      setdata([]);
      setloader(false);
    }
  };
  useEffect(() => {
    setloader(true);
    getsongbygenere();
  }, []);
  const render_FlatList_header = () => {
    return (
      <View>
        <Text style={styles.headertext}>{t('Popular_Playlist')}</Text>
      </View>
    );
  };
  const openplayer = async (item) => {
    item.state = true;
    const results = await props.currentplaylist({
      item: item,
      list: data,
      currentsong: props.Player.currentsong,
    });
    if (results.success) {
      PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
      // showmodal(item);
    }
  };
  const renderItems = (item) => {
    return (
      <TouchableOpacity
        key={`index_3_populat_${props.state}_${String(item.id)}`}
        style={styles.listcontentstyle}
        onPress={() => {
          openplayer(item);
        }}>
        <Image
          style={[
            styles.imagestyle,
            {backgroundColor: item.song_image ? null : '#fff'},
          ]}
          source={
            item.song_image ? {uri: api.imageurl + item.song_image} : MUSICLOGO
          }
          resizeMode="cover"
          resizeMethod="auto"
        />
        <View style={styles.infostyle}>
          <Text
            style={{
              ...styles.fontstyle2,
              ...{fontSize: 16, fontWeight: '700'},
            }}>
            {item.song_title || 'dawd'}
          </Text>
          <Text style={{...styles.fontstyle2, ...{fontSize: 14, opacity: 0.5}}}>
            {item.song_artist || 'wdawd'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <MainHeaders
        title=""
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      {loader ? (
        <View
          style={{
            ...{justifyContent: 'center', alignItems: 'center', flex: 0.8},
          }}>
          <ActivityIndicator size="large" />
        </View>
      ) : data.length > 0 ? (
        <View style={styles.contentstyle}>
          <View style={styles.headericonstyle}>
            <Text style={styles.fontstyle}>{t(props.state) || ''}</Text>
          </View>
          <View style={styles.liststyle}>
            <FlatList
              data={data}
              numColumns={2}
              renderItem={({item}) => renderItems(item)}
              ListHeaderComponent={render_FlatList_header}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            ...{justifyContent: 'center', alignItems: 'center', flex: 0.8},
          }}>
          <Text style={{color: '#fff'}}>No songs found.</Text>
        </View>
      )}

      <Player />
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
  Playlist: state.Playlist,
  Player: state.Player,
});
const mapDispatchToProps = {currentplaylist};
export default connect(mapStateToProps, mapDispatchToProps)(PopMusicScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusbarheight,
  },
  contentstyle: {
    flex: 1,
  },
  headericonstyle: {
    alignSelf: 'center',
  },
  fontstyle: {
    textShadowColor: '#00F6F3',
    textShadowRadius: 7,
    fontSize: 36,
    color: '#fff',
    fontWeight: '900',
  },
  liststyle: {
    marginTop: 20,
    flex: 1,
    marginBottom: 70,
    marginLeft: 5,
    marginRight: 5,
  },
  infostyle: {
    width: '100%',
    marginLeft: 10,
    marginBottom: 10,
  },
  headertext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    paddingLeft: 10,
  },
  imagestyle: {
    width: width / 2 - 20,
    height: 180,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 7,
  },
  listcontentstyle: {
    flex: 1,
    marginTop: 10,
  },
  fontstyle2: {
    color: '#fff',
    textAlign: 'left',
    paddingTop: 5,
  },
});

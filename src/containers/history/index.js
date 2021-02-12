/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from '../../components/mainheader';
import {PopScreen, PushPropsScreen} from '../../navigation/pushscreen';
import {Content} from 'native-base';
import NoImage from '../../assets/images/noimage.png';
import Icons from 'react-native-vector-icons/FontAwesome';
import {songhistory} from '../../globals/store/actions/auth';
import api from '../../config/api';
import Player from '../../components/miniplayer';
import {currentplaylist} from '../../globals/store/actions/player';
import {PushScreen} from '../../navigation/pushscreen';
import {
  PLAYLIST_ACTION_MODEL,
  PLAYLIST_SEARCH_SCREEN,
} from '../../navigation/screen';
import {useTranslation} from 'react-i18next';

const HistoryScreen = (props) => {
  const [history, setstate] = useState([]);
  const [loader, setloader] = useState(false);
  const {t, i18n} = useTranslation();

  const getHistory = async () => {
    const result = await songhistory();
    if (result && result.success) {
      setloader(false);
      setstate(result.data);
    }
  };
  useEffect(() => {
    setloader(true);
    getHistory();
  }, []);
  const openplayer = async (item) => {
    item.state = true;
    const results = await props.currentplaylist({
      item: item,
      list: history,
      currentsong: props.Player.currentsong,
    });
    if (results.success) {
      PushScreen(PLAYLIST_SEARCH_SCREEN, props, true, item);
      // showmodal(item);
    }
  };
  const renderItem = ({item}) => (
    <View style={styles.liststyle}>
      <TouchableOpacity
        key={`history${String(item.song_id)}${Date.now()}`}
        onPress={() => {
          openplayer(item);
        }}
        style={{flex: 0.9}}>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.9,
          }}>
          <Image
            source={
              item.song_image ? {uri: api.imageurl + item.song_image} : NoImage
            }
            style={styles.imagestyle}
          />
          <View>
            <View>
              <Text adjustsFontSizeToFit={true} style={{...styles.rightstyle}}>
                {item.song_title}
              </Text>
            </View>
            <View>
              <Text
                adjustsFontSizeToFit={true}
                style={{
                  ...styles.rightstyle,
                  ...{fontSize: 14, opacity: 0.5, paddingTop: 5},
                }}>
                {item.artist_name
                  ? item.artist_name
                  : item.artist
                  ? item.artist
                  : ''}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          PushPropsScreen(PLAYLIST_ACTION_MODEL, props, false, {
            ...{detail: true},
            ...item,
          });
        }}
        style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
        <Icons name="ellipsis-v" size={16} style={{color: '#fff'}} />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title={t('History')}
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <Content>
        <View style={styles.contentstyle}>
          {loader ? <ActivityIndicator size="large" /> : null}
          <FlatList
            data={history}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Content>
      <Player />
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Player: state.Player,
});

const mapDispatchToProps = {currentplaylist};
export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  contentstyle: {
    flex: 1,
    marginTop: '10%',
    marginBottom: 60,
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  rightstyle: {
    color: '#fff',
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  liststyle: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15,
  },
});

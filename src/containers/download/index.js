/* eslint-disable react-hooks/exhaustive-deps */
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
import {MainNavigationHeaders} from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';
import {Content} from 'native-base';
import NoImage from '../../assets/images/noimage.png';
// import Icons from 'react-native-vector-icons/FontAwesome';
import {downloadedsong} from '../../globals/store/actions/auth';
import api from '../../config/api';
import Player from '../../components/miniplayer';
import {currentplaylist} from '../../globals/store/actions/player';
import {PushScreen} from '../../navigation/pushscreen';
import {PLAYLIST_SEARCH_SCREEN} from '../../navigation/screen';
import {useTranslation} from 'react-i18next';

const DownloadScreen = (props) => {
  const [history, setstate] = useState([]);
  const [loader, setloader] = useState(false);
  const [navigation, setnavigation] = useState(props.state);
  const {t, i18n} = useTranslation();

  const getHistory = async () => {
    const result = await downloadedsong();
    if (result && result.status) {
      setloader(false);
      setstate(result.data);
    }
  };
  useEffect(() => {
    setloader(true);
    getHistory();
  }, []);
  console.log(navigation);
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
    <TouchableOpacity
      key={`history${String(item.id)}${Date.now()}`}
      onPress={() => {
        openplayer(item);
      }}
      style={styles.liststyle}>
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
      <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <Icons name="ellipsis-v" size={16} style={{color: '#fff'}} /> */}
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.MainContainer}>
      <MainNavigationHeaders
        title={t('Download')}
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon={navigation === 0 ? 'long-arrow-right' : ''}
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
export default connect(mapStateToProps, mapDispatchToProps)(DownloadScreen);

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

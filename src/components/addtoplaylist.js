import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import MainHeaders from './mainheader';
import {statusbarheight} from '../utils/statusbarheight';
import {LargeButton} from './button';
import Wave from '../assets/svg/wave.svg';
import NoImage from '../assets/images/noimage.png';
import {CREATE_PLAYLIST} from '../navigation/screen';
import {addsonginplaylist} from '../globals/store/actions/song';
import {Alerts} from '../utils/alert';
import {PushPropsScreen, PopScreen} from '../navigation/pushscreen';
import {getplaylist} from '../globals/store/actions/playlist';
import {Content} from 'native-base';
import api from '../config/api';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('window');

const AddToPlaylist = (props) => {
  const {t, i18n} = useTranslation();
  let playlist = [];
  if (props && props.Playlist && props.Playlist) {
    if (Array.isArray(props.Playlist.playlist)) {
      playlist = props.Playlist.playlist;
    } else {
      playlist = [];
    }
  }
  console.log(props);
  const createplaylist = () => {
    PushPropsScreen(CREATE_PLAYLIST, props, 0, {});
  };
  const addsongtoplaylst = async (item) => {
    const results = await addsonginplaylist({
      playlist_id: String(item.id),
      song_id: String(props.state.songid),
    });
    await props.getplaylist('');
    if (results && results.success) {
      Alerts(results.message, 'modal', props);
    } else {
      Alerts(results.message, 'modal', props);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={`playlist${String(item.id)}${Date.now()}`}
      onPress={() => addsongtoplaylst(item)}
      style={styles.liststyle}>
      <View style={{...{flexDirection: 'row', padding: 8}}}>
        <Image
          source={
            item.cover_image ? {uri: api.imageurl + item.cover_image} : NoImage
          }
          style={styles.imagestyle}
        />
        <View style={{...{paddingLeft: 15}}}>
          <Text adjustsFontSizeToFit={true} style={{...styles.rightstyle}}>
            {item.playlist}
          </Text>
          <View style={{...{flexDirection: 'row'}}}>
            <View style={styles.waveicon}>
              <Wave preserveAspectRatio="none" width={20} height={10} />
            </View>
            <Text
              adjustsFontSizeToFit={true}
              style={{
                ...styles.rightstyle,
                ...styles.rightspace,
                ...{fontSize: 12, paddingTop: 5, paddingLeft: 5},
              }}>
              {`${item.total_song} Song`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <MainHeaders
        title={t('Add_song_in_playlist')}
        navigation={props.navigation}
        onPress={() => PopScreen(props, true)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <View style={styles.topspace}>
        <LargeButton
          buttonTitle={t('Create_Playlist')}
          onPress={() => createplaylist()}
        />
      </View>
      <Content style={styles.topspace}>
        <FlatList
          data={playlist}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Content>
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
  Playlist: state.Playlist,
});

const mapDispatchToProps = {getplaylist};
export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylist);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: statusbarheight,
    marginBottom: 20,
  },
  topspace: {
    marginTop: 20,
  },
  waveicon: {
    paddingTop: 8,
  },
  liststyle: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
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
});

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {
  setCurrentUser,
  getPropsGenreList,
  updateUser,
} from '../../globals/store/actions/auth';
import BufferLogo from '../../assets/svg/buffer.svg';
import {statusbarheight} from '../../utils/statusbarheight';
import {UserMainStack} from '../../navigation/stack/main';
import {ArtistMainStack} from '../../navigation/stack/artist';
import {recentplayedsong, topsongs} from '../../globals/store/actions/player';
import {
  getuserselectionsong,
  heavyrotation,
  recentplayed,
} from '../../globals/store/actions/song';
import {PushScreen} from '../../navigation/pushscreen';
import {SELECT_ARTIST, SELECT_ARTIST_OF_ARTIST} from '../../navigation/screen';
import {initReactI18next, useTranslation} from 'react-i18next';
import storage from '../../utils/storage/index';
const BufferScreen = (props) => {
  const {t, i18n} = useTranslation();
  async function loaduser() {
    await updateUser();
    const results = await props.setCurrentUser();
    if (results) {
      return results;
    }
  }

  useEffect(() => {
    loaduser().then(async ({success, user}) => {
      await props.recentplayedsong();
      await props.recentplayed();
      await props.getuserselectionsong();
      await props.heavyrotation();
      await props.topsongs();
      await props.getPropsGenreList('');
      let currentlang = await storage.get('defaultlang');
      console.log(currentlang);
      i18n.use(initReactI18next).init({lng: String(currentlang)});
      setTimeout(() => {
        if (user && user.user && user.user.is_artist) {
          if (user.selected_artist_data) {
            ArtistMainStack();
          } else {
            ArtistMainStack();
          }
        } else if (user && user.user && user.user.is_listener) {
          if (user.selected_artist_data) {
            UserMainStack();
          } else {
            PushScreen(SELECT_ARTIST, props, '', '');
          }
        }
      }, 2000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <BufferLogo width="100%" height="100%" />
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {
  setCurrentUser,
  recentplayedsong,
  getPropsGenreList,
  getuserselectionsong,
  heavyrotation,
  recentplayed,
  topsongs,
};
export default connect(mapStateToProps, mapDispatchToProps)(BufferScreen);

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: statusbarheight,
  },
});

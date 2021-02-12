import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';
import {ControlledSwitch} from '../../components/animatedswitch';
import Player from '../../components/miniplayer';
import {Content} from 'native-base';
import {statusbarheight} from '../../utils/statusbarheight';
import {
  updatenotificationsetting,
  getnotificationsetting,
} from '../../globals/store/actions/song';
import {useTranslation} from 'react-i18next';

const NotificationScreen = (props) => {
  const [recommended_music_push, setrecommended_music_push] = useState(false);
  const [new_music_push, setnew_music_push] = useState(false);
  const [new_music_email, setnew_music_email] = useState(false);
  const [playlist_update_push, setplaylist_update_push] = useState(false);
  const [playlist_update_email, setplaylist_update_email] = useState(false);
  const {t, i18n} = useTranslation();

  const updatesetting = async (key, value) => {
    const results = await updatenotificationsetting({
      [key]: value,
    });
    if (results) {
      loadsetting()
        .then((response) => {
          if (response && response.success) {
            setrecommended_music_push(response.data.recommended_music_push);
            setnew_music_push(response.data.new_music_push);
            setnew_music_email(response.data.new_music_email);
            setplaylist_update_push(response.data.playlist_update_push);
            setplaylist_update_email(response.data.playlist_update_email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const loadsetting = async () => {
    const setting = await getnotificationsetting();
    return setting;
  };
  useEffect(() => {
    loadsetting()
      .then((response) => {
        if (response && response.success) {
          setrecommended_music_push(response.data.recommended_music_push);
          setnew_music_push(response.data.new_music_push);
          setnew_music_email(response.data.new_music_email);
          setplaylist_update_push(response.data.playlist_update_push);
          setplaylist_update_email(response.data.playlist_update_email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title={t('Notifications')}
        navigation={props.navigation}
        onPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        leftonPress={() => {}}
      />
      <Content>
        <View style={styles.contentstyle}>
          {/* <View>
            <Text style={styles.fontstyle1}>Your Musics</Text>
          </View> */}
          <View style={styles.topspace}>
            <Text style={styles.fontstyle2}>{t('Recommended_Musics')}</Text>
          </View>
          <View>
            <Text style={styles.fontstyle1}>
              Music we find that we think you'll be like
            </Text>
          </View>
          <View style={styles.explicitalignstyle}>
            <ControlledSwitch
              trackColor={{false: '#fff', true: '#fff'}}
              thumbColor="#fff"
              ios_backgroundColor="#01BDBD"
              _onValueChange={(e) => {
                setrecommended_music_push(e);
                updatesetting('recommended_music_push', e);
              }}
              value={recommended_music_push}
              style={styles.switchstyle}
            />
            <Text style={styles.fontstyle3}>{t('Push_Notifications')}</Text>
          </View>
          <View style={styles.topspace}>
            <Text style={styles.fontstyle2}>{t('New_Musics')}</Text>
          </View>
          <View>
            <Text style={styles.fontstyle1}>
              Fresh tracks from artist you follow or might like
            </Text>
          </View>
          <View style={styles.explicitalignstyle}>
            <ControlledSwitch
              trackColor={{false: '#fff', true: '#fff'}}
              thumbColor="#fff"
              ios_backgroundColor="#01BDBD"
              _onValueChange={(e) => {
                setnew_music_push(e);
                updatesetting('new_music_push', e);
              }}
              value={new_music_push}
              style={styles.switchstyle}
            />
            <Text style={styles.fontstyle3}>{t('Push_Notifications')}</Text>
          </View>
          <View style={styles.explicitalignstyle}>
            <ControlledSwitch
              trackColor={{false: '#fff', true: '#fff'}}
              thumbColor="#fff"
              ios_backgroundColor="#01BDBD"
              _onValueChange={(e) => {
                setnew_music_email(e);
                updatesetting('new_music_email', e);
              }}
              value={new_music_email}
              style={styles.switchstyle}
            />
            <Text style={styles.fontstyle3}>{t('Email_Notifications')}</Text>
          </View>
          <View style={styles.topspace}>
            <Text style={styles.fontstyle2}>{t('Playlist_Updates')}</Text>
          </View>
          <View>
            <Text style={styles.fontstyle1}>
              A playlist you follow is updated
            </Text>
          </View>
          <View style={styles.explicitalignstyle}>
            <ControlledSwitch
              trackColor={{false: '#fff', true: '#fff'}}
              thumbColor="#fff"
              ios_backgroundColor="#01BDBD"
              _onValueChange={(e) => {
                setplaylist_update_push(e);
                updatesetting('playlist_update_push', e);
              }}
              value={playlist_update_push}
              style={styles.switchstyle}
            />
            <Text style={styles.fontstyle3}>{t('Push_Notifications')}</Text>
          </View>
          <View style={styles.explicitalignstyle}>
            <ControlledSwitch
              trackColor={{false: '#fff', true: '#fff'}}
              thumbColor="#fff"
              ios_backgroundColor="#01BDBD"
              _onValueChange={(e) => {
                setplaylist_update_email(e);
                updatesetting('playlist_update_email', e);
              }}
              value={playlist_update_email}
              style={styles.switchstyle}
            />
            <Text style={styles.fontstyle3}>{t('Email_Notifications')}</Text>
          </View>
        </View>
      </Content>
      <Player />
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: statusbarheight,
  },
  contentstyle: {
    margin: 20,
    marginBottom: 60,
  },
  explicitalignstyle: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  explicitstyle: {
    color: '#fff',
    fontSize: 21,
  },
  fontstyle1: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
  },
  fontstyle2: {
    color: '#fff',
    fontSize: 21,
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: '700',
  },
  fontstyle3: {
    color: '#fff',
    fontSize: 21,
    paddingTop: 10,
    textAlign: 'center',
  },
  switchstyle: {
    marginTop: 10,
  },
  topspace: {
    marginTop: '10%',
  },
});

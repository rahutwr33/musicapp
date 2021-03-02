/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import MainHeaders from '../../components/mainheader';
import {PushScreen} from '../../navigation/pushscreen';
import {SIDEBAR_SCREEN} from '../../navigation/screen';
import MadeforYou from '../../components/main/madeforyou';
import HeavyRotation from '../../components/main/heavyrotation';
import Player from '../../components/miniplayer';
import RecentlyPlayed from '../../components/main/recentlyplayed';

import {
  getplaylist,
  userlikedsong,
  userAllsong,
  userAlbum,
} from '../../globals/store/actions/playlist';
import {Content} from 'native-base';
import messaging from '@react-native-firebase/messaging';
import NewRelease from '../../components/main/newrelease';
import YourMix from '../../components/main/yourmix';

const MainScreen = (props) => {
  const [madeforyou, setmadeforyou] = useState([]);
  const [heavyrotation, setheavyrotation] = useState([]);
  const [recentplayed, setrecentplayed] = useState([]);
  console.log('111',props)
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const fetchplaylist = async () => {
      await props.getplaylist('');
      await props.userlikedsong('');
      await props.userAllsong('');
      await props.userAlbum('');
    };
    fetchplaylist().then();
  }, []);

  useEffect(() => {
    if (
      props &&
      props.Song &&
      props.Song.userselection &&
      Array.isArray(props.Song.userselection)
    ) {
      setmadeforyou(props.Song.userselection);
    }
    if (
      props &&
      props.Song &&
      props.Song.recentplayed &&
      Array.isArray(props.Song.recentplayed)
    ) {
      setrecentplayed(props.Song.recentplayed);
    }
    if (
      props &&
      props.Song &&
      props.Song.heavyrotation &&
      Array.isArray(props.Song.heavyrotation)
    ) {
      setheavyrotation(props.Song.heavyrotation);
    }
    
  }, [props]);

  const showSetting = () => {
    PushScreen(SIDEBAR_SCREEN, props, false);
  };
  return (
    <View style={styles.MainContainer}>
      <MainHeaders
        title=""
        navigation={props.navigation}
        onPress={() => showSetting()}
        righticon="cog"
      />
      <Content
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{...{marginBottom: 60}}}>
        <View style={styles.contentstyle}>
          <MadeforYou madeforyou={madeforyou} {...props} />
          <RecentlyPlayed recentplayed={recentplayed} {...props} />
          <HeavyRotation heavyrotation={heavyrotation} {...props} />
          <NewRelease  {...props}/>
          <YourMix {...props}/>
        </View>
      </Content>
      <Player />
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Song: state.Song,
  Player: state.Player,
});

const mapDispatchToProps = {getplaylist, userlikedsong, userAllsong, userAlbum};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#262626',
  },
  contentstyle: {
    flex: 1,
  },
});

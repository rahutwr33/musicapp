/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {AuthStack} from '../../navigation/stack/auth';
import {ArtistMainStack} from '../../navigation/stack/artist';
import {UserMainStack} from '../../navigation/stack/main';
import storage from '../../utils/storage';
import {connect} from 'react-redux';
import {setCurrentUser} from '../../globals/store/actions/auth';
import {statusbarheight} from '../../utils/statusbarheight';
import messaging from '@react-native-firebase/messaging';

const Splash = (props) => {
  const setUser = async () => {
    return await props.setCurrentUser();
  };
  const fetchToken = async () => {
    let user = await storage.get('user');
    let defaultlang = await storage.get('defaultlang');
    if (!defaultlang) {
      await storage.set('defaultlang', 'en');
    }
    user = JSON.parse(user) || null;
    console.log('user', user);
    if (user && user.data && user.data.token) {
      setTimeout(() => {
        if (user && user.user && user.user.is_artist) {
          ArtistMainStack();
        } else {
          UserMainStack();
        }
      }, 3000);
    } else {
      setTimeout(() => {
        AuthStack({logout: true});
      }, 3000);
    }
  };
  useEffect(() => {
    setUser();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    fetchToken();
  }, []);

  return <View style={styles.container} />;
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {setCurrentUser};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: statusbarheight,
  },
});

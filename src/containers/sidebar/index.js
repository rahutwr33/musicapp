/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SidebarList from '../../components/sidebarlist';
import {connect} from 'react-redux';
import {PushScreen, PopScreen} from '../../navigation/pushscreen';
import {
  PROFILE_SCREEN,
  EXPLICIT_SCREEN,
  Library_PLAYLIST_SCREEN,
  UPLOAD_SCREEN,
  NOTIFICATIONS_SCREEN,
  HISTORY_SCREEN,
  ANALYTICS_SCREEN,
  ABOUT_US,
} from '../../navigation/screen';
import FastImage from 'react-native-fast-image';
import api from '../../config/api';
import MainHeaders from '../../components/mainheader';
import {statusbarheight} from '../../utils/statusbarheight';
import {PickerIOS, Picker} from '@react-native-community/picker';

import {
  DEVICES_SCREEN,
  MAIN_SCREEN,
  DOWNLOAD_SCREEN,
} from '../../navigation/screen';
import {Content} from 'native-base';
import storage from '../../utils/storage';
import {AuthStack} from '../../navigation/stack/auth';
import {logoutdevice} from '../../globals/store/actions/auth';
import DeviceInfo from 'react-native-device-info';
import {initReactI18next, useTranslation} from 'react-i18next';
import TrackPlayer from 'react-native-track-player';
import { Platform } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const SidebarScreen = (props) => {
  const [loader, setloader] = useState(false);
  const {t, i18n} = useTranslation();
  const [lang, setdefaultlang] = useState(i18n.language);
  const [showpicker, setpicker] = useState(false);

  const logout = async () => {
    setloader(true);
    let uniqueId = await DeviceInfo.getUniqueId();
    const results = await logoutdevice({
      device_id: uniqueId,
    });
    await storage.remove('user');
    await storage.remove('recentsong');
    await TrackPlayer.stop();
    await TrackPlayer.destroy();
    setTimeout(() => {
      setloader(false);
      AuthStack({logout: true});
    }, 2000);
  };
  const onpress = async (e) => {
    switch (e.text) {
      case 'Explicit Content':
        PushScreen(EXPLICIT_SCREEN, props, true);
        break;
      case 'Playlist':
        PushScreen(Library_PLAYLIST_SCREEN, props, true, 2);
        break;
      case 'Upload':
        PushScreen(UPLOAD_SCREEN, props, true, 0);
        break;
      case 'Albums':
        PushScreen(Library_PLAYLIST_SCREEN, props, true, 0);
        break;
      case 'Downloads':
        PushScreen(DOWNLOAD_SCREEN, props, true, 0);
        break;
      case 'About':
        PushScreen(ABOUT_US, props, false);
        break;
      case 'Devices':
        PushScreen(DEVICES_SCREEN, props, true);
        break;
      case 'Notifications':
        PushScreen(NOTIFICATIONS_SCREEN, props, true);
        break;
      case 'History':
        PushScreen(HISTORY_SCREEN, props, true);
        break;
      case 'Analytics':
        PushScreen(ANALYTICS_SCREEN, props, true);
        break;
      case 'Analytics':
        PushScreen(ANALYTICS_SCREEN, props, true);
        break;
      case 'Language':
        setpicker(!showpicker);
        break;
      case 'License Aggrement':
        Linking.canOpenURL('https://www.mptone.com/en/terms-conditions/').then(
          (supported) => {
            if (supported) {
              Linking.openURL('https://www.mptone.com/en/terms-conditions/');
            } else {
              console.log("Don't know how to open URI: " + this.props.url);
            }
          },
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <View style={styles.container}>
        <MainHeaders
          title=""
          navigation={props.navigation}
          onPress={() => {
            // PushScreen(MAIN_SCREEN, props, true);
            PopScreen(props);
          }}
          righticon="long-arrow-right"
          leftonPress={() => {}}
        />
        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.sidebaralign}>
            <TouchableOpacity
              style={styles.userblock}
              onPress={() => PushScreen(PROFILE_SCREEN, props, false)}>
              <View>
                {props &&
                props.Auth &&
                props.Auth.user &&
                props.Auth.user.profile_pic ? (
                  <FastImage
                    style={styles.imagestyle}
                    source={{
                      uri: `${api.imageurl}${props.Auth.user.profile_pic}`,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ) : (
                  <View style={styles.circle}>
                    <Icon
                      name="account"
                      size={45}
                      color="#01BDBD"
                      style={styles.usericonstyle}
                    />
                  </View>
                )}
              </View>

              <View style={styles.circlestyle}>
                <Text
                  // numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={styles.fontStyle1}>
                  {props?.Auth?.user?.full_name
                    ? props.Auth.user.full_name
                    : ''}
                </Text>
                <View style={styles.packagestyle}>
                  <Icon name="crown" size={15} />
                  <Text style={styles.fontStyle2}>{t('Premium')}</Text>
                </View>
              </View>
              <View style={styles.downicon}>
                <Icon
                  name="chevron-down"
                  size={30}
                  color="#000"
                  style={styles.usericonstyle}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                bottom: height / 1.8,
              }}>
              {loader ? <ActivityIndicator size="large" /> : null}
            </View>
            <View
              style={styles.flastliststyle}
              pointerEvents={loader ? 'none' : 'auto'}>
              <SidebarList
                lang={lang}
                user={props.Auth.user}
                onpress={(e) => onpress(e)}
                logout={(e) => logout(e)}
              />
            </View>
          </View>
          {showpicker ? (
            <View
              style={{
                position: 'absolute',
                top: height / 3,
                width: width,
              }}>
              <Picker
                onStartShouldSetResponder={false}
                style={{color: '#fff'}}
                itemStyle={{color: '#fff'}}
                selectedValue={lang}
                onValueChange={async (itemValue, itemIndex) => {
                  setdefaultlang(itemValue);
                  i18n.use(initReactI18next).init({lng: String(itemValue)});
                  await storage.set('defaultlang', itemValue);
                  setpicker(false);
                }}>
                <Picker.Item color="#fff" label="English" value="en" />
                <Picker.Item color="#fff" label="עִברִית" value="he" />
              </Picker>
            </View>
          ) : null}
        </Content>
      </View>
    </>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SidebarScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: statusbarheight,
  },
  sidebaralign: {
    justifyContent: 'flex-start',
    // alignItems: 'flex-end',
    marginBottom: 10,
  },
  navigationblock: {},
  userblock: {
    backgroundColor: '#01BDBD',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Platform.OS == "ios" ?  width / 2 : width / 1.8,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#000',
    margin: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#000',
    margin: 10,
  },
  usericonstyle: {
    alignSelf: 'center',
  },
  circlestyle: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  fontStyle1: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '700',
    flexWrap: 'wrap',
    width: 100,
  },
  fontStyle2: {
    fontSize: 12,
    textAlign: 'center',
    paddingLeft: 5,
  },
  packagestyle: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  downicon: {
    alignSelf: 'center',
    margin: 5,
  },
  flastliststyle: {
    marginTop: 20,
    marginLeft: 5,
  },
});

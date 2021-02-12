import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ProfileHeaders from '../../components/mainheader';
import {PopScreen, PushScreen} from '../../navigation/pushscreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {EDIT_PROFILE} from '../../navigation/screen';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import api from '../../config/api';
import {statusbarheight} from '../../utils/statusbarheight';
import {useTranslation} from 'react-i18next';
const height = Dimensions.get('window').height;

const ProfileScreen = (props) => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.container}>
      {props &&
      props.Auth &&
      props.Auth.user &&
      props.Auth.user.user === 'is_artist' ? (
        <ProfileHeaders
          title="Profile"
          lefticon="ellipsis-h"
          leftonPress={() => {}}
          righticon="long-arrow-right"
          onPress={() => PopScreen(props, false)}
        />
      ) : (
        <ProfileHeaders
          title={t('Profile')}
          righticon="long-arrow-right"
          user={props.Auth}
          onPress={() => PopScreen(props, false)}
        />
      )}

      <View style={styles.formstyle}>
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
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View style={styles.profileimagestyle}>
            <Icon
              name="account"
              size={90}
              color="#000"
              style={styles.usericonstyle}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={() => PushScreen(EDIT_PROFILE, props, false)}>
          <Text style={styles.editprofile}>{t('Edit_Profile')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialstyle}>
        <View>
          <Text style={styles.fontstyle}>{t('Following')}</Text>
          <Text style={styles.fontstyle2}>
            {props.Auth.other_data ? props.Auth.other_data.following : 0}
          </Text>
        </View>
        <View>
          <Text style={styles.fontstyle}>{t('Followers')}</Text>
          <Text style={styles.fontstyle2}>
            {props.Auth.other_data ? props.Auth.other_data.followers : 0}
          </Text>
        </View>
        <View>
          <Text style={styles.fontstyle}>{t('Playlist')}</Text>
          <Text style={styles.fontstyle2}>
            {props.Auth.other_data ? props.Auth.other_data.playlists : 0}
          </Text>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    marginTop: statusbarheight,
  },
  usericonstyle: {
    alignSelf: 'center',
  },
  formstyle: {
    alignItems: 'center',
  },
  imagestyle: {
    marginTop: height / 10,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#fff',
  },
  profileimagestyle: {
    marginTop: height / 10,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#fff',
  },
  fontstyle: {
    color: '#fff',
  },
  fontstyle2: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
  },
  socialstyle: {
    marginTop: 50,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  editprofile: {
    color: '#fff',
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
});

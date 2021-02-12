/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import MainHeaders from '../../components/mainheader';
import {PopScreen} from '../../navigation/pushscreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  updateprofile,
  updateUser,
  setCurrentUser,
} from '../../globals/store/actions';
import FastImage from 'react-native-fast-image';
import api from '../../config/api';
import ImagePicker from 'react-native-image-picker';
import {Alerts} from '../../utils/alert';
import {useTranslation} from 'react-i18next';

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const height = Dimensions.get('window').height;
const EditprofileScreen = (props) => {
  const {t, i18n} = useTranslation();
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(props.Auth.user.full_name || '');
  const [loading, showloading] = useState(false);
  const updateUserProfile = async () => {
    try {
      const data = new FormData();
      data.append('first_name', name);
      if (avatar && avatar.uri) {
        let path = avatar.uri;
        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!avatar.fileName) {
          avatar.fileName = path.split('/').pop();
        }
        data.append('profile_pic', {
          name: avatar.fileName,
          type: avatar.type,
          uri:
            Platform.OS === 'android'
              ? avatar.uri
              : avatar.uri.replace('file://', ''),
        });
      }
      showloading(true);
      let response = await updateprofile(data);
      if (response && response.success) {
        // let obj = {full_name: name};
        // if (avatar && avatar.uri) {
        //   obj.profile_pic = `/media/user_image/${avatar.fileName}`;
        // }
        await updateUser();
        showloading(false);
        const results1 = await props.setCurrentUser();
        console.log(results1);
        Alerts('Profile successfully updated.', '', '');
        PopScreen(props, false);
      } else {
        showloading(false);
        Alerts('Unexpected Server error', '', '');
      }
    } catch (error) {
      showloading(false);
      Alerts('Something went wrong', '', '');
    }
  };

  const chooseImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setAvatar(response);
      }
    });
  };
  const loadavatar = () => {
    if (!avatar) {
      return `${api.imageurl}${props.Auth.user.profile_pic}`;
    } else {
      if (Platform.OS === 'android') {
        return avatar.uri;
      } else {
        return avatar.uri;
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <MainHeaders
        title=""
        leftttext={t('Save')}
        lefticon="ellipsis-h"
        righticon="long-arrow-right"
        onPress={() => PopScreen(props, false)}
        lefttonPress={() => updateUserProfile()}
      />
      <View style={styles.formstyle}>
        {props && props.Auth && props.Auth.user.profile_pic ? (
          <TouchableOpacity onPress={() => chooseImage()}>
            <FastImage
              style={styles.profileimagestyle}
              source={{
                uri: loadavatar(),
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.editprofile}>{t('Change_Photo')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.profileimagestyle}>
            <Icon
              name="account"
              size={90}
              color="#000"
              style={styles.usericonstyle}
            />
            <TouchableOpacity>
              <Text style={styles.editprofile}>{t('Change_Photo')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.socialstyle}>
        <View style={styles.space}>
          <TextInput
            autoCorrect={false}
            autoCompleteType="off"
            autoCapitalize="none"
            placeholder="Sample User"
            value={name}
            onChangeText={(e) => setName(e)}
            placeholderTextColor="#fff"
            style={styles.inputstyle}
          />
        </View>
        <View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={styles.fontstyle}>
            This could be your first name or nickname.It's show how you appear
            on society.
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={styles.indicatorstyle}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
});
const mapDispatchToProps = {setCurrentUser};
export default connect(mapStateToProps, mapDispatchToProps)(EditprofileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  space: {
    margin: 10,
    marginBottom: 0,
  },
  usericonstyle: {
    alignSelf: 'center',
  },
  formstyle: {
    alignItems: 'center',
  },
  inputstyle: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'left',
    borderColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  profileimagestyle: {
    marginTop: height / 10,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#fff',
  },
  indicatorstyle: {
    paddingTop: 10,
  },
  fontstyle: {
    color: '#fff',
    padding: 10,
    fontSize: 20,
    paddingTop: 10,
  },
  fontstyle2: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
  },
  socialstyle: {
    marginTop: 50,
  },
  editprofile: {
    color: '#fff',
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
});

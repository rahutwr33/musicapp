/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import { PushScreen } from '../../../navigation/pushscreen';
import {
  LOGIN_OPTION_SCREEN,
  REGISTER_OPTION_SCREEN,
  USERNAME_SCREEN,
} from '../../../navigation/screen';
import { BigLoginButton } from '../../../components/bigloginbtn';
import ADELONLOGO from '../../../assets/svg/logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DarkSignupButton } from '../../../components/darksignupbtn';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} from 'react-native-fbsdk';
import { Alerts } from '../../../utils/alert';
import {
  setArtistValue,
  setValue,
  cleanState,
} from '../../../globals/store/actions';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { Navigation } from 'react-native-navigation';
import { statusbarheight } from '../../../utils/statusbarheight';
import { HeaderWithoutNavigation } from '../../../components/header';
import { useTranslation } from 'react-i18next';
import { Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = (props) => {
  const { t, i18n } = useTranslation();
  const [loader, setloader] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  var listner = Navigation.events().registerComponentDidAppearListener(
    async (data) => {
      const { componentName } = data;
      if (componentName === 'LOGIN_SCREEN') {
        await props.cleanState();
        listner.remove();
      }
    },
  );
  const onAppleButtonPress = async () => {
    return appleAuth
      .performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      })
      .then(async (response) => {
        console.log(response);
        let { email, fullName } = response;
        await props.cleanState();
        if (email) {
          await props.setArtistValue({
            email: response.email,
          });
          await props.setValue({
            email: response.email,
          });
          await props.setArtistValue({
            username: response.email.toString().split('@')[0],
          });
          await props.setValue({
            username: response.email.toString().split('@')[0],
          });
        }

        if (fullName && fullName.givenName) {
          let name = fullName.givenName;
          if (fullName.familyName) {
            name = `${name} ${fullName.familyName}`;
          }
          await props.setArtistValue({
            first_name: name,
          });
          await props.setValue({
            first_name: name,
          });
        }
        PushScreen(USERNAME_SCREEN, props);
        // PushScreen(REGISTER_OPTION_SCREEN, props);
      })
      .catch((err) => {
        console.log('222222', err);
      });
  };

  const _responseInfoCallback = async (error, result) => {
    if (error) {
      Alerts('Something went wrong!', '', '');
    } else {
      await props.cleanState();
      await props.setArtistValue({
        email: result.email,
      });
      await props.setArtistValue({
        profile_pic: result?.picture?.data?.url ? result.picture.data.url : '',
      });
      await props.setArtistValue({
        username: result.email.toString().split('@')[0],
      });
      await props.setArtistValue({
        first_name: result.name,
      });
      await props.setValue({
        email: result.email,
      });
      await props.setValue({
        profile_pic: result?.picture?.data?.url ? result.picture.data.url : '',
      });
      await props.setValue({
        username: result.email.toString().split('@')[0],
      });
      await props.setValue({
        first_name: result.name,
      });
      PushScreen(USERNAME_SCREEN, props);
      // PushScreen(REGISTER_OPTION_SCREEN, props);
    }
  };

  const fblogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const infoRequest = new GraphRequest(
              '/me?fields=name,email,picture.type(large)',
              null,
              _responseInfoCallback,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      (error) => {
        Alerts('Something went wrong!', '', '');
      },
    );
  };
  return (
    <Container
      style={styles.main}
      pointerEvents={loader ? 'none' : 'auto'}>
     <View style={{flex:1}}>
     <View style={{ flex: 0.4,backgroundColor:'#2bbdbd' }}>
        <View style={{flex:1, marginTop:0}}>
        <ImageBackground resizeMode="contain" style={{ flex: 1 }} source={require('../../../assets/images/singertwo.jpeg')} >
          <ImageBackground resizeMode="cover" style={{ flex: 1 }} source={require('../../../assets/images/blur.png')} >
            <View style={{ marginTop: 120 }}>
              <View><Text style={[styles.centertext, { marginLeft: 60, fontSize: 21 }]}>Discover</Text></View>
              <View><Text style={[styles.centertext, { marginLeft: 30, marginTop: 5 }]}>New Artists</Text></View>
            </View>
          </ImageBackground>
        </ImageBackground>
        </View>
      </View>
      <View style={{ flex: 0.6 }}>
        <View style={styles.container}>
          <View style={styles.logoStyle}>
            <ADELONLOGO preserveAspectRatio="none" width={140} height={120} />
          </View>
          <View style={styles.padder}>
            <Text
              style={{
                fontSize: 21,
                color: '#fff',
                textAlign: 'center',
                fontWeight: '700',
              }}>
              {t('Million_of_songs')}
            </Text>
          </View>
          {/* <View style={styles.largepadder}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              textAlign: 'center',
              fontWeight: '700',
            }}>
            {t('Continue_with')}
          </Text>
        </View> */}
          {/* <View style={{marginTop: 10, alignItems: 'center'}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => fblogin()}> */}
          {/* <LoginButton
            style={{
              width: 190,
              height: 45,
              marginTop: 10,
            }}
            permissions={['public_profile', 'email']}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  const infoRequest = new GraphRequest(
                    '/me?fields=name,email,picture.type(large)',
                    null,
                    _responseInfoCallback,
                  );
                  new GraphRequestManager().addRequest(infoRequest).start();
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          /> */}
          {/* <View
              style={{
                backgroundColor: '#3B5998',
                width: 190,
                height: 45,
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="facebook"
                color="#fff"
                size={14}
                style={{textAlign: 'left'}}
              />
              <Text style={{color: '#fff', fontWeight: '600', paddingLeft: 5}}>
                {t('Signup_Facebook')}
              </Text>
            </View> */}
          {/* </TouchableOpacity>
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.CONTINUE}
            style={{
              width: 190,
              height: 45,
              marginTop: 20,
            }}
            onPress={() => onAppleButtonPress()}
          /> */}
          {/* </TouchableOpacity>
          {/* <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
              marginLeft: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: '#929292', fontWeight: '700', fontSize: 21}}>
              /
            </Text>
          </View> */}
          {/* <TouchableOpacity
            onPress={() => onAppleButtonPress()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#000',
                width: 35,
                height: 35,
                borderRadius: 35 / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="apple" color="#929292" size={18} />
            </View>
            <Text style={{color: '#fff', fontWeight: '700', padding: 5}}>
              {t('Apple')}
            </Text>
          </TouchableOpacity> */}
          {/* </View> */}

          <View style={{ paddingTop: 50 }}>
            <BigLoginButton
              buttonTitle={t('LOGIN')}
              onPress={() => PushScreen(LOGIN_OPTION_SCREEN, props)}
            />
          </View>
          <View>
            <DarkSignupButton
              buttonTitle={t('SIGNUP')}
              onPress={() => PushScreen(REGISTER_OPTION_SCREEN, props)}
            />
          </View>
        </View>
      </View>
     </View>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = { setArtistValue, setValue, cleanState };
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#262626',
    flex:1
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centertext: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700'
  },
  linearGradient: {

  },
  padder: {
    marginTop: 0,
  },
  largepadder: {
    marginTop: 50,
  },
  logoStyle: {
    flexDirection: 'row-reverse',
    marginTop: 0,
  },
  logotitleStyle: {
    alignSelf: 'center',
    // position:'absolute',
    // left:0,
    // right:0,
  },
  logoiconStyle: {},
});

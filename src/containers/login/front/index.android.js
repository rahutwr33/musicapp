/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PushScreen} from '../../../navigation/pushscreen';
import {
  LOGIN_OPTION_SCREEN,
  REGISTER_OPTION_SCREEN,
} from '../../../navigation/screen';
import {BigLoginButton, Facebookbutton} from '../../../components/bigloginbtn';
import ADELON from '../../../assets/svg/ADI-LEON-320.svg';
import ADELONLOGO from '../../../assets/svg/logo-blue-320.svg';
import {DarkSignupButton} from '../../../components/darksignupbtn';
import {connect} from 'react-redux';

import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {Alerts} from '../../../utils/alert';
import {
  setArtistValue,
  setValue,
  cleanState,
} from '../../../globals/store/actions';
import {Navigation} from 'react-native-navigation';
import {statusbarheight} from '../../../utils/statusbarheight';
import {HeaderWithoutNavigation} from '../../../components/header';

const LoginScreen = (props) => {
  var listner = Navigation.events().registerComponentDidAppearListener(
    async (data) => {
      const {componentName} = data;
      if (componentName === 'LOGIN_SCREEN') {
        await props.cleanState();
        listner.remove();
      }
    },
  );

  const _responseInfoCallback = async (error, result) => {
    console.log('result', result);
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
        username: result.email.toString().split('@')[0],
      });
      await props.setValue({
        first_name: result.name,
      });

      PushScreen(REGISTER_OPTION_SCREEN, props);
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
        Alerts(error.toString(), '', '');
      },
    );
  };
  return (
    <View style={styles.main}>
      <HeaderWithoutNavigation title="" navigation={props} />
      <View style={styles.container}>
        <View style={styles.logoStyle}>
          <View style={styles.logotitleStyle}>
            <ADELON preserveAspectRatio="none" width={100} height={20} />
          </View>
          <View style={styles.logoiconStyle}>
            <ADELONLOGO width={120} height={80} />
          </View>
        </View>
        <View style={styles.padder}>
          <Text
            style={{
              fontSize: 21,
              color: '#fff',
              textAlign: 'center',
              fontWeight: '700',
            }}>
            Million of songs
          </Text>
        </View>
        <View style={styles.largepadder} />
        <View>
          {/* <View style={{justifyContent: 'space-evenly'}}>
            <Facebookbutton
              buttonTitle="CONTINUE WITH FACEBOOK"
              onPress={() => fblogin()}
            />
          </View> */}
          <View>
            <BigLoginButton
              buttonTitle="LOG IN"
              onPress={() => PushScreen(LOGIN_OPTION_SCREEN, props)}
            />
          </View>
          <View>
            <DarkSignupButton
              buttonTitle="SIGN UP"
              onPress={() => PushScreen(REGISTER_OPTION_SCREEN, props)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {setArtistValue, setValue, cleanState};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#262626',
    flex: 1,
    marginTop: statusbarheight,
  },
  container: {
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.9,
  },
  padder: {
    marginTop: 30,
  },
  largepadder: {
    marginTop: 50,
  },
  logoStyle: {
    flexDirection: 'row-reverse',
  },
  logotitleStyle: {
    alignSelf: 'center',
    // position:'absolute',
    // left:0,
    // right:0,
  },
  logoiconStyle: {},
});

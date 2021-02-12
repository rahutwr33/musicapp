import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {PushScreen} from '../../../navigation/pushscreen';
import {BigLoginButton} from '../../../components/bigloginbtn';
import ADELON from '../../../assets/svg/ADI-LEON-320.svg';
import ADELONLOGO from '../../../assets/svg/logo-blue-320.svg';
import {DarkSignupButton} from '../../../components/darksignupbtn';
import {MAIN_LOGIN_SCREEN} from '../../../navigation/screen';
import Headers from '../../../components/header';
import {Translation} from 'react-i18next';

export default class LoginOptionScreen extends Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <>
              <Headers title="" navigation={this.props} />
              <View style={styles.container}>
                <View style={styles.logoStyle}>
                  <View style={styles.logotitleStyle}>
                    <ADELON
                      preserveAspectRatio="none"
                      width={100}
                      height={20}
                    />
                  </View>
                  <View style={styles.logoiconStyle}>
                    <ADELONLOGO width={120} height={80} />
                  </View>
                </View>

                <View>
                  <BigLoginButton
                    buttonTitle={t('User_Login')}
                    onPress={() =>
                      PushScreen(MAIN_LOGIN_SCREEN, this.props, false, 0)
                    }
                  />
                </View>
                <View style={styles.padder}>
                  <DarkSignupButton
                    buttonTitle={t('Artist_Login')}
                    onPress={() =>
                      PushScreen(MAIN_LOGIN_SCREEN, this.props, false, 1)
                    }
                  />
                </View>
              </View>
            </>
          )}
        </Translation>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.9,
  },
  padder: {
    marginTop: 10,
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

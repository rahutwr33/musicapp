/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {PushScreen} from '../../../navigation/pushscreen';
import {BigLoginButton} from '../../../components/bigloginbtn';
import ADELONLOGO from '../../../assets/svg/logo.svg';
import {DarkSignupButton} from '../../../components/darksignupbtn';
import {ARTIST_NAME_SCREEN, USERNAME_SCREEN} from '../../../navigation/screen';
import Headers from '../../../components/header';
import {Translation} from 'react-i18next';

export default class RegisterOptionScreen extends Component {
  render() {
    return (
      <>
        <Headers title="" navigation={this.props} />
        <Translation>
          {(t) => (
            <View style={styles.container}>
              <View style={styles.logoStyle}>
                <ADELONLOGO preserveAspectRatio="none" width={140} height={120} />
              </View>

              <View>
                <BigLoginButton
                  buttonTitle={t('USER_SIGNUP')}
                  onPress={() => PushScreen(USERNAME_SCREEN, this.props)}
                />
              </View>
              <View style={styles.padder}>
                <DarkSignupButton
                  buttonTitle={t('ARTIST_SIGNUP')}
                  onPress={() => PushScreen(ARTIST_NAME_SCREEN, this.props)}
                />
              </View>
              {/* <View
                style={[styles.padder, {position: 'absolute', bottom: '5%'}]}>
                <Text style={{color: '#fff'}}>
                  {t('Please_continue_registeration')}...
                </Text>
              </View> */}
            </View>
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

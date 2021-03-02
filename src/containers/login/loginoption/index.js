import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { PushScreen, PopScreen } from '../../../navigation/pushscreen';
import { BigLoginButton } from '../../../components/bigloginbtn';
import ADELONLOGO from '../../../assets/svg/logo.svg';
import { DarkSignupButton } from '../../../components/darksignupbtn';
import { MAIN_LOGIN_SCREEN } from '../../../navigation/screen';
import Headers from '../../../components/header';
import { Translation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Container } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class LoginOptionScreen extends Component {
  state = {
    loader: false
  }
  render() {
    return (
      <Container
        style={styles.main}
        pointerEvents={this.state.loader ? 'none' : 'auto'}>
        <Translation>
          {(t) => (
            <>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 0.4, backgroundColor: '#1e90bb' }}>
                <ImageBackground resizeMode="contain" style={{ flex: 1 }} source={require('../../../assets/images/singerone.jpeg')} >
                  <ImageBackground resizeMode="cover" style={{ flex: 1 }} source={require('../../../assets/images/blur.png')} >
                    <TouchableOpacity
                      onPress={() =>
                        PopScreen(this.props, this.props && this.props.visible ? this.props.visible : false,
                        )
                      }
                      style={{
                        marginTop: 50, width: 70, alignSelf: 'flex-end'
                      }}>
                      <Icons style={{ textAlign: 'center' }} color="#ffffff" name="long-arrow-right" size={25} />
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', marginTop: '30%', right: 0, marginRight: 20 }}>
                      <View ><Text style={[styles.centertext, { fontSize: 21, marginLeft: '45%' }]}>Explore</Text></View>
                      <View ><Text style={[styles.centertext, { marginTop: 5 }]}>The World Of Music</Text></View>
                    </View>
                  </ImageBackground>
                </ImageBackground>
              </View>
              <View style={{ flex: 0.6 }}>
              <View style={styles.container}>
                <View style={styles.logoStyle}>
                  <ADELONLOGO preserveAspectRatio="none" width={140} height={120} />
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
              </View>
              </View>
            </>
          )}
        </Translation>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#262626',
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
  padder: {
    marginTop: 10,
  },
  logoStyle: {
    flexDirection: 'row-reverse',
  },
  linearGradient: {
    flex: 1,
  },
  logotitleStyle: {
    alignSelf: 'center',
    // position:'absolute',
    // left:0,
    // right:0,
  },
  logoiconStyle: {},
});

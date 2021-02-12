/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Keyboard, Linking} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {SELECT_ARTIST} from '../../../navigation/screen';
import {
  setValue,
  register,
  login,
  setCurrentUser,
} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import storage from '../../../utils/storage';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import {Alerts} from '../../../utils/alert';
import DeviceInfo from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import CheckBox from '@react-native-community/checkbox';
import {TouchableOpacity} from 'react-native';

const NameScreen = (props) => {
  const [name, setName] = useState(props.user.first_name);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [device_id, setdevice_id] = useState('');
  const [device_type, setdevicetype] = useState('');
  const [device_name, setdevice_name] = useState('');
  const [fcmtoken, setfcm] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    storage.get('fcmToken').then((token) => {
      setfcm(token);
    });
    let deviceId = DeviceInfo.getDeviceId();
    let uniqueId = DeviceInfo.getUniqueId();
    setdevice_name(deviceId);
    setdevicetype('mobile');
    setdevice_id(uniqueId);
  }, []);
  const submit = async () => {
    if (name && String(name).trim() && toggleCheckBox) {
      if (name.length < 3) {
        setMessage('Name should has at least 3 characters.');
        setStatus(false);
      } else {
        await props.setValue({first_name: name});
        props.user.first_name = name;
        props.user.user_type = 1;
        let response = await register(props.user);
        Keyboard.dismiss();
        setMessage('');
        if (response && response.success) {
          let loginresponse = await login({
            username: props.user.username,
            password: props.user.password,
            device_id: device_id,
            device_type: device_type,
            device_name: device_name,
            user_type: 0,
            fcm_token: fcmtoken,
          });
          if (loginresponse && loginresponse.status) {
            await storage.set('user', JSON.stringify(loginresponse));
            await props.setCurrentUser(loginresponse);
            setMessage('');
            setStatus(true);
            PushScreen(SELECT_ARTIST, props, '', '');
          } else {
            Alerts(loginresponse.message, '', '');
          }
        } else {
          if (response.message) {
            Alerts(response.message, '', '');
          } else {
            let keys = Object.keys(response.error)[0];
            Alerts(`${keys} already exist`, '', '');
          }
        }
      }
    } else {
      setMessage('Incorrect name');
      setStatus(false);
    }
  };
  return (
    <KeyboardAvoid>
      <Container style={styles.container}>
        <Headers title={t('Create_Account')} navigation={props} />
        <Content
          scrollEnabled={false}
          padder
          contentContainerStyle={styles.center}>
          <Form>
            <View style={styles.padderBottom}>
              <Text style={styles.labeltextStyle}>
                {t('What’s_your_name?')}
              </Text>
            </View>
            <Item regular style={styles.borderInput}>
              <Input
                placeholderTextColor="#ffffff"
                placeholder={t('Sample_user')}
                style={styles.emailInput}
                onChangeText={(e) => setName(e)}
                value={name}
                autoCorrect={false}
                autoCompleteType="off"
              />
            </Item>
            <View style={styles.padderTop}>
              <Text style={styles.fontnoteStyle}>
                {t('This_appears_on_your_profiles')}
              </Text>
            </View>
            <View style={styles.padderTop}>
              <Text
                adjustsFontSizeToFit={true}
                style={[
                  styles.fontStyle2,
                  {color: status ? '#01BDBD' : '#ed4377'},
                ]}>
                {message}
              </Text>
            </View>
            <View
              style={[
                styles.padderTop,
                {flexDirection: 'row', paddingLeft: 5},
              ]}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                tintColor="#ffff"
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  Linking.canOpenURL(
                    'https://www.mptone.com/en/terms-conditions/',
                  ).then((supported) => {
                    if (supported) {
                      Linking.openURL(
                        'https://www.mptone.com/en/terms-conditions/',
                      );
                    } else {
                      console.log(
                        "Don't know how to open URI: " + this.props.url,
                      );
                    }
                  });
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    paddingLeft: 10,
                  }}>
                  I have read and agree to the{' '}
                  <Text
                    style={{
                      color: '#0a66c2',
                      fontSize: 20,
                      paddingLeft: 10,
                      textDecorationLine: 'underline',
                    }}>
                    terms and conditions
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <Button onPress={() => submit()} buttonTitle={t('Create')} />
          </Form>
          <View style={styles.termmainstyle}>
            <View style={styles.termnotestyle}>
              <Text
                adjustsFontSizeToFit={true}
                style={(styles.fontcolor, styles.fontItalic)}>
                {t('Terms_of_Service')}{' '}
              </Text>
              <Text adjustsFontSizeToFit={true} style={styles.fontStyle}>
                {t('By_creaeting')}
              </Text>
            </View>
            <View style={{}} />
            <View style={styles.termstyle}>
              <Text
                adjustsFontSizeToFit={true}
                style={(styles.fontcolor, styles.fontStyle)}>
                {' '}
                {t('to_learn')}
              </Text>
            </View>
            <View style={styles.termleftstyle}>
              <Text adjustsFontSizeToFit={true} style={styles.fontItalic}>
                {' '}
                {t('Privacy_Policy')}
              </Text>
              <Text adjustsFontSizeToFit={true} style={styles.fontStyle}>
                {t('protects_ourself')}
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    </KeyboardAvoid>
  );
};
const mapStateToProps = (state) => ({
  user: state.Auth.registeruser,
});

const mapDispatchToProps = {
  setValue,
  register,
  login,
  setCurrentUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(NameScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    flex: 1,
  },
  padderTop: {
    paddingTop: 5,
  },
  padderBottom: {
    paddingBottom: 5,
  },
  fontcolor: {
    color: '#ffffff',
  },
  form: {
    width: '100%',
  },
  borderInput: {
    borderColor: '#ffffff',
  },
  labeltextStyle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 21,
    textAlign: 'left',
  },
  termnotestyle: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  termmainstyle: {
    paddingTop: '10%',
    alignSelf: 'center',
  },
  termstyle: {
    paddingTop: 3,
    alignSelf: 'center',
  },
  termleftstyle: {
    paddingTop: 3,
    flexDirection: 'row',
  },
  fontStyle: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 14,
  },
  fontItalic: {
    fontStyle: 'italic',
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 14,
    marginRight: 2,
  },
  fontnoteStyle: {
    color: '#ffffff',
    textAlign: 'left',
  },
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: '700',
  },
  fontStyle2: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
  },
});

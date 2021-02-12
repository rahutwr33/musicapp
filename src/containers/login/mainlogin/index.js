/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {FORGOT_PASSWORD_SCREEN} from '../../../navigation/screen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {connect} from 'react-redux';
import {login, setCurrentUser} from '../../../globals/store/actions/auth';
import storage from '../../../utils/storage';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import {BUFFER_SCREEN} from '../../../navigation/screen';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';

const MainLoginScreen = (props) => {
  const {t, i18n} = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [device_id, setdevice_id] = useState('');
  const [device_type, setdevicetype] = useState('');
  const [device_name, setdevice_name] = useState('');
  const [secureentry, setsecureentry] = useState(true);
  const [user_type, setuser_type] = useState(null);
  const [loader, setloader] = useState(false);
  const [fcmtoken, setfcm] = useState('');

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
  useEffect(() => {
    setuser_type(props.state);
  }, [props]);
  const changeinput = () => {
    setsecureentry((e) => !e);
  };
  const handleLogin = async () => {
    if (username && password) {
      if (password.length < 4) {
        setMessage('Password length should be greater then 4');
        setStatus(false);
      } else {
        try {
          var backhandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true,
          );
          setloader(true);
          let response = await login({
            username: username,
            password: password,
            device_id: device_id,
            device_type: device_type,
            device_name: device_name,
            user_type: user_type,
            fcm_token: fcmtoken,
          });
          if (response && response.status) {
            await storage.set('user', JSON.stringify(response));
            await props.setCurrentUser(response);
            setMessage(response.message);
            setStatus(true);
            setloader(false);
            if (response && response.user && response.user.is_artist) {
              backhandler.remove();
              PushScreen(BUFFER_SCREEN, props, true);
            } else {
              backhandler.remove();
              PushScreen(BUFFER_SCREEN, props, true);
            }
          } else {
            backhandler.remove();
            setMessage(response.message);
            setStatus(false);
            setloader(false);
          }
        } catch (error) {
          backhandler.remove();
          setloader(false);
          setMessage(String(error));
          setStatus(false);
        }
      }
    } else {
      setMessage('Incorrect username or password');
      setStatus(false);
    }
  };

  return (
    <KeyboardAvoid>
      <Container
        style={styles.container}
        pointerEvents={loader ? 'none' : 'auto'}>
        <Headers title="" navigation={props} />
        <View style={{flex: 1}}>
          <Content
            scrollEnabled={false}
            padder
            contentContainerStyle={styles.center}>
            <Form>
              <Item regular style={styles.borderInput}>
                <Input
                  keyboardType="email-address"
                  placeholderTextColor="#ffffff"
                  name="username"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder={t('Email_Address_or_Username')}
                  style={styles.emailInput}
                  onChangeText={(e) => setUsername(e)}
                />
              </Item>
              <Item regular style={styles.borderInput}>
                <Input
                  secureTextEntry={secureentry}
                  name="password"
                  placeholderTextColor="#ffffff"
                  placeholder={t('Password')}
                  autoCorrect={false}
                  autoCompleteType="off"
                  style={styles.emailInput}
                  onChangeText={(e) => setPassword(e)}
                />
                <Icon
                  name="eye"
                  color="#fff"
                  size={16}
                  onPress={() => changeinput()}
                  style={{paddingRight: 10}}
                />
              </Item>
              <View style={styles.padderTop}>
                <Text
                  style={[
                    styles.fontStyle,
                    {color: status ? '#01BDBD' : '#ed4377'},
                  ]}>
                  {message}
                </Text>
              </View>
              {loader ? (
                <ActivityIndicator size="large" />
              ) : (
                <Button
                  buttonTitle={t('LOGIN')}
                  onPress={() => handleLogin()}
                />
              )}
              <TouchableOpacity
                style={{marginTop: 30}}
                onPress={() => PushScreen(FORGOT_PASSWORD_SCREEN, props)}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 14}}>
                  {t('Forgot_your_password')}
                </Text>
              </TouchableOpacity>
            </Form>
          </Content>
        </View>
      </Container>
    </KeyboardAvoid>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {login, setCurrentUser};
export default connect(mapStateToProps, mapDispatchToProps)(MainLoginScreen);

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
  form: {
    width: '100%',
  },
  borderInput: {
    borderColor: '#ffffff',
    marginTop: 15,
  },
  labeltextStyle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'left',
  },
  fontStyle: {
    textAlign: 'left',
    fontSize: 16,
  },
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: '700',
  },
});

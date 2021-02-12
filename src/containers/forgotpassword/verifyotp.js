/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {Button} from '../../components/button';
import Headers from '../../components/header';
import {connect} from 'react-redux';
import {reset_password} from '../../globals/store/actions/auth';
import {useTranslation} from 'react-i18next';
import {PushScreen} from '../../navigation/pushscreen';
import {MAIN_LOGIN_SCREEN} from '../../navigation/screen';

const VerifyOtpScreen = (props) => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setloader] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(() => {}, []);

  const sendLink = async () => {
    setloader(true);
    if (token && password) {
      let response = await reset_password({
        activation_key: token,
        new_password: password,
      });
      console.log('response', response);
      if (response && response.status) {
        setloader(false);
        setStatus(true);
        setMessage(response.message);
        setToken('');
        setPassword('');
        setMessage('');
        PushScreen(MAIN_LOGIN_SCREEN, props, false);
      } else {
        setloader(false);
        setStatus(false);
        setMessage(response.message);
      }
    } else {
      setloader(false);
      setStatus(false);
      setMessage('Invalid entry');
    }
  };
  return (
    <Container style={styles.container}>
      <Headers title="" navigation={props} />
      <Content
        scrollEnabled={false}
        padder
        contentContainerStyle={styles.center}>
        <Form>
          <Item regular style={styles.borderInput}>
            <Input
              name="tokenkey"
              autoCapitalize="none"
              placeholderTextColor="#ffffff"
              autoCorrect={false}
              autoCompleteType="off"
              value={token}
              placeholder={t('Reset_Password_Activation_Key')}
              style={styles.emailInput}
              onChangeText={(e) => setToken(e)}
            />
          </Item>
          <Item regular style={styles.borderInput}>
            <Input
              name="password"
              autoCapitalize="none"
              placeholderTextColor="#ffffff"
              autoCorrect={false}
              value={password}
              autoCompleteType="off"
              placeholder={t('Enter_Password')}
              style={styles.emailInput}
              onChangeText={(e) => setPassword(e)}
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
          <Button buttonTitle={t('Submit')} onPress={sendLink} />
          {loader ? (
            <ActivityIndicator style={{marginTop: 10}} size="large" />
          ) : null}
        </Form>
      </Content>
    </Container>
  );
};

const mapDispatchToProps = {reset_password};
export default connect(null, mapDispatchToProps)(VerifyOtpScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
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
    fontSize: 16,
  },
});

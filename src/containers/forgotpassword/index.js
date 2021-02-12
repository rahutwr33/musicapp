/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {Button} from '../../components/button';
import Headers from '../../components/header';
import {connect} from 'react-redux';
import {forgot_password} from '../../globals/store/actions/auth';
import * as Validator from 'validator';
import {useTranslation} from 'react-i18next';
import {PushScreen} from '../../navigation/pushscreen';
import {VERIFY_TOKEN} from '../../navigation/screen';

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setloader] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(() => {}, []);

  const sendLink = async () => {
    setloader(true);
    if (email && Validator.isEmail(email)) {
      let response = await forgot_password({email: email});
      if (response && response.status) {
        setloader(false);
        setStatus(true);
        setMessage(response.message);
        PushScreen(VERIFY_TOKEN, props, true);
      } else {
        setloader(false);
        setStatus(false);
        setMessage(response.message);
      }
    } else {
      setloader(false);
      setStatus(false);
      setMessage('Incorrect email');
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
              name="email"
              autoCapitalize="none"
              placeholderTextColor="#ffffff"
              autoCorrect={false}
              autoCompleteType="off"
              placeholder={t('Email_Address')}
              style={styles.emailInput}
              onChangeText={(e) => setEmail(e)}
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
          <Button buttonTitle={t('Get_Link')} onPress={sendLink} />
          {loader ? (
            <ActivityIndicator style={{marginTop: 10}} size="large" />
          ) : null}
        </Form>
      </Content>
    </Container>
  );
};

const mapDispatchToProps = {forgot_password};
export default connect(null, mapDispatchToProps)(ForgotPasswordScreen);

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

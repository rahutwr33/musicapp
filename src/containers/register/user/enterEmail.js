/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {PASSWORD_SCREEN} from '../../../navigation/screen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {setValue} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import * as Validator from 'validator';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import {checkusername} from '../../../globals/store/actions/auth';
import {useTranslation} from 'react-i18next';

const EmailScreen = (props) => {
  const [email, setEmail] = useState(props.user.email || '');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const {t, i18n} = useTranslation();

  const submit = async () => {
    if (email) {
      if (Validator.isEmail(email)) {
        let verify = await checkusername(email);
        if (verify && verify.success) {
          await props.setValue({email: email});
          setMessage('');
          setStatus(true);
          PushScreen(PASSWORD_SCREEN, props);
        } else {
          setMessage('Email already exist.');
          setStatus(false);
        }
      } else {
        setMessage('Invalid email');
        setStatus(false);
      }
    } else {
      setMessage('Email is required');
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
                {t("What's_your_email?")}
              </Text>
            </View>
            <Item regular style={styles.borderInput}>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#ffffff"
                placeholder={t('Email_Address')}
                style={styles.emailInput}
                value={email}
                onChangeText={(e) => setEmail(e)}
                autoCorrect={false}
                autoCompleteType="off"
              />
            </Item>
            <View style={styles.padderTop}>
              <Text style={styles.fontStyle}>
                {t('You’ll_need_to_confirm_this_email_later')}
              </Text>
            </View>
            <View style={styles.padderTop}>
              <Text
                adjustsFontSizeToFit={true}
                style={[
                  styles.fontStyle,
                  {color: status ? '#01BDBD' : '#ed4377'},
                ]}>
                {message}
              </Text>
            </View>
            <Button onPress={() => submit()} buttonTitle={t('Next')} />
          </Form>
        </Content>
      </Container>
    </KeyboardAvoid>
  );
};
const mapStateToProps = (state) => ({
  user: state.Auth.registeruser,
});

const mapDispatchToProps = {setValue};
export default connect(mapStateToProps, mapDispatchToProps)(EmailScreen);

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
  },
  labeltextStyle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'left',
  },
  fontStyle: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
  },
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
  },
});

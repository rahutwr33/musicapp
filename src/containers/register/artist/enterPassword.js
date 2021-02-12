/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {ARTIST_DOB_SCREEN} from '../../../navigation/screen';
import {connect} from 'react-redux';
import {setArtistValue} from '../../../globals/store/actions';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';

const ArtistPasswordScreen = (props) => {
  var [password, setPassword] = useState(props.user.password);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [secureentry, setsecureentry] = useState(true);
  const {t, i18n} = useTranslation();

  const submit = async () => {
    password = password.replace(' ', '');
    if (password) {
      if (password.length < 8) {
        setMessage('Password should has at least 8 characters.');
        setStatus(false);
      } else {
        await props.setArtistValue({password: password});
        setMessage('');
        setStatus(true);
        PushScreen(ARTIST_DOB_SCREEN, props);
      }
    } else {
      setMessage('Incorrect password');
      setStatus(false);
    }
  };
  const changeinput = () => {
    setsecureentry((e) => !e);
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
              <Text style={styles.labeltextStyle}>{t('Create_Password')}</Text>
            </View>
            <Item regular style={styles.borderInput}>
              <Input
                secureTextEntry={secureentry}
                placeholderTextColor="#ffffff"
                placeholder={t('Password')}
                style={styles.emailInput}
                onChangeText={(e) => setPassword(e.trim())}
                value={password}
                autoCorrect={false}
                autoCompleteType="off"
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
              <Text style={styles.fontStyle}>
                {t('Your_password_needs_to_be_at_least_8_characters_long')}
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
  user: state.Auth.registerartist,
});

const mapDispatchToProps = {setArtistValue};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistPasswordScreen);
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
    fontSize: 21,
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

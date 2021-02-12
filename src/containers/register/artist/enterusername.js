/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {ARTIST_EMAIL_SCREEN} from '../../../navigation/screen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {setArtistValue} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import {checkusername} from '../../../globals/store/actions/auth';
import {useTranslation} from 'react-i18next';
import * as _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';
const ArtistUserNameScreen = (props) => {
  const [username, setUserName] = useState(props.user.username);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const {t, i18n} = useTranslation();
  const [suggestion, setsuggestion] = useState([]);
  const delayedQuery = _.debounce((q) => sendQuery(q), 1000);
  const sendQuery = (query) => {
    let verify = checkusername(query).then((key) => {
      return key;
    });
    verify.then((key) => {
      if (!key.data) {
        setsuggestion([]);
        setMessage('Username is required.');
        setStatus(false);
      }
      if (key.data && Array.isArray(key.data)) {
        setsuggestion(key.data);
        setMessage('');
        setStatus(true);
      }
    });
  };
  const submit = async () => {
    if (username && String(username).trim()) {
      if (username && username.length < 3) {
        setMessage('Username should has at least 3 characters.');
        setStatus(false);
      } else {
        let verify = await checkusername(username);
        if (verify && verify.success) {
          await props.setArtistValue({username: username});
          setMessage('');
          setStatus(true);
          PushScreen(ARTIST_EMAIL_SCREEN, props);
        } else {
          setMessage('Username already exist.');
          setStatus(false);
        }
      }
    } else {
      setMessage('Incorrect Username');
      setStatus(false);
    }
  };

  const findusername = (e) => {
    setUserName(e);
    delayedQuery(e);
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
                {t("What's_your_username?")}
              </Text>
            </View>
            <Item regular style={styles.borderInput}>
              <Input
                autoCapitalize="none"
                placeholderTextColor="#ffffff"
                placeholder={t('Username')}
                style={styles.emailInput}
                onChangeText={(e) => findusername(e)}
                value={username}
                autoCorrect={false}
                autoCompleteType="off"
              />
            </Item>
            <View style={styles.padderTop}>
              {suggestion.map((key) => {
                return (
                  <TouchableOpacity
                    onPress={() => setUserName(key)}
                    style={{flexDirection: 'row', marginTop: 5}}>
                    <Icon
                      name="dot-circle"
                      size={14}
                      color="#3B5998"
                      style={{paddingTop: 3}}
                    />
                    <Text
                      style={{color: '#3B5998', paddingLeft: 10, fontSize: 20}}>
                      {key}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.padderTop}>
              <Text style={styles.fontStyle}>
                {t('This_appears_on_your_profiles')}
              </Text>
              {/* <Text style={styles.fontStyle}>alternative for logging in</Text> */}
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
)(ArtistUserNameScreen);

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

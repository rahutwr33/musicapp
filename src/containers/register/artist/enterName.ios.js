/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {ARTIST_USERNAME} from '../../../navigation/screen';
import {setArtistValue} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import {useTranslation} from 'react-i18next';

const ArtistNameScreen = (props) => {
  const [name, setName] = useState(props.user.first_name || '');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const {t, i18n} = useTranslation();

  const submit = async () => {
    if (name && String(name).trim()) {
      if (name.length < 3) {
        setMessage('Name should has at least 3 characters.');
        setStatus(false);
      } else {
        await props.setArtistValue({first_name: name});
        setMessage('');
        setStatus(true);
        PushScreen(ARTIST_USERNAME, props);
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
                {t('What’s_your_full_name?')}
              </Text>
            </View>
            <Item regular style={styles.borderInput}>
              <Input
                autoCapitalize="none"
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
                  styles.fontnoteStyle,
                  {color: status ? '#01BDBD' : '#ed4377'},
                ]}>
                {message}
              </Text>
            </View>
            <Button onPress={() => submit()} buttonTitle={t('Create')} />
          </Form>
          <View style={styles.termmainstyle}>
            <View style={styles.termnotestyle}>
              <Text style={(styles.fontcolor, styles.fontItalic)}>
                {' '}
                {t('Terms_of_Service')}
              </Text>
              <Text style={styles.fontStyle}>{t('By_creaeting')}</Text>
            </View>
            <View />
            <View style={styles.termstyle}>
              <Text style={(styles.fontcolor, styles.fontStyle)}>
                {' '}
                {t('to_learn')}
              </Text>
            </View>
            <View style={styles.termleftstyle}>
              <Text style={styles.fontItalic}>{t('Privacy_Policy')}</Text>
              <Text style={styles.fontStyle}>{t('protects')}</Text>
            </View>
          </View>
        </Content>
      </Container>
    </KeyboardAvoid>
  );
};
const mapStateToProps = (state) => ({
  user: state.Auth.registerartist,
});

const mapDispatchToProps = {setArtistValue};
export default connect(mapStateToProps, mapDispatchToProps)(ArtistNameScreen);
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
    fontSize: 16,
    textAlign: 'left',
  },
  termnotestyle: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  termmainstyle: {
    marginTop: '10%',
    alignSelf: 'center',
  },
  termstyle: {
    marginTop: 3,
    alignSelf: 'center',
  },
  termleftstyle: {
    flexDirection: 'row',
    marginTop: 3,
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
    fontSize: 16,
  },
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 16,
  },
});

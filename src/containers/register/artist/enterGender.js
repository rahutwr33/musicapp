/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Form, Container, Content} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {ARTIST_COUNTRY} from '../../../navigation/screen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {setArtistValue} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import {useTranslation} from 'react-i18next';

const ArtistGenderScreen = (props) => {
  const [gender, setGender] = useState(props.user.gender);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const {t, i18n} = useTranslation();

  const submit = async () => {
    if (gender) {
      await props.setArtistValue({gender: gender});
      setMessage('');
      setStatus(true);
      PushScreen(ARTIST_COUNTRY, props);
    } else {
      PushScreen(ARTIST_COUNTRY, props);
      // setMessage('Incorrect gender');
      // setStatus(false);
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
                {t('What’s_your_gender?')} {`(${t('Optional')})`}
              </Text>
            </View>
            <View style={styles.dobstyle}>
              <TouchableOpacity
                onPress={(e) => setGender('M')}
                style={[
                  styles.maleInput,
                  {backgroundColor: gender === 'M' ? '#01BDBD' : '#262626'},
                ]}>
                <Text style={styles.fontStyle}>{t('Male')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(e) => setGender('F')}
                style={[
                  styles.femaleInput,
                  {backgroundColor: gender === 'F' ? '#01BDBD' : '#262626'},
                ]}>
                <Text style={styles.fontStyle}>{t('Female')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(e) => setGender('NB')}
                style={[
                  styles.femaleInput,
                  {backgroundColor: gender === 'NB' ? '#01BDBD' : '#262626'},
                ]}>
                <Text style={styles.fontStyle}>{t('Non_binary')}</Text>
              </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(ArtistGenderScreen);
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
  paddermaxTop: {
    paddingTop: 10,
  },
  dobstyle: {
    flexDirection: 'row',
  },
  padderBottom: {
    paddingBottom: 5,
  },
  form: {
    width: '100%',
  },
  borderInput: {
    borderColor: '#ffffff',
    marginRight: 10,
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
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
  },
  femaleInput: {
    color: '#fff',
    borderColor: '#ffffff',
    borderWidth: 1,
    marginLeft: 20,
  },
  maleInput: {
    borderColor: '#ffffff',
    borderWidth: 1,
    color: '#fff',
    position: 'relative',
  },
  nonbinaryInput: {
    borderColor: '#ffffff',
    borderWidth: 1,
    marginTop: 20,
  },
});

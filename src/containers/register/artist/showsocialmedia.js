/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Form, Container} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {ARTIST_SELECT_GENRE_SCREEN} from '../../../navigation/screen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {setArtistValue} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import Instagram from '../../../assets/svg/insta.svg';
import Facebook from '../../../assets/svg/facebook.svg';
import Twitter from '../../../assets/svg/twitter.svg';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import * as Validator from 'validator';
import {useTranslation} from 'react-i18next';

const ArtistShowSocialMediaScreen = (props) => {
  let [facebook, setfacebook] = useState();
  let [insta, setInsta] = useState('');
  let [twitter, setTwitter] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const {t, i18n} = useTranslation();

  useEffect(() => {
    if (props.user.social_media && props.user.social_media.length > 0) {
      props.user.social_media.map((x) => {
        if (x.link_type === 'fb') {
          setfacebook(x.link);
        } else if (x.link_type === 'insta') {
          setInsta(x.link);
        } else if (x.link_type === 'twitter') {
          setTwitter(x.link);
        }
      });
    }
  }, []);

  const submit = async () => {
    let arr = [];
    if (facebook || insta || twitter) {
      if (facebook) {
        arr.push({
          link_type: 'fb',
          link: facebook,
        });
      }
      if (twitter) {
        arr.push({
          link_type: 'twitter',
          link: twitter,
        });
      }
      if (insta) {
        arr.push({
          link_type: 'insta',
          link: insta,
        });
      }
      if (arr.length > 0) {
        let total = [];
        arr.map(async (key, i) => {
          if (Validator.isURL(key.link)) {
            total.push(i);
            if (total.length === arr.length) {
              await props.setArtistValue({
                social_media: arr,
              });
              setMessage('');
              setStatus(true);
              PushScreen(ARTIST_SELECT_GENRE_SCREEN, props);
            }
          } else {
            setMessage('Please enter valid url.');
            setStatus(false);
          }
        });
      }
    } else {
      PushScreen(ARTIST_SELECT_GENRE_SCREEN, props);
      // setMessage('Please select atleast one social media platform.');
      // setStatus(false);
    }
  };
  return (
    <KeyboardAvoid>
      <Container style={styles.container}>
        <Headers title={t('Create_Account')} navigation={props} />
        <View style={styles.center}>
          <View style={styles.padderBottom}>
            <Text style={styles.labeltextStyle}>{t('Your_Social_Media')}</Text>
            <Text style={styles.optionaltextStyle}>({t('Optional')})</Text>
          </View>
          <Form>
            <View style={styles.iconviewstyle}>
              {props.user.is_social_media &&
              props.user.is_social_media.length > 0 &&
              props?.user?.is_social_media[0].facebook ? (
                <View style={styles.space}>
                  <Facebook
                    preserveAspectRatio="none"
                    width={50}
                    height={50}
                    style={styles.paddingstyle}
                  />
                  <TextInput
                    style={styles.inputstyle}
                    autoCapitalize="none"
                    keyboardType="default"
                    value={facebook}
                    onChangeText={(e) => setfacebook(e)}
                    autoCorrect={false}
                    autoCompleteType="off"
                  />
                </View>
              ) : null}

              {props.user.is_social_media &&
              props.user.is_social_media.length > 0 &&
              props?.user?.is_social_media[0].insta ? (
                <View style={styles.space}>
                  <Instagram
                    preserveAspectRatio="none"
                    width={50}
                    height={50}
                    style={styles.paddingstyle}
                  />
                  <TextInput
                    style={styles.inputstyle}
                    autoCapitalize="none"
                    keyboardType="default"
                    value={insta}
                    onChangeText={(e) => setInsta(e)}
                    autoCorrect={false}
                    autoCompleteType="off"
                  />
                </View>
              ) : null}

              {props.user.is_social_media &&
              props.user.is_social_media.length > 0 &&
              props?.user?.is_social_media[0].twitter ? (
                <View style={styles.space}>
                  <Twitter
                    preserveAspectRatio="none"
                    width={50}
                    height={50}
                    style={styles.paddingstyle}
                  />
                  <TextInput
                    style={styles.inputstyle}
                    autoCapitalize="none"
                    keyboardType="default"
                    value={twitter}
                    onChangeText={(e) => setTwitter(e)}
                    autoCorrect={false}
                    autoCompleteType="off"
                  />
                </View>
              ) : null}
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
            <Button onPress={() => submit()} buttonTitle={t('Next')} />
          </Form>
        </View>
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
)(ArtistShowSocialMediaScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
  },
  underlinefont: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#219797',
  },
  space: {
    margin: 5,
  },
  iconviewstyle: {},
  center: {
    padding: 20,
  },
  inputstyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  padderTop: {
    paddingTop: 5,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  padderBottom: {
    marginBottom: 20,
  },
  paddingstyle: {
    margin: 10,
  },
  form: {
    width: '100%',
  },
  labeltextStyle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 21,
    textAlign: 'left',
  },
  optionaltextStyle: {
    color: '#ffffff',
    fontSize: 21,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  fontStyle: {
    color: '#ffffff',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 16,
  },
  fontStyle2: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
  },
});

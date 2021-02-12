/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Form, Container} from 'native-base';
import {PushScreen} from '../../../navigation/pushscreen';
import {ARTIST_SHOW_SOCIAL_MEDIA_SCREEN} from '../../../navigation/screen';
import {Button} from '../../../components/button';
import Headers from '../../../components/header';
import {setArtistValue} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import Instagram from '../../../assets/svg/insta.svg';
import Facebook from '../../../assets/svg/facebook.svg';
import Twitter from '../../../assets/svg/twitter.svg';
import KeyboardAvoid from '../../../components/avoidkeyboards';
import {useTranslation} from 'react-i18next';

const {height} = Dimensions.get('window');
const ArtistSocialMediaScreen = (props) => {
  let [facebook, setfacebook] = useState(
    props?.user?.is_social_media[0]?.facebook || false,
  );
  let [insta, setInsta] = useState(
    props?.user?.is_social_media[0]?.insta || false,
  );
  let [twitter, setTwitter] = useState(
    props?.user?.is_social_media[0]?.twitter || false,
  );
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const {t, i18n} = useTranslation();

  const submit = async () => {
    // if (facebook || insta || twitter) {
    await props.setArtistValue({
      is_social_media: [{facebook: facebook, insta: insta, twitter: twitter}],
    });
    setMessage('');
    setStatus(true);
    PushScreen(ARTIST_SHOW_SOCIAL_MEDIA_SCREEN, props);
    // } else {
    //   PushScreen(ARTIST_SHOW_SOCIAL_MEDIA_SCREEN, props);
    // setMessage('Please select atleast one social media platform.');
    // setStatus(false);
    // }
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
              <TouchableOpacity onPress={() => setTwitter(!twitter)}>
                <Twitter
                  preserveAspectRatio="none"
                  width={50}
                  height={50}
                  style={styles.paddingstyle}
                />
                {twitter ? (
                  <View
                    style={[
                      styles.dotstyle,
                      {
                        backgroundColor: '#26acee',
                        alignSelf: 'center',
                        bottom: -5,
                      },
                    ]}
                  />
                ) : null}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setInsta(!insta)}>
                <Instagram
                  preserveAspectRatio="none"
                  width={50}
                  height={50}
                  style={styles.paddingstyle}
                />
                {insta ? (
                  <View
                    style={[
                      styles.dotstyle,
                      {
                        backgroundColor: '#9a32a1',
                        alignSelf: 'center',
                        bottom: -5,
                      },
                    ]}
                  />
                ) : null}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setfacebook(!facebook)}>
                <Facebook
                  preserveAspectRatio="none"
                  width={50}
                  height={50}
                  style={styles.paddingstyle}
                />
                {facebook ? (
                  <View
                    style={[
                      styles.dotstyle,
                      {
                        backgroundColor: '#1877f2',
                        alignSelf: 'center',
                        bottom: -5,
                      },
                    ]}
                  />
                ) : null}
              </TouchableOpacity>
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
)(ArtistSocialMediaScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
  },
  underlinefont: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#219797',
  },
  iconviewstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    flex: 0.7,
    padding: 10,
  },
  dotstyle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    position: 'absolute',
  },
  padderTop: {
    paddingTop: 5,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  padderBottom: {
    marginBottom: height / 4.5,
  },
  paddingstyle: {
    margin: 10,
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
  },
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
  },
  fontStyle2: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
  },
});

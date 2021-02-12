/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Form, Item, Input} from 'native-base';
// import {PushScreen} from '../../../navigation/pushscreen';
import {Button} from '../../../components/button';
import {
  getGenreList,
  setArtistValue,
  login,
  register,
  setCurrentUser,
} from '../../../globals/store/actions';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import storage from '../../../utils/storage';
import Headers from '../../../components/header';
import {Alerts} from '../../../utils/alert';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SELECT_ARTIST_OF_ARTIST} from '../../../navigation/screen';
import {PushScreen} from '../../../navigation/pushscreen';
import DeviceInfo from 'react-native-device-info';
import {Translation} from 'react-i18next';

function debounce(a, b, c) {
  var d, e;
  return function () {
    function h() {
      (d = null), c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
}
class ArtistSelectGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: [],
      select: '',
      id: '',
      search: '',
      device_id: '',
      device_type: '',
      device_name: '',
      fcmtoken: '',
      toggleCheckBox: false,
    };
  }
  componentDidMount = async () => {
    let deviceId = DeviceInfo.getDeviceId();
    let uniqueId = DeviceInfo.getUniqueId();
    storage.get('fcmToken').then((token) => {
      this.setState({fcmtoken: token});
    });
    this.setState({
      device_id: deviceId,
      device_type: 'mobile',
      device_name: uniqueId,
    });
    const genreList = await getGenreList({genre: ''});
    if (genreList && genreList.success) {
      this.setState({genre: genreList.data});
    }
  };

  searchGenre = debounce((search) => {
    this.setState({search}, async () => {
      let val = search;
      const genreList = await getGenreList({genre: val});
      if (genreList && genreList.success) {
        this.setState({genre: genreList.data ? genreList.data : []});
      }
    });
  }, 1000);

  renderItem = ({item}) => (
    <View
      key={`genre_${String(item.id)}${Date.now()}`}
      style={styles.imageStyle}>
      <TouchableOpacity
        onPress={() => this.setState({id: item.id})}
        style={[
          styles.thumbnailStyle,
          {
            backgroundColor:
              this.state.id === item.id ? '#00F6F3' : 'transparent',
          },
        ]}>
        <Text adjustsFontSizeToFit={true} style={styles.thumbnailfontstyle}>
          {item.genre}
        </Text>
      </TouchableOpacity>
    </View>
  );

  submit = async () => {
    if (this.state.id && this.state.toggleCheckBox) {
      await this.props.setArtistValue({genre_id: this.state.id});
      this.props.Auth.registerartist.genre_id = this.state.id;
      // delete this.props.Auth.registerartist.is_social_media;
      let response = await register(this.props.Auth.registerartist);
      if (response && response.success) {
        let loginresponse = await login({
          username: this.props.Auth.registerartist.username,
          password: this.props.Auth.registerartist.password,
          device_id: this.state.device_id,
          device_type: this.state.device_type,
          device_name: this.state.device_name,
          user_type: 1,
          fcm_token: this.state.fcmtoken,
        });
        if (loginresponse && loginresponse.status) {
          await storage.set('user', JSON.stringify(loginresponse));
          await this.props.setCurrentUser(loginresponse);
          setTimeout(() => {
            PushScreen(SELECT_ARTIST_OF_ARTIST, this.props, '', '');
          }, 1000);
        } else {
          Alerts(loginresponse.message, '', '');
        }
      } else {
        let keys = Object.keys(response.error)[0];
        Alerts(`${keys} should be unique`, '', '');
      }
    } else {
      Alerts('Incorrect genre', '', '');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Translation>
          {(t) => (
            <SafeAreaView style={styles.contentStyle}>
              <Headers title={t('Create_Account')} navigation={this.props} />
              <Form style={styles.formStyle}>
                <View>
                  <Text style={styles.labeltextStyle}>
                    {t('Choose_your_music_genre')}
                  </Text>
                </View>
                <View style={styles.padderTop}>
                  <Item regular style={styles.borderInput}>
                    <Icon
                      style={styles.searchIcon}
                      name="search"
                      size={16}
                      color="#929292"
                    />
                    <Input
                      autoCapitalize="none"
                      placeholderTextColor="#ffffff"
                      placeholder={t('Search')}
                      style={styles.emailInput}
                      onChangeText={(e) => this.searchGenre(e)}
                      autoCorrect={false}
                      autoCompleteType="off"
                    />
                  </Item>
                </View>
                <View style={styles.padderTop}>
                  <FlatList
                    autoCapitalize="none"
                    data={this.state.genre}
                    numColumns={3}
                    renderItem={(item) => this.renderItem(item)}
                    keyExtractor={(item) => item.id}
                  />
                </View>
                <View
                  style={[
                    styles.padderTop,
                    {flexDirection: 'row', paddingLeft: 5},
                  ]}>
                  <CheckBox
                    disabled={false}
                    value={this.state.toggleCheckBox}
                    tintColor="#ffff"
                    onValueChange={(newValue) =>
                      this.setState({toggleCheckBox: newValue})
                    }
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Linking.canOpenURL(
                        'https://www.mptone.com/en/terms-conditions/',
                      ).then((supported) => {
                        if (supported) {
                          Linking.openURL(
                            'https://www.mptone.com/en/terms-conditions/',
                          );
                        } else {
                          console.log(
                            "Don't know how to open URI: " + this.props.url,
                          );
                        }
                      });
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        paddingLeft: 10,
                      }}>
                      I have read and agree to the{' '}
                      <Text
                        style={{
                          color: '#0a66c2',
                          fontSize: 20,
                          paddingLeft: 10,
                          textDecorationLine: 'underline',
                        }}>
                        terms and conditions
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <Button onPress={() => this.submit()} buttonTitle={t('Next')} />
              </Form>
            </SafeAreaView>
          )}
        </Translation>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {
  setArtistValue,
  getGenreList,
  setCurrentUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(ArtistSelectGenre);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  contentStyle: {
    padding: 5,
  },
  iconstyle: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  thumbnailStyle: {
    width: 90,
    height: 40,
    borderRadius: 5,
    borderColor: '#00F6F3',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00F6F3',
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  imageStyle: {
    flex: 1 / 3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 5,
    marginTop: 15,
  },
  flatlistStyle: {
    marginLeft: 10,
  },
  formStyle: {
    marginTop: '20%',
    margin: 5,
  },
  center: {
    justifyContent: 'center',
    flex: 1,
  },
  thumbnailfontstyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '900',
  },
  searchIcon: {
    paddingLeft: 15,
    top: 2,
  },
  padderTop: {
    marginTop: '5%',
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
    fontSize: 21,
    textAlign: 'left',
  },
  termnotestyle: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  termmainstyle: {
    paddingTop: '10%',
    alignSelf: 'center',
  },
  termstyle: {
    paddingTop: 15,
    alignSelf: 'center',
  },
  termleftstyle: {
    paddingTop: 15,
    flexDirection: 'row',
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
  },
  fontnoteStyle: {
    color: '#ffffff',
    textAlign: 'left',
  },
  emailInput: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
  },
});

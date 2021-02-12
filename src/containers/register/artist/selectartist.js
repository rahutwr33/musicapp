/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Form, Item, Input} from 'native-base';
import {Button} from '../../../components/button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  getArtistList,
  updateuserArtist,
  updateUser,
  setCurrentUser,
} from '../../../globals/store/actions';
import {connect} from 'react-redux';
import {UserMainStack} from '../../../navigation/stack/main';
import api from '../../../config/api';
import FastImage from 'react-native-fast-image';
import {Alerts} from '../../../utils/alert';
import * as _ from 'underscore';
import {LoadAppScreen} from '../../../navigation/stack/load';
import {Translation} from 'react-i18next';

const {height} = Dimensions.get('window');
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

// const data = [
//   {id: 1, name: 'Arsh 123', image: '/media/noimage.jpg'},
//   {id: 2, name: 'Arsh Singh', image: '/media/noimage.jpg'},
//   {id: 3, name: 'Dawdled', image: '/media/noimage.jpg'},
//   {id: 6, name: 'sidhu moosewala', image: '/media/noimage.jpg'},
//   {id: 7, name: 'karan aujala', image: '/media/noimage.jpg'},
//   {id: 8, name: 'ranjitbawa', image: '/media/noimage.jpg'},
//   {id: 9, name: 'jassi gill', image: '/media/noimage.jpg'},
// ];
class SelectArtistOFArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: [],
      selectedid: [],
      selectedArtist: [],
      search: '',
    };
  }
  componentDidMount = async () => {
    const artistList = await getArtistList({artist: ''});
    if (artistList && artistList.status) {
      this.setState({artist: artistList.data});
    }
  };

  addArtist = (id) => {
    if (this.state.selectedid.indexOf(id) === -1) {
      this.state.selectedid.push(id);
      this.setState({selectedid: this.state.selectedid});
    } else {
      const index = this.state.selectedid.indexOf(id);
      if (index > -1) {
        this.state.selectedid.splice(index, 1);
      }
      this.setState({selectedid: this.state.selectedid});
    }
  };

  renderItem = ({item}) => (
    <View
      key={`artist_${String(item.id)}${Date.now()}`}
      style={styles.imageStyle}>
      <TouchableOpacity onPress={() => this.addArtist(item.id)}>
        <FastImage
          style={styles.imagestyle}
          source={{
            uri: `${api.imageurl}${item.image}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        {this.state.selectedid.indexOf(item.id) !== -1 ? (
          <Icon name="check" size={20} color="#fff" style={styles.iconstyle} />
        ) : null}
        <Text style={styles.thumbnailfontstyle}>{item.artist_name}</Text>
      </TouchableOpacity>
    </View>
  );

  submit = async () => {
    if (this.state.selectedid.length > 2) {
      try {
        let artist = this.state.selectedid + '';
        let update = await updateuserArtist({artist_id: artist});
        if (update && update.success) {
          await updateUser();
          await this.props.setCurrentUser();
          LoadAppScreen();
        }
      } catch (error) {
        Alerts('Something went wrong!', '', '');
      }
    } else {
      Alerts('Choose at least 3 artist', '', '');
    }
  };

  searchArtist = debounce((search) => {
    this.setState({search}, async () => {
      let val = search;
      const artistList = await getArtistList({artist: val});
      this.setState({artist: artistList.data ? artistList.data : []});
    });
  }, 1000);

  footer = (t) => {
    return (
      <View style={styles.footerstyle}>
        <Button onPress={() => this.submit()} buttonTitle={t('DONE')} />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Translation>
          {(t) => (
            <SafeAreaView style={styles.contentStyle}>
              <Form style={styles.formStyle}>
                <View>
                  <Text style={styles.labeltextStyle}>
                    {t('Choose_3_or_more_artists_you_like')}
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
                      onChangeText={(e) => this.searchArtist(e)}
                      autoCorrect={false}
                      autoCompleteType="off"
                    />
                  </Item>
                </View>
                <View style={styles.padderTop}>
                  <FlatList
                    columnWrapperStyle={styles.row}
                    data={this.state.artist}
                    numColumns={3}
                    renderItem={(item) => this.renderItem(item)}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={() => this.footer(t)}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
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

const mapDispatchToProps = {getArtistList, setCurrentUser};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectArtistOFArtist);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
    flex: 1,
  },
  footerstyle: {
    marginBottom: height / 2,
  },
  row: {},
  contentStyle: {
    padding: 5,
  },
  iconstyle: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  imagestyle: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderColor: '#338070',
    borderWidth: 3,
  },
  imageStyle: {
    flex: 1 / 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
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
    paddingTop: 10,
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    flexShrink: 1,
  },
  searchIcon: {
    paddingLeft: 15,
    top: 2,
  },
  padderTop: {
    marginTop: 20,
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
  },
});

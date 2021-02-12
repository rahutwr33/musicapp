/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Form, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {statusbarheight} from '../utils/statusbarheight';
import Wave from '../assets/svg/wave.svg';
import NoImage from '../assets/images/noimage.png';
import {PopScreen, PushPropsScreen} from '../navigation/pushscreen';
import {getconcert} from '../globals/store/actions/song';
import {CONCERT_SCREEN} from '../navigation/screen';
import api from '../config/api';
// import {closeOverlay} from './searchoverlay';
// import {PushPropsScreen} from '../navigation/pushscreen';

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
const ConcertSearchBarScreen = (props) => {
  const [message, setMessage] = useState('');
  const [search, setsearch] = useState('');
  const [list, setList] = useState([]);
  const [loader, setloader] = useState(false);

  const filter = debounce((searchvalue) => {
    Promise.resolve(setsearch(searchvalue)).then(async () => {
      let val = searchvalue;
      setloader(true);
      const results = await getconcert(val);
      if (results.success) {
        setloader(false);
        setList(results.data);
        if (results.data.length === 0) {
          setMessage('No concert found.');
        } else {
          setMessage('');
        }
      }
    });
  }, 1000);
  const renderItem = ({item}) => (
    <TouchableOpacity
      key={`playlist${String(item.id)}${Date.now()}`}
      onPress={() => {
        PushPropsScreen(CONCERT_SCREEN, props, true, {
          item: item,
        });
      }}
      style={styles.liststyle}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Image
          source={
            item.city_image ? {uri: api.imageurl + item.city_image} : NoImage
          }
          style={styles.imagestyle}
        />
        <View>
          <Text
            adjustsFontSizeToFit={true}
            style={{...styles.rightstyle, ...styles.topspace}}>
            {item.city_name}
          </Text>
          <View style={{flexDirection: 'row-reverse'}}>
            {props.tabindex === 2 || props.tabindex === 0 ? (
              <View style={styles.waveicon}>
                <Wave preserveAspectRatio="none" width={20} height={10} />
              </View>
            ) : null}
            <Text
              adjustsFontSizeToFit={true}
              style={{
                ...styles.rightstyle,
                ...styles.rightspace,
                ...{fontSize: 12},
              }}>
              {item.total_concert} concert
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.viewstyle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.1}}>
            <Icon
              style={styles.searchIcon}
              name="long-arrow-left"
              size={25}
              color="#fff"
              onPress={() => PopScreen(props)}
            />
          </View>
          <View style={{flex: 0.9}}>
            <Form style={styles.formstyle}>
              <Item regular style={styles.borderInput}>
                <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={16}
                  color="#fff"
                />
                <Input
                  placeholderTextColor="#ffffff"
                  placeholder={
                    props.state && props.state.placeholder
                      ? props.state.placeholder
                      : ''
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoCompleteType="off"
                  style={styles.emailInput}
                  autoFocus={true}
                  onChangeText={(e) => filter(e)}
                />
                <Icon
                  style={styles.closeIcon}
                  name="times-circle"
                  size={16}
                  color="#fff"
                  onPress={() => PopScreen(props)}
                />
              </Item>
            </Form>
          </View>
        </View>
        <View style={styles.messagestyle}>
          <Text style={styles.emailInput}>{message}</Text>
        </View>
      </View>
      <View style={styles.content}>
        {loader ? (
          <ActivityIndicator size="large" style={{marginTop: 50}} />
        ) : null}
        <FlatList
          data={list}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ConcertSearchBarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    marginTop: statusbarheight,
  },
  viewstyle: {
    flex: 0.15,
  },
  fontstyle: {
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  borderInput: {
    borderColor: '#ffffff',
  },
  emailInput: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
  },
  closeIcon: {
    paddingRight: 15,
    top: 2,
  },
  searchIcon: {
    top: 2,
    paddingLeft: 10,
  },
  formstyle: {
    margin: 25,
  },
  messagestyle: {
    alignSelf: 'center',
  },
  content: {
    flex: 0.85,
  },
  liststyle: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  rightstyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  topspace: {
    marginLeft: 10,
    fontWeight: '700',
  },
  rightspace: {
    paddingTop: 5,
    marginLeft: 10,
  },
  waveicon: {
    marginTop: 10,
    marginLeft: 5,
  },
});

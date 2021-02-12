/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Player from '../../components/miniplayer';
import {closeOverlay} from '../../components/searchoverlay';
import {SHARE_SCREEN} from '../../navigation/screen';
import {PushScreen} from '../../navigation/pushscreen';
const {width} = Dimensions.get('window');
const playlist = [
  {
    id: 'gdhagwdagwdhjagwdhjgawd',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    name: 'Sweet but psycho',
    artist: 'Ava max',
  },
  {
    id: 'hdgahwdgahjwdgajhwdgahjw',
    name: 'Closer (feat. Halset)',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    artist: 'The chainsmokers',
  },
  {
    id: 'bncmbmbdmncbd',
    name: '123',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    artist: 'Ariana',
  },
  {
    id: 'gjhgefhjsgefhjsgef',
    name: 'Taki Taki',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    artist: 'Cardi B',
  },
  {
    id: 'hjdtahwjdtajhwgdajhwdg',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    name: 'Ciao',
    artist: 'Anna-Marie',
  },
  {
    id: 'hgadfaghwdwdwdfdgahwfdahgwda',
    name: 'All of me',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    artist: 'jhon Legend',
  },
  {
    id: 'gjhgefhjsdwdwgefhjsgef',
    name: 'Taki Taki',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    artist: 'Cardi B',
  },
  {
    id: 'hjdtahwjdtdwdajhwgdajhwdg',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    name: 'Ciao',
    artist: 'Anna-Marie',
  },
  {
    id: 'hgadfaghwfddwdgahwfdahgwda',
    name: 'All of me',
    uri: 'https://i.ibb.co/mC89128/Rectangle-1.png',
    artist: 'jhon Legend',
  },
];
const SearchLocationFocused = (props) => {
  const renderItem = ({item, index}) => (
    <View
      key={`playlist${String(item.id)}${Date.now()}`}
      style={styles.liststyle}>
      <TouchableOpacity
        style={{flex: 0.9}}
        onPress={() => {
          PushScreen(SHARE_SCREEN, props, false, 0);
        }}>
        <View style={{flexDirection: 'row-reverse', padding: 10}}>
          <View style={{marginRight: 10}}>
            <Text
              adjustsFontSizeToFit={true}
              style={{...styles.rightstyle, ...styles.topspace}}>
              {index === 0 ? (
                <Icons name="alpha-e-box" size={20} color="#01BDBD" />
              ) : null}
              {item.name}
            </Text>
            <View style={{flexDirection: 'row-reverse'}}>
              <Text
                adjustsFontSizeToFit={true}
                style={{
                  ...styles.rightstyle,
                  ...styles.rightspace,
                  ...{fontSize: 14, opacity: 0.5},
                }}>
                {item.artist}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dotstyle}>
        <Icon name="ellipsis-h" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content2}>
        <View style={styles.searchbarstyle}>
          <TouchableOpacity
            style={styles.filterbtn}
            onPress={() => {
              closeOverlay();
              Keyboard.dismiss();
            }}>
            <Text style={styles.fontcolor2}>CANCEL</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#fff',
              marginLeft: 10,
              borderRadius: 5,
            }}>
            <TextInput
              autoCorrect={false}
              autoCompleteType="off"
              style={styles.inputstyle}
              autoCapitalize="none"
              autoFocus={true}
              placeholderTextColor="#fff"
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 5,
              }}>
              <Icon
                style={styles.searchIcon}
                name="search"
                size={14}
                color="#fff"
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.content3}>
        <FlatList
          data={playlist}
          nestedScrollEnabled={true}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchLocationFocused;

const styles = StyleSheet.create({
  container: {
    flex: 0.91,
    backgroundColor: '#262626',
  },
  listheader: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingRight: 10,
  },
  filterbtn: {
    marginLeft: 10,
    backgroundColor: '#01BDBD',
    borderRadius: 10,
  },
  searchbarstyle: {
    height: 50,
    width: width,
    alignItems: 'center',
    shadowColor: '#DADADA',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    flexDirection: 'row',
    marginLeft: 10,
  },
  liststyle: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  inputstyle: {
    width: width / 1.8,
    height: 40,
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    borderRadius: 15,
  },
  searchIcon: {},
  smalfont: {
    color: '#fff',
    opacity: 0.5,
    paddingLeft: 5,
  },
  dotstyle: {
    marginLeft: 10,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  imagestyle2: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },
  content: {
    width: '100%',
    height: 40,
    marginTop: 20,
  },
  content2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  content3: {
    flex: 1,
    marginBottom: 70,
  },
  rightstyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
  },
  fontcolor: {
    color: '#fff',
  },
  fontcolor2: {
    color: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    fontWeight: '700',
    paddingTop: 3,
    paddingBottom: 3,
  },
  block: {
    width: 50,
    height: 50,
    backgroundColor: '#01BDBD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topspace: {
    marginRight: 10,
  },
  rightspace: {
    paddingTop: 5,
    marginRight: 10,
  },
});

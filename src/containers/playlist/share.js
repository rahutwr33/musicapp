import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {PushScreen, PopScreen} from '../../navigation/pushscreen';
import {HIDDEN_MAIN_SCREEN} from '../../navigation/screen';
import Snapchat from '../../assets/svg/social/snapchat-outline.svg';
import Chat from '../../assets/svg/social/chat.svg';
import apiurl from '../../config/api';
import {connect} from 'react-redux';
import {updatecurrentsong} from '../../globals/store/actions/player';
import NoImage from '../../assets/images/noimage.png';

const actions = [
  {
    title: 'Whatsapp',
    icon: 'whatsapp',
    color: '#4FCE5D',
  },
  {
    title: 'Instagram Stories',
    icon: 'instagram',
    color: ['#515BD4', '#8134AF', '#DD2A7B', '#FEDA77', '#F58529'],
  },
  {
    title: 'Facebook Stories',
    icon: 'facebook-f',
    color: '#3B5998',
  },
  {
    title: 'Snapchat Stories',
    icon: 'snapchat-ghost',
    color: '#FFFC00',
  },
  {
    title: 'Messanger',
    icon: 'facebook-messenger',
    color: '#0084FF',
  },
  {
    title: 'Messages',
    icon: 'comment',
    color: '#44FF59',
  },
  {
    title: 'Copy Link',
    icon: 'unlink',
  },
  {
    title: 'More',
    icon: 'ellipsis-h',
  },
];
const ShareScreen = (props) => {
  const [currentindex, setIndex] = useState();
  const [songtitle, settitle] = useState('');
  const [songartist, setartist] = useState('');
  const [musicurl, setmusicurl] = useState('');

  useEffect(() => {
    if (props.Player && props.Player.currentsong) {
      settitle(props.Player.currentsong.song_title);
      setmusicurl(props.state);
      if (props.Player && props.Player.currentsong.song_artist) {
        setartist(props.Player.currentsong.song_artist);
      } else {
        setartist(props.Player.currentsong.artist);
      }
    }
  }, [props]);
  const showactions = (item) => {
    switch (item) {
      case 'More':
        // PushScreen(HIDDEN_MAIN_SCREEN, props, true, 0);
        break;
      case 'Whatsapp':
        Linking.openURL();
        break;
      default:
        break;
    }
  };
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={`action${String(index)}${Date.now()}`}
      onPressIn={() => {
        setIndex(index);
        setTimeout(() => {
          setIndex('');
          showactions(item.title);
        }, 100);
      }}
      style={styles.liststyle}>
      <View style={styles.lefticon}>
        <Icon
          name="angle-left"
          size={20}
          color="#fff"
          style={{
            ...styles.fontcolor,
            ...{opacity: index === currentindex ? 1 : 0.5},
          }}
        />
      </View>
      <View style={styles.align}>
        {item.icon === 'instagram' ? (
          <LinearGradient
            colors={item.color}
            style={{...styles.circlestyle, ...{backgroundColor: item.color}}}>
            <Icon
              name={item.icon}
              size={20}
              color="#fff"
              style={{...styles.fontcolor, ...{}}}
            />
          </LinearGradient>
        ) : item.icon === 'snapchat-ghost' ? (
          <View
            style={{...styles.circlestyle, ...{backgroundColor: item.color}}}>
            <Snapchat height="90%" width="90%" />
          </View>
        ) : item.icon === 'comment' ? (
          <View
            style={{...styles.circlestyle, ...{backgroundColor: item.color}}}>
            <Chat height="90%" width="90%" />
          </View>
        ) : (
          <View
            style={{...styles.circlestyle, ...{backgroundColor: item.color}}}>
            <Icon
              name={item.icon}
              size={20}
              style={{...styles.fontcolor, ...{color: '#fff'}}}
            />
          </View>
        )}
        <Text
          style={{
            ...styles.fontcolor,
            ...{
              fontSize: 16,
              paddingRight: 10,
              color: index === currentindex ? '#01BDBD' : '#fff',
            },
          }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rightalign}>
        <TouchableOpacity
          style={styles.absolutealign}
          onPress={() => PopScreen(props, false)}>
          <Icons
            name="long-arrow-right"
            size={30}
            color="#fff"
            style={styles.fade}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content1}>
        <Image
          source={
            props.state &&
            props.Player &&
            props.Player.currentsong &&
            props.Player.currentsong.song_image
              ? {uri: apiurl.imageurl + props.Player.currentsong.song_image}
              : NoImage
          }
          style={styles.imagestyle}
          resizeMode="cover"
        />
        <Text style={{...styles.fontcolor, ...{fontSize: 16, paddingTop: 10}}}>
          {songtitle ? songtitle : ''}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={{
            ...styles.fontcolor,
            ...{fontSize: 12, opacity: 0.6, paddingTop: 5},
          }}>
          {songartist ? songartist : ''}
        </Text>
      </View>
      <View style={styles.content2}>
        <FlatList
          data={actions}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Player: state.Player,
});

const mapDispatchToProps = {updatecurrentsong};
export default connect(mapStateToProps, mapDispatchToProps)(ShareScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  rightalign: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    top: 5,
    right: 10,
  },
  circlestyle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content1: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content2: {
    flex: 0.6,
  },
  imagestyle: {
    width: 150,
    height: 150,
    borderRadius: 2,
  },
  fontcolor: {
    color: '#fff',
    fontWeight: '600',
  },
  liststyle: {
    margin: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  align: {
    flexDirection: 'row-reverse',
    padding: 5,
    flex: 0.8,
    alignItems: 'center',
  },
  lefticon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fade: {
    opacity: 0.5,
  },
  absolutealign: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

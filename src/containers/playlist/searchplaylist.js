/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  // Easing,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import Player from '../../components/miniplayer';
import {PopScreen, PushPropsScreen} from '../../navigation/pushscreen';
import PlayListSearchHeaders from '../../components/playlistsearchheader';
import {Button} from '../../components/button';
import {statusbarheight} from '../../utils/statusbarheight';
import NoImage from '../../assets/images/noimage.png';
import apiurl from '../../config/api';
import {currentsong} from '../../globals/store/actions/player';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PLAYLIST_ACTION_MODEL} from '../../navigation/screen';
import {useTranslation} from 'react-i18next';
const {width} = Dimensions.get('window');

const PlayListSearchScreen = (props) => {
  const {t, i18n} = useTranslation();
  const openplayer = async (item) => {
    item.state = true;
    const results = await props.currentsong({
      item: item,
      currentsong: props.Player,
      currentsongid: item.song_id,
    });
    if (results.success) {
    }
  };

  const renderItem = ({item, index}) => (
    <>
      {!item.hide ? (
        <>
          {props.Auth.user.allow_explicity ? (
            <View
              key={`playlist${String(item.song_id)}${Date.now()}`}
              style={styles.liststyle}>
              <TouchableOpacity
                style={{flex: 0.9}}
                onPress={() => openplayer(item)}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <Image
                    source={
                      item.song_image
                        ? {uri: apiurl.imageurl + item.song_image}
                        : NoImage
                    }
                    style={styles.imagestyle}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text
                      adjustsFontSizeToFit={true}
                      style={{...styles.rightstyle, ...styles.topspace}}>
                      {item.song_title}
                      {item.explicity_content ? (
                        <Icons name="alpha-e-box" size={20} color="#01BDBD" />
                      ) : null}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{
                          ...styles.rightstyle,
                          ...styles.rightspace,
                          ...{fontSize: 12, opacity: 0.5},
                        }}>
                        {item.artist_name}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dotstyle}
                onPress={() => {
                  PushPropsScreen(PLAYLIST_ACTION_MODEL, props, false, {
                    ...{detail: true},
                    ...item,
                  });
                }}>
                <Icon name="ellipsis-v" size={16} color="#fff" />
                {/* <Text style={styles.smalfont}>3:14</Text> */}
              </TouchableOpacity>
            </View>
          ) : (
            !props.Auth.user.allow_explicity === !item.explicity_content && (
              <View
                key={`playlist${String(item.song_id)}${Date.now()}`}
                style={styles.liststyle}>
                <TouchableOpacity
                  style={{flex: 0.9}}
                  onPress={() => openplayer(item)}>
                  <View style={{flexDirection: 'row', padding: 10}}>
                    <Image
                      source={
                        item.song_image
                          ? {uri: apiurl.imageurl + item.song_image}
                          : NoImage
                      }
                      style={styles.imagestyle}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{...styles.rightstyle, ...styles.topspace}}>
                        {item.song_title}
                        {item.explicity_content ? (
                          <Icons name="alpha-e-box" size={20} color="#01BDBD" />
                        ) : null}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          adjustsFontSizeToFit={true}
                          style={{
                            ...styles.rightstyle,
                            ...styles.rightspace,
                            ...{fontSize: 12, opacity: 0.5},
                          }}>
                          {item.artist_name}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dotstyle}
                  onPress={() => {
                    PushPropsScreen(PLAYLIST_ACTION_MODEL, props, false, {
                      ...{detail: true},
                      ...item,
                    });
                  }}>
                  <Icon name="ellipsis-v" size={16} color="#fff" />
                  {/* <Text style={styles.smalfont}>3:14</Text> */}
                </TouchableOpacity>
              </View>
            )
          )}
        </>
      ) : null}
    </>
  );

  const shuffleplay = async () => {
    const results = await props.currentsong({
      item: {},
      currentsong: props.Player,
      currentsongid: 'shuffle',
    });
    if (results.success) {
      // showmodal(item);
    }
  };

  const loadimage = (title) => {
    if(title == 'Top_Singles'){
      return require('../../assets/images/topsingle.png')
    }else if(title == 'Top_Hits'){
      return require('../../assets/images/tophits.png')
    }else if(title == 'New_Release'){
      return require('../../assets/images/newrelease.png')
    }else if(title == 'mix1'){
      return require('../../assets/images/Rectangletwo.png')
    }else if(title == 'mix2'){
      return require('../../assets/images/Rectangle.png')
    }else if(title == 'mix3'){
      return require('../../assets/images/Group.png')
    }
  }

  const renderheader = () => {
    return (
      <Animated.View style={[styles.content2]}>
        {/* <View style={styles.searchbarstyle}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}>
            <Item
              regular
              style={styles.inputstyle}
              onPress={() =>
                showsearchbar({
                  Screen: SEARCH_LOCATION_FOCUSED,
                  placeholder: '',
                })
              }>
              <Icon
                style={styles.searchIcon}
                name="search"
                size={16}
                color="#fff"
              />
              <Text style={styles.fontStyle}>Find in playlist</Text>
            </Item>
          </View>
          <TouchableOpacity style={styles.filterbtn}>
            <Text style={styles.fontcolor2}>FILTERS</Text>
          </TouchableOpacity>
        </View> */}
        <Image
          style={styles.imagestyle2}
          source={
            props.state && props.state.cover_image ? {
                uri:apiurl.imageurl + props.state.cover_image 
            } : 
            props.state && props.state.topimage ?  loadimage(props.state.topimage) :
            {uri: 'https://i.ibb.co/rp6XHLZ/Rectangle-3.png'}
        }
        />
        <Text
          style={{
            ...styles.fontcolor,
            ...{fontSize: 16, fontWeight: '700', paddingTop: 10},
          }}>
          {props.Player.currentsong.song_title}
          {/* {props && props.state && props.state.playlist
            ? props.state.playlist
            : props.state.album
            ? props.state.album
            : ''} */}
        </Text>
        <Text
          style={{
            ...styles.fontcolor,
            ...{fontSize: 14, paddingTop: 5, opacity: 0.5},
          }}>
          {props.Player.currentsong.artist_name}
          {/* {props && props.Auth ? props.Auth.user.full_name : ''} */}
        </Text>
        <View>
          <Button buttonTitle={t('SHUFFLE')} onPress={() => shuffleplay()} />
        </View>
      </Animated.View>
    );
  };
  // const onscroll = (event) => {
  //   var currentOffset = event.nativeEvent.contentOffset.y;
  //   var direction = currentOffset > offset ? 'down' : 'up';
  //   setoffset(currentOffset);
  //   if (direction === 'up') {
  //     Animated.timing(animatevalue, {
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //   }
  //   if (direction === 'down') {
  //     Animated.timing(animatevalue, {
  //       toValue: -50,
  //       duration: 300,
  //     }).start();
  //   }
  // };
  return (
    <View style={styles.container}>
      <PlayListSearchHeaders
        title=""
        navigation={props.navigation}
        onRightPress={() => PopScreen(props)}
        righticon="long-arrow-right"
        onLeftPress={(e) => {}}
        lefticon={[]}
      />
      <View style={styles.content3}>
        <FlatList
          data={props.Player.playlist || []}
          // onScrollEndDrag={(e) => onscroll(e)}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.song_id}
          ListHeaderComponent={renderheader}
          showsVerticalScrollIndicator={false}
          // contentOffset={{y: offset}}
          scrollsToTop={true}
        />
      </View>
      <Player />
    </View>
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth.currentuser,
  Player: state.Player,
});

const mapDispatchToProps = {currentsong};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayListSearchScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    marginTop: statusbarheight,
  },
  listheader: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingRight: 10,
  },
  filterbtn: {
    marginLeft: 20,
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
    flexDirection: 'row',
  },
  inputstyle: {
    width: width - 40,
    height: 40,
    color: '#fff',
    fontSize: 16,
    borderRadius: 5,
    paddingLeft: 5,
  },
  searchIcon: {
    paddingRight: 5,
    // position: 'absolute',
    // left: 5,
  },
  smalfont: {
    color: '#fff',
    opacity: 0.5,
    paddingLeft: 5,
  },
  dotstyle: {
    marginLeft: 0,
    flex: 0.2,
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
    marginTop: 15,
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
  },
  content3: {
    flex: 1,
    marginBottom: 70,
  },
  rightstyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '700',
  },
  fontcolor: {
    color: '#fff',
  },
  fontcolor2: {
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    fontWeight: '700',
    paddingTop: 2,
    paddingBottom: 2,
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
    marginLeft: 10,
  },
  rightspace: {
    paddingTop: 5,
    marginLeft: 10,
  },
  fontStyle: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'left',
    flex: 1,
    fontSize: 14,
  },
});

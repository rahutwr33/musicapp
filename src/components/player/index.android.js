/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PlayerIcon from '../../assets/svg/Group-5.svg';
import {connect} from 'react-redux';
import {PushPropsScreen} from '../../navigation/pushscreen';
import {PLAYLIST_ACTION_MODEL} from '../../navigation/screen';
import Heart from '../../assets/svg/heart.svg';
import BlueHeart from '../../assets/svg/blueheart.svg';
import Swiper from 'react-native-deck-swiper';
// import MUSICLOGO from '../../assets/images/musiclogo.png';
import MUSICLOGO from '../../assets/images/musicone.png';
import {Spinner} from 'native-base';
import {
  songstate,
  updatecurrentsong,
  prevsong,
  nextsong,
  currentsong,
  currentplaylist,
} from '../../globals/store/actions/player';
import {
  hidesong,
  likesong,
  recentplayed,
  getuserselectionsong,
  heavyrotation,
} from '../../globals/store/actions/song';
import {usePlaybackState} from 'react-native-track-player';
import {stopbuffer} from '../../globals/store/actions/player';
import {saveduration} from '../../globals/store/actions/player';
import TrackPlayer, {useTrackPlayerProgress} from 'react-native-track-player';
import {
  userlikedsong,
  getplaylist,
  userAllsong,
  userAlbum,
} from '../../globals/store/actions/playlist';
import {Toast} from 'native-base';
const {width, height} = Dimensions.get('window');

const PlayerScreen = (props) => {
  const [play, setPlay] = useState(false);
  const [like, setLike] = useState(false);
  const [songtitle, settitle] = useState('');
  const [songartist, setartist] = useState('');
  const [trackid, setrackid] = useState('');
  const [cardindex, setcardindex] = useState();
  const [bottomscreen, setbottomscreen] = useState(false);
  const [disablecard, setdisablecard] = useState(false);
  const isPlaying = useRef('paused');
  const playbackState = usePlaybackState();
  const {duration, position} = useTrackPlayerProgress();
  const [rate, setrate] = useState(1);

  const updateduration = async (a, b) => {
    await props.saveduration({
      duration: a,
      position: b,
    });
  };
  useEffect(() => {
    if (parseInt(duration) > 0) {
      setTimeout(() => {
        updateduration(duration, position);
      }, 500);
    }
  }, [duration, position]);
  const returnPlayBtn = () => {
    switch (isPlaying.current) {
      case 'playing':
        return (
          <TouchableOpacity onPress={() => changestate(!play)}>
            <View style={styles.pausestyle}>
              <Icon
                name={'pause'}
                size={20}
                color="#000"
                style={[styles.pauseiconstyle, {paddingLeft: play ? 0 : 5}]}
              />
            </View>
          </TouchableOpacity>
        );
      case 'paused':
        return (
          <TouchableOpacity onPress={() => changestate(!play)}>
            <View style={styles.pausestyle}>
              <Icon
                name={'play'}
                size={20}
                color="#000"
                style={[styles.pauseiconstyle, {paddingLeft: play ? 0 : 5}]}
              />
            </View>
          </TouchableOpacity>
        );
      default:
        return (
          <View style={styles.spinner}>
            <Spinner
              style={[styles.pauseiconstyle, {paddingLeft: play ? 0 : 5}]}
              large={true}
            />
          </View>
        );
    }
  };
  const onPlayPause = async () => {
    let tmp = await TrackPlayer.getCurrentTrack();
    if (tmp) {
      if (isPlaying.current === 'playing') {
        TrackPlayer.pause();
      } else if (isPlaying.current === 'paused') {
        TrackPlayer.play();
      }
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) {
      return '00:00';
    } else {
      let minutes = Math.floor(secs / 60);
      let seconds = Math.ceil(secs - minutes * 60);

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    }
  };
  useEffect(() => {
    if (props.Player && props.Player.currentsong) {
      if (props.Player && props.Player.currentsong.song_name) {
        settitle(props.Player.currentsong.song_name);
      } else {
        settitle(props.Player.currentsong.song_title);
      }
      setrackid(props.Player.currentsong.song_id);
      if (props.Player && props.Player.currentsong.song_artist) {
        setartist(props.Player.currentsong.song_artist);
        setLike(props.Player.currentsong.like);
      } else {
        setartist(props.Player.currentsong.artist_name);
        setLike(props.Player.currentsong.like);
      }
      setPlay(props.Player.play);
    }
  }, [props.Player]);

  useEffect(() => {
    // if (cardindex === props.Player.playlist.length - 2) {
    //   setdisablecard(true);
    // }
  }, [cardindex]);
  useEffect(() => {
    if (playbackState === 'playing' || playbackState === 3) {
      props.stopbuffer(null);
      isPlaying.current = 'playing';
      setPlay(true);
    } else if (
      playbackState === 'paused' ||
      playbackState === 'idle' ||
      playbackState === 2 ||
      playbackState === 4 ||
      playbackState === 0 ||
      playbackState === 1
    ) {
      props.stopbuffer(null);
      isPlaying.current = 'paused';
      setPlay(false);
    } else {
      props.stopbuffer(true);
      setPlay(null);
      isPlaying.current = 'loading';
    }
  }, [playbackState, props]);

  const valueChange = (value) => {
    TrackPlayer.seekTo(value);
  };
  const playbackSong = async () => {
    let id = await TrackPlayer.getCurrentTrack();
    if (id) {
      TrackPlayer.pause();
      TrackPlayer.skip(id).then(() => TrackPlayer.play());
    }
  };

  const changestate = async (states) => {
    let tmp = await TrackPlayer.getCurrentTrack();
    if (!tmp) {
      let playlist = props.Player.currentsong;
      playlist.state = true;
      const resultsone = await props.currentplaylist({
        item: playlist,
        list: props.Player.playlist,
        currentsong: props.Player.currentsong,
      });
      if (resultsone.success) {
        let itemtwo = props.Player.currentsong;
        itemtwo.state = true;
        const results = await props.currentsong({
          item: itemtwo,
          currentsong: props.Player,
          currentsongid: itemtwo.song_id,
        });
        if (results.success) {
        }
      }
    } else {
      setPlay(states);
      props.songstate({...props, ...{state: states}});
    }
  };
  const songlike = async () => {
    const likeresults = await likesong({song_id: trackid});
    if (likeresults && likeresults.success) {
      setLike(likeresults.data.like);
      Toast.show({
        text: likeresults.message,
        buttonText: 'Ok',
        duration: 3000,
        type: 'success',
      });
      await props.updatecurrentsong({like: likeresults.data.like});
      await props.userlikedsong('');
    } else {
      Toast.show({
        text: 'Something went wrong!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'danger',
      });
    }
  };
  const hidecurrentsong = async () => {
    const likeresults = await hidesong({song_id: trackid});
    if (likeresults && likeresults.success) {
      Toast.show({
        text: likeresults.message,
        buttonText: 'Ok',
        duration: 3000,
        type: 'danger',
      });
      await props.updatecurrentsong({hide: true});
      await props.userlikedsong('');
      await props.recentplayed();
      await props.getuserselectionsong();
      await props.heavyrotation();
      await props.getplaylist('');
      await props.userlikedsong('');
      await props.userAllsong('');
      await props.userAlbum('');
    } else {
      Toast.show({
        text: 'Song is already hide!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'danger',
      });
    }
  };

  const next = async () => {
    props.nextsong(props.Player);
  };
  const prev = async () => {
    props.prevsong(props.Player);
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.viewstyle1}>
        <Swiper
          onSwipedLeft={async (e) => {
            setcardindex(e);
            next();
            const likeresults = await likesong({
              song_id: props.Player.currentsong.song_id,
            });
            if (likeresults && likeresults.success) {
              Toast.show({
                text: likeresults.message,
                buttonText: 'Ok',
                duration: 3000,
                type: 'success',
              });
            } else {
              Toast.show({
                text: 'Something went wrong!',
                buttonText: 'Ok',
                duration: 3000,
                type: 'danger',
              });
            }
          }}
          onSwipedRight={async (e) => {
            setcardindex(e);
            prev();
          }}
          onSwipedTop={(e) => {
            setcardindex(e);
            next();
          }}
          onSwipedBottom={(e) => {
            setcardindex(e);
            prev();
          }}
          cards={
            props.Player && props.Player.playlist ? props.Player.playlist : []
          }
          disableLeftSwipe={disablecard}
          disableRightSwipe={disablecard}
          disableBottomSwipe={disablecard}
          disableTopSwipe={disablecard}
          renderCard={(card) => {
            return (
              <View style={styles.slide1}>
                <ImageBackground
                  style={styles.image}
                  source={
                    MUSICLOGO
                    // card.song_image != undefined &&
                    // card.song_image &&
                    // card.song_image != null
                    //   ? {uri: api.imageurl + card.song_image}
                    //   : MUSICLOGO
                  }
                  resizeMode="cover">
                  <LinearGradient
                    colors={[
                      'rgba(38, 38, 38, 0)',
                      'rgba(38, 38, 38, 0)',
                      '#262626',
                    ]}
                    style={styles.blurstyle}
                  />
                </ImageBackground>
              </View>
            );
          }}
          onSwiped={(cardIndex) => {}}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          cardIndex={0}
          backgroundColor={'#262626'}
          stackSize={2}
          showSecondCard={true}
          infinite={false}
        />
        <View style={styles.topbtnstyle}>
          <View style={styles.space2}>
            <TouchableOpacity
              onPress={() => Navigation.dismissModal('fullscreen.player')}>
              <Icon name="long-arrow-left" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.space1}>
            <TouchableOpacity
              onPress={() => {
                PushPropsScreen(PLAYLIST_ACTION_MODEL, props, false, {
                  ...{detail: true},
                  ...props.Player.currentsong,
                });
              }}>
              <Icon name="ellipsis-h" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.playerstyle, {flex: bottomscreen ? 0.6 : 0.4}]}>
        <View style={styles.tracktitlestyle}>
          <View style={styles.padding}>
            <Text style={styles.rightalign}>{songtitle ? songtitle : ''}</Text>
            <Text style={styles.lightrightalign}>
              {songartist ? songartist : ''}
            </Text>
          </View>
          <View style={{...styles.trackstyle, ...styles.padding}}>
            <Text style={styles.lightrightalign}>
              {/* props.Player.duration.position */}
              {position === 0
                ? formatTime(props.Player.duration.position)
                : formatTime(position)}
            </Text>
            <Slider
              value={props.Player.duration.position}
              minimumValue={0}
              maximumValue={props.Player.duration.duration}
              style={styles.progressView}
              onSlidingComplete={valueChange}
              minimumTrackTintColor="#01BDBD"
              maximumTrackTintColor="#fff"
            />
            <Text style={styles.lightrightalign}>
              {/* props.Player.duration.duration */}
              {position === 0
                ? formatTime(props.Player.duration.duration)
                : formatTime(duration)}
            </Text>
          </View>

          <View style={[styles.trackstyle3]}>
            <TouchableOpacity style={styles.padding} onPress={() => songlike()}>
              {like ? (
                <BlueHeart preserveAspectRatio="none" width={20} height={20} />
              ) : (
                <Heart preserveAspectRatio="none" width={20} height={20} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.padding} onPress={() => prev()}>
              <Icon name="backward" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPlayPause()}>
              {returnPlayBtn()}
            </TouchableOpacity>
            <TouchableOpacity style={styles.padding} onPress={() => next()}>
              <Icon name="forward" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.padding}
              onPress={() => hidecurrentsong()}>
              <Icon name="eye" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={{...styles.trackstyle, ...styles.padding}}>
            <TouchableOpacity>
              <MaterialIcon name="devices" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setbottomscreen(true)}>
              <Icon name="bars" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {bottomscreen ? (
            <View style={[styles.bottomoption]}>
              <View style={[styles.trackstyle2]}>
                <View />
                <TouchableOpacity onPress={() => setbottomscreen(false)}>
                  <Icon
                    name="close"
                    size={16}
                    color="#fff"
                    style={{opacity: 0.5}}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.trackstyle2, {paddingTop: 10}]}>
                <TouchableOpacity style={{marginTop: 5}}>
                  <PlayerIcon
                    preserveAspectRatio="none"
                    width={40}
                    height={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingLeft: 10}}
                  onPress={() => playbackSong()}>
                  <Icon5 name="redo" size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (rate == 1) {
                      setrate(1.25);
                      TrackPlayer.setRate(1.25);
                    } else if (rate == 1.25) {
                      setrate(1);
                      TrackPlayer.setRate(1);
                    }
                  }}>
                  <Text style={styles.smallfontstyle}>
                    {rate}
                    <Icon name="close" size={8} color="#fff" />
                  </Text>

                  <Slider
                    value={0}
                    minimumValue={0}
                    maximumValue={100}
                    style={{width: 50}}
                    minimumTrackTintColor="#01BDBD"
                    maximumTrackTintColor="#fff"
                    thumbTintColor={'transparent'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Player: state.Player,
});

const mapDispatchToProps = {
  updatecurrentsong,
  songstate,
  stopbuffer,
  nextsong,
  prevsong,
  saveduration,
  userlikedsong,
  currentsong,
  currentplaylist,
  getplaylist,
  userAllsong,
  userAlbum,
  recentplayed,
  getuserselectionsong,
  heavyrotation,
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  viewstyle1: {
    flex: 0.6,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width,
    height: height / 2,
  },
  padding: {
    padding: 10,
  },
  slide1: {
    flex: 1,
  },
  playerstyle: {
    flex: 0.6,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  pauseiconstyle: {},
  viewstyle2: {
    flex: 0.5,
  },
  topbtnstyle: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
    width: '100%',
    top: 50,
  },
  spinner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pausestyle: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackstyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  trackstyle3: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  bottomoption: {
    marginTop: 20,
    backgroundColor: '#000',
    height: height,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  trackstyle2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  blurstyle: {
    flex: 1,
    position: 'absolute',
    width: width,
    height: height / 4,
    bottom: 0,
    shadowRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  smallfontstyle: {
    fontSize: 16,
    color: '#fff',
  },
  space1: {
    paddingRight: 20,
  },
  space2: {
    paddingLeft: 20,
  },
  fontstyle: {
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  image: {
    flex: 0.8,
    width: width,
  },
  tracktitlestyle: {
    paddingTop: 30,
  },
  rightalign: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  lightrightalign: {
    textAlign: 'left',
    color: '#fff',
    opacity: 0.5,
    fontSize: 15,
    lineHeight: 14,
    paddingTop: 5,
  },
  margin: {
    padding: 20,
  },
  progressView: {
    width: width / 1.5,
    margin: 0,
    height: 20,
  },
});

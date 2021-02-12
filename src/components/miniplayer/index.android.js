/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BlueHeart from '../../assets/svg/blueheart.svg';
import Heart from '../../assets/svg/heart.svg';
import {connect} from 'react-redux';
import {
  songstate,
  updatecurrentsong,
  currentsong,
  currentplaylist,
} from '../../globals/store/actions/player';
import NoImage from '../../assets/images/noimage.png';
import apiurl from '../../config/api';
import {likesong} from '../../globals/store/actions/song';
import {showmodal} from '../modal';
import {Spinner, Toast} from 'native-base';
import {usePlaybackState} from 'react-native-track-player';
import {
  stopbuffer,
  prevsong,
  nextsong,
} from '../../globals/store/actions/player';
import TrackPlayer from 'react-native-track-player';
import {userlikedsong} from '../../globals/store/actions/playlist';

const {width} = Dimensions.get('window');
const Player = (props) => {
  const [play, setPlay] = useState(false);
  const [like, setLike] = useState(false);
  const [songtitle, settitle] = useState('');
  const [songartist, setartist] = useState('');
  const playbackState = usePlaybackState();
  const [trackid, settrackid] = useState('');

  async function playerState() {
    console.log('11111', await TrackPlayer.STATE_PAUSED);
    console.log('222', await TrackPlayer.STATE_PLAYING);
    console.log('3333', await TrackPlayer.STATE_BUFFERING);
    console.log('4444', await TrackPlayer.STATE_STOPPED);
    console.log('5555', await TrackPlayer.STATE_READY);
    console.log('6666', await TrackPlayer.STATE_NONE);
  }
  useEffect(() => {
    if (playbackState === 'playing' || playbackState === 3) {
      props.stopbuffer(null);
      setPlay(true);
    } else if (playbackState === 'paused' || playbackState === 2) {
      props.stopbuffer(null);
      setPlay(false);
    } else {
      props.stopbuffer(true);
      setPlay(null);
    }
    // playerState();
  }, [playbackState, props]);
  useEffect(() => {
    if (props.Player && props.Player.currentsong) {
      settrackid(props.Player.currentsong.song_id);
      if (props.Player && props.Player.currentsong.song_title) {
        settitle(props.Player.currentsong.song_title);
      } else {
        settitle(props.Player.currentsong.song_name);
      }
      if (props.Player && props.Player.currentsong.song_artist) {
        setartist(props.Player.currentsong.song_artist);
        setLike(props.Player.currentsong.like);
      } else if (props.Player && props.Player.currentsong.artist) {
        setartist(props.Player.currentsong.artist);
        // setLike(props.Player.currentsong.like);
      } else {
        setartist(props.Player.currentsong.artist_name);
        setLike(props.Player.currentsong.like);
      }
      setPlay(props.Player.play);
    }
  }, [props]);
  useEffect(() => {
    TrackPlayer.registerPlaybackService(() =>
      require('../../utils/player/index'),
    );
    TrackPlayer.addEventListener('remote-play', () => {
      TrackPlayer.play();
    });

    TrackPlayer.addEventListener('remote-pause', () => {
      TrackPlayer.pause();
    });

    TrackPlayer.addEventListener('remote-next', () => {
      props.nextsong(props.Player);
    });
    // TrackPlayer.addEventListener('playback-track-changed', () => {
    //   console.log('1111111');
    //   props.nextsong(props.Player);
    // });
    TrackPlayer.addEventListener('remote-previous', () => {
      props.prevsong(props.Player);
    });

    TrackPlayer.addEventListener('remote-stop', () => {
      // TrackPlayer.destroy();
    });
  }, [TrackPlayer]);

  const setlikesong = async () => {
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
  const changestate = async (state) => {
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
      setPlay(state);
      props.songstate({...{state: state}, ...props});
    }
  };

  return (
    <>
      {props.Player &&
      props.Player.currentsong &&
      Object.keys(props.Player.currentsong).length > 0 ? (
        <TouchableOpacity
          style={styles.root}
          onPress={() => {
            showmodal(props);
          }}>
          <View style={styles.iconbtnstyle}>
            {playbackState === 'buffering' || playbackState === 6 ? (
              <View style={styles.space}>
                <Spinner size={18} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.space}
                onPress={() => changestate(!play)}>
                <View>
                  <Icon
                    name={play ? 'pause' : 'play'}
                    size={16}
                    color="#fff"
                    style={styles.iconstyle}
                  />
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.space]}
              onPress={() => {
                setlikesong();
              }}>
              {like ? (
                <BlueHeart preserveAspectRatio="none" width={18} height={18} />
              ) : (
                <Heart preserveAspectRatio="none" width={25} height={25} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.rowalign}>
            <View style={styles.artistnamestyle}>
              <Text style={[styles.fontstyle, {fontWeight: '700'}]}>
                {songtitle}
              </Text>
              <Text
                style={[
                  styles.fontstyle,
                  {opacity: 0.4, fontSize: 12, paddingTop: 5},
                ]}>
                {songartist}
              </Text>
            </View>
            <FastImage
              style={styles.imagestyle}
              source={
                props.Player &&
                props.Player.currentsong &&
                props.Player.currentsong.song_image
                  ? {uri: apiurl.imageurl + props.Player.currentsong.song_image}
                  : NoImage
              }
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </>
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
  prevsong,
  nextsong,
  userlikedsong,
  currentsong,
  currentplaylist,
};
export default connect(mapStateToProps, mapDispatchToProps)(Player);
const styles = {
  root: {
    backgroundColor: '#474747',
    position: 'absolute',
    bottom: 0,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  space: {
    margin: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconstyle: {
    textAlign: 'left',
    paddingTop: 0,
  },
  rowalign: {
    flexDirection: 'row',
  },
  iconbtnstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 0,
  },
  imagestyle: {
    width: 80,
    height: 60,
  },
  artistnamestyle: {
    flexDirection: 'column',
    margin: 10,
  },
  fontstyle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'left',
  },
};

Player.options = (props) => {
  return {
    overlay: {
      interceptTouchOutside: true,
    },
  };
};

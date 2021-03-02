import {
  CURRENT_SONG,
  UPDATE_CURRENT_SONG,
  PLAY,
  BUFFER,
  CURRENT_PLAYLIST,
  DURATION,
  TOP_SONG,
} from '../actionTypes/player';
import axios from '../../../utils/httpclient';
import {
  pause,
  getTrack,
  getplayerstate,
  addsong,
  PlayerInitialiaze,
  addplaylist,
} from '../../../utils/player/service';
import api from '../../../config/api';
import TrackPlayer from 'react-native-track-player';
import {Platform} from 'react-native';

export const currentplaylist = (payloads) => async (dispatch) => {
  await PlayerInitialiaze();
  dispatch({type: CURRENT_PLAYLIST, payload: payloads.list});
  return {success: true};
};

export const updatecurrentplaylist = (payloads) => async (dispatch) => {
  try {
    let arr = payloads.data.playlist;
    let idnew = arr.map((key) => {
      if (key.id === payloads.trackid) {
        key.hide = true;
      }
      return key;
    });
    console.log(idnew);
    // let idnew = arr.findIndex((x) => x.id === payloads.trackid);
    // if (idnew > -1) {
    //   arr.splice(idnew, 1);
    //   console.log(arr);
    dispatch({type: CURRENT_PLAYLIST, payload: idnew});
    // }
    return {success: true};
  } catch (error) {
    console.log(error);
  }
};

const shuffleArray = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const currentsong = (payloads) => async (dispatch) => {
  await PlayerInitialiaze();
  let currentsongobj = {};
  let playlistarr = [];
  if (payloads.currentsongid === 'shuffle') {
    playlistarr = shuffleArray(payloads.currentsong.playlist);
    playlistarr = payloads.currentsong.playlist.map((key, index) => {
      if (index === 0) {
        currentsongobj = key;
      }
      return {
        title: key.song_title,
        artist: key.artist_name,
        duration: ((key.duration % 60000) / 1000).toFixed(0),
        artwork: key.song_image
          ? api.imageurl + key.song_image
          : require('../../../assets/images/musiclogo.png'),
        url: api.imageurl + key.song_mp3,
        id: String(key.song_id),
      };
    });
    await addplaylist(
      playlistarr,
      currentsongobj.song_id,
      dispatch,
    ).then((res) => {});
    dispatch({type: CURRENT_SONG, payload: currentsongobj});
  } else {
    // console.log('payloads', payloads)
    playlistarr = payloads.currentsong.playlist.map((key) => {
      if (key.song_id == payloads.currentsongid) {
        currentsongobj = key;
      }
      return {
        title: key.song_title,
        artist: key.artist_name,
        duration: ((key.duration % 60000) / 1000).toFixed(0),
        artwork: key.song_image
          ? api.imageurl + key.song_image
          : require('../../../assets/images/musiclogo.png'),
        url: api.imageurl + key.song_mp3,
        id: String(key.song_id),
      };
    });
    if (playlistarr.length === payloads.currentsong.playlist.length) {
      await addplaylist(
        playlistarr,
        payloads.currentsongid,
        dispatch,
      ).then((res) => {});
      dispatch({type: CURRENT_SONG, payload: currentsongobj});
    }
  }
  let obj = {id: currentsongobj.song_id};
  axios
    .dynamic('recent_played/', {obj})
    .then((res) => {})
    .catch(async (error) => {
      console.log('error', error);
    });
  return {success: true};
};

export const updatecurrentsong = (payloads) => async (dispatch) => {
  dispatch({type: UPDATE_CURRENT_SONG, payload: payloads});
  return {success: true};
};

export const recentplayedsong = (payloads) => async (dispatch) => {
  return axios
    .get('recent_play_list/')
    .then((res) => res.data)
    .then(async (res) => {
      console.log('res', res);
      if (res.data && res.data.length > 0) {
        await PlayerInitialiaze();
        dispatch({
          type: CURRENT_SONG,
          payload: res.data[res.data.length - 1] || {},
        });
        dispatch({
          type: CURRENT_PLAYLIST,
          payload: res.data || [],
        });
      }
      return res;
    })
    .catch(async (error) => {
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      console.log(error);
      return res;
    });
};

export const topsongs = (payloads) => async (dispatch) => {
  return axios
    .get('NewReleaseTopSignlesTopHitsYourMixAPIView/')
    .then((res) => res.data)
    .then(async (res) => {
      if (res.data) {
        dispatch({
          type: TOP_SONG,
          payload: res.data,
        });
      }
      return res;
    })
    .catch(async (error) => {
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      console.log(error);
      return res;
    });
};
export const songstate = (payloads) => async (dispatch) => {
  let trackId = await getTrack();
  try {
    if (trackId) {
      if (!payloads.state) {
        await pause();
      } else {
        let state = await getplayerstate();
        if (state === TrackPlayer.STATE_PAUSED) {
          TrackPlayer.play();
          dispatch({
            type: PLAY,
            payload: true,
          });
        } else if (TrackPlayer.STATE_PLAYING) {
          TrackPlayer.pause();
        } else if (TrackPlayer.STATE_STOPPED) {
          if (trackId) {
            TrackPlayer.pause();
            dispatch({
              type: PLAY,
              payload: false,
            });
            TrackPlayer.skip(trackId).then(() => TrackPlayer.play());
          }
        }
      }
      dispatch({type: PLAY, payload: payloads.state});
      return {success: true};
    } else {
      let song = {
        title: payloads.Player.currentsong.song_name,
        artist: payloads.Player.currentsong.artist_name,
        duration: (
          (payloads.Player.currentsong.duration % 60000) /
          1000
        ).toFixed(0),
        artwork: payloads.Player.currentsong.song_image
          ? api.imageurl + payloads.Player.currentsong.song_image
          : require('../../../assets/images/musiclogo.png'),
        url: api.imageurl + payloads.Player.currentsong.song_mp3,
        id: String(payloads.Player.currentsong.song_id),
      };
      dispatch({type: BUFFER, payload: true});
      await addsong(song, dispatch).then((res) => {});
      return {success: true};
    }
  } catch (error) {
    console.log(error);
  }
};

export const stopbuffer = (payloads) => async (dispatch) => {
  return {success: true};
};

export const prevsong = (payloads) => async (dispatch) => {
  let trackId = await getTrack();
  if (trackId && payloads.playlist && payloads.playlist.length > 1) {
    payloads.playlist.map(async (key, index) => {
      if (String(trackId) === String(key.song_id)) {
        if (index === 0) {
          if (trackId) {
            TrackPlayer.pause();
            TrackPlayer.skip(trackId).then(() => {
              TrackPlayer.play();
              dispatch({
                type: PLAY,
                payload: false,
              });
            });
          }
        } else {
          dispatch({type: BUFFER, payload: true});
          if (Platform.OS === 'ios') {
            console.log('11111111');
            await TrackPlayer.skipToPrevious();
            await TrackPlayer.seekTo(1);
            await TrackPlayer.play();
            dispatch({
              type: PLAY,
              payload: true,
            });
          } else {
            TrackPlayer.skipToPrevious();
          }
          dispatch({
            type: CURRENT_SONG,
            payload: payloads.playlist[index - 1],
          });
          return {success: true};
        }
      }
    });
  }
};

export const nextsong = (payloads) => async (dispatch) => {
  let trackId = await getTrack();
  if (trackId && payloads.playlist && payloads.playlist.length > 1) {
    payloads.playlist.map(async (key, index) => {
      if (String(trackId) === String(key.song_id)) {
        if (index + 1 === payloads.playlist.length) {
          try {
            let currentsongobj = {};
            let playlistarr = [];
            TrackPlayer.pause();
            dispatch({
              type: PLAY,
              payload: false,
            });
            currentsongobj = payloads.playlist[0];
            playlistarr = payloads.playlist.map((keys) => {
              return {
                title: keys.song_title,
                artist: keys.artist_name,
                duration: ((keys.duration % 60000) / 1000).toFixed(0),
                artwork: keys.song_image
                  ? api.imageurl + keys.song_image
                  : require('../../../assets/images/musiclogo.png'),
                url: api.imageurl + keys.song_mp3,
                id: String(keys.song_id),
              };
            });
            if (playlistarr.length === payloads.playlist.length) {
              await addplaylist(
                playlistarr,
                String(currentsongobj.song_id),
                dispatch,
              ).then((res) => {});
              dispatch({type: CURRENT_SONG, payload: currentsongobj});
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          dispatch({type: BUFFER, payload: true});
          dispatch({type: CURRENT_SONG, payload: payloads.playlist[index + 1]});
          if (Platform.OS === 'ios') {
            await TrackPlayer.skipToNext();
            dispatch({
              type: PLAY,
              payload: true,
            });
          } else {
            await TrackPlayer.skipToNext();
          }
          return {success: true};
        }
      }
    });
  }
};

export const nextadd = (payloads) => async (dispatch) => {
  console.log('called api');
  let trackId = payloads.id;
  if (trackId && payloads.data.playlist && payloads.data.playlist.length > 1) {
    payloads.data.playlist.map(async (key, index) => {
      if (String(trackId) === String(key.song_id)) {
        dispatch({type: BUFFER, payload: true});
        dispatch({
          type: CURRENT_SONG,
          payload: payloads.data.playlist[index],
        });
        return {success: true};
      }
    });
  }
};
export const saveduration = (payloads) => async (dispatch) => {
  dispatch({type: DURATION, payload: payloads});
  return {success: true};
};

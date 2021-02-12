import {Platform} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {PLAY} from '../../globals/store/actionTypes/player';

export const PlayerInitialiaze = async () => {
  TrackPlayer.registerPlaybackService(() =>
    require('../../utils/player/index'),
  );

  return new Promise(async (resolve, reject) => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      notificationCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
    }).then(async (res) => {
      console.log('player init');
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 5,
      });
      resolve(TrackPlayer);
    });
  });
};
export const pause = () => {
  TrackPlayer.pause();
};
export const played = async () => {
  TrackPlayer.play();
};
export const getTrack = async () => {
  return await TrackPlayer.getCurrentTrack();
};
export const getplayerstate = async () => {
  return await TrackPlayer.getState();
};
export const songplay = async (trackId, dispatch) => {
  const getsong = await new Promise(async (resolve, reject) => {
    TrackPlayer.skip(trackId).then(() => {
      resolve({success: true});
    });
  });
  if (getsong && getsong.success) {
    if (Platform.OS === 'ios') {
      let refreshPlay = setInterval(async () => {
        let playerState = await TrackPlayer.getState();
        if (
          playerState !== TrackPlayer.STATE_STOPPED &&
          playerState !== TrackPlayer.STATE_PLAYING
        ) {
          await TrackPlayer.play();
          dispatch({type: PLAY, payload: true});
        } else {
          clearInterval(refreshPlay);
        }
      }, 1000);
    } else {
      TrackPlayer.play().then((res) => {
        return {success: true};
      });
    }
  }
};
export const reset = (song) => {
  TrackPlayer.stop();
  TrackPlayer.reset();
};

export const addsong = async (song, dispatch) => {
  TrackPlayer.reset();
  const getsong = await new Promise(async (resolve, reject) => {
    await TrackPlayer.add(song, null);
    TrackPlayer.skip(song.id).then(() => {
      resolve({success: true});
    });
  });
  if (getsong && getsong.success) {
    if (Platform.OS === 'ios') {
      let refreshPlay = setInterval(async () => {
        let playerState = await TrackPlayer.getState();
        if (
          playerState !== TrackPlayer.STATE_STOPPED &&
          playerState !== TrackPlayer.STATE_PLAYING
        ) {
          await TrackPlayer.play();
          dispatch({type: PLAY, payload: true});
        } else {
          clearInterval(refreshPlay);
        }
      }, 1000);
    } else {
      TrackPlayer.play().then((res) => {
        return {success: true};
      });
    }
  }
};

export const addplaylist = async (song, currentsongid, dispatch) => {
  await TrackPlayer.reset();
  await TrackPlayer.add(song);
  const getsong = await new Promise(async (resolve, reject) => {
    TrackPlayer.skip(String(currentsongid)).then(() => {
      resolve({success: true});
    });
  });
  if (getsong && getsong.success) {
    try {
      if (Platform.OS === 'ios') {
        dispatch({type: PLAY, payload: 'loading'});
        TrackPlayer.play().then((res) => {
          dispatch({type: PLAY, payload: true});
          return {success: true};
        });
        // setTimeout(async () => {
        //   await TrackPlayer.play();
        // }, 10000);
        // dispatch({type: PLAY, payload: true});
        // let refreshPlay = setInterval(async () => {
        //   let playerState = await TrackPlayer.getState();
        //   if (
        //     playerState !== TrackPlayer.STATE_STOPPED &&
        //     playerState !== TrackPlayer.STATE_PLAYING
        //   ) {
        //     console.log('111');
        //     await TrackPlayer.play();
        //     dispatch({type: PLAY, payload: true});
        //   } else {
        //     clearInterval(refreshPlay);
        //   }
        // }, 1000);
      } else {
        TrackPlayer.play().then((res) => {
          return {success: true};
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const replaplaylist = async (song, currentsongid, dispatch) => {
  await TrackPlayer.reset();
  await TrackPlayer.add(song);
  const getsong = await new Promise(async (resolve, reject) => {
    TrackPlayer.skip(String(currentsongid)).then(() => {
      resolve({success: true});
    });
  });
  if (getsong && getsong.success) {
    if (Platform.OS === 'ios') {
      let refreshPlay = setInterval(async () => {
        let playerState = await TrackPlayer.getState();
        if (
          playerState !== TrackPlayer.STATE_STOPPED &&
          playerState !== TrackPlayer.STATE_PLAYING
        ) {
          await TrackPlayer.play();
          if (playerState !== TrackPlayer.STATE_PLAYING) {
            dispatch({type: PLAY, payload: true});
          }
        } else {
          if (playerState === TrackPlayer.STATE_PLAYING) {
            clearInterval(refreshPlay);
          }
        }
      }, 1000);
    } else {
      TrackPlayer.play().then((res) => {
        return {success: true};
      });
    }
  }
};
// async function togglePlayback() {
//   const currentTrack = await TrackPlayer.getCurrentTrack();
//   if (currentTrack == null) {
//     await TrackPlayer.reset();
//     await TrackPlayer.add('playlistData');
//     await TrackPlayer.add({
//       id: 'local-track',
//       url: 'localTrack',
//       title: 'Pure (Demo)',
//       artist: 'David Chavez',
//       artwork: 'https://i.picsum.photos/id/500/200/200.jpg',
//       duration: 28,
//     });
//     await TrackPlayer.play();
//   } else {
//     if (playbackState === TrackPlayer.STATE_PAUSED) {
//       await TrackPlayer.play();
//     } else {
//       await TrackPlayer.pause();
//     }
//   }
// }
// function getStateName(state) {
//   switch (state) {
//     case TrackPlayer.STATE_NONE:
//       return 'None';
//     case TrackPlayer.STATE_PLAYING:
//       return 'Playing';
//     case TrackPlayer.STATE_PAUSED:
//       return 'Paused';
//     case TrackPlayer.STATE_STOPPED:
//       return 'Stopped';
//     case TrackPlayer.STATE_BUFFERING:
//       return 'Buffering';
//   }
// }
// async function skipToNext() {
//   try {
//     await TrackPlayer.skipToNext();
//   } catch (err) {}
// }

// async function skipToPrevious() {
//   try {
//     await TrackPlayer.skipToPrevious();
//   } catch (err) {}
// }

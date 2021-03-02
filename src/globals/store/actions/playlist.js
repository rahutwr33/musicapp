import axios from '../../../utils/httpclient';
import {
  GET_PLAYLIST,
  USER_LIKED_SONG,
  USER_ALBUM,
  USER_ALL_SONG,
} from '../actionTypes/playlist';
import {logout} from '../../../utils/logout';

export const createPlaylist = (payloads) => {
  return axios
    .post('create-playlist', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      if (error && error.response && error.response.status === 401) {
        await logout();
      }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const userlikedsong = (payloads) => async (dispatch) => {
  return axios
    .get('like-song', {payloads})
    .then((res) => res.data)
    .then((data) => {
      dispatch({type: USER_LIKED_SONG, payload: data.data});
      return data;
    })
    .catch(async (error) => {
      if (error && error.response && error.response.status === 401) {
        await logout();
      }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const getplaylist = (payloads) => async (dispatch) => {
  return axios
    .get(`create-playlist?playlist_name=${payloads}`)
    .then((res) => res.data)
    .then((data) => {
      dispatch({type: GET_PLAYLIST, payload: data.data});
      return data;
    })
    .catch(async (error) => {
      if (error && error.response && error.response.status === 401) {
        await logout();
      }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      dispatch({type: GET_PLAYLIST, payload: []});
      return res;
    });
};

export const userAllsong = (payloads) => async (dispatch) => {
  return axios
    .get(`song-view?song_name=${payloads}`)
    .then((res) => res.data)
    .then((data) => {
      dispatch({type: USER_ALL_SONG, payload: data.data});
      return data;
    })
    .catch(async (error) => {
      if (error && error.response && error.response.status === 401) {
        await logout();
      }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const userAlbum = (payloads) => async (dispatch) => {
  return axios
    .get(`album?album_name=${payloads}`)
    .then((res) => res.data)
    .then((data) => {
      dispatch({type: USER_ALBUM, payload: data.data});
      return data;
    })
    .catch(async (error) => {
      if (error && error.response && error.response.status === 401) {
        await logout();
      }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const searchAll = (payloads) => {
  console.log(payloads)
  return axios
    .get(`${payloads}`)
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch(async (error) => {
      if (error && error.response && error.response.status === 401) {
        await logout();
      }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const addalbum = (payloads) => {
  let headers = {'Content-Type': 'multipart/form-data'};
  return axios
    .post('album', {payloads, headers})
    .then((res) => {
      console.log('res', res);
      return res.data;
    })
    .catch(async (error) => {
      // if (error && error.response && error.response.status === 401) {
      //   await logout();
      // }
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

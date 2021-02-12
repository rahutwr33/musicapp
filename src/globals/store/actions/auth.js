import axios from '../../../utils/httpclient';
// import {AuthStack} from '../../../navigation/stack/auth';
import storage from '../../../utils/storage';
import {
  SET_REGISTER_USER,
  RESET_STATE,
  SET_ARTIST_REGISTER_USER,
  CURRENT_USER,
  GENRE_LIST,
} from '../actionTypes';
import {logout} from '../../../utils/logout';

export const login = (payloads) => {
  return axios
    .post('login', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const getArtistList = (payloads) => {
  let url = null;
  if (payloads.artist && payloads.artist.length > 0) {
    url = `artist-list?artist_name=${payloads.artist}`;
  } else {
    url = 'artist-list';
  }
  return axios
    .get(url, {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const getPropsGenreList = (payloads) => async (dispatch) => {
  return axios
    .get('genre-list?genre_name=', {payloads})
    .then((res) => {
      if (res && res.data && res.data.success && res.data.data) {
        dispatch({type: GENRE_LIST, payload: res.data.data});
        // res.data.data.map((key, i) => {
        //   key.label = key.genre;
        //   key.value = key.id;
        //   if (i + 1 === res.data.data.length) {
        //     dispatch({type: GENRE_LIST, payload: res.data.data});
        //   }
        // });
      }
      return res.data;
    })
    .catch(async (error) => {
      console.log(error.response);
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
export const getGenreList = (payloads) => {
  return axios
    .get(`genre-list?genre_name=${payloads.genre}`, {payloads})
    .then((res) => {
      console.log('22222', res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const getCountryList = (payloads) => {
  return axios
    .get('country-list', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const register = (payloads) => {
  return axios
    .post('register', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const updateprofile = (payloads) => {
  let headers = {'Content-Type': 'multipart/form-data'};
  return axios
    .put('edit-profile', {payloads, headers})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const setValue = (payloads) => async (dispatch) => {
  dispatch({type: SET_REGISTER_USER, payload: payloads});
  return {success: true};
};

export const setCurrentUser = (payloads) => async (dispatch) => {
  let user = await storage.get('user');
  user = JSON.parse(user);
  dispatch({type: CURRENT_USER, payload: user || {}});
  return {success: true, user: user};
};

export const updateCurrentUser = (payloads) => async (dispatch) => {
  let user = await storage.get('user');
  user = JSON.parse(user);
  delete user.full_name;
  if (payloads.full_name) {
    user.user.full_name = payloads.full_name;
  }
  if (payloads.profile_pic) {
    user.user.profile_pic = payloads.profile_pic;
  }
  if (payloads.allow_explicity) {
    user.user.allow_explicity = payloads.allow_explicity;
  } else {
    user.user.allow_explicity = false;
  }
  console.log(payloads, user);
  await storage.set('user', JSON.stringify(user));
  dispatch({type: CURRENT_USER, payload: user || {}});
  return {success: true};
};

export const setArtistValue = (payloads) => async (dispatch) => {
  dispatch({type: SET_ARTIST_REGISTER_USER, payload: payloads});
  return {success: true};
};

export const cleanState = (payloads) => async (dispatch) => {
  dispatch({type: RESET_STATE, payload: {}});
  return {success: true};
};

export const getValue = (payloads) => async (dispatch) => {
  dispatch({type: payloads.Type, payload: {}});
  return {success: true};
};

export const forgot_password = (payloads) => {
  return axios
    .post('forget-password', {payloads})
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const reset_password = (payloads) => {
  return axios
    .post('reset-password', {payloads})
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const updateuserArtist = (payloads) => {
  return axios
    .put('like-artist', {payloads})
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const updateUser = (payloads) => {
  try {
    return axios
      .get('my-profile', {payloads})
      .then(async (res) => {
        let user = await storage.get('user');
        user = JSON.parse(user);
        user.user = res.data.user;
        if (res.data) {
          if (res.data.selected_artist_data) {
            user.selected_artist_data = [];
            user.selected_artist_data = res.data.selected_artist_data;
          }
          if (res.data.user) {
            user.user.full_name = res.data.user.full_name;
            user.user.profile_pic = res.data.user.profile_pic;
          }
          if (res.data.other_data) {
            user.other_data = {
              playlists: res.data.other_data.playlists
                ? res.data.other_data.playlists
                : 0,
              followers: res.data.other_data.followers
                ? res.data.other_data.followers
                : 0,
              following: res.data.other_data.following
                ? res.data.other_data.following
                : 0,
            };
          } else {
            user.other_data = {
              playlists: 0,
              followers: 0,
              following: 0,
            };
          }
          await storage.set('user', JSON.stringify(user));
          return {success: true};
        }
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
  } catch (error) {
    console.log(error);
  }
};
export const songhistory = (payloads) => {
  return axios
    .get('played_song_history/', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const getcharts = (payloads) => {
  return axios
    .get('chart/', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const devicelist = (payloads) => {
  return axios
    .get('login_device_history/', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const logoutdevice = (payloads) => {
  return axios
    .post('logout', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.response);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const aboutus = (payloads) => {
  return axios
    .get('about_us/', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.response);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const artistdetail = (payloads) => {
  return axios
    .get(`artist-detail/${payloads.id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.response);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const downloadedsong = (payloads) => {
  return axios
    .get('downloaded_song/', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const checkusername = (payloads) => {
  return axios
    .get(`check_username_email_exist/?uname_email=${payloads}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

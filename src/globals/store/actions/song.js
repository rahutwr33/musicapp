import axios from '../../../utils/httpclient';
import {logout} from '../../../utils/logout';
import {
  ALBUM_QUEUE_SONG,
  RECENT_PLAYED,
  USER_SELECTION,
  HEAVY_ROTATION,
} from '../actionTypes/song';
// import storage from '../../../utils/storage';

export const likesong = async (payloads) => {
  return axios
    .post('like-song', {payloads})
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
export const hiddenArtist = async (payloads) => {
  return axios
    .post('hidden-artist', {payloads})
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
export const hidesong = async (payloads) => {
  return axios
    .post('hide-song', {payloads})
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
export const addsonginplaylist = async (payloads) => {
  return axios
    .post('song-to-playlist', {payloads})
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

export const reportsonexplicit = async (payloads) => {
  let headers = {'Content-Type': 'multipart/form-data'};
  return axios
    .put('report_explicity_song/', {payloads, headers})
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

export const songsList = async (payloads) => {
  return axios
    .get('song-view?song_not_in_album=1', {payloads})
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
export const submitqueuesong = (payloads) => async (dispatch) => {
  dispatch({type: ALBUM_QUEUE_SONG, payload: payloads});
  return {success: true};
};

export const getuserselectionsong = (payloads) => async (dispatch) => {
  return axios
    .get('songs_for_user/')
    .then((res) => res.data)
    .then((data) => {
      dispatch({type: USER_SELECTION, payload: data.data});
      return data;
    })
    .catch(async (error) => {
      console.log('error', error.response);
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
export const heavyrotation = (payloads) => async (dispatch) => {
  return axios
    .get('havenly_rotated_song_info/')
    .then((res) => res.data)
    .then((data) => {
      dispatch({type: HEAVY_ROTATION, payload: data.data});
      return data;
    })
    .catch(async (error) => {
      // if (error && error.response && error.response.status === 401) {
      //   await logout();
      // }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const recentplayed = (payloads) => async (dispatch) => {
  return axios
    .get('recent_with_suggest_list/')
    .then((res) => res.data)
    .then(async (res) => {
      dispatch({type: RECENT_PLAYED, payload: res.data.song_suggest});
      return res;
    })
    .catch(async (error) => {
      // if (error && error.response && error.response.status === 401) {
      //   await logout();
      // }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const songsbygenere = async (payloads) => {
  return axios
    .get(`songs_by_genre/?genre=${payloads.slug}`)
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

export const getanalytics = async (payloads) => {
  return axios
    .get('analytics_info_data/')
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      // if (error && error.response && error.response.status === 401) {
      //   await logout();
      // }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const getcharts = async (payloads) => {
  return axios
    .get('analytics/')
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      // if (error && error.response && error.response.status === 401) {
      //   await logout();
      // }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const getsongscredt = async (payloads) => {
  return axios
    .get(`song-view?song_id=${payloads.song_id}`)
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      // if (error && error.response && error.response.status === 401) {
      //   await logout();
      // }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const getconcert = async (payloads) => {
  return axios
    .get(`all_concert/?city=${payloads}`)
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      // if (error && error.response && error.response.status === 401) {
      //   await logout();
      // }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const getconcertdetail = async (payloads) => {
  return axios
    .get(`city_wise_concert/${payloads}/`)
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      // if (error && error.response && error.response.status === 401) {
      //   await logout();
      // }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const updatedownloadhistory = async (payloads) => {
  return axios
    .post('download_or_played_song/', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      // if (error && error.response && error.response.status === 401) {
      //   await logout();
      // }
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const updatenotificationsetting = async (payloads) => {
  return axios
    .put('notification_toggle/', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};
export const getnotificationsetting = async (payloads) => {
  return axios
    .get('notification_toggle/', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

export const followartist = async (payloads) => {
  return axios
    .put('artist-follow-unfollow', {payloads})
    .then((res) => {
      return res.data;
    })
    .catch(async (error) => {
      const res = {
        success: false,
        message: 'Something went wrong,please try again',
      };
      return res;
    });
};

const INITIAL_STATE_PLAYLIST = {
  playlist: {},
  likedsong: {},
  artist: {},
  albums: {},
  songs: {},
};
import {RESET_STATE} from '../actionTypes';
import {
  GET_PLAYLIST,
  USER_LIKED_SONG,
  USER_ALL_SONG,
  USER_ALBUM,
} from '../actionTypes/playlist';

const Playlist = (state = INITIAL_STATE_PLAYLIST, action) => {
  switch (action.type) {
    case GET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload,
      };
    case USER_LIKED_SONG:
      return {
        ...state,
        likedsong: action.payload,
      };
    case USER_ALBUM:
      return {
        ...state,
        albums: action.payload,
      };
    case USER_ALL_SONG:
      return {
        ...state,
        songs: action.payload,
      };
    case RESET_STATE:
      return INITIAL_STATE_PLAYLIST;
    default:
      return state;
  }
};

export default Playlist;

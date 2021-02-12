import {
  ALBUM_QUEUE_SONG,
  USER_SELECTION,
  RECENT_PLAYED,
  HEAVY_ROTATION,
} from '../actionTypes/song';
const INITIAL_STATE = {
  queuealbum: {},
  userselection: {},
  heavyrotation: {},
  recentplayed: {},
};
const Song = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALBUM_QUEUE_SONG:
      return {
        ...state,
        queuealbum: action.payload,
      };
    case USER_SELECTION:
      return {
        ...state,
        userselection: action.payload,
      };
    case HEAVY_ROTATION:
      return {
        ...state,
        heavyrotation: action.payload,
      };
    case RECENT_PLAYED:
      return {
        ...state,
        recentplayed: action.payload,
      };

    default:
      return state;
  }
};

export default Song;

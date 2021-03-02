const INITIAL_STATE_PLAYLIST = {
  currentsong: {},
  recentsong: {},
  playlist: {},
  duration: {},
  topsongs:{},
  play: false,
  pause: true,
  prev: false,
  next: false,
  isplaying: false,
  buffer: false,
};
import {RESET_STATE} from '../actionTypes';
import {
  CURRENT_SONG,
  UPDATE_CURRENT_SONG,
  RECENT_PLAYED_SONG,
  PLAY,
  PAUSE,
  ISPLAYING,
  NEXT,
  PREV,
  BUFFER,
  CURRENT_PLAYLIST,
  DURATION,
  TOP_SONG
} from '../actionTypes/player';

const Player = (state = INITIAL_STATE_PLAYLIST, action) => {
  switch (action.type) {
    case CURRENT_SONG:
      return {
        ...state,
        currentsong: action.payload,
      };
    case UPDATE_CURRENT_SONG:
      return {
        ...state,
        currentsong: {...state.currentsong, ...action.payload},
      };
    case RECENT_PLAYED_SONG:
      return {
        ...state,
        recentsong: action.payload,
      };
    case PLAY:
      return {
        ...state,
        play: action.payload,
      };
    case PAUSE:
      return {
        ...state,
        pause: action.payload,
      };
    case ISPLAYING:
      return {
        ...state,
        isplaying: action.payload,
      };
    case NEXT:
      return {
        ...state,
        next: action.payload,
      };
    case TOP_SONG:
      console.log('222',action.payload)
      return {
        ...state,
        topsongs: action.payload,
      };
    case PREV:
      return {
        ...state,
        prev: action.payload,
      };
    case BUFFER:
      return {
        ...state,
        buffer: action.payload,
      };
    case DURATION:
      return {
        ...state,
        duration: action.payload,
      };

    case CURRENT_PLAYLIST:
      return {
        ...state,
        playlist: action.payload,
      };
    case RESET_STATE:
      return INITIAL_STATE_PLAYLIST;
    default:
      return state;
  }
};

export default Player;

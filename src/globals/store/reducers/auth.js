const INITIAL_STATE = {
  registerartist: {
    first_name: '',
    username: '',
    email: '',
    password: '',
    gender: '',
    date_of_birth: '',
    is_artist: '1',
    country_id: '',
    website: '',
    company_label: '',
    is_social_media: [],
    social_media: [],
    genre_id: '',
  },
  registeruser: {
    first_name: '',
    username: '',
    email: '',
    password: '',
    gender: '',
    date_of_birth: '',
    is_listener: '1',
  },
  currentuser: {},
  darkmode: 0,
  genre: {},
};
import {
  GET_REGISTER_USER,
  SET_REGISTER_USER,
  RESET_STATE,
  SET_ARTIST_REGISTER_USER,
  CURRENT_USER,
  GENRE_LIST,
} from '../actionTypes';

const Auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_REGISTER_USER:
      return {
        ...state,
        registeruser: {
          ...state.registeruser,
          [Object.keys(action.payload)[0]]: Object.values(action.payload)[0],
        },
      };
    case CURRENT_USER:
      return {...state, currentuser: action.payload};
    case SET_ARTIST_REGISTER_USER:
      return {
        ...state,
        registerartist: {
          ...state.registerartist,
          [Object.keys(action.payload)[0]]: Object.values(action.payload)[0],
        },
      };
    case GENRE_LIST:
      return {...state, genre: action.payload};
    case GET_REGISTER_USER:
      return state.registeruser;
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default Auth;

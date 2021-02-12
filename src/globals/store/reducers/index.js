import {combineReducers} from 'redux';
import Auth from './auth';
import literals from './literals';
import Playlist from './playlist';
import Player from './player';
import Song from './song';

export default function getRootReducer() {
  return combineReducers({
    Auth,
    literals,
    Playlist,
    Player,
    Song,
  });
}

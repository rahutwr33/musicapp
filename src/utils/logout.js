import storage from './storage';
import {AuthStack} from '../navigation/stack/auth';
import {Alerts} from './alert';

export const logout = async () => {
  await storage.remove('user');
  setTimeout(() => {
    AuthStack({logout: true});
    // Alerts('Session expired.Please Login!', '', '');
  }, 2000);
};

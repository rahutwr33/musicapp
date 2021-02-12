import AsyncStorage from '@react-native-community/async-storage';

const getUser = async (key) => {
  return await AsyncStorage.getItem(key);
};

const removeUser = async (key) => {
  return await AsyncStorage.removeItem(key);
};

const getParseUser = async (key) => {
  var user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);
  return user;
};

const saveUser = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
    console.log(`
		        Error in saving ${key} token
		    `);
  }
  return null;
};

const storage = {
  get: (key) => getUser(key),
  set: (key, value) => saveUser(key, value),
  remove: (key) => removeUser(key),
  getuser: () => getParseUser(),
};

export default storage;

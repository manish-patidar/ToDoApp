import { AsyncStorage } from 'react-native'

export default class LocalStorage {

  static async getStore(action) {
    try {
      const data = await AsyncStorage.getItem('USER');
      const parsedData = JSON.parse(data);
      action(parsedData);
    } catch (error) {
      action(null);
    }
  }

  static async setStore(value) {
    try {
      await AsyncStorage.setItem('USER', JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }
}

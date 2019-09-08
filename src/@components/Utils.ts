import AsyncStorage from '@react-native-community/async-storage';

class Utils {

    static async storeUserInLocalStorage(user): Promise<void> {
        const userString = JSON.stringify(user);
        return await AsyncStorage.setItem('@user', userString);
    }

    static async getUserFromLocalStorage() {
        const user = await AsyncStorage.getItem('@user');
        return user;
    }

    static async removeUserFromLocalStorage(): Promise<void> {
        return await AsyncStorage.removeItem('@user');;
    }
}

export default Utils;
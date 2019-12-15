import { observable, action, computed } from 'mobx';
import axios from '@axios';
import AsyncStorage from '@react-native-community/async-storage';

interface Category {
    value: number;
    label: string;
};

export interface ICreateStore {
    categoriesLoading: boolean;
    categoriesLoadingFailed: boolean;
    categories: Category[];
    loadCategories: () => void;
}

export class CreateStore implements ICreateStore {
    @observable categoriesLoading = false;
    @observable categoriesLoadingFailed = false;
    @observable categories = [];

    @action.bound
    loadCategories = async (): Promise<void> => {
        const userString = await AsyncStorage.getItem('@user');
        const user = JSON.parse(userString);
        this.categoriesLoading = true;
        this.categoriesLoadingFailed = false;
        try {
            const response = await axios.get(`user/${user.userId}/categories`)
            const categories = response.data.map(cat => {
                return {
                    label: cat.category.name,
                    value: cat.category.id,
                    key: cat.category.id
                };
            });
            this.categories = categories;
            this.categoriesLoading = false;
            this.categoriesLoadingFailed = false;
        } catch (err) {
            console.log(err.response);
            const error = err.response.data;
            this.categoriesLoading = false;
            this.categoriesLoadingFailed = true;
        }
    }
}
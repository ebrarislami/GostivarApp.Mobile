import { observable, action, computed } from 'mobx';
import axios from '@axios';
import AsyncStorage from '@react-native-community/async-storage';

interface Category {
    value: number;
    label: string;
};

export interface CreatePost {
    isCommentsEnabled: boolean;
    content: string;
    categoryId: number;
    images: string[];
}

export interface ICreateStore {
    categoriesLoading: boolean;
    categoriesLoadingFailed: boolean;
    categories: Category[];
    createPost: CreatePost;
    loadCategories: () => void;
    updateCreatePost: (key: string, value: any) => void;
}

export class CreateStore implements ICreateStore {
    @observable categoriesLoading = false;
    @observable categoriesLoadingFailed = false;
    @observable categories = [];

    createPost: CreatePost = observable({
        isCommentsEnabled: true,
        content: '',
        categoryId: 0,
        images: []
    });

    @action
    updateCreatePost = (key: string, value: any): void => {
        this.createPost[key] = value;
    }

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
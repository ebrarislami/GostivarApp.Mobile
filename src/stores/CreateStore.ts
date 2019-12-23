import { observable, action, computed } from 'mobx';
import RNFetchBlob from 'rn-fetch-blob'
import axios from '@axios';
import AsyncStorage from '@react-native-community/async-storage';
import navigationService from '../navigation/navigationService';
import { Platform } from 'react-native';

interface Category {
    value: number;
    label: string;
};

interface Image {
    id: string;
    path?: string;
    loading?: boolean;
    loadingFailed?: boolean;
    uri: string;
}

export interface CreatePost {
    isCommentsEnabled: boolean;
    content: string;
    categoryId: number;
    images: Image[];
}

export interface ICreateStore {
    categoriesLoading: boolean;
    categoriesLoadingFailed: boolean;
    categories: Category[];
    createPost: CreatePost;
    isPublishDisabled: boolean;
    postCreatePost: () => void;
    resetCreatePost: () => void;
    loadCategories: () => void;
    updateCreatePost: (key: string, value: any) => void;
    uploadImage: (id: string, path: string) => void;
    removeImage: (id: string) => void;
}

export class CreateStore implements ICreateStore {
    @observable creating = false;
    @observable creatingFailed = false;
    @observable categoriesLoading = false;
    @observable categoriesLoadingFailed = false;
    @observable categories = [];

    createPost: CreatePost = observable({
        isCommentsEnabled: true,
        content: '',
        categoryId: 0,
        images: []
    });

    @computed
    get isPublishDisabled(): boolean {
        return !this.createPost.content || !this.createPost.categoryId || this.creating || this.createPost.images.filter(img => img.loading).length > 0;
    }

    @action
    updateCreatePost = (key: string, value: any): void => {
        this.createPost[key] = value;
    }

    @action.bound
    resetCreatePost = () => {
        this.createPost.categoryId = 0;
        this.createPost.isCommentsEnabled = true;
        this.createPost.content = '';
        this.createPost.images = [];
    }

    @action.bound
    postCreatePost = async (): Promise<void> => {
        this.creating = true;
        this.creatingFailed = false;
        try {
            const data = {
                ...this.createPost,
                images: [...this.createPost.images.map(img => img.path)]
            }
            const response = await axios.post(`post`, data);
            this.creating = false;
            this.creatingFailed = false;
            navigationService.navigate('MainTabs', {});
        } catch (err) {
            const error = err.response.data;
            this.creating = false;
            this.creatingFailed = true;
        }
    }

    @action.bound
    uploadImage = async (id: string, path: string): Promise<void> => {
        const image: Image = {
            id,
            uri: path,
            loading: true,
            loadingFailed: false,
            path: ''
        };
        this.createPost.images.push(image);

        let uri = path;
        if (Platform.OS === 'android') {
            uri = `file://${uri}`;
        }
  
        const formData = new FormData();
            formData.append('files', {
            uri,
            name: path,
            type: 'application/octet-stream',
        });

        axios
        .post('upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => {
            const imagePath = response.data[0];
            image.path = imagePath;
            image.loading = false;
            const index = this.createPost.images.findIndex(img => img.id === image.id);
            if (index !== -1) {
                this.createPost.images[index] = image;
            }
        }).catch(err => {
            image.loading = false;
            image.loadingFailed = true;
        });
    }

    @action.bound
    removeImage = async (id: string): Promise<void> => {
        this.createPost.images = this.createPost.images.filter(img => img.id !== id);
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
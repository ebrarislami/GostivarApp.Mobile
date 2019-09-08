import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { Utils } from '@components';
import navigationService from '../navigation/navigationService';

export interface RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IRegisterStore {
    user: RegisterUser;
    error: string;
    loading: boolean;
    loadingFailed: boolean;
    isValidUser: boolean;
    updateUser: (key: string, value: string) => void;
    register: () => void;
    clear: () => void;
}

export class RegisterStore implements IRegisterStore {

    user: RegisterUser = observable({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    @observable
    error = '';

    @observable
    loading = false;

    @observable
    loadingFailed = false;

    @computed get isValidUser(): boolean {
        return this.user.firstName && this.user.lastName && this.user.email && this.user.password ? true : false
    }

    @action
    updateUser = (key: string, value: string): void => {
        this.user[key] = value;
    }

    @action
    clear = (): void => {
        this.loading = false;
        this.loadingFailed = false;
        this.error = '';
        this.user = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    @action
    register = async (): Promise<void> => {
        this.loading = true;
        this.loadingFailed = false;
        try {
            const response = await axios.post('https://dev-gostivarapp.herokuapp.com/api/auth/register', {
                email: this.user.email,
                password: this.user.password,
                firstName: this.user.firstName,
                lastName: this.user.lastName
            });
            this.loading = false;
            this.loadingFailed = false;
            Utils.storeUserInLocalStorage(response.data);
            navigationService.navigate('HomeScreen', {});
            this.clear();
        } catch (err) {
            const error = err.response.data;
            if (error && error.err) {
                this.error = error.err;
            } else {
                this.error = 'Unexpected error occured. Try again!'; 
            }
            this.loading = false;
            this.loadingFailed = true;
        }
    }
}
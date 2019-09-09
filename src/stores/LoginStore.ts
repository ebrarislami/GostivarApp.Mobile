import { observable, action } from 'mobx';
import axios from 'axios';
import { Utils } from '@components';
import navigationService from '../navigation/navigationService';

export interface ILoginStore {
    email: string;
    password: string;
    error: string;
    loading: boolean;
    loadingFailed: boolean;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    login: () => void;
    clear: () => void;
}

export class LoginStore implements ILoginStore {

    @observable
    email = '';

    @observable
    password = '';

    @observable
    error = '';

    @observable
    loading = false;

    @observable
    loadingFailed = false;

    @action.bound
    setEmail(email: string): void {
        this.email = email;
    }

    @action.bound
    setPassword(password: string): void {
        this.password = password;
    }

    @action.bound
    clear(): void {
        this.password = '';
        this.email = '';
        this.loading = false;
        this.loadingFailed = false;
        this.error = '';
    }

    @action.bound
    login = async (): Promise<void> => {
        this.loading = true;
        this.loadingFailed = false;
        try {
            const response = await axios.post('https://dev-gostivarapp.herokuapp.com/api/auth/login', {
                email: this.email,
                password: this.password
            })
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
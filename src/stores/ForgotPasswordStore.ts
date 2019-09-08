import { observable, action, computed } from 'mobx';
import axios, { AxiosRequestConfig } from 'axios';
import navigationService from '../navigation/navigationService';

export interface IForgotPasswordStore {
    email: string;
    error: string;
    loading: boolean;
    loadingFailed: boolean;
    setEmail: (email: string) => void;
    forgotPassword: () => void;
    clear: () => void;
}

export class ForgotPasswordStore implements IForgotPasswordStore {

    @observable
    email = '';

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
    clear(): void {
        this.email = '';
        this.loading = false;
        this.loadingFailed = false;
        this.error = '';
    }

    @action.bound
    forgotPassword = async (): Promise<void> => {
        this.loading = true;
        this.loadingFailed = false;

        try {
            const response = await axios.post('https://dev-gostivarapp.herokuapp.com/api/auth/forgotpassword', {
                email: this.email
            });
            this.loading = false;
            this.loadingFailed = false;
            navigationService.navigate('LoginScreen', {});
            this.clear();
        } catch (err) {
            const error = err.response.data;
            if (error && error.err) {
                this.error = error.err;
            } else {
                this.error = 'Unexpected error occurred. Try again!'; 
            }
            this.loading = false;
            this.loadingFailed = true;
        }
    }
}
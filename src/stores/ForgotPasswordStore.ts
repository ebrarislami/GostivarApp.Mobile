import { observable, action, computed } from 'mobx';
import axios from '@axios';
import navigationService from '../navigation/navigationService';

export interface IForgotPasswordStore {
    email: string;
    error: string;
    loading: boolean;
    success: boolean;
    loadingFailed: boolean;
    setEmail: (email: string) => void;
    setSuccess: (success: boolean) => void;
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

    @observable
    success = false;

    @action.bound
    setEmail(email: string): void {
        this.email = email;
    }

    @action.bound
    setSuccess(success: boolean): void {
        this.success = success;
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
            const response = await axios.post('auth/forgotpassword', {
                email: this.email
            });
            this.loading = false;
            this.loadingFailed = false;
            this.success = true;
            // navigationService.navigate('LoginScreen', {});
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
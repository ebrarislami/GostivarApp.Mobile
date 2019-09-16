import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { Utils } from '@components';
import navigationService from '../navigation/navigationService';

class PostCategory {
    id: number;
    name: string;
    enabled: boolean;

    constructor() {
        this.enabled = false;
        this.id = -1;
        this.name = '';
    }
}

enum ProfileDisplayType {
    USERNAME = 'username',
    NAME_SURNAME = 'name_surname'
}

enum AppLanguageType {
    MK = 'MK-mk',
    TR = 'TR-tr',
    AL = 'AL-al',
    EN = 'EN-us'
}

interface UpdateProfileTextInputs {
    firstName: string,
    lastName: string,
    username: string
}

export interface IProfileStore {
    loadProfile: () => void;

    textInputs: UpdateProfileTextInputs;
    appLanguage: string;
    enabledNotifications: PostCategory[];
    profileDisplayType: ProfileDisplayType;

    error: string;
    loading: boolean;
    loadingFailed: boolean;

    toggleNotification: (notification: any) => void;
    selectAppLanguage: (language: any) => void;
    selectProfileDisplayType: (type: ProfileDisplayType) => void;

    updateTextInputs: (key: string, value: any) => void;
    update: () => void;
    clear: () => void;

    mockUserProfileData: () => void;
}

export class ProfileStore implements IProfileStore {

    textInputs: UpdateProfileTextInputs = observable({
        firstName: '',
        lastName: '',
        username: ''
    });

    @observable
    appLanguage = AppLanguageType.EN;

    @observable
    enabledNotifications: PostCategory[] = [];

    @observable
    profileDisplayType = ProfileDisplayType.NAME_SURNAME;

    @observable
    error = '';

    @observable
    loading = false;

    @observable
    loadingFailed = false;

    @action
    async loadProfile(): Promise<void> {
        this.loading = true;
        try {
            const user = await Utils.getUserFromLocalStorage();
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(user).accessToken
            }

            const response = await axios.get('https://dev-gostivarapp.herokuapp.com/api/user/6', { headers: headers });
            this.textInputs = response.data;

            console.log('res', response)
            this.loading = false;
            this.loadingFailed = false;
        }
        catch (err) {
            const error = err.response.data;
            if (error && error.err) {
                this.error = error.err;
            } else {
                this.error = 'Unexpected error occured. Try again!';
            }
            this.loading = false;
            this.loadingFailed = true;
        }
        // Mock data start
        this.mockUserProfileData();
        // Mock data end
        return;
    }

    @action.bound
    toggleNotification(notificationIndex: number): void {
        this.enabledNotifications[notificationIndex].enabled = !this.enabledNotifications[notificationIndex].enabled
    }

    @action.bound
    selectAppLanguage(language: AppLanguageType): void {
        this.appLanguage = language;
    }

    @action.bound
    selectProfileDisplayType(type: ProfileDisplayType) {
        this.profileDisplayType = type;
    }

    @action.bound
    clear(): void {
        this.textInputs = {
            firstName: '',
            lastName: '',
            username: ''
        }

        this.appLanguage = AppLanguageType.EN;
        this.enabledNotifications = [];
        this.profileDisplayType = ProfileDisplayType.NAME_SURNAME;

        this.loading = false;
        this.loadingFailed = false;
        this.error = '';
    }

    @action
    updateTextInputs = (key: string, value: any): void => {
        (this.textInputs as any)[key] = value;
    }

    @action.bound
    update = async (): Promise<void> => {
        this.loading = true;
        this.loadingFailed = false;

        const textInputs: UpdateProfileTextInputs = {
            firstName: this.textInputs.firstName,
            lastName: this.textInputs.lastName,
            username: this.textInputs.username
        }

        try {
            const user = await Utils.getUserFromLocalStorage();
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.accessToken
            }
            console.log('user la ', textInputs)
            const response = await axios.put('https://dev-gostivarapp.herokuapp.com/api/user/',
                textInputs, { headers: headers });

            console.log('user', user);
            console.log('res update', response)
            this.loading = false;
            this.loadingFailed = false;

            navigationService.navigate('MainTabs', {});
            // this.clear();
        } catch (err) {
            const error = err.response.data;
            if (error && error.err) {
                this.error = error.err;
            } else {
                this.error = 'Unexpected error occured. Try again!';
            }
            console.log('err', err);

            this.loading = false;
            this.loadingFailed = true;
        }
        return;
    }

    @action
    mockUserProfileData() {
        this.appLanguage = AppLanguageType.EN;
        const mockNotifications = [
            {
                id: 1,
                name: 'News',
                enabled: true
            },
            {
                id: 2,
                name: 'Death',
                enabled: true
            },
            {
                id: 3,
                name: 'Hot Deals',
                enabled: true
            },
            {
                id: 4,
                name: 'Municipality Announcement',
                enabled: true
            },
            {
                id: 5,
                name: 'Career',
                enabled: true
            },
            {
                id: 6,
                name: 'Real Estate',
                enabled: true
            },
            {
                id: 7,
                name: 'Forbidden',
                enabled: false
            }
        ] as any;

        this.enabledNotifications = mockNotifications;
        this.profileDisplayType = ProfileDisplayType.NAME_SURNAME;
    }
}
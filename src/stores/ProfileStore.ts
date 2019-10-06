import { observable, action, computed, toJS } from 'mobx';
import axios from '@axios';
import { Utils } from '@components';
import navigationService from '../navigation/navigationService';

class PostCategory {
    id: string;
    name: string;
    enabled: boolean;

    constructor() {
        this.enabled = false;
        this.id = '';
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
    isAllNotificationsEnabled: boolean;

    error: string;
    loading: boolean;
    loadingFailed: boolean;

    toggleNotification: (notification: any) => void;
    enableAllNotifications: () => void;
    selectAppLanguage: (language: any) => void;
    selectProfileDisplayType: (type: ProfileDisplayType) => void;

    updateTextInputs: (key: string, value: any) => void;
    update: () => void;
    clear: () => void;
}

export class ProfileStore implements IProfileStore {

    @observable
    textInputs: UpdateProfileTextInputs = {
        firstName: '',
        lastName: '',
        username: ''
    };

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

    @computed
    get isAllNotificationsEnabled(): boolean {
        const isThereAnythingDisabled = this.enabledNotifications.filter(notification => notification.enabled === false).length;
        return isThereAnythingDisabled ? false : true;
    }

    @computed
    get userInputs(): any {
        return this.textInputs;
    }

    @computed
    get enabledPostCategories(): PostCategory[] {
        return this.enabledNotifications;
    }

    @action
    async loadProfile(): Promise<void> {
        this.loading = true;
        try {
            const response = await axios.get('https://dev-gostivarapp.herokuapp.com/api/user/6');
            this.textInputs.firstName = response.data.firstName;
            this.textInputs.lastName = response.data.lastName;
            this.textInputs.username = response.data.username;

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
    enableAllNotifications(): void {
        this.enabledNotifications.forEach(notification => {
            notification.enabled = true;
        });
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

        const textInputs: UpdateProfileTextInputs = toJS(this.userInputs);
        const preferences = {
            language: this.appLanguage,
            displayAs: this.profileDisplayType
        }
        const enabledNotifications: PostCategory[] = toJS(this.enabledPostCategories);


        try {
            const updateObject = {
                textInputs,
                preferences,
                enabledNotifications
            }
            console.log('update object ', updateObject)
            this.loading = false;
            this.loadingFailed = false;

            navigationService.navigate('MainTabs', {});
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
        return;
    }

    @action
    private mockUserProfileData() {
        this.appLanguage = AppLanguageType.EN;
        const mockNotifications: PostCategory[] = [
            {
                id: 'aaa',
                name: 'News',
                enabled: false
            },
            {
                id: 'bbb',
                name: 'Death',
                enabled: true
            },
            {
                id: 'ccc',
                name: 'Hot Deals',
                enabled: true
            },
            {
                id: 'ddd',
                name: 'Municipality Announcement',
                enabled: true
            },
            {
                id: 'fff',
                name: 'Career',
                enabled: true
            },
            {
                id: 'eee',
                name: 'Real Estate',
                enabled: true
            },
            {
                id: 'zzz',
                name: 'Forbidden',
                enabled: true
            }
        ];

        this.enabledNotifications = mockNotifications;
        this.profileDisplayType = ProfileDisplayType.NAME_SURNAME;
    }
}
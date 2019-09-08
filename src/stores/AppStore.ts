import { observable, computed, action } from 'mobx';

export interface IAppStore {
    name: string;
}

export class AppStore implements IAppStore {
    @observable
    name = "World";
}
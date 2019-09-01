import { observable, computed, action } from 'mobx';

export interface IMobxStore {
    name: string;
    greetings: string;
    setName: (name: string) => void;
}

export class MobxStore implements IMobxStore {
    constructor(){
        
    }

    @observable
    name = "World";

    @computed
    get greetings(): string {
        return `Hello ${this.name}`;
    }

    @action.bound
    setName(name: string): void {
        this.name = name;
    }
}
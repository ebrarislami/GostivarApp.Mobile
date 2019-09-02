import { MobxStore } from './MobxStore';
import { LoginStore } from './LoginStore';

export const stores = {
    mobxStore: new MobxStore(),
    loginStore: new LoginStore()
}
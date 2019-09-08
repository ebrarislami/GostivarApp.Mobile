import { MobxStore } from './MobxStore';
import { LoginStore } from './LoginStore';
import { ForgotPasswordStore } from './ForgotPasswordStore';

export const stores = {
    mobxStore: new MobxStore(),
    loginStore: new LoginStore(),
    forgotPasswordStore: new ForgotPasswordStore()
}
import { AppStore } from './AppStore';
import { LoginStore } from './LoginStore';
import { RegisterStore } from './RegisterStore';
import { ForgotPasswordStore } from './ForgotPasswordStore';
import { ProfileStore } from './ProfileStore';
import { CreateStore } from './CreateStore';

export const stores = {
    appStore: new AppStore(),
    loginStore: new LoginStore(),
    registerStore: new RegisterStore(),
    forgotPasswordStore: new ForgotPasswordStore(),
    profileStore: new ProfileStore(),
    createStore: new CreateStore(),
}
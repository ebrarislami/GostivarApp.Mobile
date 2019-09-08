import { AppStore } from './AppStore';
import { LoginStore } from './LoginStore';
import { RegisterStore } from './RegisterStore';
import { ForgotPasswordStore } from './ForgotPasswordStore';

export const stores = {
    appStore: new AppStore(),
    loginStore: new LoginStore(),
    registerStore: new RegisterStore(),
    forgotPasswordStore: new ForgotPasswordStore()
}
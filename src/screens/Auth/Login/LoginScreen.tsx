import React, { useRef, useState, useEffect } from 'react';
import { Text, View, StatusBar, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ILoginStore } from '../../../stores/LoginStore';

export interface Props {
  navigation: NavigationParams;
  loginStore: ILoginStore;
}

interface State {

}

const LoginScreen: React.SFC<Props> = (props: Props) => {

  let blurListener: EventEmitterListener;
  const passwordInputRef = useRef(null);
  const [isSignClicked, setSignClicked] = useState(false);
  const { error, loading, loadingFailed, email, password } = props.loginStore;

  useEffect(() => {
    blurListener = props.navigation.addListener('willBlur', () => {
      setSignClicked(false);
    });
    return () => {
      blurListener.remove();
    };
  }, []);

  const onLoginHandler = () => {
    const { login } = props.loginStore;
    setSignClicked(true);
    if (!(email && password)) return;
    login();
  };

  const onSignupClickHandler = () => {
    const { clear } = props.loginStore;
    clear();
    props.navigation.push('RegisterScreen')
  }

  const onEmailChange = (value: string) => {
    const { setEmail } = props.loginStore;
    setSignClicked(false);
    setEmail(value);
  };

  const onPasswordChange = (value: string) => {
    const { setPassword } = props.loginStore;
    setSignClicked(false);
    setPassword(value);
  };

  const onEndEmail = () => {
    passwordInputRef && passwordInputRef.current && passwordInputRef.current.focus();
  }

  const onEndPassword = () => {
    onLoginHandler();
  }

  const onGooglePressed = () => {

  }

  const onFacebookPress = () => {

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#edf1f7' }}>
      <SafeAreaView style={{ flex: 1, margin: 16, justifyContent: 'center' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <FormContainer>
            <InputContainer>
              <IconContainer>
                <FontAwesome5 size={14} color='#8F9BB3' name={'user'} solid/>
              </IconContainer>
              <Input
                value={email}
                onChangeText={(value: string) => onEmailChange(value)}
                scrollEnabled={false}
                onSubmitEditing={onEndEmail}
                placeholderTextColor='#8F9BB3'
                autoCapitalize='none'
                placeholder='Email'
                returnKeyType='next'
                blurOnSubmit={false}
                style={{borderColor: isSignClicked && !email ? 'red' : 'transparent'}}
              />
            </InputContainer>
            <InputContainer style={{marginTop: 25}}>
              <IconContainer>
                <FontAwesome5 size={14} color='#8F9BB3' name={'lock'} />
              </IconContainer>
              <Input
                ref={passwordInputRef}
                value={password}
                onChangeText={(value: string) => onPasswordChange(value)}
                scrollEnabled={false}
                placeholderTextColor='#8F9BB3'
                autoCapitalize='none'
                returnKeyType='go'
                placeholder='Password'
                onSubmitEditing={onEndPassword}
                blurOnSubmit={true}
                style={{borderColor: isSignClicked && !password ? 'red' : 'transparent'}}
                secureTextEntry
              />
            </InputContainer>
            <TouchableOpacity onPress={() => props.navigation.push('ForgotPasswordScreen')}>
              <Text style={{color: '#8F9BB3', fontWeight: 'bold', marginTop: 10, textAlign: 'right'}}>Forgot password?</Text>
            </TouchableOpacity>
            {
              <Text style={{ opacity: loadingFailed ? 1 : 0, color: 'red', fontWeight: 'bold', marginTop: 10, textAlign: 'center'}}>{error}</Text>
            }
            <SignButton
              disabled={loading}
              onPress={onLoginHandler}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>{loading ? 'LOADING...' : 'SIGN IN'}</Text>
            </SignButton>
            <Text style={{color: '#8F9BB3', fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>Or</Text>
            <View style={{marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center',}}>
              <TouchableWithoutFeedback onPress={onGooglePressed}>
                <FontAwesome5 style={{marginRight: 15}} size={22} color='#8F9BB3' name={'google'} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onFacebookPress}>
                <FontAwesome5 size={22} color='#8F9BB3' name={'facebook'} />
              </TouchableWithoutFeedback>
            </View>
          </FormContainer>
        </TouchableWithoutFeedback>
        <View style={{justifyContent: 'center', marginBottom: 8}}>
          <TouchableOpacity onPress={onSignupClickHandler}>
            <Text style={{color: '#8F9BB3', fontWeight: 'bold', marginTop: 10, textAlign: 'center'}}>Don't have account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: null
  }
};

const FormContainer = styled.View`
  flex: 1;
  margin-top: 170px;
`;

const InputContainer = styled.View`
  position: relative;
`;

const IconContainer = styled.View`
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 15px;
`;

const Input = styled.TextInput`
  border-width: 1;
  border-color: transparent;
  background-color: white;
  border-radius: 50px;
  padding-left: 40px;
  padding-top: 18px;
  padding-bottom: 18px;
  shadow-opacity: 0.75;
  shadow-radius: 5;
  shadow-color: rgba(0, 0, 0, .2);
  shadow-offset: 0px 2px;
`;

const SignButton = styled.TouchableOpacity`
  background-color: #62B4AD;
  border-radius: 50px;
  width: 100%;
  padding: 18px 0px;
  align-items: center;
  shadow-opacity: 0.85;
  shadow-radius: 4;
  shadow-color: rgba(0, 0, 0, .3);
  shadow-offset: 0px 4px;
  margin-top: 45px;
`;

export default inject("loginStore")(observer(LoginScreen));

import React, { useRef, useState, useEffect } from 'react';
import { Text, View, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { NavigationParams, NavigationEventSubscription, SafeAreaView } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ILoginStore } from '../../../stores/LoginStore';

export interface Props {
  navigation: NavigationParams;
  loginStore: ILoginStore;
}

interface State {

}

const LoginScreen: React.SFC<Props> = (props: Props) => {

  let blurListener: NavigationEventSubscription;
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
    <Container>
      <SafeAreaView style={{ flex: 1, margin: 16, justifyContent: 'center' }}>
        <StatusBar backgroundColor="#F8FAFB" barStyle="dark-content" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <FormContainer>
            <Image style={{width: 200, height: 200, alignSelf: 'center', marginBottom: 20}} source={require('../../../assets/images/logo.png')}/>
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
              <Text style={{color: '#8F9BB3', fontWeight: 'bold', marginTop: 15, textAlign: 'right'}}>Forgot password?</Text>
            </TouchableOpacity>
            {
              <Text style={{ opacity: loadingFailed ? 1 : 0, color: 'red', fontWeight: 'bold', marginTop: 10, textAlign: 'center'}}>{error}</Text>
            }

            <LinearGradient
              style={{width: '100%', borderRadius: 50, borderWidth: 1, paddingVertical: 18, borderColor: 'transparent', alignItems: 'center', marginTop: 45}}
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
              colors={['#41CBEA', '#2A83DB']}>
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center'}}
                disabled={loading}
                onPress={onLoginHandler}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>{loading ? 'LOADING...' : 'SIGN IN'}</Text>
              </TouchableOpacity>
            </LinearGradient>
            <Text style={{color: '#8F9BB3', fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>Or</Text>
            <View style={{marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center',}}>
              <TouchableWithoutFeedback onPress={onGooglePressed}>
                <FontAwesome5 style={{marginRight: 25}} size={22} color='#E44034' name={'google'} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onFacebookPress}>
                <FontAwesome5 size={22} color='#3B5998' name={'facebook'} />
              </TouchableWithoutFeedback>
            </View>
          </FormContainer>
        </TouchableWithoutFeedback>
        <View style={{justifyContent: 'center', marginBottom: 8}}>
          <TouchableOpacity onPress={onSignupClickHandler}>
            <SignUpText>Don't have account? Sign Up</SignUpText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Container>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: null
  }
};

const Container = styled.View`
  flex: 1;
  background-color: #F8FAFB;
`;

const FormContainer = styled.View`
  flex: 1;
  margin-top: 60px;
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
  elevation: 2;
`;

const SignButton = styled.TouchableOpacity`
  background-color: #25AEE6;
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

const SignUpText = styled.Text`
  color: #8F9BB3;
  font-weight: bold;
  margin-top: 10;
  text-align: center;
`;

export default inject("loginStore")(observer(LoginScreen));

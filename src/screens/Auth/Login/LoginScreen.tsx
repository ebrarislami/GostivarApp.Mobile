import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView, NavigationParams } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ILoginStore } from '../../../stores/LoginStore';
export interface Props {
  navigation: NavigationParams;
  loginStore: ILoginStore;
}

interface State {

}

class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  onLoginHandler = () => {
    const { login } = this.props.loginStore;
    login();
  };

  onEmailChange = (value: string) => {
    const { setEmail } = this.props.loginStore;
    setEmail(value);
  };

  onPasswordChange = (value: string) => {
    const { setPassword } = this.props.loginStore;
    setPassword(value);
  };

  render() {
    const { email, password, loading, loadingFailed, error } = this.props.loginStore;
    return (
      <SafeArea>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={{ flex: 1, marginTop: 40 }}>
          <TextInput
            value={email}
            onChangeText={(value) => this.onEmailChange(value)}
            scrollEnabled={false}
            placeholderTextColor='#8F9BB3'
            placeholder='Email'
            style={{
              borderWidth: 1,
              borderColor: '#8F9BB3',
              backgroundColor: '#F7F9FC',
              borderRadius: 5,
              paddingLeft: 10
            }}
          />
          <TextInput
            value={password}
            onChangeText={(value) => this.onPasswordChange(value)}
            scrollEnabled={false}
            placeholderTextColor='#8F9BB3'
            placeholder='Password'
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: '#8F9BB3',
              backgroundColor: '#F7F9FC',
              borderRadius: 5,
              paddingLeft: 10,
              marginTop: 25
            }}
          />
          {
            loadingFailed && <Text style={{ color: 'red', fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>{error}</Text>
          }
          <Text onPress={() => this.props.navigation.push('ForgotPasswordScreen')} style={{ color: '#C6CFE0', fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>Forgot Password</Text>
        </View>
        <View style={{ justifyContent: 'center', marginBottom: 8 }}>
          <TouchableOpacity
            onPress={this.onLoginHandler}
            style={{
              backgroundColor: '#F7F9FC',
              borderRadius: 5,
              width: '100%',
              paddingVertical: 20,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#C6CFE0', fontWeight: 'bold' }}>{loading ? 'LOADING...' : 'SIGN IN'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.push('RegisterScreen')}>
            <Text style={{ color: '#C6CFE0', fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeArea>
    );
  }
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
  margin: 16px;
  justify-content: center;
`;


export default inject("loginStore")(observer(LoginScreen));

import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { IRegisterStore } from '../../../stores/RegisterStore';

export interface Props {
  navigation: NavigationParams;
  registerStore: IRegisterStore;
}

interface State {

}

class RegisterScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.lastNameInputRef = null;
    this.emailInputRef = null;
    this.passwordInputRef = null;
  }

  passwordInputRef: TextInput | null;
  emailInputRef: TextInput | null;
  lastNameInputRef: TextInput | null;

  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  onRegisterHandler = () => {
    const { register } = this.props.registerStore;
    register();
  }

  onInputChange = (key: string, value: string) => {
    const { updateUser } = this.props.registerStore;
    updateUser(key, value);
  }

  onDoneEditing = () => {
    this.onRegisterHandler();
  }

  onFocusNextInput = (ref: TextInput) => {
    ref && ref.focus();
  }

  render() {
    const { loading, loadingFailed, error, user, isValidUser } = this.props.registerStore;

    return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <View style={{flex: 1, marginTop: 40}}>
            <TextInput
              value={user.firstName}
              onChangeText={(value) => this.onInputChange('firstName', value)}
              scrollEnabled={false}
              placeholderTextColor='#8F9BB3'
              placeholder='First Name' 
              returnKeyType='next'
              onSubmitEditing={() => this.onFocusNextInput(this.lastNameInputRef)}
              blurOnSubmit={false}
              style={[styles.input, {marginBottom: 25}]}
            />
            <TextInput
              ref={(input) => { this.lastNameInputRef = input; }}
              value={user.lastName}
              onChangeText={(value) => this.onInputChange('lastName', value)}
              scrollEnabled={false}
              placeholderTextColor='#8F9BB3'
              placeholder='Last Name'
              returnKeyType='next'
              onSubmitEditing={() => this.onFocusNextInput(this.emailInputRef)}
              blurOnSubmit={false}
              style={[styles.input, {marginBottom: 25}]}
            />
            <TextInput
              ref={(input) => { this.emailInputRef = input; }}
              value={user.email}
              onChangeText={(value) => this.onInputChange('email', value)}
              scrollEnabled={false}
              placeholderTextColor='#8F9BB3'
              placeholder='Email'
              autoCapitalize='none'
              returnKeyType='next'
              onSubmitEditing={() => this.onFocusNextInput(this.passwordInputRef)}
              blurOnSubmit={false}
              style={[styles.input, {marginBottom: 25}]}
            />
            <TextInput
              ref={(input) => { this.passwordInputRef = input; }}
              value={user.password}
              onChangeText={(value) => this.onInputChange('password', value)}
              scrollEnabled={false}
              placeholderTextColor='#8F9BB3'
              placeholder='Password'
              autoCapitalize='none'
              returnKeyType='go'
              onSubmitEditing={this.onDoneEditing}
              secureTextEntry
              blurOnSubmit={true}
              style={styles.input}
            />
            {
              loadingFailed && <Text style={styles.errTxt}>{error}</Text>
            }
          </View>
          <View style={{justifyContent: 'center', marginBottom: 8}}>
            <TouchableOpacity
              onPress={this.onRegisterHandler}
              style={[styles.signBtn, isValidUser && styles.validSignBtn]}
            >
              <Text style={{color: !isValidUser ? '#C6CFE0' : 'white', fontWeight: 'bold'}}>
                {!loading ? 'SIGN UP' : 'LOADING...'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    margin: 16,
  },
  signBtn: {
    backgroundColor: '#F7F9FC',
    borderRadius: 5,
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center'
  },
  validSignBtn: {
    backgroundColor: '#62B4AD',
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingLeft: 10,
    paddingVertical: 18,
    shadowColor: 'rgba(0, 0, 0, .3)',
    shadowRadius: 5,
    shadowOpacity: 0.75,
    shadowOffset: {height: 2, width: 0}
  },
  errTxt: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center'
  }
});

export default inject("registerStore")(observer(RegisterScreen));
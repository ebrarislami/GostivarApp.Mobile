import React, { useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { IRegisterStore } from '../../../stores/RegisterStore';

export interface Props {
  navigation: NavigationParams;
  registerStore: IRegisterStore;
}

interface State {

}

const RegisterScreen: React.SFC<Props> = (props: Props) => {
  const { loading, loadingFailed, error, user, isValidUser } = props.registerStore;
  let passwordInputRef = useRef(null);
  let emailInputRef = useRef(null);
  let lastNameInputRef = useRef(null);

  const onRegisterHandler = () => {
    const { register } = props.registerStore;
    register();
  }

  const onInputChange = (key: string, value: string) => {
    const { updateUser } = props.registerStore;
    updateUser(key, value);
  }

  const onDoneEditing = () => {
    onRegisterHandler();
  }

  const onFocusNextInput = (ref: any) => {
    ref && ref.current.focus();
  }

  return (
    <View style={{flex: 1, backgroundColor: '#F8FAFB' }}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#F8FAFB" barStyle="dark-content" />
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <FontAwesome5 style={{marginLeft: 8, marginTop: 10}} size={20} color='black' name={'arrow-left'} solid/>
        </TouchableOpacity>
        <View style={{flex: 1, marginTop: 40}}>
          <TextInput
            value={user.firstName}
            onChangeText={(value) => onInputChange('firstName', value)}
            scrollEnabled={false}
            placeholderTextColor='#8F9BB3'
            placeholder='First Name' 
            returnKeyType='next'
            onSubmitEditing={() => onFocusNextInput(lastNameInputRef)}
            blurOnSubmit={false}
            style={[styles.input, {marginBottom: 25}]}
          />
          <TextInput
            ref={lastNameInputRef}
            value={user.lastName}
            onChangeText={(value) => onInputChange('lastName', value)}
            scrollEnabled={false}
            placeholderTextColor='#8F9BB3'
            placeholder='Last Name'
            returnKeyType='next'
            onSubmitEditing={() => onFocusNextInput(emailInputRef)}
            blurOnSubmit={false}
            style={[styles.input, {marginBottom: 25}]}
          />
          <TextInput
            ref={emailInputRef}
            value={user.email}
            onChangeText={(value) => onInputChange('email', value)}
            scrollEnabled={false}
            placeholderTextColor='#8F9BB3'
            placeholder='Email'
            autoCapitalize='none'
            returnKeyType='next'
            onSubmitEditing={() => onFocusNextInput(passwordInputRef)}
            blurOnSubmit={false}
            style={[styles.input, {marginBottom: 25}]}
          />
          <TextInput
            ref={passwordInputRef}
            value={user.password}
            onChangeText={(value) => onInputChange('password', value)}
            scrollEnabled={false}
            placeholderTextColor='#8F9BB3'
            placeholder='Password'
            autoCapitalize='none'
            returnKeyType='go'
            onSubmitEditing={onDoneEditing}
            secureTextEntry
            blurOnSubmit={true}
            style={styles.input}
          />
          {
            loadingFailed && <Text style={styles.errTxt}>{error}</Text>
          }

            <LinearGradient
              style={{elevation: 3, shadowOpacity: 0.75, shadowRadius: 5, shadowColor: 'rgba(0, 0, 0, .3)', shadowOffset: {height: 3, width: 0},width: '100%', borderRadius: 50, borderWidth: 1, paddingVertical: 18, borderColor: 'transparent', alignItems: 'center', marginTop: 45}}
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
              colors={['#41CBEA', '#2A83DB']}>
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center'}}
                disabled={loading}
                onPress={onRegisterHandler}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>{loading ? 'LOADING...' : 'SIGN UP'}</Text>
              </TouchableOpacity>
            </LinearGradient>
        </View>
      </SafeAreaView>
    </View>
  );
};

RegisterScreen.navigationOptions = () => {
  return {
    header: null
  }
};

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
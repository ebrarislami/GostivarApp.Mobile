import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView, NavigationParams } from 'react-navigation';

export interface Props {
    navigation: NavigationParams
}

interface State {

}

class RegisterScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  onRegisterHandler = () => {
    this.props.navigation.navigate('HomeScreen');
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <View style={{flex: 1, marginTop: 40}}>
            <TextInput
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
          </View>
          <View style={{justifyContent: 'center', marginBottom: 8}}>
            <TouchableOpacity
              onPress={this.onRegisterHandler}
              style={{
                backgroundColor: '#F7F9FC',
                borderRadius: 5,
                width: '100%',
                paddingVertical: 20,
                alignItems: 'center'
              }}
            >
              <Text style={{color: '#C6CFE0', fontWeight: 'bold'}}>SIGN UP</Text>
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
    marginVertical: 16,
    marginHorizontal: 16
  }
});

export default RegisterScreen;
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationParams } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

export interface Props {
  navigation: NavigationParams;
}

interface State {
  
}

class Initialization extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem('@user')
      if(user !== null) {
        this.props.navigation.navigate('HomeScreen');
      } else {
        this.props.navigation.navigate('AuthScreen');
      }
    } catch(e) {
      this.props.navigation.navigate('AuthScreen');
    }
  }

  render() {
    return (
        <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});

export default Initialization;
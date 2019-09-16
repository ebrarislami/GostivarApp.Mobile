import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationParams } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { Utils } from '@components';
import compareAsc from 'date-fns/compareAsc';
import fromUnixTime from 'date-fns/fromUnixTime';

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
        const userJSON = JSON.parse(user);
        const dateNow = new Date().getTime();
        const compare = compareAsc(new Date(userJSON.expiresIn * 1000), new Date());
        if (userJSON.accessToken && compareAsc(userJSON.expiresIn * 1000, dateNow) === 1) {
          this.props.navigation.navigate('RootStack');
        } else {
          Utils.removeUserFromLocalStorage();
          this.props.navigation.navigate('AuthScreen');
        }
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
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import { IAppStore } from '../../stores/AppStore';
import { Utils } from '../../@components';
import { NavigationParams } from 'react-navigation';

export interface Props {
  appStore?: IAppStore;
  navigation: NavigationParams;
}

class ProfileScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      tabBarLabel: 'Profile',
    };
  };

  render() {
    return (
      <View style={styles.container}>

      </View>
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

export default inject("appStore")(observer(ProfileScreen));

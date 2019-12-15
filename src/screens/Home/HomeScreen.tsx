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

class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Button 
        onPress={this.onLogoutHandler}
        title="Logout"
        color="#841584"
        accessibilityLabel="Learn more about this purple button" />
      </View>
    );
  }

  private onLogoutHandler = () => {
    Utils.removeUserFromLocalStorage();
    this.props.navigation.navigate('AuthScreen');
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

export default inject("appStore")(observer(Home));

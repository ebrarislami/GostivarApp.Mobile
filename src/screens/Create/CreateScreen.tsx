import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationParams } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { IAppStore } from '../../stores/AppStore';

export interface Props {
  appStore?: IAppStore;
  navigation: NavigationParams;
}

class CreateScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create',
      headerLeft: <View />,
      headerRight: (
          <TouchableOpacity style={{marginRight: 16}} onPress={() => navigation.goBack()}>
              <FontAwesome5 name={'times'} size={25} color={'black'} />
          </TouchableOpacity>
      )
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

export default inject("appStore")(observer(CreateScreen));

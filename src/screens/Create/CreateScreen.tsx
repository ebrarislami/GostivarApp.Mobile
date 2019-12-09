import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Switch } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationParams, SafeAreaView } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { ICreateStore } from '../../stores/CreateStore';

export interface Props {
  createStore?: ICreateStore;
  navigation: NavigationParams;
}

class CreateScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    commenstEnabled: false
  };

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

  onSubmitHandler = () => {

  }

  onCommentsHandler = () => {
    this.setState((prevState) => ({
      commenstEnabled: !prevState.commenstEnabled
    }));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 18}}>
          <Text style={{marginRight: 15}}>Comments Enabled</Text>
          <Switch
              ios_backgroundColor="#FFFFFF"
              trackColor={{ false: '#E5E5E5', true: '#41CBEA' }}
              onValueChange={this.onCommentsHandler}
              value={this.state.commenstEnabled}
            />
        </View>

        <LinearGradient
          style={{width: '100%', borderRadius: 50, borderWidth: 1, paddingVertical: 18, borderColor: 'transparent', alignItems: 'center'}}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          colors={['#41CBEA', '#2A83DB']}>
          <TouchableOpacity
            style={{width: '100%', alignItems: 'center'}}
            onPress={this.onSubmitHandler}
          >
            <Text style={{color: 'white', fontWeight: 'bold'}}>Publish</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 18,
    flex: 1,
  }
});

export default inject("createStore")(observer(CreateScreen));
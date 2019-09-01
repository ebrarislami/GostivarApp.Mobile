import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface Props {

}

interface State {
  
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      gesturesEnabled: false,
    };
  };

  render() {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
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

export default Home;
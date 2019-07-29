import React from 'react';
import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';

export interface Props {

}

interface State {
  
}

class Initialization extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
        <View style={styles.container}>
            <Text>0</Text>
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

export default Initialization;
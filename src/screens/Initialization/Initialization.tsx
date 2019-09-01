import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationParams } from 'react-navigation';

export interface Props {
  navigation: NavigationParams;
}

interface State {
  
}

class Initialization extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
        <View style={styles.container}></View>
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
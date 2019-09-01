import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface Props {

}

interface State {
  
}

class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

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

export default LoginScreen;
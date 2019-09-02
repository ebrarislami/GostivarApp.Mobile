import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { IMobxStore } from '../../stores/MobxStore';

export interface Props {
  mobxStore?: IMobxStore;
}

class Home extends React.Component<Props> {
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
    const { greetings } = this.props.mobxStore!;

    return (
      <View style={styles.container}>
        <Text>{greetings}</Text>
        <Button 
        onPress={this.clickHandler}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button" />
      </View>
    );
  }

  private clickHandler = () => {
    const { setName } = this.props.mobxStore!;
    setName('Ebrar');
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

export default inject("mobxStore")(observer(Home));

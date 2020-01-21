import React, { useRef } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import { NavigationParams } from "react-navigation";
import { inject, observer } from "mobx-react";
import { IRegisterStore } from "../../../stores/RegisterStore";
import { Button, BackButton, TextInput, Colors } from "@components";

export interface Props {
  navigation: NavigationParams;
  registerStore: IRegisterStore;
}

interface State {}

const RegisterScreen: React.SFC<Props> = (props: Props) => {
  const {
    loading,
    loadingFailed,
    error,
    user,
    isValidUser
  } = props.registerStore;
  let passwordInputRef = useRef(null);
  let emailInputRef = useRef(null);
  let lastNameInputRef = useRef(null);

  const onRegisterHandler = () => {
    const { register } = props.registerStore;
    register();
  };

  const onInputChange = (key: string, value: string) => {
    const { updateUser } = props.registerStore;
    updateUser(key, value);
  };

  const onDoneEditing = () => {
    onRegisterHandler();
  };

  const onFocusNextInput = (ref: any) => {
    ref && ref.current.focus();
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightgray }}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.lightgray} barStyle="dark-content" />
        <View style={styles.header}>
          <BackButton
            style={{ flex: 0.33 }}
            onPress={() => props.navigation.goBack()}
          />
          <Text style={styles.headerTxt}>SIGN UP</Text>
          <View style={{ flex: 0.33 }}></View>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            value={user.firstName}
            onChangeText={value => onInputChange("firstName", value)}
            scrollEnabled={false}
            placeholder="First Name"
            returnKeyType="next"
            onSubmitEditing={() => onFocusNextInput(lastNameInputRef)}
            blurOnSubmit={false}
            inputStyle={{ marginBottom: 25 }}
          />
          <TextInput
            ref={lastNameInputRef}
            value={user.lastName}
            onChangeText={value => onInputChange("lastName", value)}
            scrollEnabled={false}
            placeholder="Last Name"
            returnKeyType="next"
            onSubmitEditing={() => onFocusNextInput(emailInputRef)}
            blurOnSubmit={false}
            inputStyle={{ marginBottom: 25 }}
          />
          <TextInput
            ref={emailInputRef}
            value={user.email}
            onChangeText={value => onInputChange("email", value)}
            scrollEnabled={false}
            placeholder="Email"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => onFocusNextInput(passwordInputRef)}
            blurOnSubmit={false}
            inputStyle={{ marginBottom: 25 }}
          />
          <TextInput
            ref={passwordInputRef}
            value={user.password}
            onChangeText={value => onInputChange("password", value)}
            scrollEnabled={false}
            placeholder="Password"
            autoCapitalize="none"
            returnKeyType="go"
            onSubmitEditing={onDoneEditing}
            secureTextEntry
            blurOnSubmit={true}
          />
          {loadingFailed && <Text style={styles.errTxt}>{error}</Text>}

          <Button
            style={{ marginTop: 45 }}
            text={loading ? "LOADING..." : "SIGN UP"}
            disabled={loading}
            onPress={onRegisterHandler}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

RegisterScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    margin: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center"
  },
  headerTxt: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 0.33,
    textAlign: "center"
  },
  formContainer: {
    flex: 1,
    marginTop: 40
  },
  errTxt: {
    color: Colors.red,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center"
  }
});

export default inject("registerStore")(observer(RegisterScreen));

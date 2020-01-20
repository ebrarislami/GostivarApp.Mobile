import React, { useRef } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import { NavigationParams } from "react-navigation";
import { inject, observer } from "mobx-react";
import { IRegisterStore } from "../../../stores/RegisterStore";
import { Button, BackButton, TextInput } from "@components";

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
    <View style={{ flex: 1, backgroundColor: "#F8FAFB" }}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#F8FAFB" barStyle="dark-content" />
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
            inputStyle={[styles.input, { marginBottom: 25 }]}
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
            inputStyle={[styles.input, { marginBottom: 25 }]}
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
            inputStyle={[styles.input, { marginBottom: 25 }]}
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
            inputStyle={styles.input}
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
  signBtn: {
    backgroundColor: "#F7F9FC",
    borderRadius: 5,
    width: "100%",
    paddingVertical: 20,
    alignItems: "center"
  },
  validSignBtn: {
    backgroundColor: "#62B4AD"
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
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "white",
    borderRadius: 50,
    paddingLeft: 10,
    paddingVertical: 18,
    shadowColor: "rgba(0, 0, 0, .3)",
    shadowRadius: 5,
    shadowOpacity: 0.75,
    shadowOffset: { height: 2, width: 0 }
  },
  errTxt: {
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center"
  }
});

export default inject("registerStore")(observer(RegisterScreen));

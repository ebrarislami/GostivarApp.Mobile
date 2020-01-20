import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from "react-native";
import { NavigationParams } from "react-navigation";
import { inject, observer } from "mobx-react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { IRegisterStore } from "../../../stores/RegisterStore";
import { Button } from "@components";

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{ flex: 0.33 }}
            onPress={() => props.navigation.goBack()}
          >
            <FontAwesome5
              style={{ marginLeft: 8 }}
              size={20}
              color="black"
              name={"arrow-left"}
              solid
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              flex: 0.33,
              textAlign: "center"
            }}
          >
            SIGN UP
          </Text>
          <View style={{ flex: 0.33 }}></View>
        </View>
        <View style={{ flex: 1, marginTop: 40 }}>
          <TextInput
            value={user.firstName}
            onChangeText={value => onInputChange("firstName", value)}
            scrollEnabled={false}
            placeholderTextColor="#8F9BB3"
            placeholder="First Name"
            returnKeyType="next"
            onSubmitEditing={() => onFocusNextInput(lastNameInputRef)}
            blurOnSubmit={false}
            style={[styles.input, { marginBottom: 25 }]}
          />
          <TextInput
            ref={lastNameInputRef}
            value={user.lastName}
            onChangeText={value => onInputChange("lastName", value)}
            scrollEnabled={false}
            placeholderTextColor="#8F9BB3"
            placeholder="Last Name"
            returnKeyType="next"
            onSubmitEditing={() => onFocusNextInput(emailInputRef)}
            blurOnSubmit={false}
            style={[styles.input, { marginBottom: 25 }]}
          />
          <TextInput
            ref={emailInputRef}
            value={user.email}
            onChangeText={value => onInputChange("email", value)}
            scrollEnabled={false}
            placeholderTextColor="#8F9BB3"
            placeholder="Email"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => onFocusNextInput(passwordInputRef)}
            blurOnSubmit={false}
            style={[styles.input, { marginBottom: 25 }]}
          />
          <TextInput
            ref={passwordInputRef}
            value={user.password}
            onChangeText={value => onInputChange("password", value)}
            scrollEnabled={false}
            placeholderTextColor="#8F9BB3"
            placeholder="Password"
            autoCapitalize="none"
            returnKeyType="go"
            onSubmitEditing={onDoneEditing}
            secureTextEntry
            blurOnSubmit={true}
            style={styles.input}
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

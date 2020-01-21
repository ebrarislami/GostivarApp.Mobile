import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StyleSheet
} from "react-native";
import {
  NavigationParams,
  NavigationEventSubscription,
  SafeAreaView
} from "react-navigation";
import { inject, observer } from "mobx-react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ILoginStore } from "../../../stores/LoginStore";
import { Button, TextInput, Colors } from "@components";

export interface Props {
  navigation: NavigationParams;
  loginStore: ILoginStore;
}

interface State {}

const LoginScreen: React.SFC<Props> = (props: Props) => {
  let blurListener: NavigationEventSubscription;
  const passwordInputRef = useRef(null);
  const [isSignClicked, setSignClicked] = useState(false);
  const { error, loading, loadingFailed, email, password } = props.loginStore;

  useEffect(() => {
    blurListener = props.navigation.addListener("willBlur", () => {
      setSignClicked(false);
    });
    return () => {
      blurListener.remove();
    };
  }, []);

  const onLoginHandler = () => {
    const { login } = props.loginStore;
    setSignClicked(true);
    if (!(email && password)) return;
    login();
  };

  const onSignupClickHandler = () => {
    const { clear } = props.loginStore;
    clear();
    props.navigation.push("RegisterScreen");
  };

  const onEmailChange = (value: string) => {
    const { setEmail } = props.loginStore;
    setSignClicked(false);
    setEmail(value);
  };

  const onPasswordChange = (value: string) => {
    const { setPassword } = props.loginStore;
    setSignClicked(false);
    setPassword(value);
  };

  const onEndEmail = () => {
    passwordInputRef &&
      passwordInputRef.current &&
      passwordInputRef.current.focus();
  };

  const onEndPassword = () => {
    onLoginHandler();
  };

  const onGooglePressed = () => {};

  const onFacebookPress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.lightgray} barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.formContainer}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/logo.png")}
          />
          <TextInput
            value={email}
            onChangeText={onEmailChange}
            onSubmitEditing={onEndEmail}
            scrollEnabled={false}
            placeholder="Email"
            returnKeyType="next"
            autoCapitalize="none"
            blurOnSubmit={false}
            inputStyle={{
              borderColor:
                isSignClicked && !email ? Colors.red : Colors.transparent
            }}
            icon={
              <FontAwesome5 size={14} color={Colors.gray} name={"user"} solid />
            }
          />
          <TextInput
            ref={passwordInputRef}
            value={password}
            onChangeText={onPasswordChange}
            scrollEnabled={false}
            placeholder="Password"
            returnKeyType="go"
            autoCapitalize="none"
            onSubmitEditing={onEndPassword}
            blurOnSubmit={true}
            containerStyle={{ marginTop: 25 }}
            inputStyle={{
              borderColor:
                isSignClicked && !password ? Colors.red : Colors.transparent
            }}
            secureTextEntry
            icon={<FontAwesome5 size={14} color={Colors.gray} name={"lock"} />}
          />
          <TouchableOpacity
            onPress={() => props.navigation.push("ForgotPasswordScreen")}
          >
            <Text style={styles.forgotPasswordTxt}>Forgot password?</Text>
          </TouchableOpacity>
          {
            <Text
              style={[
                styles.errTxt,
                {
                  opacity: loadingFailed ? 1 : 0
                }
              ]}
            >
              {error}
            </Text>
          }
          <Button
            style={{ marginTop: 25 }}
            text={loading ? "LOADING..." : "SIGN IN"}
            disabled={loading}
            onPress={onLoginHandler}
          />
          <Text style={styles.orTxt}>Or</Text>
          <View style={styles.iconContainer}>
            <TouchableWithoutFeedback onPress={onGooglePressed}>
              <FontAwesome5
                style={{ marginRight: 25 }}
                size={22}
                color="#E44034"
                name={"google"}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onFacebookPress}>
              <FontAwesome5 size={22} color="#3B5998" name={"facebook"} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={onSignupClickHandler}>
          <Text style={styles.signUpTxt}>Don't have account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: "center",
    backgroundColor: Colors.lightgray
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20
  },
  formContainer: {
    flex: 1,
    marginTop: "10%"
  },
  orTxt: {
    color: Colors.gray,
    fontWeight: "bold",
    marginVertical: "4%",
    textAlign: "center"
  },
  iconContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  forgotPasswordTxt: {
    color: Colors.gray,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "right"
  },
  errTxt: {
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center"
  },
  signUpTxt: {
    color: Colors.gray,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default inject("loginStore")(observer(LoginScreen));

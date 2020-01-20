import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions
} from "react-native";
import {
  NavigationParams,
  NavigationEventSubscription,
  SafeAreaView
} from "react-navigation";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ILoginStore } from "../../../stores/LoginStore";
import { Button } from "@components";

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

  const { height, width } = Dimensions.get("window");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 16,
        justifyContent: "center",
        backgroundColor: "#F8FAFB"
      }}
    >
      <StatusBar backgroundColor="#F8FAFB" barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <FormContainer>
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginBottom: 20
            }}
            source={require("../../../assets/images/logo.png")}
          />
          <InputContainer>
            <IconContainer>
              <FontAwesome5 size={14} color="#8F9BB3" name={"user"} solid />
            </IconContainer>
            <Input
              value={email}
              onChangeText={(value: string) => onEmailChange(value)}
              scrollEnabled={false}
              onSubmitEditing={onEndEmail}
              placeholderTextColor="#8F9BB3"
              autoCapitalize="none"
              placeholder="Email"
              returnKeyType="next"
              blurOnSubmit={false}
              style={{
                borderColor: isSignClicked && !email ? "red" : "transparent"
              }}
            />
          </InputContainer>
          <InputContainer style={{ marginTop: 25 }}>
            <IconContainer>
              <FontAwesome5 size={14} color="#8F9BB3" name={"lock"} />
            </IconContainer>
            <Input
              ref={passwordInputRef}
              value={password}
              onChangeText={(value: string) => onPasswordChange(value)}
              scrollEnabled={false}
              placeholderTextColor="#8F9BB3"
              autoCapitalize="none"
              returnKeyType="go"
              placeholder="Password"
              onSubmitEditing={onEndPassword}
              blurOnSubmit={true}
              style={{
                borderColor: isSignClicked && !password ? "red" : "transparent"
              }}
              secureTextEntry
            />
          </InputContainer>
          <TouchableOpacity
            onPress={() => props.navigation.push("ForgotPasswordScreen")}
          >
            <Text
              style={{
                color: "#8F9BB3",
                fontWeight: "bold",
                marginTop: 15,
                textAlign: "right"
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
          {
            <Text
              style={{
                opacity: loadingFailed ? 1 : 0,
                color: "red",
                fontWeight: "bold",
                marginTop: 10,
                textAlign: "center"
              }}
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
          <Text
            style={{
              color: "#8F9BB3",
              fontWeight: "bold",
              marginVertical: "4%",
              textAlign: "center"
            }}
          >
            Or
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
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
        </FormContainer>
      </TouchableWithoutFeedback>
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={onSignupClickHandler}>
          <SignUpText>Don't have account? Sign Up</SignUpText>
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

const FormContainer = styled.View`
  flex: 1;
  margin-top: 10%;
`;

const InputContainer = styled.View`
  position: relative;
`;

const IconContainer = styled.View`
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 15px;
`;

const Input = styled.TextInput`
  border-width: 1;
  border-color: transparent;
  background-color: white;
  border-radius: 50px;
  padding-left: 40px;
  padding-top: 18px;
  padding-bottom: 18px;
  shadow-opacity: 0.75;
  shadow-radius: 5;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const SignUpText = styled.Text`
  color: #8f9bb3;
  font-weight: bold;
  text-align: center;
`;

export default inject("loginStore")(observer(LoginScreen));

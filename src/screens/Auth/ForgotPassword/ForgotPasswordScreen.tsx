import React, { useEffect, useState } from "react";
import {
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { IForgotPasswordStore } from "../../../stores/ForgotPasswordStore";
import {
  NavigationParams,
  NavigationEventSubscription
} from "react-navigation";
import { inject, observer } from "mobx-react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Modal from "react-native-modal";
import styled from "styled-components";
import LottieView from "lottie-react-native";
import { Button } from "@components";

export interface Props {
  navigation: NavigationParams;
  forgotPasswordStore: IForgotPasswordStore;
}

const ForgotPasswordScreen: React.SFC<Props> = (props: Props) => {
  const {
    email,
    loading,
    loadingFailed,
    error,
    setEmail,
    forgotPassword,
    success,
    setSuccess
  } = props.forgotPasswordStore;
  let blurListener: NavigationEventSubscription;
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    const { success } = props.forgotPasswordStore;
    if (success) {
      onSuccessHandler();
    }
  }, [props.forgotPasswordStore.success]);

  useEffect(() => {
    blurListener = props.navigation.addListener("willBlur", () => {
      props.forgotPasswordStore.clear();
      setClicked(false);
    });
    return () => {
      blurListener.remove();
    };
  }, []);

  const onForgotPasswordHandler = () => {
    setClicked(true);
    if (!props.forgotPasswordStore.email) return;
    props.forgotPasswordStore.forgotPassword();
  };

  const onEndEditing = () => {
    onForgotPasswordHandler();
  };

  const onSuccessHandler = () => {
    const { setSuccess } = props.forgotPasswordStore;
    setClicked(false);
    Keyboard.dismiss();
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
    setTimeout(() => {
      props.navigation.goBack();
    }, 3000);
  };

  return (
    <Container>
      <StatusBar backgroundColor="#F8FAFB" barStyle="dark-content" />
      <SafeAreaView
        style={{ flex: 1, justifyContent: "flex-start", margin: 16 }}
      >
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
              flex: 1,
              textAlign: "center"
            }}
          >
            FORGOT PASSWORD
          </Text>
          <View style={{ flex: 0.33 }} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.4 }} />
            <View style={styles.container}>
              <InputContainer>
                <IconContainer>
                  <FontAwesome5 size={14} color="#8F9BB3" name={"user"} solid />
                </IconContainer>
                <Input
                  autoFocus
                  value={email}
                  onChangeText={(value: string) => setEmail(value)}
                  scrollEnabled={false}
                  onSubmitEditing={onEndEditing}
                  placeholderTextColor="#8F9BB3"
                  autoCapitalize="none"
                  placeholder="Email"
                  returnKeyType="go"
                  blurOnSubmit={false}
                  style={{
                    borderColor: isClicked && !email ? "red" : "transparent"
                  }}
                />
              </InputContainer>
              <Button
                style={{ marginTop: 40 }}
                text={loading ? "LOADING..." : "SEND"}
                disabled={loading}
                onPress={onForgotPasswordHandler}
              />
              <Text
                style={{
                  opacity: loadingFailed ? 1 : 0,
                  color: "red",
                  fontWeight: "bold",
                  marginTop: 15,
                  textAlign: "center"
                }}
              >
                {error}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <Modal
          isVisible={success}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <View style={styles.content}>
            <LottieView
              style={{ width: 120, height: 120 }}
              source={require("../../../assets/images/success.json")}
              loop={false}
              autoPlay
            />
            <Text
              style={{
                textAlign: "center",
                color: "#59B189",
                fontWeight: "bold",
                fontSize: 16
              }}
            >
              Email Sent
            </Text>
          </View>
        </Modal>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: "transparent",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});

ForgotPasswordScreen.navigationOptions = () => {
  return {
    header: null
  };
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
// });

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: #f8fafb;
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
`;

export default inject("forgotPasswordStore")(observer(ForgotPasswordScreen));

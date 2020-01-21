import React, { useEffect, useState } from "react";
import {
  Text,
  StatusBar,
  View,
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
import {
  Button,
  TextInput,
  BackButton,
  SuccessModal,
  Colors
} from "@components";

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.lightgray} barStyle="dark-content" />
        <View style={styles.header}>
          <BackButton
            style={{ flex: 0.33 }}
            onPress={() => props.navigation.goBack()}
          />
          <Text style={styles.headerTxt}>FORGOT PASSWORD</Text>
          <View style={{ flex: 0.33 }} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.4 }} />
            <View style={styles.inputContainer}>
              <TextInput
                autoFocus
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={onEndEditing}
                scrollEnabled={false}
                placeholder="Email"
                returnKeyType="go"
                autoCapitalize="none"
                blurOnSubmit={false}
                inputStyle={{
                  borderColor:
                    isClicked && !email ? Colors.red : Colors.transparent
                }}
                icon={
                  <FontAwesome5
                    size={14}
                    color={Colors.gray}
                    name={"user"}
                    solid
                  />
                }
              />
              <Button
                style={{ marginTop: 40 }}
                text={loading ? "LOADING..." : "SEND"}
                disabled={loading}
                onPress={onForgotPasswordHandler}
              />
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
            </View>
          </View>
        </TouchableWithoutFeedback>

        <SuccessModal visible={success} text="Email Sent" />
      </View>
    </SafeAreaView>
  );
};

ForgotPasswordScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.lightgray
  },
  container: {
    flex: 1,
    marginHorizontal: 16
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
    flex: 1,
    textAlign: "center"
  },
  inputContainer: {
    flex: 1
  },
  content: {
    backgroundColor: "transparent",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: Colors.black01
  },
  errTxt: {
    color: Colors.red,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center"
  }
});

export default inject("forgotPasswordStore")(observer(ForgotPasswordScreen));

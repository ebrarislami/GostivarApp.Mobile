import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Picker,
  TouchableHighlight
} from "react-native";
import { inject, observer } from "mobx-react";
import { NavigationParams, SafeAreaView, ScrollView } from "react-navigation";
import { IProfileStore } from "../../stores/ProfileStore";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Colors, Button, TextInput } from "@components";
import NotificationTags from "../../@components/NotificationTags";

export interface Props {
  navigation: NavigationParams;
  profileStore: IProfileStore;
}

const ProfileScreen: React.FunctionComponent<Props> = (props: Props) => {
  const {
    loading,
    loadingFailed,
    error,
    selectAppLanguage,
    selectProfileDisplayType,
    profileDisplayType,
    appLanguage,
    enabledNotifications,
    textInputs,
    toggleNotification,
    enableAllNotifications,
    isAllNotificationsEnabled
  } = props.profileStore;

  let nameInputRef = useRef(null);
  let surnameInputRef = useRef(null);
  let usernameInputRef = useRef(null);

  const onUpdateHandler = () => {
    const { update } = props.profileStore;
    update();
  };

  const onInputChange = (key: string, value: any) => {
    const { updateTextInputs } = props.profileStore;
    updateTextInputs(key, value);
  };

  const onDoneEditing = () => {
    onUpdateHandler();
  };

  const onFocusNextInput = (ref: any) => {
    ref && ref.current.focus();
  };

  useEffect(() => {
    props.profileStore.loadProfile();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.lightgray }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={{ marginVertical: 15 }}>
        <NotificationTags
          notifications={enabledNotifications}
          isAllNotificationsEnabled={isAllNotificationsEnabled}
          onPress={toggleNotification}
          onEnableAll={enableAllNotifications}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text>App language: </Text>
          <Picker
            style={[styles.picker]}
            selectedValue={appLanguage}
            onValueChange={selectAppLanguage}
          >
            <Picker.Item label="Turkish" value="TR-tr" />
            <Picker.Item label="English" value="EN-us" />
            <Picker.Item label="Albanian" value="AL-al" />
            <Picker.Item label="Macedonian" value="MK-mk" />
          </Picker>
          <Text>Profile display as: </Text>
          <Picker
            style={[styles.picker]}
            selectedValue={profileDisplayType}
            onValueChange={selectProfileDisplayType}
          >
            <Picker.Item label="Username" value="username" />
            <Picker.Item label="Name & Surname" value="name_surname" />
          </Picker>
          <TextInput
            value={textInputs.firstName}
            onChangeText={value => onInputChange("firstName", value)}
            placeholder="Name"
            returnKeyType="next"
            onSubmitEditing={() => onFocusNextInput(surnameInputRef)}
            blurOnSubmit={false}
            inputStyle={{ marginBottom: 25 }}
          />
          <TextInput
            ref={surnameInputRef}
            value={textInputs.lastName}
            onChangeText={value => onInputChange("lastName", value)}
            placeholder="Surname"
            returnKeyType="next"
            onSubmitEditing={() => onFocusNextInput(usernameInputRef)}
            blurOnSubmit={false}
            inputStyle={{ marginBottom: 25 }}
          />
          <TextInput
            ref={usernameInputRef}
            value={textInputs.username}
            onChangeText={value => onInputChange("username", value)}
            placeholder="Username"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
            inputStyle={{ marginBottom: 25 }}
          />
          {loadingFailed && <Text style={styles.errTxt}>{error}</Text>}
          <Button
            style={{ marginTop: 30 }}
            text={loading ? "LOADING..." : "UPDATE PROFILE"}
            disabled={loading}
            onPress={onUpdateHandler}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

ProfileScreen.navigationOptions = () => {
  return {
    title: "Profile Settings"
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 16,
    marginRight: 16
  },
  picker: {
    marginTop: 10,
    marginBottom: 10
  },
  errTxt: {
    color: Colors.red,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center"
  },
  notificationTag: {
    marginRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    paddingLeft: 12,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 6,
    color: Colors.white
  },
  blueBackground: {
    backgroundColor: Colors.primary
  },
  disabledStyle: {
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.transparent,
    color: Colors.primary
  }
});

export default inject("profileStore")(observer(ProfileScreen));

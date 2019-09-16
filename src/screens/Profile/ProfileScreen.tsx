import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Button, StatusBar, TouchableOpacity, Text, TextInput, Picker, TouchableHighlight } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationParams, SafeAreaView, ScrollView } from 'react-navigation';
import { IProfileStore } from '../../stores/ProfileStore';
import LinearGradient from 'react-native-linear-gradient';

export interface Props {
  navigation: NavigationParams;
  profileStore: IProfileStore;
}

interface State {

}

const ProfileScreen: React.FunctionComponent<Props> = (props: Props) => {

  const { loading,
    loadingFailed,
    error,
    selectAppLanguage,
    selectProfileDisplayType,
    profileDisplayType,
    appLanguage,
    enabledNotifications,
    textInputs,
    toggleNotification } = props.profileStore;

  let nameInputRef = useRef(null);
  let surnameInputRef = useRef(null);
  let usernameInputRef = useRef(null);

  const onUpdateHandler = () => {
    const { update } = props.profileStore;
    update();
  }

  const onInputChange = (key: string, value: any) => {
    const { updateTextInputs } = props.profileStore;
    updateTextInputs(key, value);
  }

  const onDoneEditing = () => {
    onUpdateHandler();
  }

  const onFocusNextInput = (ref: any) => {
    ref && ref.current.focus();
  }

  useEffect(() => {
    props.profileStore.loadProfile();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFB' }}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <View style={{ height: 60 }} >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {enabledNotifications.map((notification, index) => {
              return (
                <TouchableHighlight key={notification.id} style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => toggleNotification(index)}>
                  <View>
                    <Text style={[styles.notificationTag, notification.enabled ? styles.blueBackground : styles.redBackground]}>{notification.name}</Text>
                  </View>
                </TouchableHighlight>
              )
            })}
          </ScrollView>
        </View>
        <View style={{ flex: 1, marginTop: 40 }}>
          <Picker style={[styles.picker]} selectedValue={appLanguage} onValueChange={selectAppLanguage}>
            <Picker.Item label="Turkish" value="TR-tr" />
            <Picker.Item label="English" value="EN-us" />
            <Picker.Item label="Albanian" value="AL-al" />
            <Picker.Item label="Macedonian" value="MK-mk" />
          </Picker>
          <Text>Profile display as: </Text>
          <Picker style={[styles.picker]} selectedValue={profileDisplayType} onValueChange={selectProfileDisplayType}>
            <Picker.Item label="Username" value="username" />
            <Picker.Item label="Name & Surname" value="name_surname" />
          </Picker>
          <TextInput
            value={textInputs.firstName}
            onChangeText={(value) => onInputChange('firstName', value)}
            scrollEnabled={false}
            placeholderTextColor='#8F9BB3'
            placeholder='Name'
            returnKeyType='next'
            onSubmitEditing={() => onFocusNextInput(surnameInputRef)}
            blurOnSubmit={false}
            style={[styles.input, { marginBottom: 25 }]}
          />
          <TextInput
            ref={surnameInputRef}
            value={textInputs.lastName}
            onChangeText={(value) => onInputChange('lastName', value)}
            scrollEnabled={false}
            placeholderTextColor='#8F9BB3'
            placeholder='Surname'
            returnKeyType='next'
            onSubmitEditing={() => onFocusNextInput(usernameInputRef)}
            blurOnSubmit={false}
            style={[styles.input, { marginBottom: 25 }]}
          />
          <TextInput
            ref={usernameInputRef}
            value={textInputs.username}
            onChangeText={(value) => onInputChange('username', value)}
            scrollEnabled={false}
            placeholderTextColor='#8F9BB3'
            placeholder='Username'
            autoCapitalize='none'
            returnKeyType='next'
            blurOnSubmit={false}
            style={[styles.input, { marginBottom: 25 }]}
          />
          {
            loadingFailed && <Text style={styles.errTxt}>{error}</Text>
          }

          <LinearGradient
            style={{ elevation: 3, shadowOpacity: 0.75, shadowRadius: 5, shadowColor: 'rgba(0, 0, 0, .3)', shadowOffset: { height: 3, width: 0 }, width: '100%', borderRadius: 50, borderWidth: 1, paddingVertical: 18, borderColor: 'transparent', alignItems: 'center', marginTop: 45 }}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#41CBEA', '#2A83DB']}>
            <TouchableOpacity
              style={{ width: '100%', alignItems: 'center' }}
              disabled={loading}
              onPress={onUpdateHandler}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{loading ? 'LOADING...' : 'UPDATE PROFILE'}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </View>
  )
}

ProfileScreen.navigationOptions = () => {
  return {
    title: 'Profile Settings'
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    margin: 16,
  },
  signBtn: {
    backgroundColor: '#F7F9FC',
    borderRadius: 5,
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center'
  },
  validSignBtn: {
    backgroundColor: '#62B4AD',
  },
  picker: {
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingLeft: 10,
    paddingVertical: 18,
    shadowColor: 'rgba(0, 0, 0, .3)',
    shadowRadius: 5,
    shadowOpacity: 0.75,
    shadowOffset: { height: 2, width: 0 }
  },
  errTxt: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center'
  },
  notificationTag: {
    marginRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    paddingLeft: 12,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    color: 'white'
  },
  blueBackground: {
    backgroundColor: 'blue',
  },
  redBackground: {
    backgroundColor: 'red'
  }
});

export default inject("profileStore")(observer(ProfileScreen));

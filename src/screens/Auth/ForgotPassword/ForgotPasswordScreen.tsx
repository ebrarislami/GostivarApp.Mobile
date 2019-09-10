import React, { useEffect } from "react";
import { Text, StatusBar, TouchableOpacity, View, TextInput, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { IForgotPasswordStore } from "../../../stores/ForgotPasswordStore";
import { NavigationParams } from "react-navigation";
import { inject, observer } from "mobx-react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';

export interface Props {
    navigation: NavigationParams;
    forgotPasswordStore: IForgotPasswordStore;
}

const ForgotPasswordScreen: React.SFC<Props> = (props: Props) => {
    const { email, loading, loadingFailed, error, setEmail, forgotPassword, success, setSuccess } = props.forgotPasswordStore;

    useEffect(() => {
        const { success } = props.forgotPasswordStore;
        if (success) {
            onSuccessHandler();
        }
    }, [props.forgotPasswordStore.success]);
    

    const onEndEditing = () => {
        props.forgotPasswordStore.forgotPassword();
    }

    const onSuccessHandler = () => {
        const { setSuccess, clear } = props.forgotPasswordStore;
        clear();
        Keyboard.dismiss();
        setTimeout(() => {
            setSuccess(false);
        }, 2500);
        setTimeout(() => {
            props.navigation.goBack();
        }, 3000);
    }

    return (
        <Container>
            <StatusBar backgroundColor="#F8FAFB" barStyle="dark-content" />
            <SafeAreaView style={{flex: 1, justifyContent: 'flex-start', margin: 16}}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <FontAwesome5 style={{marginLeft: 8, marginTop: 10}} size={20} color='black' name={'arrow-left'} solid/>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 0.4}}/>
                        <View style={styles.container}>
                            <InputContainer>
                                <IconContainer>
                                    <FontAwesome5 size={14} color='#8F9BB3' name={'user'} solid/>
                                </IconContainer>
                                <Input
                                    value={email}
                                    onChangeText={(value: string) => setEmail(value)}
                                    scrollEnabled={false}
                                    onSubmitEditing={onEndEditing}
                                    placeholderTextColor='#8F9BB3'
                                    autoCapitalize='none'
                                    placeholder='Email'
                                    returnKeyType='go'
                                    blurOnSubmit={false}
                                />
                            </InputContainer>
                            <LinearGradient
                                style={{elevation: 3, shadowOpacity: 0.75, shadowRadius: 5, shadowColor: 'rgba(0, 0, 0, .3)', shadowOffset: {height: 3, width: 0}, width: '100%', borderRadius: 50, borderWidth: 1, paddingVertical: 18, borderColor: 'transparent', alignItems: 'center', marginTop: 40}}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                colors={['#41CBEA', '#2A83DB']}>
                                <TouchableOpacity
                                    style={{width: '100%', alignItems: 'center'}}
                                    disabled={loading}
                                    onPress={forgotPassword}
                                >
                                    <Text style={{color: 'white', fontWeight: 'bold'}}>{loading ? 'LOADING...' : 'SEND'}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <Text style={{ opacity: loadingFailed ? 1 : 0, color: 'red', fontWeight: 'bold', marginTop: 15, textAlign: 'center' }}>{error}</Text>
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
                            style={{width: 120, height: 120}}
                            source={require('../../../assets/images/success.json')}
                            loop={false}
                            autoPlay
                        />
                        <Text style={{textAlign: 'center', color: '#59B189', fontWeight: 'bold', fontSize: 16}}>Email Sent</Text>
                    </View>
                </Modal>

            </SafeAreaView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        backgroundColor: 'transparent',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});

ForgotPasswordScreen.navigationOptions = () => {
    return {
      header: null
    }
};

const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    background-color: #F8FAFB;
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
  shadow-color: rgba(0, 0, 0, .2);
  shadow-offset: 0px 2px;
`;

export default inject("forgotPasswordStore")(observer(ForgotPasswordScreen));

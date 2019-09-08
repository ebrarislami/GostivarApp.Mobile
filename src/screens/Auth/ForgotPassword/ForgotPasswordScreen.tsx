import React, { ComponentProps } from "react";
import { Text, Button, TouchableOpacity, View, TextInput, StyleSheet } from "react-native";
import { IForgotPasswordStore } from "../../../stores/ForgotPasswordStore";
import { NavigationParams } from "react-navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { inject, observer } from "mobx-react";


export interface Props {
    navigation: NavigationParams;
    forgotPasswordStore: IForgotPasswordStore;
}


class ForgotPasswordScreen extends React.Component<Props> {

    public render(): React.ReactNode {
        const { email, loading, loadingFailed, error } = this.props.forgotPasswordStore;

        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <TextInput
                        value={email}
                        onChangeText={(value: any) => this.props.forgotPasswordStore.setEmail(value)}
                        scrollEnabled={false}
                        placeholderTextColor='#8F9BB3'
                        placeholder='Email'
                        style={{
                            borderWidth: 1,
                            borderColor: '#8F9BB3',
                            backgroundColor: '#F7F9FC',
                            borderRadius: 5,
                            paddingLeft: 10
                        }}
                    />
                    {
                        loadingFailed && <Text style={{ color: 'red', fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>{error}</Text>
                    }
                </View>
                <View style={{ justifyContent: 'center', marginBottom: 8 }}>
                    <TouchableOpacity
                        onPress={this.props.forgotPasswordStore.forgotPassword}
                        style={{
                            backgroundColor: '#F7F9FC',
                            borderRadius: 5,
                            width: '100%',
                            paddingVertical: 20,
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: '#C6CFE0', fontWeight: 'bold' }}>{loading ? 'LOADING...' : 'SEND'}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginVertical: 16,
        marginHorizontal: 16,
        marginTop: 40
    }
});

export default inject("forgotPasswordStore")(observer(ForgotPasswordScreen));

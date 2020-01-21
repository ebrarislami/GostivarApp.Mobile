import React, { forwardRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Colors } from "@components";

export interface Props {
  value: string;
  placeholder: string;
  inputStyle?: Object;
  containerStyle?: Object;
  icon?: any;
  onSubmitEditing: () => void;
  onChangeText: (value: string) => void;
}

const AppTextInput = forwardRef<any, Props>((props, ref) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.icon && <View style={styles.iconContainer}>{props.icon}</View>}
      <TextInput
        {...props}
        value={props.value}
        onChangeText={(value: string) => props.onChangeText(value)}
        onSubmitEditing={props.onSubmitEditing}
        placeholderTextColor={Colors.gray}
        placeholder={props.placeholder}
        style={[
          styles.input,
          props.inputStyle,
          !props.icon && styles.iconlessInput
        ]}
        ref={ref}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  iconContainer: {
    position: "absolute",
    zIndex: 1,
    top: 20,
    left: 15
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.transparent,
    backgroundColor: Colors.white,
    borderRadius: 50,
    paddingLeft: 40,
    paddingTop: 18,
    paddingBottom: 18,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: Colors.black02,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  iconlessInput: {
    paddingLeft: 20
  }
});

export default AppTextInput;

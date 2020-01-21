import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "@components";

export interface Props {
  text: string;
  disabled: boolean;
  style?: Object;
  colors?: string[];
  onPress: () => void;
}

const Button: React.SFC<Props> = (props: Props) => {
  return (
    <LinearGradient
      style={[styles.buttonGradient, props.style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={props.colors || [Colors.primary, Colors.secondary]}
    >
      <TouchableOpacity
        style={styles.touchable}
        disabled={props.disabled}
        onPress={props.onPress}
      >
        <Text style={styles.text}>{props.text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonGradient: {
    width: "100%",
    borderRadius: 50,
    borderWidth: 1,
    paddingVertical: 18,
    borderColor: Colors.transparent,
    alignItems: "center"
  },
  touchable: {
    width: "100%",
    alignItems: "center"
  },
  text: {
    color: Colors.white,
    fontWeight: "bold"
  }
});

export default Button;

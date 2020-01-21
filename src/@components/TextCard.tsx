import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Colors } from "@components";

export interface Props {
  style?: Object;
  value: string;
  onChangeText: () => void;
}

const TextCard: React.SFC<Props> = (props: Props) => {
  return (
    <View style={styles.textareaView}>
      <TextInput
        onChangeText={props.onChangeText}
        autoCompleteType={"off"}
        value={props.value}
        autoCorrect={false}
        multiline
        blurOnSubmit
        returnKeyType="done"
        allowFontScaling
        maxLength={100}
        style={[styles.textareaInput, props.style]}
        placeholder="Enter your text here"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textareaView: {
    width: "100%",
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 22,
    color: Colors.black,
    backgroundColor: Colors.white,
    shadowOpacity: 0.75,
    shadowRadius: 7,
    shadowColor: Colors.black02,
    shadowOffset: { width: 2, height: 1 },
    elevation: 2,
    minHeight: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  textareaInput: {
    fontSize: 18,
    width: "100%",
    textAlign: "center"
  }
});

export default TextCard;

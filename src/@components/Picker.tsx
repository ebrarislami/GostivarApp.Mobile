import React from "react";
import { View, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RNPickerSelect from "react-native-picker-select";

export interface Props {
  items: [];
  onValueChange: () => void;
}

const Picker: React.SFC<Props> = (props: Props) => {
  return (
    <View style={styles.picker}>
      <RNPickerSelect
        placeholder={{
          label: "Select a category",
          value: null
        }}
        style={{
          inputIOS: {
            width: "100%"
          },
          inputAndroid: {
            width: "100%"
          },
          iconContainer: {
            top: 3,
            right: -10
          }
        }}
        onValueChange={props.onValueChange}
        items={[...props.items]}
        Icon={() => {
          return <FontAwesome5 name={"arrow-down"} size={14} color={"black"} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginBottom: 18,
    color: "black",
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowRadius: 7,
    shadowColor: "rgba(0, 0, 0, .2)",
    shadowOffset: { width: 2, height: 1 },
    elevation: 2,
    paddingRight: 30
  }
});

export default Picker;

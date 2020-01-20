import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export interface Props {
  style?: Object;
  onPress: () => void;
}

const BackButton: React.SFC<Props> = (props: Props) => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <FontAwesome5
        style={styles.icon}
        size={20}
        color="black"
        name={"arrow-left"}
        solid
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 8
  }
});

export default BackButton;

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import { Colors } from "@components";

export interface Props {
  visible: boolean;
  text: string;
}

const SuccessModal: React.SFC<Props> = (props: Props) => {
  return (
    <Modal
      isVisible={props.visible}
      backdropColor={Colors.backdrop}
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
          style={styles.img}
          source={require("../assets/images/success.json")}
          loop={false}
          autoPlay
        />
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.transparent,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: Colors.black01
  },
  img: {
    width: 120,
    height: 120
  },
  text: {
    textAlign: "center",
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 16
  }
});

export default SuccessModal;

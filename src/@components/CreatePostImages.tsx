import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  View
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Image as ImageDTO } from "../stores/CreateStore";

export interface Props {
  images: ImageDTO[];
  onRemoveImage: (id: string) => void;
}

const CreatePostImages: React.SFC<Props> = (props: Props) => {
  return (
    <>
      {props.images.map((image: ImageDTO) => {
        return (
          <TouchableOpacity key={image.id}>
            <View style={styles.imageView}>
              {image.path ? (
                <TouchableOpacity
                  style={styles.removeImage}
                  onPress={() => props.onRemoveImage(image.id)}
                >
                  <FontAwesome5 name={"times"} size={16} color={"white"} />
                </TouchableOpacity>
              ) : (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#41CBEA" />
                </View>
              )}
              <Image style={styles.image} source={{ uri: image.uri }} />
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    borderRadius: 4,
    position: "absolute",
    width: 84,
    height: 84,
    left: -1,
    top: -1,
    opacity: 0.5,
    backgroundColor: "black",
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center"
  },
  imageView: {
    width: 84,
    height: 84,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    marginRight: 16
  },
  image: {
    width: 84,
    height: 84,
    resizeMode: "cover",
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 4
  },
  removeImage: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: "#41CBEA",
    right: -14,
    top: -10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100
  }
});

export default CreatePostImages;

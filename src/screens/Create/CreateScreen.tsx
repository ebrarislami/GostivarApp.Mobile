import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Switch } from "react-native";
import { inject, observer } from "mobx-react";
import { NavigationParams, SafeAreaView } from "react-navigation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ImagePicker from "react-native-image-picker";
import {
  Button,
  Picker,
  CreatePostImages,
  TextCard,
  Colors
} from "@components";
import { ICreateStore } from "../../stores/CreateStore";

export interface Props {
  createStore: ICreateStore;
  navigation: NavigationParams;
}

const MAX_FONT_SIZE = 24;

class CreateScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    images: [],
    fontSize: MAX_FONT_SIZE
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create",
      headerLeft: <View />,
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name={"times"} size={25} color={Colors.black} />
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.createStore.loadCategories();
  }

  componentWillUnmount() {
    this.props.createStore.resetCreatePost();
  }

  onSubmitHandler = () => {
    this.props.createStore.postCreatePost();
  };

  onRemoveImage = (id: string) => {
    this.props.createStore.removeImage(id);
  };

  onImagePickerOpen = () => {
    const imagesLength = this.state.images.length;
    if (imagesLength >= 10) return;
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, (response: any) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.onAddImage(source);
      }
    });
  };

  onAddImage = (source: any) => {
    const id = `${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.props.createStore.uploadImage(id, source.uri);
  };

  onCommentsHandler = () => {
    const isCommentsEnabled = !this.props.createStore.createPost
      .isCommentsEnabled;
    this.props.createStore.updateCreatePost(
      "isCommentsEnabled",
      isCommentsEnabled
    );
  };

  onCategoryHandler = (category: number) => {
    this.props.createStore.updateCreatePost("categoryId", category);
  };

  onContentChangeHandler = (value: string) => {
    this.props.createStore.updateCreatePost("content", value);

    if (value.length < 10) {
      this.setState({ fontSize: MAX_FONT_SIZE });
    }
    if (value.length > 10) {
      this.setState({ fontSize: 22 });
    }

    if (value.length > 20) {
      this.setState({ fontSize: 20 });
    }

    if (value.length > 30) {
      this.setState({ fontSize: 18 });
    }

    if (value.length > 40) {
      this.setState({ fontSize: 16 });
    }

    if (value.length > 50) {
      this.setState({ fontSize: 14 });
    }

    if (value.length > 60) {
      this.setState({ fontSize: 12 });
    }
  };

  render() {
    const { fontSize } = this.state;
    const { createStore } = this.props;
    const { categories, createPost, isPublishDisabled } = createStore;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TextCard
            value={createPost.content}
            onChangeText={this.onContentChangeHandler}
          />

          <View style={styles.imagesContainer}>
            <CreatePostImages
              images={createPost.images}
              onRemoveImage={this.onRemoveImage}
            />
            <TouchableOpacity onPress={this.onImagePickerOpen}>
              <View style={styles.imageView}>
                <FontAwesome5 name={"plus"} size={25} color={Colors.gray} />
              </View>
            </TouchableOpacity>
          </View>

          <Picker onValueChange={this.onCategoryHandler} items={categories} />

          <View style={styles.commentEnabled}>
            <Text style={{ marginRight: 15 }}>Comments Enabled</Text>
            <Switch
              ios_backgroundColor={Colors.white}
              trackColor={{ false: Colors.gray, true: Colors.primary }}
              onValueChange={this.onCommentsHandler}
              value={createPost.isCommentsEnabled}
            />
          </View>
        </View>
        <Button
          colors={isPublishDisabled && [Colors.gray, Colors.gray]}
          text="PUBLISH"
          disabled={isPublishDisabled}
          onPress={this.onSubmitHandler}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    flex: 1,
    backgroundColor: Colors.lightgray
  },
  content: {
    alignItems: "center",
    flex: 1,
    width: "100%"
  },
  commentEnabled: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18
  },
  imagesContainer: {
    position: "relative",
    flexDirection: "row",
    marginBottom: 18,
    justifyContent: "flex-start",
    width: "100%",
    flexWrap: "wrap"
  },
  imageView: {
    width: 84,
    height: 84,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    marginRight: 16
  }
});

export default inject("createStore")(observer(CreateScreen));

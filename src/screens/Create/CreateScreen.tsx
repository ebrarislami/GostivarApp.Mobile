import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Switch, Image, TextInput, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationParams, SafeAreaView } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import { ICreateStore } from '../../stores/CreateStore';

export interface Props {
  createStore: ICreateStore;
  navigation: NavigationParams;
}

const MIN_FONT_SIZE = 10;
const MAX_FONT_SIZE = 24;
const INCREMENT = 2;

class CreateScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    images: [],
    fontSize: MAX_FONT_SIZE,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create',
      headerLeft: <View />,
      headerRight: (
          <TouchableOpacity style={{marginRight: 16}} onPress={() => navigation.goBack()}>
              <FontAwesome5 name={'times'} size={25} color={'black'} />
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
  }

  onRemoveImage = (id: string) => {
    this.props.createStore.removeImage(id);
  }

  onImagePickerOpen = () => {
    const imagesLength = this.state.images.length;
    if (imagesLength >= 10) return;
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response: any) => {    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.onAddImage(source);
      }
    });
  };

  onAddImage = (source: any) => {
    const id = `${Math.random().toString(36).substr(2, 9)}`;
    this.props.createStore.uploadImage(id, source.uri);
  };

  onCommentsHandler = () => {
    const isCommentsEnabled = !this.props.createStore.createPost.isCommentsEnabled;
    this.props.createStore.updateCreatePost('isCommentsEnabled', isCommentsEnabled);
  };

  onCategoryHandler = (category: number) => {
    this.props.createStore.updateCreatePost('categoryId', category);
  };

  onContentChangeHandler = (value: string) => {
    this.props.createStore.updateCreatePost('content', value);

    if (value.length < 10) {
      this.setState({fontSize: MAX_FONT_SIZE})
    }
    if (value.length > 10) {
      this.setState({fontSize: 22})
    }

    if (value.length > 20) {
      this.setState({fontSize: 20})
    }

    if (value.length > 30) {
      this.setState({fontSize: 18})
    }

    if (value.length > 40) {
      this.setState({fontSize: 16})
    }

    if (value.length > 50) {
      this.setState({fontSize: 14})
    }

    if (value.length > 60) {
      this.setState({fontSize: 12})
    }
  };

  render() {
    const { images, fontSize } = this.state;
    const { createStore } = this.props;
    const { categories, createPost, isPublishDisabled } = createStore;

    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.content}>

          <View style={styles.textareaView}>
            <TextInput
              onChangeText={this.onContentChangeHandler}
              autoCompleteType={'off'}
              value={createPost.content}
              autoCorrect={false}
              multiline
              blurOnSubmit
              returnKeyType="done"
              allowFontScaling
              maxLength={100}
              style={[styles.textareaInput, {fontSize}]}
              placeholder="Enter your text here"/>
          </View>

          <View style={styles.imagesContainer}>
            {
              createPost.images.map((image: any) => {
                return (
                  <TouchableOpacity key={image.id}>
                    <View style={styles.imageView}>
                      {
                      image.path ? (
                        <TouchableOpacity style={styles.removeImage} onPress={() => this.onRemoveImage(image.id)}>
                          <FontAwesome5 name={'times'} size={16} color={'white'} />
                        </TouchableOpacity>
                      ) : <View style={{borderRadius: 4, position: 'absolute', width: 84, height: 84, left: -1, top: -1, opacity: .5, backgroundColor: 'black', zIndex: 1000, alignItems: 'center', justifyContent: 'center'}}>
                                <ActivityIndicator size="small" color="#41CBEA" />
                      </View>
                      }
                      <Image style={styles.image} source={{uri: image.uri}} />
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            <TouchableOpacity onPress={this.onImagePickerOpen}>
              <View style={styles.imageView}>
                <FontAwesome5 name={'plus'} size={25} color={'lightgray'} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.picker}>
            <RNPickerSelect
              placeholder={{
                label: 'Select a category',
                value: null,
              }}
                onValueChange={this.onCategoryHandler}
                items={[...categories]}
            />
            <TouchableOpacity style={{position: 'absolute', right: 14, top: 14}} onPress={this.onImagePickerOpen}>
              <FontAwesome5 name={'arrow-down'} size={14} color={'black'} />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 18}}>
            <Text style={{marginRight: 15}}>Comments Enabled</Text>
            <Switch
                ios_backgroundColor="#FFFFFF"
                trackColor={{ false: '#E5E5E5', true: '#41CBEA' }}
                onValueChange={this.onCommentsHandler}
                value={createPost.isCommentsEnabled}
              />
          </View>
        </View>

      <View style={{width: '100%'}}>
        <LinearGradient
          style={{width: '100%', borderRadius: 50, borderWidth: 1, paddingVertical: 18, borderColor: 'transparent'}}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          colors={!isPublishDisabled ? ['#41CBEA', '#2A83DB'] : ['#8F9BB3', '#8F9BB3']}>
          <TouchableOpacity
            disabled={isPublishDisabled}
            style={{alignItems: 'center'}}
            onPress={this.onSubmitHandler}
          >
            <Text style={{color: 'white', fontWeight: 'bold'}}>PUBLISH</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    flex: 1,
    backgroundColor: '#F8FAFB'
  },
  content: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  textareaView: {
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 22,
    color: 'black',
    backgroundColor: 'white',
    shadowOpacity: 0.75,
    shadowRadius: 7,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOffset:{  width: 2,  height: 1 },
    elevation: 2,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textareaInput: {
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginBottom: 18,
    color: 'black',
    backgroundColor: 'white',
    shadowOpacity: 0.75,
    shadowRadius: 7,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOffset:{  width: 2,  height: 1 },
    elevation: 2,
    paddingRight: 30,
  },
  imagesContainer: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 18,
    justifyContent: 'flex-start',
    width: '100%',
    flexWrap: 'wrap'
  },
  imageView: {
    width: 84,
    height: 84,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 4,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    marginRight: 16
  },
  image: {
    width: 84,
    height: 84,
    resizeMode: 'cover',
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 4,
  },
  removeImage: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: '#41CBEA',
    right: -14,
    top: -10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  }
});

export default inject("createStore")(observer(CreateScreen));
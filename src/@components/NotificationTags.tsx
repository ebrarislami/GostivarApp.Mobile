import React from "react";
import {
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  View,
  Text
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Colors } from "@components";
import { PostCategory } from "../stores/ProfileStore";

export interface Props {
  notifications: PostCategory[];
  isAllNotificationsEnabled: boolean;
  onPress: (index: number) => void;
  onEnableAll: () => void;
}

const NotificationTags: React.SFC<Props> = (props: Props) => {
  const selectAllView = (
    <TouchableHighlight
      underlayColor={Colors.black}
      key={"ALL"}
      style={{ alignItems: "center", justifyContent: "center" }}
      onPress={props.onEnableAll}
    >
      <View>
        <FontAwesome5
          style={{ marginLeft: 8, marginRight: 8 }}
          size={20}
          color="green"
          name={"check-circle"}
          solid
        />
      </View>
    </TouchableHighlight>
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {props.isAllNotificationsEnabled ? null : selectAllView}
      {props.notifications.map(notification => {
        return (
          <TouchableHighlight
            underlayColor={Colors.transparent}
            key={notification.id}
            style={styles.touchable}
            onPress={() => props.onPress(notification.id)}
          >
            <View>
              <Text
                style={[
                  styles.notificationTag,
                  !notification.enabled && styles.disabledStyle
                ]}
              >
                {notification.name}
              </Text>
            </View>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  notificationTag: {
    marginRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    paddingLeft: 12,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 6,
    color: Colors.white,
    backgroundColor: Colors.primary
  },
  disabledStyle: {
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.transparent,
    color: Colors.primary
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2
  }
});

export default NotificationTags;

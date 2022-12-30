import React, { useContext, useEffect } from "react";
import { FlatList, SafeAreaView, View, Text } from "react-native";
import { FocusAwareStatusBar } from "../../Components/FocusAwareStatusBar";
import { ProfileItem } from "../../Components/ProfileItem";
import { THEME } from "../../theme";
import { styles } from "./styles";
import { Context as friendsContext } from "../../context/FriendsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { UserCircle } from "phosphor-react-native";

export function Friends() {
  const { profiles, getFriends } = useContext(friendsContext);

  const { profile, user } = useContext(AuthContext);
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={THEME.COLORS.BACKGROUND_800}
      />
      <View style={styles.heading}>
        <UserCircle color="white" size={48} weight="thin" />
        <Text style={styles.userNametext}>{user}</Text>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={styles.content}>
        <FlatList
          data={profiles}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => (
            <ProfileItem  friend={item} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

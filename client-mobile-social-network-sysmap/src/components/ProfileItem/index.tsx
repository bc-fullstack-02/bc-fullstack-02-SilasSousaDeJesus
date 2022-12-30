import { Chat, Heart, UserCircle, UserPlus } from "phosphor-react-native";
import React, { useContext, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Context as friendsContext } from "../../context/FriendsContext";
import { Context as authContext } from "../../context/AuthContext";
import { styles } from "./style";
import { IProfile } from "../../@types/reducer";
import { Button } from "../../Components/Button";

interface ProfileItemProps {
  friend: IProfile;
}

export function ProfileItem({ friend, navigation }: ProfileItemProps) {
  const { unfollowFriends, followFriends, getFriends } =
    useContext(friendsContext);
  const { profile } = useContext(authContext);
  async function handleFollowPress() {
    if (friend?.followers.includes(profile._id)) {
      (await unfollowFriends) &&
        unfollowFriends({
          profileCurrentId: profile._id,
          profileTargetId: friend._id,
        });

    } else {
      followFriends &&
        followFriends({
          profileCurrentId: profile._id,
          profileTargetId: friend._id,
        });
    }
  }

  return (
    <View style={styles.post}>
      <View style={styles.postHeading}>
        <UserCircle color="white" size={48} weight="thin" />
        <Text style={styles.postUserText}>{friend.name}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Chat size={24} color="white" weight="thin" />
          <Text style={styles.number}>{friend.following.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFollowPress}>
          {friend.followers.includes(profile._id) ? (
            <UserPlus size={24} color="red" weight="fill" />
          ) : (
            <UserPlus size={24} color="white" weight="thin" />
          )}
          <Text style={styles.number}>{friend.followers.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

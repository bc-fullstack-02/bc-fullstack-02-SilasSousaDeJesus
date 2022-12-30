import { Chat, Heart, UserCircle } from "phosphor-react-native";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Context as postContext } from "../../context/PostContext";
import { Context as authContext } from "../../context/AuthContext";
import { Post } from "../../../@types/post";
import * as SecureStore from "expo-secure-store";

import { styles } from "./style";

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  const { likePost, unlikePost } = useContext(postContext);
  const { profile } = useContext(authContext);

  function handleLikePress() {
    if (post.likes.includes(profile?._id)) {
      unlikePost && unlikePost({ currentProfileId: profile?._id, postTargetId: post._id });
    } else {
      likePost && likePost({ currentProfileId: profile?._id, postTargetId: post._id });
   
    }
  }
  return (
    <View style={styles.post}>
      <View style={styles.postHeading}>
        <UserCircle color="white" size={48} weight="thin" />
        <Text style={styles.postUserText}>{post.profile.name}</Text>
      </View>
      <View style={styles.contentBody}>
          <Text style={styles.contentText}>{post.title}</Text>
        </View>
      {post.image === "true" ? (
        <Image source={post.description} style={styles.image}></Image>
      ) : (
        <View style={styles.contentBody}>
          <Text style={styles.contentText}>{post.description}</Text>
        </View>
      )}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Chat size={24} color="white" weight="thin" />
          <Text style={styles.number}>{post.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLikePress}>
          {post.likes.includes(profile?._id) ? (
            <Heart size={24} color="red" weight="fill" />
          ) : (
            <Heart size={24} color="white" weight="thin" />
          )}

          <Text style={styles.number}>{post.likes.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

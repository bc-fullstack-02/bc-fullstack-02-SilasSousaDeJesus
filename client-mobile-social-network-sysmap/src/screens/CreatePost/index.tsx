import { UserCircle } from "phosphor-react-native";
import React, { useContext, useState } from "react";
import { Button, Text, View } from "react-native";

import { styles } from "./styles";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";
import { Spacer } from "../../Components/Spacer";
import { Input } from "../../Components/Input";
import { THEME } from "../../theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface CreatedProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export function CreatePost({ navigation }: CreatedProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user, profile } = useContext(AuthContext);
  const { createPost } = useContext(PostContext);

  async function CreatePost() {
    (await createPost) && createPost(profile?._id, { title, description });
    navigation.navigate("Home");
  }

  return (
    <View>
      <View style={styles.heading}>
        <UserCircle color="white" size={48} weight="thin" />
        <Text style={styles.userNametext}>{user}</Text>
      </View>
      <Spacer>
        <Input.Root>
          <Input.Input
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título do post"
            placeholderTextColor={THEME.COLORS.INPUT}
            autoCorrect
          ></Input.Input>
        </Input.Root>
      </Spacer>
      <Spacer>
        <Input.Root>
          <Input.Input
            value={description}
            onChangeText={setDescription}
            placeholder="Digite a descrição do post"
            placeholderTextColor={THEME.COLORS.INPUT}
            autoCorrect
          ></Input.Input>
        </Input.Root>
      </Spacer>
      <Spacer>
        <Button
          title="Postar"
          onPress={() => {
            CreatePost();
          }}
        />
      </Spacer>
    </View>
  );
}

import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Background } from "./src/Components/BackGround";
import Login from "./src/Screens/Login";
import { Loading } from "../parrot/src/Components/Loading";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { THEME } from "./src/theme";
import { SignUp } from "./src/Screens/SignUp";
import { House, User, UsersThree } from "phosphor-react-native";
import { Friends } from "./src/Screens/Friends";
import { Profile } from "./src/Screens/Profile";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import {
  Provider as PostProvider,
  Context as PostContext,
} from "./src/context/PostContext";
import {
  Provider as FriendsProvider,
  Context as FriendsContext,
} from "./src/context/FriendsContext";
import { useContext, useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { HomeNavigationScreen } from "./src/Screens/HomeNavigationScreen";

const myTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.COLORS.BACKGROUND_900,
  },
};

function App() {
  const { token, tryLocalLogin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalLogin && tryLocalLogin();
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <>
      {fontsLoaded ? (
        <NavigationContainer theme={myTheme}>
          {!token ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                statusBarStyle: "dark",
              }}
            >
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="register" component={SignUp} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  switch (route.name) {
                    case "HomeNavigation":
                      return <House size={size} color={color} />;
                    case "Friends":
                      return <UsersThree size={size} color={color} />;
                    case "Profile":
                      return <User size={size} color={color} />;
                  }
                },
                tabBarStyle: { backgroundColor: THEME.COLORS.BACKGROUND_800 },
                tabBarShowLabel: false,
                headerShown: false,
              })}
            >
              <Tab.Screen
                name="HomeNavigation"
                component={HomeNavigationScreen}
              />
              <Tab.Screen name="Friends" component={Friends} />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default () => {
  return (
    <AuthProvider>
      <FriendsProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </FriendsProvider>
    </AuthProvider>
  );
};

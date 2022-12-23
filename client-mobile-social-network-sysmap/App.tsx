import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./src/screens/Login";
import { Background } from "./src/components/BackGround";
import { Loading } from './src/components/Loading';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  return (
    <SafeAreaProvider>
    <Background>
      <Login />
    </Background>
  </SafeAreaProvider>
  );
}

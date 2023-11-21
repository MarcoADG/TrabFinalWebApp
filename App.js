import { NavigationContainer } from "@react-navigation/native";

import RoutesStack from "./src/routes/StackNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <RoutesStack />
    </NavigationContainer>
  );
}

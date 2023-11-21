import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/auth";
import RoutesStack from "./src/routes/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RoutesStack />
      </AuthProvider>
    </NavigationContainer>
  );
}

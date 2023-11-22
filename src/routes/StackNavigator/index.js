import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BemVindo from "../../pages/BemVindo";
import Login from "../../pages/Login";
import Routes from "../TabNavigator";
import Splash from "../../pages/Splash";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BemVindo"
        component={BemVindo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Routes"
        component={Routes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Gerenciamento from "../../pages/Gerenciamento";

import Ionicons from "react-native-vector-icons/Ionicons";
import Lista from "../../pages/Lista";
import Sobre from "../../pages/Sobre";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: "#363640",
        tabBarInactiveBackgroundColor: "#363640",
        tabBarActiveTintColor: "#1FC2D8",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 15 },
        headerStyle: { backgroundColor: "#363640" },
        headerTintColor: "white",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="game-controller" color={color} size={size} />
            );
          },
        }}
        name="Lista"
        component={Lista}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="settings" color={color} size={size} />;
          },
        }}
        name="Gerenciamento"
        component={Gerenciamento}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="people-sharp" color={color} size={size} />;
          },
        }}
        name="Sobre"
        component={Sobre}
      />
    </Tab.Navigator>
  );
}

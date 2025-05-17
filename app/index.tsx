import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { initDB } from "./db";
import BookedStackNavigator from "./screens/Booked/BookedStackNavigator";
import OwedStackNavigator from "./screens/Owed/OwedStackNavigator";
import ServicesStackNavigator from "./screens/Services/ServicesStackNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Services") {
            iconName = "construct-outline";
          } else if (route.name === "Owed") {
            iconName = "cash-outline";
          } else if (route.name === "Booked") {
            iconName = "calendar-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Services" component={ServicesStackNavigator} />
      <Tab.Screen name="Owed" component={OwedStackNavigator} />
      <Tab.Screen name="Booked" component={BookedStackNavigator} />
    </Tab.Navigator>
  );
}

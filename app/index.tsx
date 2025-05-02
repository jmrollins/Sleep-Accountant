import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackNavigator from "./screens/HomeStackNavigator";
import ScheduleStackNavigator from "./screens/ScheduleStackNavigator";
import StatsStackNavigator from "./screens/StatsStackNavigator";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
  
        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Schedule') {
          iconName = 'time-outline';
        } else if (route.name === 'Stats') {
          iconName = 'bar-chart-outline';
        }
  
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Schedule" component={ScheduleStackNavigator} />
    <Tab.Screen name="Stats" component={StatsStackNavigator} />
  </Tab.Navigator>
  );
}

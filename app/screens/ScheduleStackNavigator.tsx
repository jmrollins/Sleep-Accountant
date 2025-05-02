import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScheduleScreen from './ScheduleScreen';
import SettingsScreen from './SettingsScreen';


const Stack = createNativeStackNavigator();

export default function ScheduleStackNavigator({ navigation }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScheduleMain"
        component={ScheduleScreen}
        options={({ navigation }) => ({
          title: "Schedule",
          headerRight: () => (
            <Ionicons
              name="settings-outline"
              size={24}
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Settings")}
            />
          ),          
        })}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

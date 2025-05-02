import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsScreen from './SettingsScreen';
import StatsScreen from './StatsScreen';


const Stack = createNativeStackNavigator();

export default function SatsStackNavigator({ navigation }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StatsMain"
        component={StatsScreen}
        options={({ navigation }) => ({
          title: "Stats",
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

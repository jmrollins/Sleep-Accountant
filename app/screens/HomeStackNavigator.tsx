import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';


const Stack = createNativeStackNavigator();

export default function HomeStackNavigator({ navigation }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Home",
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

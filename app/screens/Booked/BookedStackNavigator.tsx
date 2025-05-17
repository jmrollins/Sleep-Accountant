import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsScreen from '../Settings/SettingsScreen';
import BookedScreen from './BookedScreen';


const Stack = createNativeStackNavigator();

export default function BookedStackNavigator({ navigation }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookedMain"
        component={BookedScreen}
        options={({ navigation }) => ({
          title: "Booked",
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

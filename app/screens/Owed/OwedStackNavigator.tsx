import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsScreen from '../Settings/SettingsScreen';
import OwedScreen from './OwedScreen';


const Stack = createNativeStackNavigator();

export default function OwedStackNavigator({ navigation }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OwedMain"
        component={OwedScreen}
        options={({ navigation }) => ({
          title: "Owed",
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

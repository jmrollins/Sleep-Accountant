// ServicesStackNavigator.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../Settings/SettingsScreen';
import { ServiceEntry } from '../types';
import AddServiceScreen from './AddServiceScreen';
import ServicesScreen from './ServicesScreen';

export type ServicesStackParamList = {
  ServicesMain: undefined;
  AddService: { onSave: (newService: ServiceEntry) => void };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<ServicesStackParamList>();

export default function ServicesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ServicesMain" component={ServicesScreen} options={{ title: "Services" }} />
      <Stack.Screen name="AddService" component={AddServiceScreen} options={{ title: "Add New Service" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

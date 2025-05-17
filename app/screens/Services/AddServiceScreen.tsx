import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
    ActionSheetIOS,
    Alert,
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { insertService } from "../../db";
import { ServicesStackParamList } from "./ServicesStackNavigator";

const serviceOptions = [
  "Mow",
  "Aeration",
  "Araetion/OverSeeding",
  "Cleanup",
  "Dethatching",
  "Irrigation Turn on",
  "Irrigation Blowout",
  "Irrigation Maintenence",
  "Mulch",
  "Bush Trimming",
  "Fertilize",
];

type Props = NativeStackScreenProps<ServicesStackParamList, "AddService">;

export default function AddServiceScreen({ navigation, route }: Props) {
  const { onSave } = route.params;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [service, setService] = useState(serviceOptions[0]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [price, setPrice] = useState("");
  const [paid, setPaid] = useState(false);
  const [notes, setNotes] = useState("");

  const showServiceSelector = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...serviceOptions, "Cancel"],
          cancelButtonIndex: serviceOptions.length,
        },
        (buttonIndex) => {
          if (buttonIndex !== serviceOptions.length) {
            setService(serviceOptions[buttonIndex]);
          }
        }
      );
    } else {
      Alert.alert("Select Service", "", serviceOptions.map((option) => ({
        text: option,
        onPress: () => setService(option),
      })));
    }
  };

  const handleSubmit = () => {
  insertService(
    name,
    address,
    service,
    date?.toLocaleDateString() || "",
    price,
    paid,
    notes,
    true 
  ).then(() => {
    navigation.goBack(); 
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} />

      <Text style={styles.label}>Service Type</Text>
      <TouchableOpacity onPress={showServiceSelector} style={styles.selector}>
        <Text>{service}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.selector}>
        <Text>{date ? date.toLocaleDateString() : "Pick a date"}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(selected) => {
          setDatePickerVisible(false);
          setDate(selected);
        }}
        onCancel={() => setDatePickerVisible(false)}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Paid</Text>
        <Switch value={paid} onValueChange={setPaid} />
      </View>

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Button title="Save Service" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: "bold", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  selector: {
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
});

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchServices } from "../../db";
import { ServiceEntry } from "../types";
import { ServicesStackParamList } from "./ServicesStackNavigator";

type Props = NativeStackScreenProps<ServicesStackParamList, "ServicesMain">;

export default function ServicesScreen({ navigation }: Props) {
  const [services, setServices] = useState<ServiceEntry[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices("completed");
        setServices(data);
      } catch (error) {
        console.error("Failed to load services", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", loadServices);
    return unsubscribe; // Reloads on screen focus
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id?.toString() || item.name + item.date}
        ListEmptyComponent={<Text>No services added yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name} — {item.service}</Text>
            <Text>{item.address}</Text>
            <Text>{item.date} • ${item.price} • {item.paid ? "Paid" : "Unpaid"}</Text>
            {item.notes ? <Text>📝 {item.notes}</Text> : null}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddService", {
          onSave: () => {} // not needed anymore; we're loading from DB
        })}
      >
        <Text style={styles.addButtonText}>＋ Add Service</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  title: { fontWeight: "bold", fontSize: 16 },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  addButtonText: { color: "white", fontWeight: "bold" },
});

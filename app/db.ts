import * as SQLite from "expo-sqlite";
import { ServiceEntry } from "./screens/types";

const db = SQLite.openDatabaseSync("services.db");

export const initDB = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        service TEXT NOT NULL,
        date TEXT,
        price TEXT,
        paid INTEGER,
        notes TEXT,
        completed INTEGER
      );
    `);
  } catch (error) {
    console.error("DB init error:", error);
  }
};

export const insertService = async (
  name: string,
  address: string,
  service: string,
  date: string,
  price: string,
  paid: boolean,
  notes: string,
  completed: boolean
): Promise<void> => {
  try {
    await db.runAsync(
      `INSERT INTO services (name, address, service, date, price, paid, notes, completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, address, service, date, price, paid ? 1 : 0, notes, completed ? 1 : 0]
    );
  } catch (error) {
    console.error("Insert failed:", error);
    throw error;
  }
};

export const fetchServices = async (
  filter?: "completed" | "booked" | "owed"
): Promise<ServiceEntry[]> => {
  let query = "SELECT * FROM services";
  if (filter === "completed") query += " WHERE completed = 1";
  if (filter === "booked") query += " WHERE completed = 0";
  if (filter === "owed") query += " WHERE completed = 1 AND paid = 0";

  try {
    const rows = await db.getAllAsync(query);
    return rows as ServiceEntry[];
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};

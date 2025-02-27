import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDataBase');

export default function Tab() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [intValue, setIntValue] = useState('');
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    initDb();
    fetchData();
  }, []);

  const initDb = async () => {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY NOT NULL, 
        value TEXT NOT NULL, 
        intValue INTEGER
      );
    `);
    await db.execAsync(`
      INSERT INTO test (value, intValue) VALUES ('test1', 123);
      INSERT INTO test (value, intValue) VALUES ('test2', 456);
      INSERT INTO test (value, intValue) VALUES ('test3', 789);
    `);
  };

  const fetchData = async () => {
    const allRowsData = await db.getAllAsync('SELECT * FROM test');
    setData(allRowsData);
  };

  const handleAddUpdateData = async () => {
    if (updateId !== null) {
      await db.runAsync('UPDATE test SET value = ?, intValue = ? WHERE id = ?', [value, intValue, updateId]);
      setUpdateId(null);
    } else {
      await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', [value, intValue]);
    }
    setValue('');
    setIntValue('');
    fetchData();
  };

  const handleEditData = (item) => {
    setValue(item.value);
    setIntValue(item.intValue.toString());
    setUpdateId(item.id);
  };

  const handleDeleteData = async (id) => {
    await db.runAsync('DELETE FROM test WHERE id = ?', [id]);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Text>Tab Expo SQLite</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={value}
        onChangeText={setValue}
      />
      <TextInput
        style={styles.input}
        placeholder="Integer Value"
        value={intValue}
        onChangeText={setIntValue}
        keyboardType="numeric"
      />
      <Button
        title={updateId !== null ? "Update Data" : "Add Data"}
        onPress={handleAddUpdateData}
      />
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text>{row.id}: {row.value} - {row.intValue}</Text>
          <Button title="Edit" onPress={() => handleEditData(row)} />
          <Button title="Delete" onPress={() => handleDeleteData(row.id)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
});

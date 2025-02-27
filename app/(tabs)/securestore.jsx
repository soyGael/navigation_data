import { View, Text, StyleSheet, TextInput } from "react-native";

export default function Tab() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Ingresa tu correo</Text>
        <TextInput
          style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'AsyncStorage',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="securestore"
        options={{
          title: 'SecureStore',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="key" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sqlite"
        options={{
          title: 'SQLite',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="database" color={color} />,
        }}
      />
    </Tabs>
  );
}

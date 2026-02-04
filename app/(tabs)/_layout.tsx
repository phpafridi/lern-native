// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          headerTitle: 'Home Screen'
        }}
      />
      {/* Add more tabs if needed */}
      {/* <Tabs.Screen name="profile" /> */}
    </Tabs>
  );
}
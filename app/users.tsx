import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface UsersResponse {
  data: User[];
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchAllUsers = async () => {
    try {
      const res = await fetch('http://192.168.1.7:8000/allUsers');
      const json: UsersResponse = await res.json();
      setUsers(json.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Render each user item
  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userDate}>
        Joined: {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users List</Text>
      
      {users.length === 0 ? (
        <Text style={styles.emptyText}>No users found</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.email} // ← This is the KEY fix
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  userDate: {
    fontSize: 12,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 50,
  },
});

export default Users;
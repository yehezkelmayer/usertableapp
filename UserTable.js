import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import axios from 'axios';
import UserForm from './UserForm';
import UserDetails from './UserDetails';

const API_URL = 'http://192.168.1.80:3000/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortField, setSortField] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (sortField) {
      sortUsers(sortField);
    }
  }, [sortField]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (user) => {
    try {
      await axios.post(`${API_URL}`, user);
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteUser(id) }
      ],
      { cancelable: false }
    );
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleEditChange = (key, value) => {
    setSelectedUser({ ...selectedUser, [key]: value });
  };

  const updateUser = async (user) => {
    try {
      await axios.put(`${API_URL}/${user.id}`, user);
      fetchUsers();
      setIsUserModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const sortUsers = (field) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{item.firstName}</Text>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{item.lastName}</Text>
      <Text style={styles.cellLarge} numberOfLines={1} ellipsizeMode="tail">{item.phoneNumber}</Text>
      <Text style={styles.cellLarge} numberOfLines={1} ellipsizeMode="tail">{item.email}</Text>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{item.role}</Text>
      <TouchableOpacity onPress={() => showUserDetails(item)} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsSortMenuOpen(!isSortMenuOpen)} style={styles.sortButton}>
        <Text style={styles.sortButtonText}>+ Sort By</Text>
      </TouchableOpacity>
      {isSortMenuOpen && (
        <View style={styles.sortMenu}>
          <TouchableOpacity onPress={() => { setSortField('firstName'); setIsSortMenuOpen(false); }} style={styles.sortOption}>
            <Text style={styles.sortOptionText}>First Name</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSortField('lastName'); setIsSortMenuOpen(false); }} style={styles.sortOption}>
            <Text style={styles.sortOptionText}>Last Name</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>First Name</Text>
        <Text style={styles.headerCell}>Last Name</Text>
        <Text style={styles.headerCellLarge}>Phone Number</Text>
        <Text style={styles.headerCellLarge}>Email</Text>
        <Text style={styles.headerCell}>Role</Text>
        <Text style={styles.headerActions}>Menu</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={() => setIsModalOpen(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isModalOpen}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <UserForm onSubmit={addUser} onClose={() => setIsModalOpen(false)} />
            <TouchableOpacity onPress={() => setIsModalOpen(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={isUserModalOpen}
        animationType="slide"
        onRequestClose={() => setIsUserModalOpen(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedUser && (
              <UserDetails
                user={selectedUser}
                onChange={handleEditChange}
                onDelete={() => confirmDelete(selectedUser.id)}
                onUpdate={() => updateUser(selectedUser)}
                onCancel={() => setIsUserModalOpen(false)}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  sortButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sortMenu: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  sortOption: {
    padding: 10,
  },
  sortOptionText: {
    fontSize: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 0.3,
    borderColor: '#000',
  },
  headerCell: {
    flex: 1.1,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0.3,
    borderColor: '#000',
    fontSize: 12,
  },
  headerCellLarge: {
    flex: 2.3,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0.3,
    borderColor: '#000',
    fontSize: 12,
  },
  headerActions: {
    flex: 0.9,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0.3,
    borderColor: '#000',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderColor: '#000',
  },
  cell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderWidth: 0.3,
    borderColor: '#000',
    fontSize: 12,
  },
cell: {
flex: 1,
padding: 5,
textAlign: 'center',
borderWidth: 0.3,
borderColor: '#000',
fontSize: 12,
},
cellLarge: {
flex: 2.1,
padding: 5,
textAlign: 'center',
borderWidth: 0.3,
borderColor: '#000',
fontSize: 12,
},
deleteButton: {
flex: 0.7,
justifyContent: 'center',
alignItems: 'center',
borderWidth: 0.3,
borderColor: '#000',
},
deleteIcon: {
width: 30,
height: 30,
},
addButton: {
backgroundColor: 'blue',
padding: 15,
marginTop: 20,
borderRadius: 5,
alignItems: 'center',
},
addButtonText: {
color: 'white',
fontWeight: 'bold',
},
detailsButton: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
borderWidth: 0.3,
borderColor: '#000',
backgroundColor: '#ddd',
},
detailsButtonText: {
fontSize: 12,
color: '#007bff',
},
modalContent: {
backgroundColor: 'white',
padding: 22,
justifyContent: 'center',
alignItems: 'center',
borderRadius: 4,
borderColor: 'rgba(0, 0, 0, 0.1)',
},
modalBackground: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalText: {
fontSize: 16,
marginBottom: 10,
},
modalCloseButton: {
backgroundColor: 'grey',
padding: 10,
borderRadius: 5,
marginTop: 20,
},
modalCloseButtonText: {
color: 'white',
fontWeight: 'bold',
},
});

export default App;
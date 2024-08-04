import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';

const UserDetails = ({ user, onChange, onDelete, onUpdate, onCancel }) => {
  
  const validateUser = () => {
    const { phoneNumber, email } = user;
    
    // Validate phone number (simple validation for demonstration purposes)
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on phone number format
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Validation Error', 'Phone number must be 10 digits');
      return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Invalid email format');
      return false;
    }
    
    return true;
  };

  const handleUpdate = () => {
    if (validateUser()) {
      onUpdate();
      onCancel(); // Close the modal after update
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            onDelete(user.id);
            onCancel(); // Close the modal after delete
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={user.firstName}
        onChangeText={(text) => onChange('firstName', text)}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={user.lastName}
        onChangeText={(text) => onChange('lastName', text)}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={user.phoneNumber}
        onChangeText={(text) => onChange('phoneNumber', text)}
        placeholder="Phone Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={user.email}
        onChangeText={(text) => onChange('email', text)}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={user.role}
        onChangeText={(text) => onChange('role', text)}
        placeholder="Role"
      />
      <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserDetails;

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00008B', // צבע רקע כחול כהה
    width:'100%',
    maxWidth:400
  },
  displayContainer: {
    width: '90%',
    backgroundColor: '#008000', // צבע רקע של המסך
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 48,
    color: '#fff',
  },
  buttonContainer: {
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF00FF', // צבע סגול בוהק
    margin: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  operatorButton: {
    backgroundColor: '#FF00FF', // צבע סגול בוהק
  },
  equalButton: {
    width: 150,
    height: 70,
    borderRadius:35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000', // צבע אדום
    margin: 5,
  },
});


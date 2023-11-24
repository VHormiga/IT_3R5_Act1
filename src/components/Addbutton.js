import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Keyboard, Platform, Dimensions } from 'react-native';

const Addbutton = ({ onAdd }) => {
  const [taskText, setTaskText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setIsAdding(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setIsAdding(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleAdd = () => {
    if (taskText.trim() !== '') {
      onAdd(taskText);
      setTaskText('');
      setIsAdding(false);
    }
  };

  const handlePress = () => {
    setIsAdding(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 200);
  };

  return (
    <View style={styles.container}>
      {isAdding ? (
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={[styles.input, { width: screenWidth - 120 }]}
            placeholder="Add a task..."
            onChangeText={(text) => setTaskText(text)}
            value={taskText}
            multiline 
            numberOfLines={1} 
            maxLength={300} 
          />
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handlePress}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Addbutton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    zIndex: 1,
  },
  addButton: {
    width: 70,
    height: 70,
    backgroundColor: '#add8e6',
    borderRadius: 60,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
  },
  addText: {
    fontSize: 35,
    color: '#6E5959',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#add8e6',
    paddingHorizontal: 10,
    maxWidth: '85', 
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#add8e6',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

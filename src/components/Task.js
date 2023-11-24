import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Task = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(props.text);
  const longPressTimeout = useRef(null);
   const inputRef = useRef(null);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleEdit = () => {
    if (!editing) {
      setEditing(true);
      setEditedTask(props.text);
      setShowOptions(false);
      props.hideAddButton();
    } else {
      props.onUpdate(props.index, editedTask);
      setEditing(false);
      props.showAddButton();
    }
  };

  const handleLongPress = () => {
    longPressTimeout.current = setTimeout(() => {
      setShowOptions(true);
    }, 500);
  };

  const handlePressOut = () => {
    clearTimeout(longPressTimeout.current);
  };

  const handleDelete = () => {
    props.onDelete(props.index);
    setShowOptions(false);
  };

  return (
    <TouchableOpacity
      style={styles.Task}
      onPress={() => {
        if (!editing) {
          handleEdit();
        }
      }}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
    >
      <View style={styles.titleContainer}>
        {showOptions && (
          <TouchableOpacity style={styles.icon1} onPress={handleDelete}>
            <FontAwesome name="trash-o" size={30} color="red" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.item}>
        {editing ? (
          <TextInput
            style={styles.itemText}
            value={editedTask}
            onChangeText={(text) => setEditedTask(text)}
            onSubmitEditing={handleEdit}
            numberOfLines={1}
            multiline
            autoFocus
          />
        ) : (
          <Text style={styles.itemText}>{props.text}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {editing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.checkBox} onPress={toggleCheckbox}>
        {isChecked ? (
          <FontAwesome name="check-square-o" size={27} color="green" />
        ) : (
          <FontAwesome name="square-o" size={27} color="black" />
        )}
      </TouchableOpacity>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Task: {
    backgroundColor: '#add8e6',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  icon1:{
    marginLeft: 13,
    marginRight: 13,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 'auto',
  },
  itemText: {
    width: '82%',
    flexShrink: 1,
  },
  checkBox: {
    width: 27,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#00ced1',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Task;

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Task from './Task';
import Addbutton from './Addbutton';

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddButton, setShowAddButton] = useState(true); 

  const addTask = (text) => {
    if (text.trim() !== '') {
      setTasks([...tasks, text]);
      setShowAddButton(true); 
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const updateTask = (index, updatedText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedText;
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.todo}>To Do:</Text>

        <ScrollView style={styles.scrollView}>
          {tasks.map((task, index) => (
            <Task 
              key={index}
              text={task}
              index={index}
              onDelete={deleteTask}
              onUpdate={updateTask}
              hideAddButton={() => setShowAddButton(false)} 
              showAddButton={() => setShowAddButton(true)}
            />
          ))}
        </ScrollView>
      </View>

      {showAddButton && (
        <View style={styles.buttonsContainer}>
          <Addbutton onAdd={addTask} />
        </View>
      )}
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flex: 1,
  },
  todo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    maxHeight: '82%',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 43,
    right: 43,
  },
});

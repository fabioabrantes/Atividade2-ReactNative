import React, { useState } from 'react';
import { StyleSheet, View, Modal, Dimensions, Button, Text } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  function handleAddTask(newTaskTitle: string) {
    let boolean = false;
    tasks.map((task) => { 
      if(task.title.toLocaleLowerCase() === newTaskTitle.toLocaleLowerCase()){
        boolean = true
      }
    })

    console.log(boolean);

    if(boolean){
      // alerta
      setErrorModalVisible(true);
    }else {
      //TODO - add new task
      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };

      const newTasks = tasks.map((task) => ({ ...task }));
      newTasks.push(newTask);

      setTasks(newTasks);
    }
  }

  function handleToggleTaskDone(id: number) {
    const newTasksList = tasks.map(element => {
      if (element.id === id) element.done = !element.done;
      return element;
    });
  
    setTasks(newTasksList);
  }

  function handleRemoveTask(id: number) {
    const newTasksList = tasks.filter((item) => item.id !== id);

    setTasks(newTasksList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />

      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={errorModalVisible}>
          <View style={styles.screen}>
            <View style={styles.viewModal}>
              <View style={styles.textViewModal}>
                <View>
                  <Text style={styles.textTitleModal}>Task já cadastrada</Text>
                </View>
                <View>
                  <Text style={styles.textModal}>Você não pode cadastrar uma task com o mesmo nome</Text>
                </View>
              </View>
              <View style={styles.buttonViewModal}> 
                <Button
                  title="OK"
                  onPress={() => {
                    setErrorModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  viewModal: {
    width: '85%',
    height: height - height * 0.78,
    backgroundColor: '#ffff',
  },
  textViewModal: {
    flexDirection: 'column',
  },
  buttonViewModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '5%',
  },
  textTitleModal: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '1%',
  },
  textModal: {
    marginTop: '1%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
  },
});

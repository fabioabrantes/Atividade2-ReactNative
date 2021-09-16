import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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

  function handleEditTask(taskId: number, taskNewTitle: string) {
    
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
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});

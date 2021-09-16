import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatListProps,
  Alert,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksItemProps {
  item: Task;
  editTask: (taskId: number, taskNewTitle: string) => void;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({
  item,
  editTask,
  toggleTaskDone,
  removeTask,
}: TasksItemProps) {
  const [isBeingEdited, setIsBeingEdit] = useState(false);
  const [editedValue, setEditedValue] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsBeingEdit(true);
  }

  function handleCancelEditing() {
    setEditedValue(item.title);
    setIsBeingEdit(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, item.title);
    setIsBeingEdit(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isBeingEdited]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${item.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${item.id}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          
          <TextInput
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={editedValue}
            editable={isBeingEdited}
            onChangeText={setEditedValue}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isBeingEdited ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image style={{width: 24, height: 24, marginHorizontal: 10}} source={editIcon} />
          </TouchableOpacity>
        )}

        {/* <View style={styles.iconsDivider} /> */}

        <TouchableOpacity
          disabled={isBeingEdited}
          onPress={() => {
            Alert.alert(
              "Remover item",
              "Tem certeza que você deseja remover esse item?",
              [
                {
                  text: "NÃO",
                },
                {
                  text: "SIM",
                  onPress: () => removeTask(item.id),
                },
              ]
            )
          }}
        >
          <Image source={trashIcon} style={{ opacity: isBeingEdited ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});

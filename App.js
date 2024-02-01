import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  Pressable,
  Alert,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import Task from './components/Task';

/**
 * Glavna komponenta aplikacije
 */
export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState(['Hobi', 'Zabava', 'Faks']);

  // Filtrirani zadaci prema unesenom tekstu za pretragu
  const filteredTasks = taskItems.filter((task) =>
    task.text.toLowerCase().includes(searchText.toLowerCase())
  );

  // Dodavanje zadatka
  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== '') {
      setTaskItems([...taskItems, { id: Date.now(), text: task, category: '' }]);
      setTask('');
    }
  };

  // Oznacavanje zadatka kao zavrsenog
  const completeTask = (id) => {
    let itemsCopy = [...taskItems];
    let completedTask = itemsCopy.find((task) => task.id === id);
    itemsCopy = itemsCopy.filter((task) => task.id !== id);
    setTaskItems(itemsCopy);

    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  // Brisanje zadatka
  const deleteTask = (id) => {
    let itemsCopy = [...taskItems];
    itemsCopy = itemsCopy.filter((task) => task.id !== id);
    setTaskItems(itemsCopy);
  };

  // Dodeljivanje kategorije zadatku
  const assignCategory = (id, category) => {
    let itemsCopy = [...taskItems];
    itemsCopy = itemsCopy.map((task) =>
      task.id === id ? { ...task, category } : task
    );
    setTaskItems(itemsCopy);
  };

  // Prikazivanje dijaloga za odabir kategorije zadatka
  const handleCategoryPress = (id) => {
    const options = categories.map((category) => ({
      text: category,
      onPress: () => assignCategory(id, category),
    }));

    Alert.alert('Tip zadatka', 'Izaberi kategoriju kojoj zadatak pripada:', options);
  };

  // Brisanje svih zavrsenih zadataka
  const handleDeleteCompletedTasks = () => {
    setCompletedTasks([]);
  };

  // Resetovanje teksta za pretragu kada se dodaje novi zadatak
  useEffect(() => {
    setSearchText('');
  }, [taskItems]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/pozadina.jpg')}
          style={styles.backgroundImage}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.tasksWrapper}>
              <Text style={styles.sectionTitle}>FONtastični planer</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Pretraži zadatke..."
                placeholderTextColor="#FFF"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
              <View style={styles.items}>
                {filteredTasks.length === 0 && (
                  <Text style={styles.noTasksText}>Za danas nema zadataka</Text>
                )}
                {filteredTasks.map((task) => (
                  <Pressable
                    key={task.id}
                    onLongPress={() => handleCategoryPress(task.id)}
                  >
                    <Task
                      text={task.text}
                      onDelete={() => deleteTask(task.id)}
                      onComplete={() => completeTask(task.id)}
                      category={task.category}
                    />
                  </Pressable>
                ))}
              </View>
              <View style={styles.completedTasksWrapper}>
                <Text style={styles.completedTasksTitle}>Urađeni zadaci &#10003;</Text>
                <ScrollView style={styles.completedTasks}>
                  {completedTasks.map((completedTask) => (
                    <View key={completedTask.id} style={styles.completedTask}>
                      <Text style={styles.completedTaskText}>
                        {completedTask.text}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  onPress={handleDeleteCompletedTasks}
                  style={styles.deleteCompletedTasksButton}
                >
                  <Text style={styles.deleteCompletedTasksButtonText}>
                    Obriši završene zadatke
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={'Zadaj novi zadatak...'}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Stilovi za App.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  items: {
    marginTop: 10,
  },
  completedTasksWrapper: {
    marginTop: 20,
    backgroundColor: '#2E8B57',
    borderRadius: 10,
    padding: 10,
  },
  completedTasksTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  completedTasks: {
    maxHeight: 300,
  },
  completedTask: {
    backgroundColor: '#DDDDDD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  completedTaskText: {
    color: '#333',
  },
  writeTaskWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addWrapper: {
    width: 60,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  searchInput: {
    height: 40,
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  categoryContainer: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 80,
    paddingVertical: 4,
    borderRadius: 5,
    marginLeft: 10,
  },
  categoryText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
  noTasksText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  deleteCompletedTasksButton: {
    backgroundColor: '#d60606',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteCompletedTasksButtonText: {
    color: '#FFF',
  },
});

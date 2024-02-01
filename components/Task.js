import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = ({ text, onDelete, onComplete, category }) => {
  return (
    // Glavni kontejner za prikaz zadatka
    <View style={styles.item}>
      {/* Kontejner za levi deo zadatka (ikona i tekst) */}
      <View style={styles.itemLeft}>
        {/* Ikona kvadrata */}
        <View style={styles.square}></View>
        {/* Tekst zadatka */}
        <Text style={styles.itemText}>{text}</Text>
      </View>
      {/* Kontejner za kategoriju zadatka (opciono) */}
      {category && (
        <View style={styles.categoryContainer}>
          {/* Tekst kategorije zadatka */}
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      )}
      {/* Kontejner za dugmadi (Završi i Obriši) */}
      <View style={styles.buttonsContainer}>
        {/* Dugme za označavanje zadatka kao završenog */}
        <TouchableOpacity onPress={onComplete}>
          <View style={styles.completeButton}>
            {/* Tekst na dugmetu za završetak zadatka */}
            <Text style={styles.completeButtonText}>Gotovo</Text>
          </View>
        </TouchableOpacity>
        {/* Dugme za brisanje zadatka */}
        <TouchableOpacity onPress={onDelete}>
          <View style={styles.deleteButton}>
            {/* Tekst na dugmetu za brisanje zadatka */}
            <Text style={styles.deleteButtonText}>Obriši</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Stilovi za Task.js
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#eaedf2',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
    marginBottom: 20,
  },
  // Kontejner za levi deo zadatka
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  // Kvadratna ikona zadatka
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  // Tekst zadatka sa ograničenjem širine
  itemText: {
    maxWidth: '80%',
  },
  // Kontejner za kategoriju zadatka
  categoryContainer: {
    backgroundColor: '#edae4a', 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 5,
  },
  // Tekst kategorije zadatka
  categoryText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
  // Kontejner za dugmadi (Završi i Obriši)
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  // Dugme za završetak zadatka
  completeButton: {
    width: 70,
    height: 30,
    backgroundColor: '#2E8B57',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  // Tekst na dugmetu za završetak zadatka
  completeButtonText: {
    color: '#FFF',
  },
  // Dugme za brisanje zadatka
  deleteButton: {
    width: 70,
    height: 30,
    backgroundColor: '#d60606',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Tekst na dugmetu za brisanje zadatka
  deleteButtonText: {
    color: '#FFF',
  },
});

export default Task;

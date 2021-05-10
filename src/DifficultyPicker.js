import React from 'react';
import {View, Text, Picker, StyleSheet, useColorScheme} from 'react-native';

export default function DifficultyPicker({difficulty, setDifficulty, winner}) {
  // if game is closed no picker is required
  if (winner) return null;

  const darkMode = useColorScheme() === 'dark';
  const color = darkMode ? '#fff' : '#000';
  return (
    <View style={styles.difficultyPickerContainer}>
      <Text
        style={{
          color,
          fontSize: 20,
        }}>
        Difficulty:
      </Text>
      <Picker
        style={[styles.difficultyPicker, {color}]}
        selectedValue={difficulty}
        itemStyle={{color}}
        onValueChange={value => setDifficulty(value)}>
        <Picker.Item color={color} label="Easy" value={1} />
        <Picker.Item color={color} label="Medium" value={4} />
        <Picker.Item color={color} label="Hard" value={10} />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  difficultyPickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '15%',
    marginTop: '5%',
  },
  difficultyPicker: {
    width: 150,
  },
});

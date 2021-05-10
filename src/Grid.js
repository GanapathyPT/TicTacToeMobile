import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {AI, USER} from './game';

export default function Grid({grid, disabled, onPress, winner}) {
  const darkMode = useColorScheme() === 'dark';
  const backgroundColor = darkMode ? '#444' : '#ccc';

  return grid.map((row, i) => (
    <View key={i} style={styles.row}>
      {row.map((_, j) => (
        <TouchableOpacity
          key={j}
          disabled={disabled}
          style={[styles.square, {backgroundColor}]}
          onPress={() => onPress(i, j)}>
          <Text style={styles.squareText}>
            {grid[i][j] === USER ? 'X' : grid[i][j] === AI ? 'O' : ''}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  ));
}

const styles = StyleSheet.create({
  row: {
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  square: {
    width: 100,
    height: 100,
    padding: 10,
    margin: 1,
    backgroundColor: '#ddd',
  },
  squareText: {
    fontSize: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
});

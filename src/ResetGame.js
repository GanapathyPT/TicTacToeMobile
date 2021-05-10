import React from 'react';
import {View, Text, StyleSheet, Button, useColorScheme} from 'react-native';
import {TIE} from './game';

export default function ResetGame({winner, reset}) {
  if (winner === null) return null;

  const darkMode = useColorScheme() === 'dark';
  const color = darkMode ? '#fff' : '#000';

  return (
    <View style={styles.resetContainer}>
      <Text style={[styles.resetText, {color}]}>
        {winner === TIE ? 'Match Tied' : `${winner} won`}
      </Text>
      <Button title="Reset Game" onPress={reset} />
    </View>
  );
}

const styles = StyleSheet.create({
  resetContainer: {
    paddingHorizontal: '30%',
    paddingVertical: '10%',
  },
  resetText: {
    fontSize: 30,
    marginBottom: 25,
    textAlign: 'center',
  },
});

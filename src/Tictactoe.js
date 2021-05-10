import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {AI, USER, createNewGrid, getWinner, getBestMove} from './game';
import DifficultyPicker from './DifficultyPicker';
import Grid from './Grid';
import ResetGame from './ResetGame';

const DIFFICULTY = 'DIFFICULTY';

function Tictactoe() {
  const [grid, setGrid] = useState(createNewGrid());
  const [difficulty, setDifficulty] = useState(4);
  const [winner, setWinner] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const darkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const setOldDifficulty = async () => {
      const savedDifficulty = await AsyncStorage.getItem(DIFFICULTY);
      if (savedDifficulty) setDifficulty(+savedDifficulty);
    };

    setOldDifficulty();
  }, [DIFFICULTY]);

  useEffect(() => {
    const saveDifficulty = async () => {
      if (difficulty) await AsyncStorage.setItem(DIFFICULTY, difficulty + '');
    };

    saveDifficulty();
  }, [difficulty, DIFFICULTY]);

  const reset = () => {
    setGrid(createNewGrid());
    setDisabled(false);
    setWinner(null);
  };

  const handleClick = (i, j) => {
    // return if buttons are disabled and grid item is not empty
    if (disabled || grid[i][j]) return;

    // copying the grid (not mutating the state) and making the USER move
    const gridCopy = grid.map(row => [...row]);
    gridCopy[i][j] = USER;

    setDisabled(true);
    setGrid(gridCopy);

    // after making the move if there is a winner dont try to make the AI move
    const currentWinner = getWinner(gridCopy);
    if (currentWinner) {
      setWinner(currentWinner);
      setDisabled(false);
    }

    // making the simulation that the AI is thinking for a second
    setTimeout(() => {
      if (currentWinner) return;

      // get the best move for AI and make it
      const [i, j] = getBestMove(gridCopy, difficulty);
      gridCopy[i][j] = AI;
      setGrid(gridCopy);

      const newWinner = getWinner(gridCopy);
      if (newWinner) setTimeout(() => setWinner(newWinner), 1000);
      else setDisabled(false);
    }, 1000);
  };

  const color = darkMode ? '#fff' : '#000';
  const backgroundColor = darkMode ? '#333' : '#fff';
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.heading, {color}]}>TIC TAC TOE</Text>
      <DifficultyPicker
        winner={winner}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <View style={styles.tictactoe}>
        <ResetGame winner={winner} reset={reset} />
        <Grid
          winner={winner}
          grid={grid}
          onPress={handleClick}
          disabled={disabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 50,
    textAlign: 'center',
  },
  tictactoe: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tictactoe;

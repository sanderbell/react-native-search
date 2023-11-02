import React from 'react';
import { View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import styles from '../styles';

function SearchBox({ username, setUsername, handleSearch }) {
  return (
    <View style={styles.searchBox}>
      <Searchbar
        autoFocus
        style={styles.searchBar}
        placeholder='Enter first and last name'
        onChangeText={setUsername}
        value={username}
      />
      <Button
        disabled={username.length === 0}
        style={styles.button}
        mode='contained'
        onPress={handleSearch}
      >
        Search
      </Button>
    </View>
  );
}

export default SearchBox;

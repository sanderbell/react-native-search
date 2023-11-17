import React from 'react';
import { View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';

// Importing styles for the component
import styles from '../styles';

function SearchBox({ username, setUsername, handleSearch }) {
  return (
    <View style={styles.searchBox}>
      {/* Searchbar for user input */}
      <Searchbar
        autoComplete='off'
        autoFocus
        style={styles.searchBar}
        placeholder='Enter full name'
        onChangeText={setUsername}
        value={username}
        onFocus={() => (username.length > 0 ? username : setUsername(''))}
      />
      {/* Button for triggering the search */}
      <Button
        disabled={username.length === 0} // Disabling the button if the username is empty
        style={styles.button}
        mode='contained'
        onPress={handleSearch} // Calling the handleSearch function when the button is pressed
      >
        Search
      </Button>
    </View>
  );
}

export default SearchBox;

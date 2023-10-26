import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import data from './data.json';

const App = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    const usersArray = Object.values(data);

    // Find the searched user
    const searchedUser = usersArray.find(
      (user) => user.name.toLowerCase() === username.toLowerCase()
    );

    if (!searchedUser) {
      // User not found, show error message
      setError(
        'This user name does not exist! Please specify an existing first name and last name!'
      );
      setUsers([]);
      return;
    }

    const top10Users = usersArray
      .sort((a, b) => b.bananas - a.bananas)
      .slice(0, 10);

    if (searchedUser.bananas >= top10Users[9].bananas) {
      // Searched user has enough bananas to be in the top 10
      const updatedTop10Users = top10Users.map((user, index) => ({
        ...user,
        rank: index + 1,
        isSearchedUser: user.uid === searchedUser.uid,
      }));

      setUsers(updatedTop10Users);
    } else {
      // Searched user doesn't have enough bananas
      // Replace the searched user with the last rank of the top 10
      const updatedTop10Users = [
        ...top10Users.slice(0, 9),
        { ...searchedUser, rank: top10Users.length + 1, isSearchedUser: true },
      ];

      setUsers(updatedTop10Users);
    }

    setError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter your username'
          onChangeText={(text) => setUsername(text)}
        />
        <Button title='Search' onPress={handleSearch} />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={users}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Text
                style={
                  item.isSearchedUser
                    ? { color: 'red', fontWeight: 'bold' }
                    : ''
                }
              >
                {item.rank}. {item.name}: {item.bananas} banana
                {item.bananas > 1 ? 's' : ''}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.uid}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  searchContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 200,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  list: {
    alignSelf: 'center',
    flex: 1,
    alignContent: 'center',
  },
  errorText: {
    alignSelf: 'center',
    color: 'red',
    marginBottom: 10,
  },
});

export default App;

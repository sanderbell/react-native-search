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
import { Table, Row } from 'react-native-table-component';
import data from './data.json';

const App = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = () => {
    const usersArray = Object.values(data);

    const searchedUser = usersArray.find(
      (user) => user.name.toLowerCase() === username.toLowerCase()
    );

    if (username.length === 0) {
      Alert.alert('🤔 🤔 🤔', 'Cannot be empty');
      setUsers([]);
      return;
    }

    if (!searchedUser) {
      Alert.alert(
        '🙊 🙊 🙊',
        'No such user. Enter their first name and last name!'
      );
      setUsers([]);
      return;
    }

    const allUsers = usersArray.sort((a, b) => b.bananas - a.bananas);
    const userRank =
      allUsers.findIndex((user) => user.uid === searchedUser.uid) + 1;

    const top10Users = usersArray
      .sort((a, b) => b.bananas - a.bananas)
      .slice(0, 10);

    if (searchedUser.bananas >= top10Users[9].bananas) {
      const updatedTop10Users = top10Users.map((user, index) => ({
        ...user,
        rank: index + 1,
        isSearchedUser: user.uid === searchedUser.uid,
      }));
      setUsers(updatedTop10Users);
    } else {
      const updatedTop10Users = [
        ...top10Users.slice(0, 9).map((user, index) => ({
          ...user,
          rank: index + 1,
          isSearchedUser: user.uid === searchedUser.uid,
        })),
        { ...searchedUser, rank: userRank, isSearchedUser: true },
      ];

      setUsers(updatedTop10Users);
    }
  };

  const tableHead = ['Rank', 'Name', 'Bananas', 'Is Searched User'];

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

      <Table
        borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff', marginLeft: 10 }}
      >
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {users.map((item, index) => (
          <Row
            key={index}
            data={[
              item.rank.toString(),
              `${item.name}`,
              `${item.bananas}`,
              `${item.isSearchedUser ? 'true' : 'false'}`,
            ]}
            textStyle={styles.text}
          />
        ))}
      </Table>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 200,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  head: { height: 50, backgroundColor: '#f1f8ff', textAlign: 'center' },
  text: { margin: 4, textAlign: 'center' },
});

export default App;

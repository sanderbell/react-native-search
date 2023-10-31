import React, { useState } from 'react';
import { Alert, SafeAreaView, View, StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
  DataTable,
  Button,
  Searchbar,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import data from './data.json';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  searchBar: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
});

const userData = {
  bananas: PropTypes.number.isRequired,
  lastDayPlayed: PropTypes.string,
  longestStreak: PropTypes.number,
  name: PropTypes.string.isRequired,
  stars: PropTypes.number,
  subscribed: PropTypes.bool,
  uid: PropTypes.string.isRequired,
};

function validateData(data) {
  Object.values(data).forEach((user) => {
    PropTypes.checkPropTypes(userData, user, 'property', 'data.json');
  });
  return data;
}

const validatedData = validateData(data);

const App = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = () => {
    const usersArray = Object.values(validatedData);

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

  const centeredContentStyle = { justifyContent: 'center' };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.centered}>
        <View style={styles.searchBox}>
          <Searchbar
            style={styles.searchBar}
            placeholder='Search'
            onChangeText={setUsername}
            value={username}
          />
          <Button mode='contained' onPress={handleSearch}>
            Find
          </Button>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ justifyContent: 'center', flex: 0.3 }}>
              Rank
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: 'center', flex: 1.5 }}>
              Name
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: 'center' }}>
              Bananas
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: 'center' }}>
              Is Searched User
            </DataTable.Title>
          </DataTable.Header>

          {users.map((user) => (
            <DataTable.Row
              style={{
                backgroundColor: user.isSearchedUser
                  ? '#ede7f3'
                  : 'transparent',
              }}
              key={user.uid}
            >
              <DataTable.Cell style={{ justifyContent: 'center', flex: 0.3 }}>
                {user.rank}
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: 'center', flex: 1.5 }}>
                {user.name}
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: 'center' }}>
                {user.bananas}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  justifyContent: 'center',
                }}
              >
                {user.isSearchedUser ? 'Yes' : 'No'}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;

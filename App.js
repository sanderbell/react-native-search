import React, { useState, useRef } from 'react';
import { View, Alert, SafeAreaView, StyleSheet, Keyboard } from 'react-native';
import {
  Provider as PaperProvider,
  Button,
  Searchbar,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import data from './data.json';
import UserTable from './UserTable';
// import SearchBox from './SearchBox';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 17,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    justifyContent: 'center',
  },

  searchBar: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: '20%',
  },

  button: {
    height: 'auto',
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20%',
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
  try {
    Object.values(data).forEach((user) => {
      PropTypes.checkPropTypes(userData, user, 'property', 'data.json');
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const validatedData = validateData(data);

const App = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  const searchDone = useRef(false);

  const handleSearch = async () => {
    try {
      const usersArray = Object.values(validatedData);
      let searchedUser;
      const matchingUsers = usersArray.filter(
        (user) => user.name.toLowerCase() === username.toLowerCase().trim()
      );
      if (username.length === 0) {
        Alert.alert('🙈 Cannot be empty', 'Please enter something');
        setUsers([]);
        searchDone.current = false;
        return;
      }
      if (matchingUsers.length === 0) {
        Alert.alert('🙊 No such user', 'Enter their first and last name');
        setUsers([]);
        searchDone.current = false;
        return;
      }
      if (matchingUsers.length > 1) {
        searchedUser = await new Promise((resolve) => {
          Alert.alert(
            `There are ${matchingUsers.length} users with this name`,
            'Choose the one from the list:',
            matchingUsers.map((user, index) => ({
              text: `${user.name} (${user.stars} stars)`,
              onPress: () => resolve(matchingUsers[index]),
            }))
          );
        });
      } else {
        searchedUser = matchingUsers[0];
      }

      const allUsers = usersArray.sort((a, b) => b.bananas - a.bananas);

      if (searchedUser) {
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
        searchDone.current = true;
        Keyboard.dismiss();
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while searching');
      console.error(error);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.centered}>
        <View style={styles.searchBox}>
          <Searchbar
            autoFocus
            style={styles.searchBar}
            placeholder='Enter first and last name'
            onChangeText={setUsername}
            value={username}
          />
          <Button style={styles.button} mode='contained' onPress={handleSearch}>
            Search
          </Button>
        </View>
        <UserTable
          isSearchDone={searchDone.current}
          users={users}
          styles={styles}
        />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;

//TODO: Refactor and modules
//TODO: Unit tests
//TODO: Sync styles
//TODO: Annotate
//TODO: README

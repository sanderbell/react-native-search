import React, { useState, useRef } from 'react';
import { Alert, SafeAreaView, Keyboard } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import validatedData from './validated-data';
import UserTable from './UserTable';
import SearchBox from './SearchBox';
import styles from './styles';

const App = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const searchDone = useRef(false);

  const handleSearch = async () => {
    try {
      const usersArray = Object.values(validatedData);
      const matchingUsers = usersArray.filter(
        (user) => user.name.toLowerCase() === username.toLowerCase().trim()
      );
      // This can be implemented if we prefer it over the disabled state of the button:
      // if (username.length === 0) {
      //   Alert.alert('🙈 Cannot be empty', 'Please enter something');
      //   setUsers([]);
      //   searchDone.current = false;
      //   return;
      // }
      if (matchingUsers.length === 0) {
        Alert.alert('🙊 No such user', 'Enter their first and last name');
        setUsers([]);
        searchDone.current = false;
        return;
      }

      let searchedUser = matchingUsers[0];

      if (matchingUsers.length > 1) {
        searchedUser = await new Promise((resolve) => {
          Alert.alert(
            `There are ${matchingUsers.length} users with this name`,
            'Choose from the list:',
            matchingUsers.map((user, index) => ({
              text: `${user.name} (${user.stars} stars)`,
              onPress: () => resolve(matchingUsers[index]),
            }))
          );
        });
      }

      const allUsers = usersArray.sort((a, b) => b.bananas - a.bananas);

      if (searchedUser) {
        const userRank =
          allUsers.findIndex((user) => user.uid === searchedUser.uid) + 1;
        const top10Users = allUsers.slice(0, 10);

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
        <SearchBox
          username={username}
          setUsername={setUsername}
          handleSearch={handleSearch}
        />
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

//TODO: Unit tests
//TODO: Annotate
//TODO: README

import React, { useState, useRef } from 'react';
import { Alert, SafeAreaView, Keyboard } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

// Importing external data source
import validatedData from './src/validated-data.js';

// Importing custom components
import UserTable from './src/components/UserTable';
import SearchBox from './src/components/SearchBox';

// Importing styles for the component
import styles from './src/styles';

const App = () => {
  // State variables
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const searchDone = useRef(false);

  // Handling the user search
  const handleSearch = async () => {
    try {
      // Extracting an array of users from the external data source
      const usersArray = Object.values(validatedData);

      // Filtering users based on the provided username
      const matchingUsers = usersArray.filter(
        (user) => user.name.toLowerCase() === username.toLowerCase().trim()
      );

      // Handling the scenario where no users match the search
      if (matchingUsers.length === 0) {
        Alert.alert('🙊 No such user', 'Enter their first and last name');
        setUsers([]);
        searchDone.current = false;
        return;
      }

      let searchedUser = matchingUsers[0];

      // If multiple users found, prompt the user to choose one
      if (matchingUsers.length > 1) {
        searchedUser = await new Promise((resolve) => {
          Alert.alert(
            `🙉 ${matchingUsers.length} users with this name`,
            'Pick from the list:',
            matchingUsers.map((user, index) => ({
              text: `${user.name} (${user.stars} stars)`,
              onPress: () => resolve(matchingUsers[index]),
            }))
          );
        });
      }

      // Sorting all users by the number of bananas
      const allUsers = usersArray.sort((a, b) => b.bananas - a.bananas);

      if (searchedUser) {
        // Determining the rank of the searched user
        const userRank =
          allUsers.findIndex((user) => user.uid === searchedUser.uid) + 1;

        // Extracting the top 10 users
        const top10Users = allUsers.slice(0, 10);

        // Updating state based on the search result
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

        // Marking the search as done and dismissing the keyboard
        searchDone.current = true;
        Keyboard.dismiss();
        
        // Marking the search as undone so that the table won't be shown when a new search is initialized
        setTimeout(() => {
          {
            searchDone.current = false;
          }
        }, 1000);
      }
    } catch (error) {
      // Handling errors during the search process
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

        {/* For a better screen layout, UserTable will be rendered only if the user already finished the search action */}
        {(username.length > 0) & searchDone.current ? (
          <UserTable
            isSearchDone={searchDone.current}
            users={users}
            styles={styles}
          />
        ) : null}
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;

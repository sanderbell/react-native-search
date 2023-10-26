import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  SafeAreaView,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchConrainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter your username'
          // onChangeText={text => setUserName(text)}
          // value={userName}
        />
        <Button title='Search' />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  searchConrainer: {
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    
  },
  input: {
    height: 40,
    width: 200,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default App;

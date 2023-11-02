import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    justifyContent: 'center',
  },

  searchBar: {
    flex: Platform.OS === 'ios' ? 0.75 : 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 20,
  },

  button: {
    height: 'auto',
    flex: Platform.OS === 'ios' ? 0.3 : 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default styles;

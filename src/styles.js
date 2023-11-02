import { StyleSheet } from 'react-native';

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

export default styles;

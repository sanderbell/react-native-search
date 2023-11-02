# User Search Component

![Demo GIF](./assets/demo.gif)

This React Native app allows users to search for individuals based on their first and last names and displays relevant information about them. The app is built using Expo and utilizes components from the `react-native-paper` library for a clean and responsive user interface.

## App Structure

### App.js

The main entry point of the application. It manages state, handles user searches, and renders the `SearchBox` and `UserTable` components. The app uses an external data source (`validatedData.js`) to simulate user information.

### SearchBox.js

This component consists of a `Searchbar` for user input and a search button (`Button`). It receives and manages the `username` state and triggers the `handleSearch` function when the search button is pressed.

### UserTable.js

The `UserTable` component displays user information in a `DataTable`. It renders a table header with columns and dynamically generates rows based on the search results. The table highlights the searched user and includes columns for rank, name, bananas, and whether the user was searched.

## Dependencies

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native Table Component](https://github.com/Glabb/react-native-table-component)

## Testing

The app includes unit tests using Jest and the React Testing Library. To run the tests, use the following command:

```bash
npm test
```

## Data Example

The app uses a mock data example (`data.js`) with user information, including unique identifiers (`uid`), bananas count, last day played, longest streak, name, stars, and subscription status.

```json
{
  "00D1LA8puAa1GINkVpfgC1TmO0m1": {
    "bananas": 200,
    "lastDayPlayed": "2018-11-22",
    "longestStreak": 1,
    "name": "Rica Ella Francisco",
    "stars": 6,
    "subscribed": false,
    "uid": "00D1LA8puAa1GINkVpfgC1TmO0m1"
  },
  "x8RNvUgv5pZqDVatEXb2aYgSflq1": {
    "bananas": 0,
    "lastDayPlayed": "2017-11-01",
    "longestStreak": 0,
    "name": "Adh Fuoo",
    "stars": 4,
    "subscribed": false,
    "uid": "x8RNvUgv5pZqDVatEXb2aYgSflq1"
  },
  // ...
}
```
import React from 'react';
import { DataTable } from 'react-native-paper';

function UserTable({ users, isSearchDone }) {
  // Rendering the component only if the search is done
  return isSearchDone ? (
    // DataTable for displaying user information
    <DataTable testID='user-table'>
      {/* DataTable header with columns */}
      <DataTable.Header style={{ marginBottom: 5 }}>
        <DataTable.Title style={{ justifyContent: 'center', flex: 0.4 }}>
          Rank
        </DataTable.Title>
        <DataTable.Title style={{ justifyContent: 'center', flex: 1.5 }}>
          Name
        </DataTable.Title>
        <DataTable.Title style={{ justifyContent: 'center', flex: 1 }}>
          Bananas
        </DataTable.Title>
        <DataTable.Title style={{ justifyContent: 'center', flex: 1 }}>
          Is Searched?
        </DataTable.Title>
      </DataTable.Header>

      {/* Mapping through the users and creating DataTable rows */}
      {users.map((user) => (
        <DataTable.Row
          testID='user-row'
          style={{
            borderRadius: 15,
            backgroundColor: user.isSearchedUser ? '#ede7f3' : 'transparent',
          }}
          key={user.uid}
        >
          {/* DataTable cells for each user attribute */}
          <DataTable.Cell style={{ justifyContent: 'center', flex: 0.4 }}>
            {user.bananas === 0 ? '∞' : user.rank}
          </DataTable.Cell>
          <DataTable.Cell style={{ justifyContent: 'center', flex: 1.5 }}>
            {user.name}
          </DataTable.Cell>
          <DataTable.Cell style={{ justifyContent: 'center', flex: 1 }}>
            {user.bananas}
          </DataTable.Cell>
          <DataTable.Cell
            style={{
              justifyContent: 'center',
              flex: 1,
            }}
          >
            {user.isSearchedUser ? 'Yes' : 'No'}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  ) : null; // Render nothing if the search is not done
}

export default UserTable;

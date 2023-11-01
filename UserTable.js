import { DataTable } from 'react-native-paper';

function UserTable({ users, isSearchDone, styles }) {
  return isSearchDone ? (
    <DataTable>
      <DataTable.Header style={styles.tableHeader}>
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

      {users.map((user) => (
        <DataTable.Row
          style={{
            borderRadius: 15,
            backgroundColor: user.isSearchedUser ? '#ede7f3' : 'transparent',
          }}
          key={user.uid}
        >
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
  ) : null;
}

export default UserTable;

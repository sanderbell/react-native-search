import React from 'react';
import { render } from '@testing-library/react-native';
import UserTable from '../src/components/UserTable';

describe('<UserTable />', () => {
  const mockUsers = [
    {
      uid: '1',
      rank: 1,
      name: 'Mark Dwuan',
      bananas: 5,
      isSearchedUser: false,
    },
    { uid: '2', rank: 2, name: 'Alex Dong', bananas: 3, isSearchedUser: true },
  ];

  it('renders correctly when isSearchDone is true', () => {
    const { getByTestId } = render(
      <UserTable users={mockUsers} isSearchDone={true} />
    );
    expect(getByTestId('user-table')).not.toBeNull();
  });

  it('renders the correct number of users', () => {
    const { getAllByTestId } = render(
      <UserTable users={mockUsers} isSearchDone={true} />
    );
    expect(getAllByTestId('user-row')).toHaveLength(mockUsers.length);
  });
});

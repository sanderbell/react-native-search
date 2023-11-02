import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBox from '../src/components/SearchBox';

describe('SearchBox', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBox username='' setUsername={() => {}} handleSearch={() => {}} />
    );

    expect(getByPlaceholderText('Enter full name')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('updates the username when text is entered', () => {
    const setUsername = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBox
        username=''
        setUsername={setUsername}
        handleSearch={() => {}}
      />
    );

    fireEvent.changeText(
      getByPlaceholderText('Enter full name'),
      'Emma Watson'
    );
    expect(setUsername).toHaveBeenCalledWith('Emma Watson');
  });

  it('calls handleSearch when the search button is pressed', () => {
    const handleSearch = jest.fn();
    const { getByText } = render(
      <SearchBox
        username='Emma Watson'
        setUsername={() => {}}
        handleSearch={handleSearch}
      />
    );

    fireEvent.press(getByText('Search'));
    expect(handleSearch).toHaveBeenCalled();
  });
});

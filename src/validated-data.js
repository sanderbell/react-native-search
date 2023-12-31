import PropTypes from 'prop-types';
import data from './data.json';

const dataTypes = {
  bananas: PropTypes.number.isRequired,
  lastDayPlayed: PropTypes.string,
  longestStreak: PropTypes.number,
  name: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  subscribed: PropTypes.bool,
  uid: PropTypes.string.isRequired,
};

function validate(data) {
  try {
    Object.values(data).forEach((user) => {
      PropTypes.checkPropTypes(dataTypes, user, 'property', 'data.json');
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const validatedData = validate(data);

export default validatedData;

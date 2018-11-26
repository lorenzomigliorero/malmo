import PropTypes from 'prop-types';
import React from 'react';

const List = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item}>
        {item}
      </li>
    ))}
  </ul>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default List;

import PropTypes from 'prop-types';

function RestaurantList() {
  return <h1>Restaurant List Here</h1>;
}

RestaurantList.propTypes = {
  restaurants: PropTypes.array,
};

export default RestaurantList;

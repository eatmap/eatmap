import { useState, createContext } from 'react';

export const RestaurantSearchContext = createContext({});

export const RestaurantSearchProvider = ({
  children,
  defaultLatitude,
  defaultLongitude,
  defaultRadius,
}) => {
  const [latitude, setLatitude] = useState(defaultLatitude);
  const [longitude, setLongitude] = useState(defaultLongitude);
  const [radius, setRadius] = useState(defaultRadius);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  return (
    <RestaurantSearchContext.Provider
      value={{
        latitude,
        longitude,
        radius,
        loading,
        restaurants,
        setLatitude,
        setLongitude,
        setRadius,
        setLoading,
        setRestaurants,
      }}
    >
      {children}
    </RestaurantSearchContext.Provider>
  );
};

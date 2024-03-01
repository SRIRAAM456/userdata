import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';

interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

const UserData = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const { name, email } = response.data.results[0];
      const newUser = { name, email };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      {user ? (
        <div>
          <p>Name: {`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={refreshData}>Refresh</button>
    </div>
  );
};

export default UserData;
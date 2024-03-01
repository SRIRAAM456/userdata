import React,{useState, useEffect} from 'react';
import axios from 'axios';

const randomUser = 'https://randomuser.me/api';

const RandomUser = () => {
    const [user,setUser] = useState(null);

    const userHandler = async() => {
      try {
        const response = await axios.get(randomUser);
        const {name, email} = response.data.results[0];
        const newData = { name, email};
        setUser(newData)
        localStorage.setItem('user', JSON.stringify(newData));
      } catch (error) {
        console.log('Error fetching data:', error);
      }
      };

useEffect(() => {
  userHandler()
},[])

const refreshData = () => {
  userHandler();
};

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
  )
}

export default RandomUser

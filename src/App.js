import React from 'react';
import UserList from './components/UserList';
import './styles/App.css';

const App = () => {
    return (
        <div className="App">
            <h1>User List</h1>
            <UserList />
        </div>
    );
};

export default App;

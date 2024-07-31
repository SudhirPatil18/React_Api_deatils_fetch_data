import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import UserItem from './UserItem';
import '../styles/UserList.css';

const UserList = () => {
    const [skip, setSkip] = useState(0);
    const [limit] = useState(10);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterGender, setFilterGender] = useState('');
    const [filterCountry, setFilterCountry] = useState('');
    const dispatch = useDispatch();
    const userState = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers(limit, skip, sortField, sortOrder));
    }, [dispatch, limit, skip, sortField, sortOrder]);

    const loadMoreUsers = () => {
        setSkip(prevSkip => prevSkip + limit);
    };

    const handleSort = (field) => {
        const order = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const handleFilterGender = (event) => {
        setFilterGender(event.target.value);
    };

    const handleFilterCountry = (event) => {
        setFilterCountry(event.target.value);
    };

    // Apply client-side filtering
    const filteredUsers = userState.users.filter(user => {
        return (filterGender ? user.gender === filterGender : true) &&
               (filterCountry ? user.address?.country.includes(filterCountry) : true);
    });

    return (
        <div className="user-list">
            <div className="filters">
                <label>
                    Gender:
                    <select value={filterGender} onChange={handleFilterGender}>
                        <option value="">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>
                <label>
                    Country:
                    <input type="text" value={filterCountry} onChange={handleFilterCountry} placeholder="Filter by Country" />
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>ID</th>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th onClick={() => handleSort('age')}>Age</th>
                        <th>Gender</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <UserItem key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
            {userState.loading && <p>Loading...</p>}
            <button onClick={loadMoreUsers} disabled={userState.loading}>Load More</button>
        </div>
    );
};

export default UserList;


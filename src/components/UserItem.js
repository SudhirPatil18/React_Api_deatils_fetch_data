import React from 'react';

const UserItem = ({ user }) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.address?.country}</td>
        </tr>
    );
};

export default UserItem;

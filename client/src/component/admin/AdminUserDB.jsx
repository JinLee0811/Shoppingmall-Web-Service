import React, { useState, useEffect } from 'react';
import instance from '../../util/axios-setting';
import { Table } from 'react-bootstrap';

function AdminUserDB() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    instance
      .get(`/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => console.log('error'));
  }, []);

  const UserDB = ({ user }) => {
    const [code, setCode] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    useEffect(() => {
      if (user.address) {
        setCode(user.address.postalCode);
        setAddress1(user.address.address1);
        setAddress2(user.address.address2);
      }
    }, []);

    return (
      <tr key={user._id}>
        <td>{user._id}</td>
        <td>{user.email}</td>
        <td>{user.fullName}</td>
        <td>
          {code},{address1},{address2}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>name</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return <UserDB user={user} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminUserDB;

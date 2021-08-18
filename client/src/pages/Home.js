import { useEffect, useState } from 'react';

const Home = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:5000/user`);
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checked = async (id, isChecked) => {
    try {

      const res = await fetch(`http://localhost:5000/user/checked/${id}?checked=${isChecked}`, {
        method: 'GET',
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Photo</th>
        <th scope="col">Phone</th>
        <th scope="col">Filial ID</th>
        <th scope="col">Card Number</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      {users?.map((user, index) => (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>
            <img src={user.avatar} alt="" width={80} />
          </td>
          <td>{user.phone || '-'}</td>
          <td>{user.filial_id || '-'}</td>
          <td>{user.card_number || '-'}</td>
          <td>
            <input checked={user.isChecked} type="checkbox" style={{ width: '30px' }}
                   onChange={() => checked(user._id, !user.isChecked)} />
          </td>
        </tr>
      ))}
      </tbody>
    </table>

  );
};

export default Home;

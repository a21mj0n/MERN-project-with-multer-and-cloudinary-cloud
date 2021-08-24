import { useEffect, useState } from 'react';
import PhotoViewer from 'photoviewer';
import 'photoviewer/dist/photoviewer.css';

const Home = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`https://paymart-app.herokuapp.com/user`);
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleDelete = async (id) => {
    try {
      if (window.confirm('Do you really delete this record ?')) {
        const res = await fetch(`https://paymart-app.herokuapp.com/user/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          const updatedUsers = users.filter((user) => user._id !== id);
          setUsers(updatedUsers);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checked = async (id, isChecked) => {
    try {

      const response = await fetch(`https://paymart-app.herokuapp.com/user/checked/${id}?checked=${isChecked}`, {
        method: 'GET',
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openImage = (imageSrc) => {
    const items = [
      {
        src: imageSrc,
        title: 'Image Preview',
      },
    ];
    new PhotoViewer(items);
  };

  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Passport</th>
        <th scope="col">Address</th>
        <th scope="col">Phone</th>
        <th scope="col">Filial ID</th>
        <th scope="col">Card Number</th>
        <th scope="col">Card Exp</th>
        <th scope="col">Check</th>
        <th scope="col">Delete</th>
      </tr>
      </thead>
      <tbody>
      {users?.map((user, index) => (
        <tr key={index}>
          <th valign="middle" scope="row">{index + 1}</th>
          <td valign="middle">
            <img className="cursor-pointer" src={user.avatar} alt="passport" width={80}
                 onClick={() => openImage(user.avatar)} />
          </td>
          <td valign="middle">
            <img className="cursor-pointer" src={user.address} alt="address" width={80}
                 onClick={() => openImage(user.address)} />
          </td>
          <td valign="middle">{user.phone || '-'}</td>
          <td valign="middle">{user.filial_id || '-'}</td>
          <td valign="middle">{user.card_number || '-'}</td>
          <td valign="middle">{user.card_exp || '-'}</td>
          <td valign="middle">
            <input checked={user.isChecked} type="checkbox" style={{ width: '20px', height: '20px' }}
                   onChange={() => checked(user._id, !user.isChecked)} />
          </td>
          <td valign="middle">
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>
              &times;
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>

  );
};

export default Home;

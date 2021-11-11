import { useEffect, useState } from 'react';
import { Table, Button, Tooltip, Switch, Image } from 'antd';
import { CloseOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';

const List = () => {

  const [users, setUsers] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const access = () => {
      const result = prompt('Введите пароль');
      if (result !== 'paymart2500') {
        window.location.href = '/';
      }
    };

    const fetchUsers = async () => {
      const res = await fetch(`https://paymart-app.herokuapp.com/user`);
      const data = await res.json();
      setUsers(data);
    };
    access();
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

  const columns = [
    {
      title: 'No',
      dataIndex: '',
      key: 9,
      render: (text, record, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Фото Паспорта',
      dataIndex: '',
      key: 1,
      render: user => (
        <Image
          className="cursor-pointer"
          src={user.avatar}
          width={80}
        />
      ),
    },
    {
      title: 'Адрес',
      dataIndex: '',
      key: 2,
      render: user => (
        <Image
          className="cursor-pointer"
          src={user.address}
          alt="passport"
          width={80}
        />
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 3,
    },
    {
      title: 'Филиал',
      dataIndex: 'filial_id',
      key: 4,
    },
    {
      title: 'Номер карты',
      dataIndex: '',
      key: 5,
      render: user => (
        <Tooltip trigger="click" title={user.card_number}>
          <span>{window.btoa(user.card_number)}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Дата карты',
      dataIndex: '',
      key: 6,
      render: user => (
        <Tooltip trigger="click" title={user.card_exp}>
          <span>{window.btoa(user.card_exp)}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Прочитано',
      dataIndex: '',
      key: 7,
      render: user => (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={user.isChecked}
          onChange={() => checked(user._id, !user.isChecked)}
        />
      ),
    },
    {
      title: 'Удалить',
      dataIndex: '',
      key: 8,
      render: (user) => (
        <Tooltip title="Delete">
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(user._id)} />
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      pagination={{
        onChange(current) {
          setPage(current);
        },
      }}
      columns={columns}
      dataSource={users ? users : null}
    />
  );
};

export default List;

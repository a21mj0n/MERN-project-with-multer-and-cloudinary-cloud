import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddUser = () => {

  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const [data, setData] = useState({
    phone: '',
    image: '',
    card_number: '',
    filial_id: '',
    // address: "",
  });
  const handleChange = (name) => (e) => {
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    // const address = name === "address" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value /*'address': address*/ });
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append('image', data.image);
      formData.append('phone', data.phone);
      formData.append('filial_id', data.filial_id);
      formData.append('card_number', data.card_number);
      // formData.append("address", data.address);

      const res = await fetch(`http://localhost:5000/user`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setData({ phone: '', image: '', card_number: '', filial_id: '' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Phone"
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange('phone')}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange('image')}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Filial ID"
          type="number"
          name="filial_id"
          value={data.filial_id}
          onChange={handleChange('filial_id')}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Card Number"
          type="number"
          name="card_number"
          value={data.card_number}
          onChange={handleChange('card_number')}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddUser;

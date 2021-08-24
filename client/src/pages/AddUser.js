import React from 'react';
import { useState } from 'react';

const AddUser = () => {

  const [data, setData] = useState({
    phone: '',
    image: '',
    card_number: '',
    card_exp: '',
    filial_id: '',
    address: '',
  });

  const [loader, setLoading] = useState({
    isLoading: false
  });

  const handleChange = (name) => (e) => {
    const value = name === 'image' ? e.target.files[0] : e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleAddress = (e) => {
    const address = e.target.files[0];

    setData({ ...data, 'address': address });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append('image', data.image);
      formData.append('phone', data.phone);
      formData.append('filial_id', data.filial_id);
      formData.append('card_number', data.card_number);
      formData.append('card_exp', data.card_exp);
      formData.append('address', data.address);

      setLoading({
        isLoading: true
      });

      const res = await fetch(`https://paymart-app.herokuapp.com/user`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setLoading({
          isLoading: false
        });
        setData({
          phone: '',
          image: '',
          card_number: '',
          card_exp: '',
          filial_id: '',
          address: '',
        });
        window.location.reload();
      }
    } catch (error) {
      setLoading({
        isLoading: false
      });
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <div className="mb-3">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          className="form-control"
          placeholder="Phone"
          type="number"
          name="phone"
          value={data.phone}
          onChange={handleChange('phone')}
        />
      </div>
      <div className="mb-3">
        <label className='mb-1' htmlFor="passport">Photo Passport</label>
        <input
          id='passport'
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange('image')}
        />
      </div>
      <div className="mb-3">
        <label className='mb-1' htmlFor="address">Photo Address</label>
        <input
          id='address'
          className="form-control"
          type="file"
          accept="image/*"
          name="address"
          onChange={handleAddress}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="filial">Filial ID</label>
        <input
          id="filial"
          className="form-control"
          placeholder="Filial ID"
          type="number"
          name="filial_id"
          value={data.filial_id}
          onChange={handleChange('filial_id')}
        />
      </div>
      <div className="mb-3 row">
        <div className="col-6">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            className="form-control"
            placeholder="Card Number"
            type="number"
            name="card_number"
            value={data.card_number}
            onChange={handleChange('card_number')}
          />
        </div>
        <div className="col-6">
          <label htmlFor="cardExpire">Card Expire</label>
          <input
            id="cardExpire"
            className="form-control"
            placeholder="Card Expire"
            type="number"
            name="card_exp"
            value={data.card_exp}
            onChange={handleChange('card_exp')}
          />
        </div>
      </div>
      <div className="text-center">
        <button disabled={loader.isLoading} className="btn btn-primary w-100" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddUser;

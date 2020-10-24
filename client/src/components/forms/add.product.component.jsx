import React, { useState } from 'react';
import axios from 'axios';
import CustomButton from 'components/custom-button/custom-button.component';
import FormInput from 'components/forms/input.component';
import './add.product.component.style.scss';

const AddForm = () => {
  const [file, setSelectedFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const submitForm = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('photo', file);
    data.append('name', name);
    data.append('description', description);
    data.append('type', type);

    axios
      .post(
        '/farmers/products',
        data
      )
      .then((res) => {
        console.log(res.response)
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <form className="add-product-form" onSubmit={submitForm}>
      <h3>Upload a Photo</h3>
      <FormInput name="name" value={name} required label="name" onChange={(event) => setName(event.target.value)} />
      <FormInput name="type" value={type} required label="type" onChange={(event) => setType(event.target.value)} />
      <FormInput
        name="description"
        value={description}
        required
        label="description"
        onChange={(event) => setDescription(event.target.value)} 
      />

      <input name="file" type="file" onChange={handleFileInput} />
      <div className="buttons">
        <CustomButton type="submit" style={{ width: '15rem' }}>
          Add Product
        </CustomButton>
      </div>
    </form>
  );
};

export default AddForm;

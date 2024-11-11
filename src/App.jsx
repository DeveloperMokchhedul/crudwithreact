import React, { useState } from 'react';
import Input from './components/Input';

function App() {
  const [contactData, setContactData] = useState([]);
  const [upDateClick, setUpDateClick] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phone: "",
    editIndex: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = () => {
    setUpDateClick(false);
    if (!inputData.name || !inputData.email || !inputData.phone) {
      alert("All fields are required");
      return;
    }

    if (inputData.editIndex !== null) {
      const updatedContactData = [...contactData];
      updatedContactData[inputData.editIndex] = {
        name: inputData.name,
        email: inputData.email,
        phone: inputData.phone,
      };
      setContactData(updatedContactData);
    } else {
      setContactData((prevData) => [
        ...prevData,
        { name: inputData.name, email: inputData.email, phone: inputData.phone },
      ]);
    }

    setInputData({ name: "", email: "", phone: "", editIndex: null });
  };

  const handleDelete = (id) => {
    const filteredData = contactData.filter((_, index) => index !== id);
    setContactData(filteredData);
  };

  const handleUpdate = (item, index) => {
    setInputData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      editIndex: index
    });
    setUpDateClick(true);
  };

  return (
    <>
      <div className='my-4'>
        <h1 className='text-center text-4xl font-bold m-4'>Contact Management App</h1>

        <div className='w-2/5 mx-auto bg-slate-400 p-5 flex flex-col gap-4 rounded-md'>
          <Input
            handleChange={handleChange}
            value={inputData.name}
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          <Input
            handleChange={handleChange}
            value={inputData.email}
            type={"email"}
            name="email"
            placeholder="Enter your email"
          />
          <Input
            handleChange={handleChange}
            value={inputData.phone}
            type={"Number"}
            name="phone"
            placeholder="Enter your phone number"
          />
          <button onClick={handleSubmit} className='bg-black text-white p-2 rounded-full'>
            {upDateClick ? "Update" : "Submit"}
          </button>
        </div>

        <div className='w-2/3 mx-auto my-5 flex flex-col gap-3'>
          {contactData.map((item, index) => (
            <div key={index} className='flex justify-between bg-slate-500 text-white px-4 py-1 rounded-md'>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <div className='flex gap-2'>
                <button onClick={() => handleUpdate(item, index)} className='bg-green-600 px-3 rounded-lg'>Edit</button>
                <button onClick={() => handleDelete(index)} className='bg-red-600 px-3 rounded-lg'>Del</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

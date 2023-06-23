import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { toast } from "react-toastify";
import { createNewAdminAuth } from "./UserAction";

const Register = () => {
  const inputFields = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "Niraj",
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Chemjong",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "0456789454",
      required: false,
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "sadfasdfasdf",
      required: false,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Niraj@gmail.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*******",
      minLength: 6,
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmpassword",
      type: "password",
      placeholder: "*******",
      required: true,
    },
  ];

  const [form, setForm] = useState({ role: "admin" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { confirmpassword, ...rest } = form;
    if (form.password !== confirmpassword) {
      toast.error("Password didn't match");
    }
    createNewAdminAuth(rest);
    console.log(rest);
  };
  return (
    <>
      <Header />
      <main className='main'>
        <Form
          className='register border p-5 shadow-lg rounded mt-5'
          onSubmit={handleOnSubmit}
        >
          <h1>New Admin Registration</h1>
          {inputFields.map((item, i) => (
            <CustomInput
              key={i}
              {...item}
              onChange={handleOnChange}
            />
          ))}
          <Button
            variant='primary'
            type='submit'
            className='d-grid'
          >
            Submit
          </Button>
        </Form>
      </main>
      <Footer />
    </>
  );
};

export default Register;

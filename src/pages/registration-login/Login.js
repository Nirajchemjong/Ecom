import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import { setUsers } from "./UserSlice";
import { getUserAction } from "./UserAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.usersInfo);
  const location = useLocation();
  const pathName = location.state?.from?.pathname || "/dashboard";
  useEffect(() => {
    users?.uid && navigate(pathName);
  }, [users, navigate, pathName]);
  const inputFields = [
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
  ];

  const [form, setForm] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    // ==================this is for user Login process ================
    try {
      const respPending = signInWithEmailAndPassword(auth, email, password);
      toast.promise(respPending, {
        pending: "please wait ...",
      });

      const signIn = await respPending;
      // console.log(signIn);
      if (signIn.user?.uid) {
        toast.success("your're logged in! ");

        // dispatch(setUsers(signIn.user));
        dispatch(getUserAction(signIn.user?.uid));
      }
    } catch (error) {
      const msg = error.message;
      if (msg.includes("Firebase: Error (auth/wrong-password)")) {
        toast.error("Incorrect Password");
      }
    }
  };
  return (
    <>
      <Header />
      <main className='main'>
        <Form
          className='register border p-5 shadow-lg rounded mt-5'
          onSubmit={handleOnSubmit}
        >
          <h1>Admin Login</h1>
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
          <p className='text-end mt-3'>
            Forget Password? <Link to='/password-reset-request'>Reset</Link>
            Now!
          </p>
        </Form>
      </main>
      <Footer />
    </>
  );
};

export default Login;

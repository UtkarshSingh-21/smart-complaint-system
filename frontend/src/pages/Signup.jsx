import { useState } from "react";

import API from "../services/api";

import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/signup",
        form
      );

      alert("Signup Successful");

      navigate("/");

    } catch (error) {

  console.log(error);

  alert(
    error?.response?.data?.message ||
    error.message
  );
}
  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSignup}
      >

        <h1>Signup</h1>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button type="submit">
          Signup
        </button>

        <p>
          Already have account?
          <Link to="/">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;
import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(formData);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>
      <section className="form">
        <form className="form-group" onSubmit={onSubmit}>
          <input
            type="email"
            className="corm-control"
            id="email"
            value={email}
            name="email"
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            className="corm-control"
            id="password"
            value={password}
            name="password"
            onChange={onChange}
            placeholder="Enter your password"
            required
          />
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(formData);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords dont match");
    }
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form className="form-group" onSubmit={onSubmit}>
          <input
            type="text"
            className="corm-control"
            id="name"
            value={name}
            name="name"
            onChange={onChange}
            placeholder="Enter your name"
            required
          />
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
          <input
            type="password"
            className="corm-control"
            id="password2"
            value={password2}
            name="password2"
            onChange={onChange}
            placeholder="Confirm your password"
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

export default Register;

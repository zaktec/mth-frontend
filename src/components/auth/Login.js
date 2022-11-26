import React, { useState } from "react";
import LoginFormCSS from "../../css/loginform.module.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className={LoginFormCSS["auth-form-container"]}>
      <h2>Login Page</h2>
      <form className={LoginFormCSS["login-form"]} onSubmit={handleSubmit}>
        <label htmlFor="email"> email </label>
        <input
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password"> password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="**********"
          id="password"
          name="password"
        />
        <button type="submit"> Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch("register")}>
        {" "}
        Dont have an account? Register here
      </button>
    </div>
  );
};
export default Login;
